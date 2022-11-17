import {
  FEEDBACK_CHAT,
  FEEDBACK_CHAT_SUCCESS,
  FEEDBACK_CHAT_FAIL,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';
import {HttpStatus} from '../../constants/Constants';
import {chatFeedback} from '../../Api/Chat'
//GetFeedback
function* getFeedback(data) {
  console.log(data,'data')
  try {
    const result = yield chatFeedback(data.payload);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      console.log(result.data.message,'result:::::::')
      yield put({type: FEEDBACK_CHAT_SUCCESS, data: result.data.message});
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
