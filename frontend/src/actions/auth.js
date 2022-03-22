import api from "./axiosConfig";
import {stopSubmit} from 'redux-form';

import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
    GET_RESET_TOKEN
} from './types';


export const register = ({username, password, first_name, last_name, telegram, inviter}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({username, password, first_name, last_name, telegram, inviter});

    try {
        const res = await api.post('/api/user/register', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL,
            payload: err.data
        });
    }
};

export const loadUser = () => async (dispatch, getState) => {
    dispatch({type: USER_LOADING});

    try {
        const res = await api.get('/api/auth/user', tokenConfig(getState));
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};

export const logout = () => async (dispatch, getState) => {
    await api.post('/api/user/logout', null, tokenConfig(getState));
    dispatch({
        type: LOGOUT_SUCCESS
    });
};

export const login = ({username, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({username, password});

    try {
        const res = await api.post('/api/user/login', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.data
        });
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });
        dispatch(stopSubmit('loginForm', err.response.data));
    }
};

export const tokenConfig = getState => {
    const token = getState().auth.token;
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
};


export const createResetToken = ({username, token}) => async dispatch => {
    const body = JSON.stringify({username, token})
    api.post('/api/user/create_reset_token', body)
}

export const getResetToken = ({token}) => async dispatch => {
    const res = await api.get(`/api/user/get_reset_token/${token}`)
    dispatch({type: GET_RESET_TOKEN, payload: res.data})
}