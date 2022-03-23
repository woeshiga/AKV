import {GET_NEWS_LIST, GET_ARTICLE} from "../actions/types";


const initialState = {
    data: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ARTICLE:
        case GET_NEWS_LIST:
            return {
                data: action.payload.data
            }
        default:
            return state;
    }
}
