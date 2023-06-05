import {
  FEEDBACK_CHAT,
  FEEDBACK_CHAT_SUCCESS,
  FEEDBACK_CHAT_FAIL,
  PUSH_NOTIFICATION,
  PUSH_NOTIFICATION_FAIL,
  PUSH_NOTIFICATION_SUCCESS,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';
import {HttpStatus} from '../../constants/Constants';
import {chatFeedback, pushNotification} from '../../Api/Chat';
import {ValidationMessages} from '../../constants/Strings'
//GetFeedback
function* getFeedback(data) {
  try {
    const result = yield chatFeedback(data.payload);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: FEEDBACK_CHAT_SUCCESS, data: result.data.message});
    } else {
      yield put({type: FEEDBACK_CHAT_FAIL, data: {msg: result.data.message}});
    }
  } catch (err) {
    yield put({
      type: FEEDBACK_CHAT_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchGetFeedback() {
  yield takeLatest(FEEDBACK_CHAT, getFeedback);
}
//sendNotification
function* sendNotification(data) {
  try {
    const result = yield pushNotification(data.payload);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: PUSH_NOTIFICATION_SUCCESS, data: result.data.message});
    } else {
      yield put({
        type: PUSH_NOTIFICATION_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({
      type: PUSH_NOTIFICATION_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchGetSendNotification() {
  yield takeLatest(PUSH_NOTIFICATION, sendNotification);
}
