import {
  GetMatchListApi,
  GetPaymentRequestListApi,
  UpdateRequestStatus,
} from '../../Api';
import {HttpStatus} from '../../constants/Constants';
import {
  GET_MATCH_LIST,
  GET_MATCH_LIST_FAIL,
  GET_MATCH_LIST_SUCCESS,
  GET_PAYMENT_REQUEST_FAIL,
  GET_PAYMENT_REQUEST_LIST,
  GET_PAYMENT_REQUEST_SUCCESS,
  UPDATE_REQUEST_STATUS,
  UPDATE_REQUEST_STATUS_FAIL,
  UPDATE_REQUEST_STATUS_SUCCESS,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';
import {ValidationMessages} from '../../constants/Strings';
function* getMatchList(payload) {
  try {
    const result = yield GetMatchListApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: GET_MATCH_LIST_SUCCESS, data: result.data?.data});
    } else {
      yield put({
        type: GET_MATCH_LIST_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({
      type: GET_MATCH_LIST_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchGetMatchList() {
  yield takeLatest(GET_MATCH_LIST, getMatchList);
}

function* getPaymentRequestList() {
  try {
    const result = yield GetPaymentRequestListApi();
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: GET_PAYMENT_REQUEST_SUCCESS, data: result.data?.data});
    } else {
      yield put({
        type: GET_PAYMENT_REQUEST_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({
      type: GET_PAYMENT_REQUEST_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchGetPaymentRequestList() {
  yield takeLatest(GET_PAYMENT_REQUEST_LIST, getPaymentRequestList);
}
function* updateRequestStatus(payload) {
  try {
    const result = yield UpdateRequestStatus(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({
        type: UPDATE_REQUEST_STATUS_SUCCESS,
        data: result.data?.message,
      });
    } else {
      yield put({
        type: UPDATE_REQUEST_STATUS_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({
      type: UPDATE_REQUEST_STATUS_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchUpdateRequestStatus() {
  yield takeLatest(UPDATE_REQUEST_STATUS, updateRequestStatus);
}
