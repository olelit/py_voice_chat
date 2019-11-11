import React, { Fragment } from 'react'
import ChatRooms from "./ChatRooms";
import People from "./People";
import CreateChatRoomForm from "./CreateChatRoomForm";

export class Dashboard extends React.Component {
    render() {
        return (
            <Fragment>
                <CreateChatRoomForm/>
                <ChatRooms />
                <People />
            </Fragment>
        )
    }
}

export default Dashboard