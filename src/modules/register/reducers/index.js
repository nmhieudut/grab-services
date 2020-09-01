import * as ActionTypes from '../actions'

const defaultState = ({
    loading: false,
    error: null,
    responses: null,
})

export default function (state = defaultState, action) {
    switch (action.type) {
        case ActionTypes.AUTH_REGISTER:
            return {
                ...state,
                loading: true,
            };
        case ActionTypes.AUTH_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case ActionTypes.AUTH_REGISTER_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
}