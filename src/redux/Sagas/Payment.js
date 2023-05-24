import {
  GetMatchListApi,
  GetPaymentRequestListApi,
  UpdateRequestStatus,
  GetPaymentHistoryApi,
  paymentTransferApi,
  GetMatchListPageApi,
  GetPaymentRequestPageApi,
} from '../../Api';
import {HttpStatus} from '../../constants/Constants';
import {
  GET_MATCH_LIST,
  GET_MATCH_LIST_FAIL,
  GET_MATCH_LIST_SUCCESS,
  GET_PAYMENT_REQUEST_FAIL,
  GET_PAYMENT_REQUEST_LIST,
  GET_PAYMENT_REQUEST_SUCCESS,
  PAYMENT_TRANSFER,
  PAYMENT_TRANSFER_FAIL,
  PAYMENT_TRANSFER_SUCCESS,
  UPDATE_REQUEST_STATUS,
  UPDATE_REQUEST_STATUS_FAIL,
  UPDATE_REQUEST_STATUS_SUCCESS,
  TRANSACTION_HISTORY,
  TRANSACTION_HISTORY_FAIL,
  TRANSACTION_HISTORY_SUCCESS,
  TRANSACTION_HISTORY_PAGE,
  TRANSACTION_HISTORY_PAGE_FAIL,
  TRANSACTION_HISTORY_PAGE_SUCCESS,
  GET_MATCH_LIST_PAGE,
  GET_MATCH_LIST_PAGE_FAIL,
  GET_MATCH_LIST_PAGE_SUCCESS,
  GET_PAYMENT_REQUEST_PAGES,
  GET_PAYMENT_REQUEST_PAGES_FAIL,
  GET_PAYMENT_REQUEST_PAGES_SUCCESS,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';
import {ValidationMessages} from '../../constants/Strings';
import {store} from '../store';
import {hideEditLoader, showEditAppLoader} from '../actions/loader';

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

function* getPaymentHistory() {
  try {
    yield put(showEditAppLoader());
    const result = yield GetPaymentHistoryApi();
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: TRANSACTION_HISTORY_SUCCESS, data: result.data?.data});
    } else {
      yield put({
        type: TRANSACTION_HISTORY_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({
      type: TRANSACTION_HISTORY_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  } finally {
    yield put(hideEditLoader());
  }
}
export function* watchPaymentHistory() {
  yield takeLatest(TRANSACTION_HISTORY, getPaymentHistory);
}

function* paymentTransfer(payload) {
  try {
    console.log('paymentTransfer', JSON.stringify(payload));
    const result = yield paymentTransferApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({
        type: PAYMENT_TRANSFER_SUCCESS,
        data: result.data?.data,
      });
    } else {
      yield put({
        type: PAYMENT_TRANSFER_FAIL,
        data: {msg: result.data?.message},
      });
    }
  } catch (err) {
    yield put({
      type: PAYMENT_TRANSFER_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchPaymentTransfer() {
  yield takeLatest(PAYMENT_TRANSFER, paymentTransfer);
}

function* getPaymentHistoryPage() {
  try {
    const payment_history_res = store.getState().Payment.payment_history_res;
    const result = yield GetPaymentHistoryApi(
      payment_history_res.current_page + 1,
    );
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({
        type: TRANSACTION_HISTORY_PAGE_SUCCESS,
        data: result.data?.data,
      });
    } else {
      yield put({
        type: TRANSACTION_HISTORY_PAGE_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({
      type: TRANSACTION_HISTORY_PAGE_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchPaymentHistoryPage() {
  yield takeLatest(TRANSACTION_HISTORY_PAGE, getPaymentHistoryPage);
}
function* getMatchListPage() {
  try {
    const get_match_list_res = store.getState().Payment.get_match_list_res;
    const result = yield GetMatchListPageApi(
      get_match_list_res.data.current_page + 1,
    );
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: GET_MATCH_LIST_PAGE_SUCCESS, data: result.data?.data});
    } else {
      yield put({
        type: GET_MATCH_LIST_PAGE_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({
      type: GET_MATCH_LIST_PAGE_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchGetMatchListPage() {
  yield takeLatest(GET_MATCH_LIST_PAGE, getMatchListPage);
}
function* getPaymentRequestPage() {
  try {
    const get_payment_request_list_res =
      store.getState().Payment.get_payment_request_list_res;
    const result = yield GetPaymentRequestPageApi(
      get_payment_request_list_res.current_page + 1,
    );
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({
        type: GET_PAYMENT_REQUEST_PAGES_SUCCESS,
        data: result.data?.data?.data,
      });
    } else {
      yield put({
        type: GET_PAYMENT_REQUEST_PAGES_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({
      type: GET_PAYMENT_REQUEST_PAGES_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchGetPaymentRequestPage() {
  yield takeLatest(GET_PAYMENT_REQUEST_PAGES, getPaymentRequestPage);
}
