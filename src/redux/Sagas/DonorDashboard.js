import {DonorDashboardApi} from '../../Api';
import {HttpStatus} from '../../constants/Constants';
import {
  DONOR_DASHBOARD,
  DONOR_DASHBOARD_FAIL,
  DONOR_DASHBOARD_SUCCESS,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';
import {ValidationMessages} from '../../constants/Strings';
function* getDonorDashboard(payload) {
  try {
    const result = yield DonorDashboardApi(payload);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: DONOR_DASHBOARD_SUCCESS, data: result.data});
    } else {
      yield put({
        type: DONOR_DASHBOARD_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({
      type: DONOR_DASHBOARD_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchGetDonorDashboard() {
  yield takeLatest(DONOR_DASHBOARD, getDonorDashboard);
}
