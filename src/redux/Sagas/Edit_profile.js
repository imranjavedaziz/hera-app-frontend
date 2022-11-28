import {
  GET_USER_DETAIL,
  GET_USER_DETAIL_FAIL,
  GET_USER_DETAIL_SUCCESS,
  UPDATE_USER_DETAIL,
  UPDATE_USER_DETAIL_FAIL,
  UPDATE_USER_DETAIL_SUCCESS,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';

import {HttpStatus} from '../../constants/Constants';
import {getEditProfileApi, updateEditProfileApi} from '../../Api';

//GetUserGallery
function* getEditProfile() {
  try {
    const result = yield getEditProfileApi();
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: GET_USER_DETAIL_SUCCESS, data: result});
    } else {
      yield put({type: GET_USER_DETAIL_FAIL, data: {msg: result.data.message}});
    }
  } catch (err) {
    yield put({type: GET_USER_DETAIL_FAIL, data: {msg: 'NET ERROR'}});
  }
}
export function* watchGetEditProfile() {
  yield takeLatest(GET_USER_DETAIL, getEditProfile);
}

//DeleteGallery
function* updateEditProfile(payload) {
  try {
    const result = yield updateEditProfileApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: UPDATE_USER_DETAIL_SUCCESS, data: result});
    } else {
      yield put({
        type: UPDATE_USER_DETAIL_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({type: UPDATE_USER_DETAIL_FAIL, data: {msg: 'NET ERROR'}});
  }
}
export function* watchUpdateEditProfile() {
  yield takeLatest(UPDATE_USER_DETAIL, updateEditProfile);
}
