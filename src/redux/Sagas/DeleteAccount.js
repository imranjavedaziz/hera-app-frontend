import {deleteAccountApi} from '../../Api';
import {
  ACCOUNT_STATUS_CLEAN,
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_FAIL,
  DELETE_ACCOUNT_SUCCESS,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';
import {HttpStatus} from '../../constants/Constants';
import {ValidationMessages} from '../../constants/Strings';
import {GET_BANK_LIST, GET_CARD_LIST} from '../actions/stripe.action';
// Delete Account
function* deleteAccount(payload) {
  try {
    const result = yield deleteAccountApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: DELETE_ACCOUNT_SUCCESS, data: result});
      yield put({type: GET_CARD_LIST.CLEAN});
      yield put({type: GET_BANK_LIST.CLEAN});
      yield put({type: ACCOUNT_STATUS_CLEAN});
    } else {
      yield put({
        type: DELETE_ACCOUNT_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({
      type: DELETE_ACCOUNT_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchDeleteAccount() {
  yield takeLatest(DELETE_ACCOUNT, deleteAccount);
}
