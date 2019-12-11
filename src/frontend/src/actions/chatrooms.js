import axios from 'axios';
import { GET_CHATROOMS, DELETE_CHATROOM, ADD_CHATROOM, OPEN_MENU, GET_CHATROOM} from "./types";

const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
};

let token = localStorage.getItem('token');
if (token) {
    config.headers['Authorization'] = `Token ${token}`;
}

export const openLeftMenu = () => dispatch => {
    dispatch({
        type: OPEN_MENU,
        payload: true
    });
}

export const closeLeftMenu = () => dispatch => {
    dispatch({
        type: OPEN_MENU,
        payload: false
    });
}

export const getChatrooms = () => dispatch => {
    axios.get('/api/chat/', config)
        .then(res => {
            dispatch({
                type: GET_CHATROOMS,
                payload: res.data
            });
        }).catch(err => console.log(err))
};

export const openChatroom = (id) => dispatch => {
    axios.get(`/api/chat/${id}/`, config)
        .then(res => {
            dispatch({
                type: GET_CHATROOM,
                payload: res.data
            });
        }).catch(err => console.log(err))
};


export const deleteChatroom = (id) => dispatch => {
    axios.delete(`/api/chat/${id}/`, config)
        .then(res => {
            dispatch({
                type: DELETE_CHATROOM,
                payload: id
            });
        }).catch(err => console.log(err))
};

export const addChatroom = (chatroom) => dispatch => {
    axios.post(`/api/chat/`, chatroom, config)
        .then(res => {
            console.log('return');
            dispatch({
                type: ADD_CHATROOM,
                payload: res.data['chatroom']
            });
        }).catch(err => console.log(err))
};




