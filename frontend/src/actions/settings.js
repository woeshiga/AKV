import api from "./axiosConfig";
import {GET_SETTINGS, GET_VERIFY_CODE} from "./types";

export const getSettings = () => async dispatch => {
    await api.get('/api/settings/get')
        .then(res => dispatch({type: GET_SETTINGS, payload: res.data.verifyCode}))
}

export const addUserInLine = ({username, code}) => async dispatch => {
    const body = JSON.stringify({username, code})
    await api.post('/api/settings/add_user', body)
}

export const getCode = username => async dispatch => {
    await api.get('/api/settings/get_user/' + username)
        .then(res => dispatch({type: GET_VERIFY_CODE, payload: res.data.code}))
}
