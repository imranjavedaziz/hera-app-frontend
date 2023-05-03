import {takeLatest, put, call} from 'redux-saga/effects';
import {KYC_UPDATE} from '../Type';
import {kycUpdateApi} from '../../Api/KycUpdate';

function* kycUpdate(action) {
  console.log('requestVerification--saga');
  const {data} = action;
  try {
    yield put({
      type: KYC_UPDATE.START,
    });
    const response = yield call(kycUpdateApi, data);
    yield put({
      type: KYC_UPDATE.SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: KYC_UPDATE.FAIL,
      payload: error?.data ?? error,
    });
  }
  yield put({
    type: KYC_UPDATE.END,
  });
}

export default function* kycUpdateWatcher() {
  yield takeLatest(KYC_UPDATE.KYC_UPDATE_API, kycUpdate);
}
