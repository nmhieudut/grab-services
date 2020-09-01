import * as ActionTypes from '../actions/types';
import { put, takeLatest } from 'redux-saga/effects';

import LoginServices from '../../../services/LoginServices';
import ProfileServices from '../../../services/ProfileServices';

function* Login(action) {
  console.log('Action', action);
  try {
    const response = yield LoginServices.login(action.email, action.password);

    // Get profile theo uid
    // const profile = yield ProfileServices.getProfile(response.user._user.uid);

    // let user = response.user._user;
    // user.profile = profile;
    // yield put({
    //   type: ActionTypes.AUTH_LOGIN_SUCCESS,
    //   loggedInUser: user,
    // });
    yield put({
      type: ActionTypes.AUTH_LOGIN_SUCCESS,
      loggedInUser: response.user._user
    })
    console.log('response: ', response)
    // console.log('Profile: ', profile);
  } catch (error) {
    console.log(error);
    yield put({ type: ActionTypes.AUTH_LOGIN_FAILED, error: error });
  }
}

// root saga
function* sagas() {
  yield takeLatest(ActionTypes.AUTH_LOGIN, Login);
}

export default sagas;