import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { addChatroom } from "../../actions/chatrooms";
import { connect } from 'react-redux'

export class CreateChatRoomForm extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            title: '',
            image: '',
            members: []
        }

    }

    closeModal = () => {
        this.setState({ open: false })
    };

    openModal = () => {
        this.setState({ open: true })
    };
    
    onCheck = e => {
        this.setState({ [e.target.name]: [...e.target.selectedOptions].map(o => o.value) })
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    };
    onChangeFile = e => {
        this.setState({ [e.target.name]: e.target.files[0] })
    };
    onSubmit = e => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('image', this.state.image, this.state.image.title);
        formData.append('title', this.state.title);
        formData.append('members', JSON.stringify(this.state.members));
        this.props.addChatroom(formData);
    };

    render() {
        
        const { title, image, members, open } = this.state;
        return (
            <Fragment>
                <Fab color="primary" aria-label="add" onClick={this.openModal}>
                    <AddIcon />
                </Fab>
                <Dialog open={open} onClose={this.closeModal}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Создать комнату</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            name="title"
                            label="Название"
                            type="text"
                            onChange={this.onChange}
                            value={title}
                            fullWidth
                        />

                        <div className="form-group">
                            <label htmlFor="room_image">Изображение</label>
                            <input type="file" name="image" onChange={this.onChangeFile} 
                                className="form-control" id="room_image" />
                        </div>
                        <div>
                            <label htmlFor="">Участники</label>
                            <select name="members" multiple="multiple" id="" onChange={this.onCheck}>
                                {this.props.friends.map(friend => {
                                    return (<option
                                        value={friend['getter']['id']}>{friend['getter']['username']}</option>)
                                })}
                            </select>
                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeModal} color="primary">
                            Отмена
                        </Button>
                        <Button onClick={this.onSubmit} color="primary">
                            Сохранить
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }

}

const mapStateToProps = state => ({
    friends: state.chatrooms.friends
});

export default connect(mapStateToProps, { addChatroom })(CreateChatRoomForm)