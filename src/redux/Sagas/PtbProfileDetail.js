import {PtbProfileDetailApi} from '../../Api';
import {HttpStatus} from '../../constants/Constants';
import {
  PTB_PROFILE_DETAIL,
  PTB_PROFILE_DETAI_SUCCESS,
  PTB_PROFILE_DETAI_FAIL,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';
function* getPtbProfileDetail(payload) {
  try {
    const result = yield PtbProfileDetailApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: PTB_PROFILE_DETAI_SUCCESS, data: result});
    } else {
      yield put({
        type: PTB_PROFILE_DETAI_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({type: PTB_PROFILE_DETAI_FAIL, data: {msg: 'NET ERROR'}});
  }
}
export function* watchGetPtbProfileDetail() {
  yield takeLatest(PTB_PROFILE_DETAIL, getPtbProfileDetail);
}
