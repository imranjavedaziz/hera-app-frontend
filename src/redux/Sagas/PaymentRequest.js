import {SendPaymentRequestApi} from '../../Api';
import {HttpStatus} from '../../constants/Constants';
import {
  SEND_PAYMENT_REQUEST,
  SEND_PAYMENT_REQUEST_FAIL,
  SEND_PAYMENT_REQUEST_SUCCESS,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';
import {ValidationMessages} from '../../constants/Strings';
import {showAppToast, showAppLoader, hideAppLoader} from '../actions/loader';

function* sendPaymentRequest(payload) {
  try {
    yield put(showAppLoader());
    const result = yield SendPaymentRequestApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: SEND_PAYMENT_REQUEST_SUCCESS, data: result.data?.data});
      yield put(showAppToast(false, 'Payment Request Sent!'));
    } else {
      yield put({
        type: SEND_PAYMENT_REQUEST_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({
      type: SEND_PAYMENT_REQUEST_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  } finally {
    yield put(hideAppLoader());
  }
}
export function* watchSendPaymentRequest() {
  yield takeLatest(SEND_PAYMENT_REQUEST, sendPaymentRequest);
}
