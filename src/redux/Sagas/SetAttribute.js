import {HttpStatus} from '../../constants/Constants';
import {
  GET_ATTRIBUTE,
  GET_ATTRIBUTE_FAIL,
  GET_ATTRIBUTE_SUCCESS,
  SAVE_ATTRIBUTE,
  SAVE_ATTRIBUTE_FAIL,
  SAVE_ATTRIBUTE_SUCCESS,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';
import {getAttributes, saveAttributes} from '../../Api/SetAttribute';
function* SetAttributeRes() {
  try {
    const result = yield getAttributes();
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: GET_ATTRIBUTE_SUCCESS, data: result});
    } else {
      yield put({
        type: GET_ATTRIBUTE_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({type: GET_ATTRIBUTE_FAIL, data: {msg: 'NET ERROR'}});
  }
}
export function* watchSetAttribute() {
  yield takeLatest(GET_ATTRIBUTE, SetAttributeRes);
}

function* SaveAttributeRes(payload) {
  try {
    const result = yield saveAttributes(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: SAVE_ATTRIBUTE_SUCCESS, data: result});
    } else {
      yield put({
        type: SAVE_ATTRIBUTE_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({type: SAVE_ATTRIBUTE_FAIL, data: {msg: 'NET ERROR'}});
  }
}
export function* watchSaveAttributeRes() {
  yield takeLatest(SAVE_ATTRIBUTE, SaveAttributeRes);
}
