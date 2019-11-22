import React, {Component} from 'react'
import RegisterModal from "../chatrooms/RegisterModal";
import AuthModal from "../chatrooms/AuthModal";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUserByToken} from "../../actions/users";

export class Header extends React.Component {

    componentDidMount() {
        this.props.getUserByToken();
    }

    render() {
        const username = this.props.isAuth ? this.props.user['username'] : "";
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">Voice Chat</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    </div>
                    <div className="d-flex flex-row nav-item">
                        <span>{username}</span>
                        <div className="">
                            <span>Войти</span>
                            <span>Зарегистрироваться</span>
                        </div>
                    </div>
                </nav>
                <div className="row">
                    <RegisterModal></RegisterModal>
                    <AuthModal></AuthModal>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.chatrooms.user,
    isAuth: state.chatrooms.isAuth
});

export default connect(mapStateToProps,
    {getUserByToken})(Header);