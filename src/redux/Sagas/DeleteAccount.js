import {deleteAccountApi} from '../../Api';
import {
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_FAIL,
  DELETE_ACCOUNT_SUCCESS,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';
import {HttpStatus} from '../../constants/Constants';
import {ValidationMessages} from '../../constants/Strings'
// Delete Account
function* deleteAccount(payload) {
  try {
    const result = yield deleteAccountApi(payload.data);
    console.log('result>>>', result);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: DELETE_ACCOUNT_SUCCESS, data: result});
    } else {
      yield put({
        type: DELETE_ACCOUNT_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({type: DELETE_ACCOUNT_FAIL, data: {msg: ValidationMessages.NO_INTERNET_CONNECTION}});
  }
}
export function* watchDeleteAccount() {
  yield takeLatest(DELETE_ACCOUNT, deleteAccount);
}
