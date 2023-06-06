import {PtbDashboardApi} from '../../Api';
import {HttpStatus} from '../../constants/Constants';
import {
  PTB_DASHBOARD,
  PTB_DASHBOARD_FAIL,
  PTB_DASHBOARD_SUCCESS,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';
import {ValidationMessages} from '../../constants/Strings';
function* getPtbDashboard() {
  try {
    const result = yield PtbDashboardApi();
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: PTB_DASHBOARD_SUCCESS, data: result});
    } else {
      yield put({
        type: PTB_DASHBOARD_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({
      type: PTB_DASHBOARD_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchGetPtbDashboard() {
  yield takeLatest(PTB_DASHBOARD, getPtbDashboard);
}
