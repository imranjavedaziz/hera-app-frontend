import {HttpStatus} from '../../constants/Constants';
import {
  SUPPORT_FORM,
  SUPPORT_FORM_FAIL,
  SUPPORT_FORM_SUCCESS,
  GET_USER_TYPE,
  GET_USER_TYPE_FAIL,
  GET_USER_TYPE_SUCCESS,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';
import {supportApi, userTypeApi} from '../../Api';

function* SupportForm(payload) {
  try {
    const result = yield supportApi(payload.data);
    console.log(result, 'result');
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: SUPPORT_FORM_SUCCESS, data: result});
    } else {
      yield put({
        type: SUPPORT_FORM_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({type: SUPPORT_FORM_FAIL, data: {msg: 'NET ERROR'}});
  }
}
export function* watchSupportForm() {
  yield takeLatest(SUPPORT_FORM, SupportForm);
}

function* UserType() {
  try {
    const result = yield userTypeApi();
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: GET_USER_TYPE_SUCCESS, data: result});
    } else {
      yield put({
        type: GET_USER_TYPE_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({type: GET_USER_TYPE_FAIL, data: {msg: 'NET ERROR'}});
  }
}
export function* watchUserType() {
  yield takeLatest(GET_USER_TYPE, UserType);
}
