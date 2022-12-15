import {
  GET_USER_DETAIL,
  GET_USER_DETAIL_FAIL,
  GET_USER_DETAIL_SUCCESS,
  UPDATE_USER_DETAIL,
  UPDATE_USER_DETAIL_FAIL,
  UPDATE_USER_DETAIL_SUCCESS,
  TOGGLE_NOTIFICATION,
  TOGGLE_NOTIFICATION_FAIL,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';
import {showAppToast, hideAppLoader} from '../actions/loader';
import {HttpStatus} from '../../constants/Constants';
import {
  getEditProfileApi,
  updateEditProfileApi,
  toggleNotificationApi,
} from '../../Api';
import {ValidationMessages} from '../../constants/Strings';

//GetUserGallery
function* getEditProfile() {
  try {
    const result = yield getEditProfileApi();
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: GET_USER_DETAIL_SUCCESS, data: result});
    } else {
      yield put({type: GET_USER_DETAIL_FAIL, data: {msg: result.data.message}});
    }
  } catch (err) {
    yield put({
      type: GET_USER_DETAIL_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchGetEditProfile() {
  yield takeLatest(GET_USER_DETAIL, getEditProfile);
}

//DeleteGallery
function* updateEditProfile(payload) {
  try {
    const result = yield updateEditProfileApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: UPDATE_USER_DETAIL_SUCCESS, data: result});
    } else {
      yield put({
        type: UPDATE_USER_DETAIL_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({
      type: UPDATE_USER_DETAIL_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchUpdateEditProfile() {
  yield takeLatest(UPDATE_USER_DETAIL, updateEditProfile);
}
// Toggle Notification
function* updateNotification(payload) {
  try {
    const result = yield toggleNotificationApi(payload.data);
    yield put(hideAppLoader());
    if (result?.status !== HttpStatus.SUCCESS_REQUEST) {
      yield put({
        type: TOGGLE_NOTIFICATION_FAIL,
        data: !payload.data.notify_status,
      });
    } else {
      yield put(showAppToast(false, result.data.message));
    }
  } catch (err) {
    yield put(hideAppLoader());
    yield put({
      type: TOGGLE_NOTIFICATION_FAIL,
      data: !payload.data.notify_status,
    });
  }
}
export function* watchUpdateNotification() {
  yield takeLatest(TOGGLE_NOTIFICATION, updateNotification);
}
