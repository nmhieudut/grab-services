import { all, fork } from 'redux-saga/effects'
import authSagas from '../modules/auth/sagas'
import registerSagas from '../modules/register/sagas'

export default function* rootSagas() {
    yield all([fork(authSagas)]);
    yield all([fork(registerSagas)]);
}
