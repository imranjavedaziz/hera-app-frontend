import {accountStatusApi} from '../../Api';
import {HttpStatus} from '../../constants/Constants';
import {
  ACCOUNT_STATUS,
  ACCOUNT_STATUS_FAIL,
  ACCOUNT_STATUS_SUCCESS,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';
import {ValidationMessages} from '../../constants/Strings';

function* AccountStatus() {
  try {
    const result = yield accountStatusApi();
    console.log(result, 'kokokokokokokokoko');
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: ACCOUNT_STATUS_SUCCESS, data: result});
    } else {
      yield put({
        type: ACCOUNT_STATUS_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({
      type: ACCOUNT_STATUS_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchAccountStatus() {
  yield takeLatest(ACCOUNT_STATUS, AccountStatus);
}
