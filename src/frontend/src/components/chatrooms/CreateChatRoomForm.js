import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {addChatroom} from "../../actions/chatrooms";

export class CreateChatRoomForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            isModalShow: false,
            title: '',
            image: ''
        };

    }

    toggleModal() {
        this.setState(
            {
                isModalShow: !this.state.isModalShow,
            },
        )
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };
    onChangeFile = e => {
        this.setState({[e.target.name]: e.target.files[0]})
    };
    onSubmit = e => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('image', this.state.image, this.state.image.title);
        formData.append('title', this.state.title);

        this.props.addChatroom(formData);
    };


    render() {
        const {title, file} = this.state
        return (
            <div className="create__room">
                <button onClick={this.toggleModal} type="button" className="btn btn-primary">
                    Launch demo modal
                </button>

                <div className={!this.state.isModalShow ? 'modal fade' : 'modal fade show'}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" onClick={this.toggleModal} className="close" data-dismiss="modal"
                                        aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="room_name">Название</label>
                                        <input type="text" name="title" onChange={this.onChange} value={title}
                                               className="form-control" id="room_name"
                                               placeholder="Название"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="room_image">Изображение</label>
                                        <input type="file" name="image" onChange={this.onChangeFile} value={file}
                                               className="form-control" id="room_image"/>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {addChatroom})(CreateChatRoomForm)