import React, {Fragment} from 'react'
import CreateChatRoomForm from "./CreateChatRoomForm";
import ChatRooms from "./ChatRooms";
import People from "./People";


export class Dashboard extends React.Component {
    render() {
        return (
            <Fragment>
                <CreateChatRoomForm/>
                <ChatRooms/>
                <People/>
            </Fragment>
        )
    }
}

export default Dashboard