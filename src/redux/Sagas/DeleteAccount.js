import {deleteAccountApi} from '../../Api';
import {
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_FAIL,
  DELETE_ACCOUNT_SUCCESS,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';
import {HttpStatus} from '../../constants/Constants';
// Delete Account
function* deleteAccount(payload) {
  console.log('payload??', payload);
  try {
    const result = yield deleteAccountApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: DELETE_ACCOUNT_SUCCESS, data: result});
    } else {
      yield put({
        type: DELETE_ACCOUNT_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({type: DELETE_ACCOUNT_FAIL, data: {msg: 'NET ERROR'}});
  }
}
export function* watchDeleteAccount() {
  yield takeLatest(DELETE_ACCOUNT, deleteAccount);
}
