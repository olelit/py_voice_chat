import React, {Fragment} from 'react'
import Header from "../layout/Header";
import LeftPanel from "./LeftPanel"
import ChatRoom from "./ChatRoom"
import {connect} from 'react-redux';
import {getUserByToken} from "../../actions/users";


export class Dashboard extends React.Component {

    render() {
        return (
            <Fragment>
                <LeftPanel/>
                <main>
                    {this.props.isAuth ? <ChatRoom/> : null}
                </main>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isAuth: state.chatrooms.isAuth
});


export default connect(mapStateToProps,
    {getUserByToken})(Dashboard);



