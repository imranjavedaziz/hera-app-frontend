import {takeLatest, put, call} from 'redux-saga/effects';
import {
  BANK_UPDATE,
  BANK_UPDATE_FAIL,
  BANK_UPDATE_SUCCESS,
  KYC_UPDATE,
} from '../Type';
import {bankUpdateApi, kycUpdateApi} from '../../Api/KycUpdate';
import {HttpStatus} from '../../constants/Constants';
import {ValidationMessages} from '../../constants/Strings';

function* kycUpdate(action) {
  const {data} = action;
  try {
    const result = yield kycUpdateApi(data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({
        type: KYC_UPDATE.SUCCESS,
        data: result.data?.message,
      });
    } else {
      yield put({
        type: KYC_UPDATE.FAIL,
        data: {msg: result},
      });
    }
  } catch (err) {
    yield put({
      type: KYC_UPDATE.FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
  yield put({
    type: KYC_UPDATE.END,
  });
}

export default function* kycUpdateWatcher() {
  yield takeLatest(KYC_UPDATE.KYC_UPDATE_API, kycUpdate);
}
function* bankUpdate(payload) {
  try {
    const result = yield bankUpdateApi(payload.data);

    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({
        type: BANK_UPDATE_SUCCESS,
        data: result.data?.message,
      });
    } else {
      yield put({
        type: BANK_UPDATE_FAIL,
        data: {msg: result.data},
      });
    }
  } catch (err) {
    yield put({
      type: BANK_UPDATE_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchBankUpdate() {
  yield takeLatest(BANK_UPDATE, bankUpdate);
}
