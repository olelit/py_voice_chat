import {
    GET_CHATROOMS,
    DELETE_CHATROOM,
    ADD_CHATROOM,
    GET_USER_BY_TOKEN,
    RETURN_USER_AND_TOKEN,
    GET_USERS_BY_USERNAMES,
    GET_FRIENDS
} from '../actions/types.js'

const initialState = {
    chatrooms: [],
    users: [],
    user: null,
    isAuth: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CHATROOMS:
            return {
                ...state,
                chatrooms: action.payload
            };
        case DELETE_CHATROOM:
            return {
                ...state,
                chatrooms: state.chatrooms.filter(chatroom => chatroom.id !== action.payload)
            };
        case ADD_CHATROOM:
            return {
                ...state,
                chatrooms: [...state.chatrooms, action.payload]
            };
        case GET_USER_BY_TOKEN:
            return {
                ...state,
                user: action.payload,
                isAuth: true
            };
        case RETURN_USER_AND_TOKEN:
            localStorage.setItem('token', action.payload['token']);
            return {
                ...state,
                user: action.payload['user'],
                isAuth: true
            };
        case GET_USERS_BY_USERNAMES:
            return {
                ...state,
                users: action.payload,
            };
        case GET_FRIENDS:
            return {
                ...state,
                users: action.payload
            };
        default:
            return state;

    }
}