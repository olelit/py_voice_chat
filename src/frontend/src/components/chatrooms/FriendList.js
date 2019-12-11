import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {getFriends} from "../../actions/users";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import makeStyles from "@material-ui/core/styles/makeStyles";

export class FriendList extends React.Component {
    componentDidMount() {
        this.props.getFriends();
    }

    render() {

        const root = {
            width: '100%',
            maxWidth: 360,
        }

        return (
            <Fragment>
                <h2>Friends</h2>
                <List dense style={root}>
                    {this.props.friends ? this.props.friends.map(friend => {
                        const labelId = `checkbox-list-secondary-label-${friend['getter']['id']}`;
                        return (
                            <ListItem key={friend['getter']['id']} button>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={`Avatar n°${friend['getter']['username']}`}
                                        src={`/static/images/avatar/tes t.jpg`}
                                    />
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={friend['getter']['username']} />
                            </ListItem>
                        );
                    }) : []}
                </List>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    friends: state.chatrooms.friends
});

export default connect(mapStateToProps,
    {getFriends})(FriendList);