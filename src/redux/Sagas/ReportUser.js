import {REPORT_USER, REPORT_USER_FAIL, REPORT_USER_SUCCESS} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';

import {HttpStatus} from '../../constants/Constants';
import {ReportUserApi} from '../../Api';

//Report User
function* ReportUser(payload) {
  try {
    const result = yield ReportUserApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: REPORT_USER_SUCCESS, data: result});
    } else {
      yield put({
        type: REPORT_USER_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({
      type: REPORT_USER_FAIL,
      data: {msg: 'Seems like there is no internet connection.'},
    });
  }
}
export function* watchReportUser() {
  yield takeLatest(REPORT_USER, ReportUser);
}
