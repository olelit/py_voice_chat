import axios from 'axios';
import {GET_USER_BY_TOKEN, RETURN_USER_AND_TOKEN} from "./types";

const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
};

export const authUser = (user) => dispatch => {
    console.log(user);
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



