import { all, fork } from 'redux-saga/effects';
import {
  watchLogIn,
  watchMobileNumber,
  watchVerifyOtp,
  watchLogOutApi,
  watchupdateProfileImg,
  watchdeviceRegister,
} from './Auth';
import {
  watchPtbRegisterApi,
  watchSaveBasicDetail,
  watchGetStates,
  watchGetProfileSetter,
} from './Register';
import { watchSavePreferenceRes, watchsetPreference } from './SetPreference';
import { watchGetUserGallery, watchDeleteUserGallery } from './CreateGallery';
import { watchGetPtbDashboard } from './PtbDashboard';
import { watchSetAttribute, watchSaveAttributeRes } from './SetAttribute';
import { watchGetDonorDashboard } from './DonorDashboard';
import { watchGetPtbProfileDetail, watchsendLikePtb } from './PtbProfileDetail';
import { watchSmDonorDetail } from './SmDonerDetail';
import { watchSupportForm, watchUserType } from './Support';
import { watchCreateSubscription } from './Subscription';
import {watchProfileMatch} from './Profile_Match';

export default function* rootSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchdeviceRegister),
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
    fork(watchSmDonorDetail),
    fork(watchupdateProfileImg),
    fork(watchSavePreferenceRes),
    fork(watchsendLikePtb),
    fork(watchSupportForm),
    fork(watchUserType),
    fork(watchCreateSubscription),
    fork(watchProfileMatch),
  ]);
}
