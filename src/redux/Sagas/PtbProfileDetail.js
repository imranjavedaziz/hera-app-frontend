import {PtbProfileDetailApi, ptbSendLike} from '../../Api';
import {HttpStatus} from '../../constants/Constants';
import {
  PTB_PROFILE_DETAIL,
  PTB_PROFILE_DETAI_SUCCESS,
  PTB_PROFILE_DETAI_FAIL,
  SEND_LIKE_PTB,
  SEND_LIKE_PTB_SUCCESS,
  SEND_LIKE_PTB_FAIL,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';
import {ValidationMessages} from '../../constants/Strings'
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
    yield put({type: PTB_PROFILE_DETAI_FAIL, data: {msg: ValidationMessages.NO_INTERNET_CONNECTION}});
  }
}
export function* watchGetPtbProfileDetail() {
  yield takeLatest(PTB_PROFILE_DETAIL, getPtbProfileDetail);
}
function* sendLikePtb(payload) {
  try {
    const result = yield ptbSendLike(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: SEND_LIKE_PTB_SUCCESS, data: result});
    } else {
      yield put({
        type: SEND_LIKE_PTB_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({type: SEND_LIKE_PTB_FAIL, data: {msg: ValidationMessages.NO_INTERNET_CONNECTION}});
  }
}
export function* watchsendLikePtb() {
  yield takeLatest(SEND_LIKE_PTB, sendLikePtb);
}
