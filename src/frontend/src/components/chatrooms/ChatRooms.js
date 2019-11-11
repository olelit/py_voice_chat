import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getChatrooms, deleteChatroom } from "../../actions/chatrooms";

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
        return (
            <Fragment>
                <h2>Chat rooms</h2>
                <div className="row flex-column">
                    { this.props.chatrooms.map(chatroom => (
                        <div className="row flex-column" key={ chatroom.id }>
                            <div>
                                { chatroom.title}
                            </div>
                            <div>
                                <button onClick={this.props.deleteChatroom.bind(this, chatroom.id)} className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    chatrooms: state.chatrooms.chatrooms
})

export default connect(mapStateToProps,
    { getChatrooms, deleteChatroom })(ChatRooms);