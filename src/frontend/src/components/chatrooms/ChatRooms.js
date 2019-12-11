import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getChatrooms, deleteChatroom } from "../../actions/chatrooms";
import { openChatroom } from "../../actions/chatrooms";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import makeStyles from "@material-ui/core/styles/makeStyles";

export class ChatRooms extends React.Component {
    static propTypes = {
        chatrooms: PropTypes.array.isRequired,
        getChatrooms: PropTypes.func.isRequired,
        deleteChatroom: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getChatrooms();
    }

    render() {

        const root = {
            width: '100%',
            maxWidth: 360,
        }
        return (
            <Fragment>
                <h2>Chat rooms</h2>
                <List dense style={root}>
                    {this.props.chatrooms.map ? this.props.chatrooms.map(chatroom => {
                        const labelId = `checkbox-list-secondary-label-${chatroom.id}`;
                        return (
                            <ListItem key={chatroom.id} button onClick={this.props.openChatroom.bind(this, chatroom.id)}>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={`Avatar n°${chatroom.title}`}
                                        src={chatroom.image}
                                    />
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={chatroom.title} />
                                <button onClick={this.props.deleteChatroom.bind(this, chatroom.id)} className="btn btn-danger" > Delete</button>
                            </ListItem>
                        );
                    }) : []}
                </List>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    chatrooms: state.chatrooms.chatrooms,
    chatroom: state.chatrooms.chatroom
})

export default connect(mapStateToProps,
    { getChatrooms, deleteChatroom, openChatroom })(ChatRooms);