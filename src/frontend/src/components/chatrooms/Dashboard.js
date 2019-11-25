import React, {Fragment} from 'react'
import CreateChatRoomForm from "./CreateChatRoomForm";
import ChatRooms from "./ChatRooms";
import Header from "../layout/Header";


export class Dashboard extends React.Component {

    render() {
        return (
            <Fragment>
                <CreateChatRoomForm/>
                <ChatRooms/>
            </Fragment>
        )
    }
}

export default Dashboard


