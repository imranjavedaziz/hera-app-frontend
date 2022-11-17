import {
  FEEDBACK_CHAT,
  FEEDBACK_CHAT_SUCCESS,
  FEEDBACK_CHAT_FAIL,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';
import {HttpStatus} from '../../constants/Constants';
import {chatFeedback} from '../../Api/Chat'
//GetFeedback
function* getFeedback() {
  try {
    const result = yield chatFeedback();
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: FEEDBACK_CHAT_SUCCESS, data: result});
    } else {
      yield put({type: FEEDBACK_CHAT_FAIL, data: {msg: result.data.message}});
    }
  } catch (err) {
    yield put({type: FEEDBACK_CHAT_FAIL, data: {msg: 'NET ERROR'}});
  }
}
export function* watchGetFeedback() {
  yield takeLatest(FEEDBACK_CHAT, getFeedback);
}
