import {HttpStatus} from '../../constants/Constants';
import {
  DEACTIVATE_ACCOUNT,
  DEACTIVATE_ACCOUNT_SUCCESS,
  DEACTIVATE_ACCOUNT_FAIL,
  REASONS_LIST_DEACTIVATE,
  REASONS_LIST_FAIL,
  REASONS_LIST_SUCCESS,
  ACCOUNT_STATUS_CLEAN,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';
import {
  deactivateAccountApi,
  getDeactivateReasonApi,
} from '../../Api/DeactivateAccount';
import {ValidationMessages} from '../../constants/Strings';
import {GET_BANK_LIST, GET_CARD_LIST} from '../actions/stripe.action';

function* DeactivateAccount(payload) {
  try {
    const result = yield deactivateAccountApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: DEACTIVATE_ACCOUNT_SUCCESS, data: result});
      yield put({type: GET_CARD_LIST.CLEAN});
      yield put({type: GET_BANK_LIST.CLEAN});
      yield put({type: ACCOUNT_STATUS_CLEAN});
    } else {
      yield put({
        type: DEACTIVATE_ACCOUNT_FAIL,
        data: {msg: result?.phone_no},
      });
    }
  } catch (err) {
    yield put({
      type: DEACTIVATE_ACCOUNT_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchDeactivateAccount() {
  yield takeLatest(DEACTIVATE_ACCOUNT, DeactivateAccount);
}

function* GetDeactivateReason(payload) {
  try {
    const result = yield getDeactivateReasonApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: REASONS_LIST_SUCCESS, data: result});
    } else {
      yield put({
        type: REASONS_LIST_FAIL,
        data: {msg: result?.phone_no},
      });
    }
  } catch (err) {
    yield put({
      type: REASONS_LIST_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchGetDeactivateReason() {
  yield takeLatest(REASONS_LIST_DEACTIVATE, GetDeactivateReason);
}
