import React, {Fragment} from 'react'
import Header from "../layout/Header";
import LeftPanel from "./LeftPanel"
import ChatRoom from "./ChatRoom"
import {connect} from 'react-redux';
import {openChatroom} from "../../actions/chatrooms";


export class Dashboard extends React.Component {

    render() {
        return (
            <Fragment>
                <LeftPanel/>
                {this.props.chatroom ? <ChatRoom /> : null}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    chatroom: state.chatrooms.chatroom
});


export default connect(mapStateToProps,
    {openChatroom})(Dashboard);



