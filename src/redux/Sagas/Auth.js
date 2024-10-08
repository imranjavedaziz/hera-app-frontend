import {
  AUTH_LOG_IN,
  AUTH_LOG_IN_SUCCESS,
  AUTH_LOG_IN_FAIL,
  AUTH_MOBILE_NUMBER,
  AUTH_MOBILE_NUMBER_SUCCESS,
  AUTH_MOBILE_NUMBER_FAIL,
  AUTH_VERIFY_OTP,
  AUTH_VERIFY_OTP_SUCCESS,
  AUTH_VERIFY_OTP_FAIL,
  AUTH_LOG_OUT,
  AUTH_LOG_OUT_FAIL,
  AUTH_LOG_OUT_SUCCESS,
  UPDATE_PROFILE_IMG,
  UPDATE_PROFILE_IMG_SUCCESS,
  UPDATE_PROFILE_IMG_FAIL,
  DEVICE_REGISTER,
  DEVICE_REGISTER_FAIL,
  DEVICE_REGISTER_SUCCESS,
} from '../Type';

import {takeLatest, put} from 'redux-saga/effects';
import {
  loginInApi,
  mobileNumberApi,
  verifyOtpApi,
  logOutApi,
  updateProfileImgApi,
  deviceRegisterApi,
} from '../../Api';
import {HttpStatus} from '../../constants/Constants';
import {showAppLoader, hideAppLoader} from '../actions/loader';
import {ValidationMessages} from '../../constants/Strings';
//LogIn
function* logIn(payload) {
  try {
    const result = yield loginInApi(payload.data);
    if (result?.data?.data?.access_token) {
      yield put({type: AUTH_LOG_IN_SUCCESS, data: result});
    } else {
      yield put({type: AUTH_LOG_IN_FAIL, data: {msg: result.data.message}});
    }
  } catch (err) {
    yield put({
      type: AUTH_LOG_IN_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchLogIn() {
  yield takeLatest(AUTH_LOG_IN, logIn);
}

//DEVICE REGISTER
function* deviceRegister(payload) {
  try {
    const result = yield deviceRegisterApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: DEVICE_REGISTER_SUCCESS, data: result});
    } else {
      yield put({type: DEVICE_REGISTER_FAIL, data: {msg: result.data.message}});
    }
  } catch (err) {
    yield put({
      type: DEVICE_REGISTER_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchdeviceRegister() {
  yield takeLatest(DEVICE_REGISTER, deviceRegister);
}

// mobile Number Registration
function* mobileNumber(payload) {
  yield put(showAppLoader());
  try {
    const result = yield mobileNumberApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: AUTH_MOBILE_NUMBER_SUCCESS, data: result});
    } else {
      yield put({
        type: AUTH_MOBILE_NUMBER_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({
      type: AUTH_MOBILE_NUMBER_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  } finally {
    yield put(hideAppLoader());
  }
}
export function* watchMobileNumber() {
  yield takeLatest(AUTH_MOBILE_NUMBER, mobileNumber);
}

// verify otp
function* verifyOtp(payload) {
  try {
    const result = yield verifyOtpApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: AUTH_VERIFY_OTP_SUCCESS, data: result});
    } else {
      yield put({
        type: AUTH_VERIFY_OTP_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({
      type: AUTH_VERIFY_OTP_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchVerifyOtp() {
  yield takeLatest(AUTH_VERIFY_OTP, verifyOtp);
}

function* logOut(payload) {
  try {
    const result = yield logOutApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: AUTH_LOG_OUT_SUCCESS, data: result});
    } else {
      yield put({
        type: AUTH_LOG_OUT_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({
      type: AUTH_LOG_OUT_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchLogOutApi() {
  yield takeLatest(AUTH_LOG_OUT, logOut);
}
// UPDATE PROFILE IMG

function* updateProfileImg(payload) {
  try {
    const result = yield updateProfileImgApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: UPDATE_PROFILE_IMG_SUCCESS, data: result});
    } else {
      yield put({
        type: UPDATE_PROFILE_IMG_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({
      type: UPDATE_PROFILE_IMG_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchupdateProfileImg() {
  yield takeLatest(UPDATE_PROFILE_IMG, updateProfileImg);
}
