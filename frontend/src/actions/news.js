import api from "./axiosConfig";
import {GET_NEWS_LIST, GET_ARTICLE} from "./types";


export const getNewsList = () => async dispatch => {
    const res = await api.get('api/articles/article');
    dispatch({type: GET_NEWS_LIST, payload: res});
}

export const getArticle = (pk) => async dispatch => {
    const res = await api(`api/articles/article/${pk}`)
    dispatch({type: GET_ARTICLE, payload: res})
}

export const createArticle = (form_data) => async dispatch => {
    await api.post('api/articles/create', form_data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
