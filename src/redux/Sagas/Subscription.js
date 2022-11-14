import { HttpStatus } from '../../constants/Constants';
import {
  CREATE_SUBSCRIPTION_SAGA,
  CREATE_SUBSCRIPTION_SUCCESS,
  CREATE_SUBSCRIPTION_FAIL
} from '../Type';
import { takeLatest, put } from 'redux-saga/effects';
import { createSubscriptionApi } from '../../Api/Subscription';

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
  yield takeLatest(CREATE_SUBSCRIPTION_SAGA, CreateSubscription);
}

