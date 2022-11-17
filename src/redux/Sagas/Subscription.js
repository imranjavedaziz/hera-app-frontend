import { HttpStatus } from '../../constants/Constants';
import {
  CREATE_SUBSCRIPTION,
  CREATE_SUBSCRIPTION_SUCCESS,
  CREATE_SUBSCRIPTION_FAIL,
  SUBSCRIPTION_PLAN,
  SUBSCRIPTION_PLAN_SUCCESS,
  SUBSCRIPTION_PLAN_FAIL,
  SUBSCRIPTION_STATUS,
  SUBSCRIPTION_STATUS_SUCCESS,
  SUBSCRIPTION_STATUS_FAIL
} from '../Type';
import { takeLatest, put } from 'redux-saga/effects';
import { createSubscriptionApi, subscriptionPlanApi, subscriptionStatusApi } from '../../Api/Subscription';

function* CreateSubscription(payload) {
  try {
    const result = yield createSubscriptionApi(payload.data);
    console.log('LINE NO 14 SAGA CREATE SUBSCRIPTION', result);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({ type: CREATE_SUBSCRIPTION_SUCCESS, data: result });
    } else {
      yield put({
        type: CREATE_SUBSCRIPTION_FAIL,
        data: { msg: result?.phone_no },
      });
    }
  } catch (err) {
    console.log('err', err);
    yield put({ type: CREATE_SUBSCRIPTION_FAIL, data: { msg: 'NET ERROR' } });
  }
}
export function* watchCreateSubscription() {
  yield takeLatest(CREATE_SUBSCRIPTION, CreateSubscription);
}

function* SubscriptionPlan(payload) {
  try {
    const result = yield subscriptionPlanApi(payload.data);
    console.log('LINE NO 37 SAGA SUBSCRIPTION PLAN');
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({ type: SUBSCRIPTION_PLAN_SUCCESS, data: result });
    } else {
      yield put({
        type: SUBSCRIPTION_PLAN_FAIL,
        data: { msg: result?.phone_no },
      });
    }
  } catch (err) {
    console.log('err', err);
    yield put({ type: SUBSCRIPTION_PLAN_FAIL, data: { msg: 'NET ERROR' } });
  }
}
export function* watchSubscriptionPlan() {
  yield takeLatest(SUBSCRIPTION_PLAN, SubscriptionPlan);
}

function* SubscriptionStatus(payload) {
  try {
    const result = yield subscriptionStatusApi(payload.data);
    console.log('LINE NO 58 SAGA SUBSCRIPTION STATUS', result);
    if (result?.status === HttpStatus.SUCCESS_REQUEST) {
      yield put({ type: SUBSCRIPTION_STATUS_SUCCESS, data: result });
    } else {
      yield put({
        type: SUBSCRIPTION_STATUS_FAIL,
        data: { msg: result?.phone_no },
      });
    }
  } catch (err) {
    console.log('err', err);
    yield put({ type: SUBSCRIPTION_STATUS_FAIL, data: { msg: 'NET ERROR' } });
  }
}
export function* watchSubscriptionStatus() {
  yield takeLatest(SUBSCRIPTION_STATUS, SubscriptionStatus);
}

