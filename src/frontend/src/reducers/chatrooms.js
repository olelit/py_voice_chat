import {
    GET_CHATROOMS,
    DELETE_CHATROOM,
    ADD_CHATROOM,
    GET_USER_BY_TOKEN,
    RETURN_USER_AND_TOKEN,
    GET_USERS_BY_USERNAMES,
    GET_FRIENDS,
    ADD_FRIENDS,
    OPEN_MENU,
    GET_CHATROOM
} from '../actions/types.js'

const initialState = {
    chatrooms: [],
    users: [],
    user: null,
    friends: [],
    isAuth: false,
    openMenu: false,
    chatroom:null
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
                friends: action.payload['friends']
            };
        case ADD_FRIENDS:
            return {
                ...state,
                friends: state.friends.concat(action.payload['friends'])
            };
        case OPEN_MENU:
            return {
                ...state,
                openMenu: action.payload
            };
        case GET_CHATROOM:
            return {
                ...state,
                chatroom: action.payload
            };
        default:
            return state;

    }
}

GET_CHATROOM