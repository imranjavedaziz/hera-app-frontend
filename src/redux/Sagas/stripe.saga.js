import {takeLatest, put, call} from 'redux-saga/effects';
import {
  ADD_CARD_TOKEN,
  PAYMENT_INTENT,
  UPDATE_CARD_TOKEN,
  ADD_BANK_TOKEN,
  UPDATE_BANK_TOKEN,
  GET_CARD_LIST,
  ADD_CARD,
  GET_BANK_LIST,
} from '../actions/stripe.action';
import * as stripeApiCall from '../../Api/StripeApi';

function* addCardToken(action) {
  const {data} = action;
  try {
    yield put({
      type: ADD_CARD_TOKEN.START,
    });
    console.log('ADD_CARD_TOKEN.START', data);
    const response = yield stripeApiCall.addCardToken(data);
    console.log(response, 'response');
    yield put({
      type: ADD_CARD_TOKEN.SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log('ADD_CARD_TOKEN.error', error);
    yield put({
      type: ADD_CARD_TOKEN.FAIL,
      payload: error,
    });
  }
}
function* updateCardToken(action) {
  const {data} = action;
  try {
    yield put({
      type: UPDATE_CARD_TOKEN.START,
    });
    console.log('UPDATE_CARD_TOKEN.START', data);
    // const response = yield call(apiCall.updateCardToken, data);

    // yield put({
    //   type: UPDATE_CARD_TOKEN.SUCCESS,
    //   payload: response,
    // });
  } catch (error) {
    console.log('UPDATE_CARD_TOKEN.error', error);
    // if (error?.status === 422) {
    //   yield put({
    //     type: UPDATE_CARD_TOKEN.FAIL,
    //     payload: error?.data,
    //   });
    // } else {
    //   yield put({
    //     type: UPDATE_CARD_TOKEN.FAIL,
    //     payload: error?.data ?? error,
    //   });
    // }
  }
}
function* updateBankToken(action) {
  const {data} = action;
  try {
    yield put({
      type: UPDATE_BANK_TOKEN.START,
    });
    console.log('UPDATE_BANK_TOKEN.START', data);
    // const response = yield call(apiCall.updateBankToken, data);

    // yield put({
    //   type: UPDATE_BANK_TOKEN.SUCCESS,
    //   payload: response,
    // });
  } catch (error) {
    console.log('UPDATE_BANK_TOKEN.error', error);
    // if (error?.status === 422) {
    //   yield put({
    //     type: UPDATE_BANK_TOKEN.FAIL,
    //     payload: error?.data,
    //   });
    // } else {
    //   yield put({
    //     type: UPDATE_BANK_TOKEN.FAIL,
    //     payload: error?.data ?? error,
    //   });
    // }
  }
}

function* paymentIntentwithCard(action) {
  const {data} = action;
  try {
    yield put({
      type: PAYMENT_INTENT.START,
    });
    console.log('PAYMENT_INTENT.START', data);
    // const response = yield call(apiCall.createPaymentIntentwithCard, data);

    // yield put({
    //   type: PAYMENT_INTENT.SUCCESS,
    //   payload: response,
    // });
  } catch (error) {
    console.log('PAYMENT_INTENT.error', error);
    // if (error?.status === 422) {
    //   yield put({
    //     type: PAYMENT_INTENT.FAIL,
    //     payload: error?.data,
    //   });
    // } else {
    //   yield put({
    //     type: PAYMENT_INTENT.FAIL,
    //     payload: error?.data ?? error,
    //   });
    // }
  }
}

function* getBankTokenFromStripe(action) {
  const {data} = action;
  try {
    yield put({
      type: ADD_BANK_TOKEN.START,
    });
    console.log('ADD_BANK_TOKEN.START', data);
    const response = yield stripeApiCall.addBankToken(data);

    yield put({
      type: ADD_BANK_TOKEN.SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log('ADD_BANK_TOKEN.error', error);
    yield put({
      type: ADD_BANK_TOKEN.FAIL,
      payload: error,
    });
  }
}

function* getCardListStripe(action) {
  const {data} = action;
  try {
    yield put({
      type: GET_CARD_LIST.START,
    });
    console.log('GET_CARD_LIST.START', data);
    const response = yield stripeApiCall.getCardListApi(data);
    yield put({
      type: GET_CARD_LIST.SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log('GET_CARD_LIST.error', error);
    yield put({
      type: GET_CARD_LIST.FAIL,
      payload: error,
    });
  }
}
function* getBankListStripe(action) {
  const {data} = action;
  try {
    yield put({
      type: GET_BANK_LIST.START,
    });
    console.log('GET_BANK_LIST.START', data);
    const response = yield stripeApiCall.getBankListApi(data);
    yield put({
      type: GET_BANK_LIST.SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log('GET_BANK_LIST.error', error);
    yield put({
      type: GET_BANK_LIST.FAIL,
      payload: error,
    });
  }
}
function* addCard(action) {
  try {
    yield put({
      type: ADD_CARD.START,
    });
    console.log('ADD_CARD.START', action);
    const response = yield stripeApiCall.createCardSource(action);
    yield put({
      type: ADD_CARD.SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log('ADD_CARD.error', error);
    yield put({
      type: ADD_CARD.FAIL,
      payload: error,
    });
  }
}
export default function* addCardTokenWatcher() {
  yield takeLatest(ADD_CARD_TOKEN.API, addCardToken);
  yield takeLatest(UPDATE_CARD_TOKEN.API, updateCardToken);
  yield takeLatest(UPDATE_BANK_TOKEN.API, updateBankToken);
  yield takeLatest(PAYMENT_INTENT.API, paymentIntentwithCard);
  yield takeLatest(ADD_BANK_TOKEN.API, getBankTokenFromStripe);
  yield takeLatest(GET_CARD_LIST.API, getCardListStripe);
  yield takeLatest(ADD_CARD.API, addCard);
  yield takeLatest(GET_BANK_LIST.API, getBankListStripe);
}
