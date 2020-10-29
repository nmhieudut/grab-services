import * as ActionTypes from '../actions/types';

import {put, takeLatest} from 'redux-saga/effects';

import RegisterService from '../../../services/RegisterServices';

function* register(action) {
  try {
    yield RegisterService.register(
      action.email,
      action.password,
      action.username,
      action.check,
    );
    yield put({
      type: ActionTypes.AUTH_REGISTER_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: ActionTypes.AUTH_REGISTER_FAILED,
      error: error,
    });
  }
}

function* sagas() {
  yield takeLatest(ActionTypes.AUTH_REGISTER, register);
}
export default sagas;
