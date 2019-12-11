import React, {Fragment} from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import {connect} from 'react-redux';
import {openChatroom} from "../../actions/chatrooms";

export class ChatRoom extends React.Component {

    constructor(props){
        super(props);
        this.chatSocket = null;
        this.sendData = this.sendData.bind(this);
    }

    sendData() {
        this.chatSocket.send(JSON.stringify({
            'message': "dsdsdsdsds"
        }));

        console.log('XXX')
    }

    render() {
        if (this.props.chatroom) {
            this.chatSocket = new WebSocket(
                'ws://' + window.location.host +
                '/ws/chat/' + this.props.chatroom.id + '/');

            this.chatSocket.onmessage = function (e) {
                console.log("pong")
            };

            this.chatSocket.onclose = function (e) {
                console.error('Chat socket closed unexpectedly');
            };

        }

        return (
            <Fragment>
                {this.props.chatroom ? this.props.chatroom['members'].map(member => {
                    return (
                        <ListItem key={member.id} button onClick={this.sendData}>
                            <ListItemAvatar>
                                <Avatar
                                    alt={`Avatar n°${member.username}`}
                                    src=""
                                />
                            </ListItemAvatar>
                            <ListItemText primary={member.username}/>
                        </ListItem>
                    )
                }) : []}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    chatroom: state.chatrooms.chatroom
});

export default connect(mapStateToProps,
    {openChatroom})(ChatRoom);