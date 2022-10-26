import {setPreferenceApi} from '../../Api';
import {HttpStatus} from '../../constants/Constants';
import {
  SET_PREFERENCE,
  SET_PREFERENCE_FAIL,
  SET_PREFERENCE_SUCCESS,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';
function* SetPreferenceRes() {
  try {
    const result = yield setPreferenceApi();
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: SET_PREFERENCE_SUCCESS, data: result});
    } else {
      yield put({
        type: SET_PREFERENCE_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({type: SET_PREFERENCE_FAIL, data: {msg: 'NET ERROR'}});
  }
}
export function* watchsetPreference() {
  yield takeLatest(SET_PREFERENCE, SetPreferenceRes);
}
