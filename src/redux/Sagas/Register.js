import {
  AUTH_REGISTER,
  AUTH_REGISTER_FAIL,
  AUTH_REGISTER_SUCCESS,
  SAVE_BASIC_DETAIL,
  SAVE_BASIC_DETAIL_FAIL,
  SAVE_BASIC_DETAIL_SUCCESS,
  GET_STATES_DETAIL,
  GET_STATES_FAIL,
  GET_STATES_SUCCESS,
  GET_PROFILE_SETTER_DETAIL,
  GET_PROFILE_SETTER_FAIL,
  GET_PROFILE_SETTER_SUCCESS, GET_SEXUAL_ORIENTATION, GET_SEXUAL_ORIENTATION_FAIL, GET_SEXUAL_ORIENTATION_SUCCESS,
} from "../Type";

import {takeLatest, put} from 'redux-saga/effects';
import {
  ptbRegisterApi,
  saveBasicDetailApi,
  getStateApi,
  getProfileSetterApi,
} from '../../Api';
import {HttpStatus} from '../../constants/Constants';

function* ptbRegister(payload) {
  try {
    const result = yield ptbRegisterApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: AUTH_REGISTER_SUCCESS, data: result});
    } else {
      yield put({
        type: AUTH_REGISTER_FAIL,
        data: {msg: result.email?.join('\n')},
      });
    }
  } catch (err) {
    yield put({type: AUTH_REGISTER_FAIL, data: {msg: err.email?.join('\n')}});
  }
}
export function* watchPtbRegisterApi() {
  yield takeLatest(AUTH_REGISTER, ptbRegister);
}

//SaveBasicDetail
function* saveBasicDetail(payload) {
  console.log(payload, "payload:::::::");
  try {
    const result = yield saveBasicDetailApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: SAVE_BASIC_DETAIL_SUCCESS, data: result});
    } else {
      yield put({
        type: SAVE_BASIC_DETAIL_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({type: SAVE_BASIC_DETAIL_FAIL, data: {msg: 'NET ERROR'}});
  }
}
export function* watchSaveBasicDetail() {
  yield takeLatest(SAVE_BASIC_DETAIL, saveBasicDetail);
}

//GetStates
function* getStates() {
  try {
    const result = yield getStateApi();
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: GET_STATES_SUCCESS, data: result?.data?.data});
    } else {
      yield put({type: GET_STATES_FAIL, data: {msg: result.data.message}});
    }
  } catch (err) {
    yield put({type: GET_STATES_FAIL, data: {msg: 'NET ERROR'}});
  }
}
export function* watchGetStates() {
  yield takeLatest(GET_STATES_DETAIL, getStates);
}

//GetProfileSetter
function* getProfileSetterDetail() {
  try {
    const result = yield getProfileSetterApi();
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: GET_PROFILE_SETTER_SUCCESS, data: result?.data?.data});
    } else {
      yield put({
        type: GET_PROFILE_SETTER_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({type: GET_PROFILE_SETTER_FAIL, data: {msg: 'NET ERROR'}});
  }
}
export function* watchGetProfileSetter() {
  yield takeLatest(GET_PROFILE_SETTER_DETAIL, getProfileSetterDetail);
}
