import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FormControl} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import {authUser, registerUser} from "../../actions/users";
import {connect} from "react-redux";
import {addChatroom} from "../../actions/chatrooms";
import {CreateChatRoomForm} from "./CreateChatRoomForm";

export class AuthOrRegisterModal extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.auth = this.auth.bind(this);
        this.register = this.register.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            username: "",
            password: "",
            email: "",
            open: false,
        }

    }

    closeModal = () => {
        this.setState({open: false})
    };

    openModal = () => {
        this.setState({open: true})
    };

    register = () => {
        let formData = new FormData();
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        formData.append('email', this.state.email);
        this.props.registerUser(formData);

    };

    auth = () => {
        let formData = new FormData();
         formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        formData.append('email', this.state.email);
        this.props.authUser(formData);
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    render() {
        const {username, email, open, password} = this.state;
        return (
            <Fragment>
                <MenuItem variant="outlined" color="inherit" onClick={this.openModal}>
                    Авторизация/Регистрация
                </MenuItem>
                <Dialog open={open} onClose={this.closeModal}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Авторизация/Регистрация</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            name="username"
                            label="Username"
                            type="text"
                            onChange={this.onChange}
                            value={username}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            name="email"
                            label="Email"
                            type="email"
                            onChange={this.onChange}
                            value={email}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            name="password"
                            label="Password"
                            type="password"
                            onChange={this.onChange}
                            value={password}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeModal} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.auth} color="primary">
                            Авторизация
                        </Button>
                        <Button onClick={this.register} color="primary">
                            Регистрация
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }

}

export default connect(null, {authUser, registerUser})(AuthOrRegisterModal)