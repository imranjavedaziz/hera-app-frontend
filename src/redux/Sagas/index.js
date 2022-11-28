import {all, fork} from 'redux-saga/effects';
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

import {watchSavePreferenceRes, watchsetPreference} from './SetPreference';
import {watchGetUserGallery, watchDeleteUserGallery} from './CreateGallery';
import {watchGetPtbDashboard} from './PtbDashboard';
import {watchSetAttribute, watchSaveAttributeRes} from './SetAttribute';
import {watchGetDonorDashboard} from './DonorDashboard';
import {watchGetPtbProfileDetail, watchsendLikePtb} from './PtbProfileDetail';
import {watchSmDonorDetail} from './SmDonerDetail';
import {watchSupportForm, watchUserType} from './Support';
import {watchpProfileMatchResponse, watchProfileMatch} from './Profile_Match';
import {
  watchCreateSubscription,
  watchSubscriptionPlan,
  watchSubscriptionStatus,
} from './Subscription';
import {watchGetFeedback, watchGetSendNotification} from './Chat';
import {watchDeleteAccount} from './DeleteAccount';
import {watchGetEditProfile, watchUpdateEditProfile} from './Edit_profile';
import { watchDeactivateAccount, watchGetDeactivateReason } from './DeactivateAccount';

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
    fork(watchProfileMatch),
    fork(watchpProfileMatchResponse),
    fork(watchCreateSubscription),
    fork(watchSubscriptionPlan),
    fork(watchSubscriptionStatus),
    fork(watchGetFeedback),
    fork(watchGetSendNotification),
    fork(watchDeleteAccount),
    fork(watchGetEditProfile),
    fork(watchUpdateEditProfile),
    fork(watchDeactivateAccount),
    fork(watchGetDeactivateReason),
  ]);
}
