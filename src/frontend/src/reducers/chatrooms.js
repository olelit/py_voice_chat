import { GET_CHATROOMS, DELETE_CHATROOM, ADD_CHATROOM } from '../actions/types.js'

const initialState = {
    some: 'text',
    chatrooms: []
}

export default function (state = initialState, action) {
    console.log(action.type);
    switch (action.type) {
        case GET_CHATROOMS:
            return {
                ...state,
                chatrooms: action.payload
            };
        case DELETE_CHATROOM:
            return {
                ...state,
                chatrooms: state.chatrooms.filter( chatroom => chatroom.id !== action.payload)
            };
        case ADD_CHATROOM:
            return {
                ...state,
                chatrooms: [...state.chatrooms, action.payload]
            };

        default:
            return state;

    }
}