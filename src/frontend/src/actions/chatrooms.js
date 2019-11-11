import axios from 'axios';
import { GET_CHATROOMS, DELETE_CHATROOM, ADD_CHATROOM } from "./types";

export const getChatrooms = () => dispatch =>{
    axios.get('/api/chat/')
        .then(res => {
            dispatch({
                type: GET_CHATROOMS,
                payload: res.data
            });
        }).catch(err => console.log(err))
};

export const deleteChatroom = (id) => dispatch =>{
    axios.delete(`/api/chat/${id}/`)
        .then(res => {
            dispatch({
                type: DELETE_CHATROOM,
                payload: id
            });
        }).catch(err => console.log(err))
};

export const addChatroom = chatroom => dispatch =>{
    axios.post(`/api/chat/`, chatroom,{
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
            console.log('return');
            dispatch({
                type: ADD_CHATROOM,
                payload: res.data
            });
        }).catch(err => console.log(err))
};
