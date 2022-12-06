import {
  VERIFY_MAIL,
  VERIFY_MAIL_SUCCESS,
  VERIFY_MAIL_FAIL,
  SEND_VERIFICATION_MAIL,
  SEND_VERIFICATION_MAIL_SUCCESS,
  SEND_VERIFICATION_MAIL_FAIL,
} from '../Type';

import {takeLatest, put} from 'redux-saga/effects';
import {verifyEmail, sendVerificationMail} from '../../Api';

//Verify Mail
function* verifyMail(payload) {
  try {
    const result = yield verifyEmail(payload.data);
    if (result?.data?.message) {
      yield put({type: VERIFY_MAIL_SUCCESS, data: result});
    } else {
      yield put({type: VERIFY_MAIL_FAIL, data: {msg: result.code}});
    }
  } catch (err) {
    yield put({type: VERIFY_MAIL_FAIL, data: {msg: 'Invalid OTP.'}});
  }
}
export function* watchVerifyMail() {
  yield takeLatest(VERIFY_MAIL, verifyMail);
}

//Send Email Verification
function* sendMailVerification() {
  try {
    const result = yield sendVerificationMail();
    if (result?.data?.data) {
      yield put({type: SEND_VERIFICATION_MAIL_SUCCESS, data: result});
    } else {
      yield put({
        type: SEND_VERIFICATION_MAIL_FAIL,
        data: {msg: result.data.message},
      });
    }
  } catch (err) {
    yield put({type: SEND_VERIFICATION_MAIL_FAIL, data: {msg: 'NET ERROR'}});
  }
}
export function* watchSendMailVerification() {
  yield takeLatest(SEND_VERIFICATION_MAIL, sendMailVerification);
}
