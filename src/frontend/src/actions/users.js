import axios from 'axios';
import {GET_USER_BY_TOKEN, RETURN_USER_AND_TOKEN, GET_USERS_BY_USERNAMES, GET_CHATROOMS, GET_FRIENDS} from "./types";

const config = {
    headers: {
        'content-type': 'multipart/form-data',
        'X-CSRFToken': document.cookie.replace(/(?:(?:^|.*;\s*)csrftoken\s*\=\s*([^;]*).*$)|^.*$/, "$1")
    }
};

export const authUser = (user) => dispatch => {
    axios.post(`api/auth/login/`, user, config)
        .then(res => {
            dispatch({
                type: RETURN_USER_AND_TOKEN,
                payload: res.data
            })
            let token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Token ${token}`;
            }
        }).catch(err => console.log(err))
};

export const sendRequestForFriendShip = (users) => dispatch => {
    console.log('QQQQ');
}

export const registerUser = (user) => dispatch => {
    axios.post(`api/auth/register/`, user, config)
        .then(res => {

            dispatch({
                type: RETURN_USER_AND_TOKEN,
                payload: res.data
            })
            let token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Token ${token}`;
            }
        }).catch(err => console.log(err))
};


export const getUserByToken = () => dispatch => {
    let token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    axios.get(`api/auth/token/`, config)
        .then(res => {
            dispatch({
                type: GET_USER_BY_TOKEN,
                payload: res.data
            });
        }).catch(err => {
        localStorage.removeItem('token');
        delete config['header'];
    })

};

export const getUsersByUsername = (username) => dispatch => {
    axios.get('api/users/search?username='+username, {
        params: username
    }, config)
        .then(res => {
            dispatch({
                type: GET_USERS_BY_USERNAMES,
                payload: res.data
            })
        }).catch(err => {
        console.log(err)
    })
}

export const getFriends = () => dispatch => {
    axios.get('/api/chat/', config)
        .then(res => {
            dispatch({
                type: GET_FRIENDS,
                payload: res.data
            });
        }).catch(err => console.log(err))
};



