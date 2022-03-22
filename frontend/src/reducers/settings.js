import {GET_SETTINGS, GET_VERIFY_CODE} from "../actions/types";

const initState = {
    verifyCode: null
}

export default function (state = initState, action) {
    switch (action.type) {
        case GET_SETTINGS:
        case GET_VERIFY_CODE:
            return {
                ...state,
                verifyCode: action.payload
            }
        default:
            return {...state}
    }
}