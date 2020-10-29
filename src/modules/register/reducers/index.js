import * as ActionTypes from '../actions/types';

const defaultState = {
  loading: false,
  success: null,
  error: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.AUTH_REGISTER:
      return {
        loading: true,
        success: null,
        error: null,
      };
    case ActionTypes.AUTH_REGISTER_SUCCESS:
      return {
        success: true,
        error: null,
        loading: false,
      };
    case ActionTypes.AUTH_REGISTER_FAILED:
      return {
        loading: false,
        success: null,
        error: action.error,
      };
    default:
      return state;
  }
}
