import {
  AUTH_LOG_IN,
  AUTH_LOG_IN_SUCCESS,
  AUTH_LOG_IN_FAIL,
} from '../Type';

import {takeLatest, put} from 'redux-saga/effects';
import {loginInApi} from '../../Api';

//LogIn
function* logIn(payload) {
  try {
    const result = yield loginInApi(payload.data);
    if (result?.data?.data?.access_token) {
      yield put({type: AUTH_LOG_IN_SUCCESS, data: result});
    } else {
      yield put({type: AUTH_LOG_IN_FAIL, data: {msg: result.data.message}});
    }
  } catch (err) {
    yield put({type: AUTH_LOG_IN_FAIL, data: {msg: 'NET ERROR'}});
  }
}
export function* watchLogIn() {
  yield takeLatest(AUTH_LOG_IN, logIn);
}
