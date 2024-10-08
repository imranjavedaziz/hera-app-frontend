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

import {
  watchgetPreference,
  watchSavePreferenceRes,
  watchsetPreference,
} from './SetPreference';
import {watchGetUserGallery, watchDeleteUserGallery} from './CreateGallery';
import {watchGetPtbDashboard} from './PtbDashboard';
import {
  watchSetAttribute,
  watchSaveAttributeRes,
  watchGetUserAttribute,
} from './SetAttribute';
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
import {watchVerifyMail, watchSendMailVerification} from './VerificationMail';
import {watchGetEditProfile, watchUpdateEditProfile, watchUpdateNotification} from './Edit_profile';
import {
  watchDeactivateAccount,
  watchGetDeactivateReason,
} from './DeactivateAccount';
import {watchReportUser} from './ReportUser';

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
    fork(watchVerifyMail),
    fork(watchSendMailVerification),
    fork(watchGetEditProfile),
    fork(watchUpdateEditProfile),
    fork(watchgetPreference),
    fork(watchDeactivateAccount),
    fork(watchGetDeactivateReason),
    fork(watchGetUserAttribute),
    fork(watchReportUser),
    fork(watchUpdateNotification),
  ]);
}
