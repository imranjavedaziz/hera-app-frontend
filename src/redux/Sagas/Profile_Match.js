import {HttpStatus} from '../../constants/Constants';
import {
  PROFILE_MATCH,
  PROFILE_MATCH_FAIL,
  PROFILE_MATCH_SUCCESS,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';

import {ProfileMatchApi} from '../../Api';

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
    yield put({type: PROFILE_MATCH_FAIL, data: {msg: 'NET ERROR'}});
  }
}
export function* watchProfileMatch() {
  yield takeLatest(PROFILE_MATCH, profileMatch);
}
