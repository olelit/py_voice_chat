import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {authUser, registerUser} from "../../actions/users";
import {AuthModal} from "./AuthModal";

export class RegisterModal extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);

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
        this.props.registerUser(formData);
    };

    render() {
        return (
            <div>
                <form action="" onSubmit={this.onSubmit}>
                    <div>
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

export default connect(null, {registerUser})(RegisterModal)