import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from "../reducers/auth"
import settings from "../reducers/settings";

export default combineReducers({
    form: formReducer,
    auth,
    settings
});