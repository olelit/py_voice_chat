import React, {Fragment} from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {createMuiTheme, withStyles, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {green, purple} from '@material-ui/core/colors';
import {connect} from 'react-redux';
import {openChatroom} from "../../actions/chatrooms";

export class ChatRoom extends React.Component {

    constructor(props) {
        super(props);
        this.chatSocket = null;
        this.changeState = this.changeState.bind(this);
        this.connect = this.connect.bind(this);
        this.loop = this.loop.bind(this);
        this.sendVoice = this.sendVoice.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.myNavigator = navigator.mediaDevices;
        this.array = new Uint8Array(64);
        this.myStream;
        this.audioContext;
        this.analyser;
        this.src;
        this.buf;
        this.state = {
            isConnect: false,
            path: ""
        };

        this.greenButton = {
            backgroundColor: "green"
        };

        this.redButton = {
            backgroundColor: "red"
        };

    }

    changeState() {
        let connect = !this.state.isConnect;
        this.setState({isConnect: connect});
        if (connect) {
            this.connect();
            let recorderAudio = document.querySelector('audio');
            this.chatSocket.onmessage = function (e) {
                let data = JSON.parse(e.data);
                let message = data['message'];
                console.log(message);
                recorderAudio.src = message;
                recordedAudio.controls = true;
            };
           this.sendVoice();
        } else {
            this.disconnect();
        }

    }

    sendVoice() {
        let audioChunks, rec;
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                audioChunks = [];
                rec = new MediaRecorder(stream);
                rec.ondataavailable = e => {
                    audioChunks.push(e.data);
                    if (rec.state == "inactive") {
                        let blob = new Blob(audioChunks, { type: 'audio/x-mpeg-3' });
                        let src = URL.createObjectURL(blob);
                        if (this.chatSocket) {
                            this.chatSocket.send(JSON.stringify({
                                'message': src
                            }));
                        }
                    }
                }
                rec.start();
            })
            .catch(e => console.log(e));
        setTimeout(() => rec.stop(), 1000);
    }

    loop() {
        window.requestAnimationFrame(this.loop);
        this.analyser.getByteFrequencyData(this.array);
        if (this.chatSocket) {
            this.chatSocket.send(JSON.stringify({
                'message': this.array
            }));
        }
    }

    connect() {
        this.chatSocket = new WebSocket(
            'ws://' + window.location.host +
            '/ws/chat/' + this.props.chatroom.id + '/');
    }

    disconnect() {
        this.chatSocket.close();
        this.chatSocket = null;
        this.myStream.getTracks()[0].stop();
    }

    render() {
        const redbutton = <Button variant="contained" color="primary" onClick={this.changeState}
                                  style={this.redButton}>
            Отключится
        </Button>;

        const greenButton = <Button variant="contained" color="primary" onClick={this.changeState}
                                    style={this.greenButton}>
            Подключится
        </Button>;

        const chatroom = {
            float:"right"
        }  
        
        const chatMembers = {

        }

        return (

            <div style={chatroom}>
                <audio id="recordedAudio"></audio>
                    <List style={chatMembers}>
                    {this.props.chatroom ? this.props.chatroom['members'].map(member => {
                        return (
                            <ListItem key={member.id}>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={`Avatar n°${member.username}`}
                                        src="{}"
                                    />
                                </ListItemAvatar>
                                <ListItemText primary={member.username} />
                            </ListItem>
                        )
                        }) : []}
                        </List>
                {this.state.isConnect ? redbutton : greenButton}  
                  
                </div>
        )
    }
}

const
    mapStateToProps = state => ({
        chatroom: state.chatrooms.chatroom
    });

export default connect(mapStateToProps,
    {openChatroom})(ChatRoom);