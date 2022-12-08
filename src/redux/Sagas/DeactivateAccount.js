import { HttpStatus } from '../../constants/Constants';
import {
  DEACTIVATE_ACCOUNT,
  DEACTIVATE_ACCOUNT_SUCCESS,
  DEACTIVATE_ACCOUNT_FAIL,
  REASONS_LIST_DEACTIVATE,
  REASONS_LIST_FAIL,
  REASONS_LIST_SUCCESS,
} from '../Type';
import { takeLatest, put } from 'redux-saga/effects';
import { deactivateAccountApi ,getDeactivateReasonApi} from '../../Api/DeactivateAccount';
import {ValidationMessages} from '../../constants/Strings'
function* DeactivateAccount(payload) {
  try {
    const result = yield deactivateAccountApi(payload.data);
    console.log('LINE NO 16 SAGA DEACTIVATE_ACCOUNT ', result);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({ type: DEACTIVATE_ACCOUNT_SUCCESS, data: result });
    } else {
      yield put({
        type: DEACTIVATE_ACCOUNT_FAIL,
        data: { msg: result?.phone_no },
      });
    }
  } catch (err) {
    console.log('err', err);
    yield put({ type: DEACTIVATE_ACCOUNT_FAIL, data: {msg: ValidationMessages.NO_INTERNET_CONNECTION } });
  }
}
export function* watchDeactivateAccount() {
  yield takeLatest(DEACTIVATE_ACCOUNT, DeactivateAccount);
}

function* GetDeactivateReason(payload) {
  try {
    const result = yield getDeactivateReasonApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({ type: REASONS_LIST_SUCCESS, data: result });
    } else {
      yield put({
        type: REASONS_LIST_FAIL,
        data: { msg: result?.phone_no },
      });
    }
  } catch (err) {
    console.log('err', err);
    yield put({ type: REASONS_LIST_FAIL, data: {msg: ValidationMessages.NO_INTERNET_CONNECTION} });
  }
}
export function* watchGetDeactivateReason() {
  yield takeLatest(REASONS_LIST_DEACTIVATE, GetDeactivateReason);
}

