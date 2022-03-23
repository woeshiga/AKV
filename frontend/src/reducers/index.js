import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from "../reducers/auth"
import settings from "../reducers/settings";
import news from "./news";

export default combineReducers({
    form: formReducer,
    auth,
    settings,
    news,
});