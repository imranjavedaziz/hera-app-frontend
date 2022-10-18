import {all, fork} from 'redux-saga/effects';
import {
  watchLogIn,
  watchMobileNumber,
  watchVerifyOtp,
  watchLogOutApi,
} from './Auth';
import {
  watchPtbRegisterApi,
  watchSaveBasicDetail,
  watchGetStates,
  watchGetProfileSetter,
} from './Register';
import {watchsetPreference} from './SetPreference';
import {watchGetUserGallery} from './CreateGallery';
import {watchGetPtbDashboard} from './PtbDashboard';
import {watchSetAttribute, watchSaveAttributeRes} from './SetAttribute';
import {watchGetDonorDashboard} from './DonorDashboard';
import {watchDeleteUserGallery} from './CreateGallery';
import {watchGetPtbProfileDetail} from './PtbProfileDetail';

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
    fork(watchsetPreference),
    fork(watchSetAttribute),
    fork(watchSaveAttributeRes),
    fork(watchGetDonorDashboard),
    fork(watchDeleteUserGallery),
    fork(watchGetPtbProfileDetail),
  ]);
}
