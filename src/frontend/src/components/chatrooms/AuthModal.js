import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {authUser} from "../../actions/users";
import {addChatroom} from "../../actions/chatrooms";
import {CreateChatRoomForm} from "./CreateChatRoomForm";

export class AuthModal extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            username: "",
            password: "",
            email: "",
        }
    }
    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };
    onSubmit = e => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('username', this.state.username);
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);
        this.props.authUser(formData)
    };

    render() {
        return (
            <div>
                <form action="" onSubmit={this.onSubmit}>
                    <div>
                        <h2>Авторизация</h2>
                        <span>Ник</span>
                        <input type="text" onChange={this.onChange} name="username" value={this.state.username}/>
                        <span>Почта</span>
                        <input type="email" onChange={this.onChange} name="email" value={this.state.email}/>
                        <span>Пароль</span>
                        <input type="password" onChange={this.onChange} name="password" value={this.state.password}/>
                    </div>
                    <input type="submit" value="Регистрация"/>
                </form>
            </div>
        )
    }

}

export default connect(null, {authUser})(AuthModal)