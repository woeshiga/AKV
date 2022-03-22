import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL, LOGOUT_SUCCESS,
    GET_RESET_TOKEN
} from '../actions/types';

const initialState = {
    isLoading: false,
    isAuthenticated: null,
    user: null,
    token: localStorage.getItem('token'),
    resetToken: localStorage.getItem('resetToken')
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                ...action.payload
            };
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                user: null,
                token: null
            };
        case GET_RESET_TOKEN:
            return {
                ...state,
                resetToken: {
                    status: action.payload.status,
                    data: action.payload.data
                }
            };
        default:
            return state;
    }
}