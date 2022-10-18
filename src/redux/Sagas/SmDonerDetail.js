import {SmDonerDetailApi} from '../../Api';
import {HttpStatus} from '../../constants/Constants';
import {
  SM_DONOR_DETAIL,
  SM_DONOR_DETAIL_FAIL,
  SM_DONOR_DETAIL_SUCCESS,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';
function* SmDonerDetail(payload) {
//   console.log('payload', payload);
  try {
    const result = yield SmDonerDetailApi(payload.data);
    // console.log('result???????tttt', result);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: SM_DONOR_DETAIL_SUCCESS, data: result});
    } else {
      yield put({
        type: SM_DONOR_DETAIL_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({type: SM_DONOR_DETAIL_FAIL, data: {msg: 'NET ERROR'}});
  }
}
export function* watchSmDonerDetail() {
  yield takeLatest(SM_DONOR_DETAIL, SmDonerDetail);
}
