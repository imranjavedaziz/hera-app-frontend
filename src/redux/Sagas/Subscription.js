import {HttpStatus} from '../../constants/Constants';
import {
  CREATE_SUBSCRIPTION,
  CREATE_SUBSCRIPTION_SUCCESS,
  CREATE_SUBSCRIPTION_FAIL,
  SUBSCRIPTION_PLAN,
  SUBSCRIPTION_PLAN_SUCCESS,
  SUBSCRIPTION_PLAN_FAIL,
  SUBSCRIPTION_STATUS,
  SUBSCRIPTION_STATUS_SUCCESS,
  SUBSCRIPTION_STATUS_FAIL,
  CANCEL_SUBSCRIPTION,
  CANCEL_SUBSCRIPTION_FAIL,
  CANCEL_SUBSCRIPTION_SUCCESS,
} from '../Type';
import {takeLatest, put} from 'redux-saga/effects';
import {
  createSubscriptionApi,
  subscriptionPlanApi,
  subscriptionStatusApi,
  cancelStripeSubscriptionApi,
} from '../../Api/Subscription';
import {ValidationMessages} from '../../constants/Strings';
function* CreateSubscription(payload) {
  try {
    const result = yield createSubscriptionApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: CREATE_SUBSCRIPTION_SUCCESS, data: result});
    } else {
      yield put({
        type: CREATE_SUBSCRIPTION_FAIL,
        data: {msg: result?.phone_no},
      });
    }
  } catch (err) {
    yield put({
      type: CREATE_SUBSCRIPTION_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchCreateSubscription() {
  yield takeLatest(CREATE_SUBSCRIPTION, CreateSubscription);
}

function* SubscriptionPlan(payload) {
  try {
    const result = yield subscriptionPlanApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: SUBSCRIPTION_PLAN_SUCCESS, data: result});
    } else {
      yield put({
        type: SUBSCRIPTION_PLAN_FAIL,
        data: {msg: result?.phone_no},
      });
    }
  } catch (err) {
    yield put({
      type: SUBSCRIPTION_PLAN_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchSubscriptionPlan() {
  yield takeLatest(SUBSCRIPTION_PLAN, SubscriptionPlan);
}

function* SubscriptionStatus(payload) {
  try {
    const result = yield subscriptionStatusApi(payload.data);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: SUBSCRIPTION_STATUS_SUCCESS, data: result});
    } else {
      yield put({
        type: SUBSCRIPTION_STATUS_FAIL,
        data: {msg: result?.phone_no},
      });
    }
  } catch (err) {
    yield put({
      type: SUBSCRIPTION_STATUS_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchSubscriptionStatus() {
  yield takeLatest(SUBSCRIPTION_STATUS, SubscriptionStatus);
}

function* CancelSubscription() {
  try {
    const result = yield cancelStripeSubscriptionApi();
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({type: CANCEL_SUBSCRIPTION_SUCCESS, data: result});
      yield put({type: SUBSCRIPTION_STATUS, data: null});
    } else {
      yield put({
        type: CANCEL_SUBSCRIPTION_FAIL,
        data: {msg: result?.phone_no},
      });
    }
  } catch (err) {
    yield put({
      type: CANCEL_SUBSCRIPTION_FAIL,
      data: {msg: ValidationMessages.NO_INTERNET_CONNECTION},
    });
  }
}
export function* watchCancelSubscription() {
  yield takeLatest(CANCEL_SUBSCRIPTION, CancelSubscription);
}
