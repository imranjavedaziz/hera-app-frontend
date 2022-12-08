import {HttpStatus} from '../../constants/Constants';
import {
  PROFILE_MATCH,
  PROFILE_MATCH_FAIL,
  PROFILE_MATCH_SUCCESS,
  PROFILE_MATCH_RESPONSE,
  PROFILE_MATCH_RESPONSE_FAIL,
  PROFILE_MATCH_RESPONSE_SUCCESS,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';

import {ProfileMatchApi, ProfileMatchResponseApi} from '../../Api';
import {ValidationMessages} from '../../constants/Strings'

function* profileMatch(payload) {
  try {
    const result = yield ProfileMatchApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: PROFILE_MATCH_SUCCESS, data: result});
    } else {
      yield put({
        type: PROFILE_MATCH_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({type: PROFILE_MATCH_FAIL, data: {msg: ValidationMessages.NO_INTERNET_CONNECTION}});
  }
}
export function* watchProfileMatch() {
  yield takeLatest(PROFILE_MATCH, profileMatch);
}
function* profileMatchResponse(payload) {
  try {
    const result = yield ProfileMatchResponseApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: PROFILE_MATCH_RESPONSE_SUCCESS, data: result});
    } else {
      yield put({
        type: PROFILE_MATCH_RESPONSE_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({type: PROFILE_MATCH_RESPONSE_FAIL, data: {msg: ValidationMessages.NO_INTERNET_CONNECTION}});
  }
}
export function* watchpProfileMatchResponse() {
  yield takeLatest(PROFILE_MATCH_RESPONSE, profileMatchResponse);
}
