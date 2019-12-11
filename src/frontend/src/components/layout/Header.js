import React, {Component} from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUserByToken} from "../../actions/users";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import AuthOrRegisterModal from "../chatrooms/AuthOrRegisterModal";
import HeaderView from "./HeaderView";


export class Header extends React.Component {

    componentDidMount() {
        this.props.getUserByToken();
    }


    render() {
        return (
            <HeaderView settings={this.props}/>

        )
    }
}

const mapStateToProps = state => ({
    user: state.chatrooms.user,
    isAuth: state.chatrooms.isAuth
});


export default connect(mapStateToProps,
    {getUserByToken})(Header);
