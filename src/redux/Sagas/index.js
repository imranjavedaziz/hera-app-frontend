import {all, fork} from 'redux-saga/effects';
import {
  watchLogIn,
  watchMobileNumber,
  watchVerifyOtp,
  watchLogOutApi,
} from './Auth';
import {watchGetUserGallery} from './CreateGallery';
import {watchGetPtbDashboard} from './PtbDashboard';

import {
  watchPtbRegisterApi,
  watchSaveBasicDetail,
  watchGetStates,
  watchGetProfileSetter,
} from './Register';

export default function* rootSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchGetUserGallery),
    fork(watchMobileNumber),
    fork(watchVerifyOtp),
    fork(watchLogOutApi),
    fork(watchPtbRegisterApi),
    fork(watchSaveBasicDetail),
    fork(watchGetStates),
    fork(watchGetProfileSetter),
    fork(watchGetPtbDashboard),
  ]);
}
