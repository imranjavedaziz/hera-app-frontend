import {setPreferenceApi, savePreferenceApi, getPreferenceApi} from '../../Api';
import {HttpStatus} from '../../constants/Constants';
import {
  SET_PREFERENCE,
  SET_PREFERENCE_FAIL,
  SET_PREFERENCE_SUCCESS,
  SAVE_PREFERENCE,
  SAVE_PREFERENCE_FAIL,
  SAVE_PREFERENCE_SUCCESS,
  GET_PREFERENCE,
  GET_PREFERENCE_FAIL,
  GET_PREFERENCE_SUCCESS,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';
import {ValidationMessages} from '../../constants/Strings';
import {showAppToast} from '../actions/loader';

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
    yield put({
      type: SET_PREFERENCE_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchsetPreference() {
  yield takeLatest(SET_PREFERENCE, SetPreferenceRes);
}

function* SavePreference(payload) {
  try {
    const result = yield savePreferenceApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: SAVE_PREFERENCE_SUCCESS, data: result});
    } else {
      yield put({
        type: SAVE_PREFERENCE_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({
      type: SAVE_PREFERENCE_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchSavePreferenceRes() {
  yield takeLatest(SAVE_PREFERENCE, SavePreference);
}

function* GetPreferenceRes() {
  try {
    const result = yield getPreferenceApi();
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: GET_PREFERENCE_SUCCESS, data: result});
    } else {
      yield put(showAppToast(true, result.data.message));
      yield put({
        type: GET_PREFERENCE_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put(showAppToast(true, err.message));
    yield put({
      type: GET_PREFERENCE_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchgetPreference() {
  yield takeLatest(GET_PREFERENCE, GetPreferenceRes);
}
