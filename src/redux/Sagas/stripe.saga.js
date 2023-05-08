import {takeLatest, put} from 'redux-saga/effects';
import {
  PAYMENT_INTENT,
  ADD_BANK_TOKEN,
  GET_CARD_LIST,
  ADD_BANK,
  GET_BANK_LIST,
  DELETE_BANK,
  DELETE_CARD,
  ATTACH_PAYMENT_INTENT,
} from '../actions/stripe.action';
import * as stripeApiCall from '../../Api/StripeApi';

function* getBankTokenFromStripe(action) {
  const {data} = action;
  try {
    yield put({
      type: ADD_BANK_TOKEN.START,
    });
    const response = yield stripeApiCall.addBankToken(data);

    yield put({
      type: ADD_BANK_TOKEN.SUCCESS,
      payload: response,
    });
  } catch (error) {
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
    const response = yield stripeApiCall.getCardListApi(data);
    yield put({
      type: GET_CARD_LIST.SUCCESS,
      payload: response,
    });
  } catch (error) {
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
    const response = yield stripeApiCall.getBankListApi(data);
    yield put({
      type: GET_BANK_LIST.SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: GET_BANK_LIST.FAIL,
      payload: error,
    });
  }
}
function* addBank(action) {
  try {
    yield put({
      type: ADD_BANK.START,
    });
    const response = yield stripeApiCall.createCardSource(action);
    yield put({
      type: ADD_BANK.SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: ADD_BANK.FAIL,
      payload: error,
    });
  }
}
function* createPayment(action) {
  try {
    yield put({
      type: PAYMENT_INTENT.START,
    });
    const response = yield stripeApiCall.createPaymentIntent(action);
    yield put({
      type: PAYMENT_INTENT.SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: PAYMENT_INTENT.FAIL,
      payload: error,
    });
  }
}
function* attachPayment(action) {
  try {
    yield put({
      type: ATTACH_PAYMENT_INTENT.START,
    });
    const response = yield stripeApiCall.attachPaymentMethod(action);
    yield put({
      type: ATTACH_PAYMENT_INTENT.SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: ATTACH_PAYMENT_INTENT.FAIL,
      payload: error,
    });
  }
}
function* deleteBank(action) {
  try {
    yield put({
      type: DELETE_BANK.START,
    });
    const response = yield stripeApiCall.deleteBank(action);
    yield put({
      type: DELETE_BANK.SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: DELETE_BANK.FAIL,
      payload: error,
    });
  }
}

function* deleteCard(action) {
  try {
    yield put({
      type: DELETE_CARD.START,
    });
    const response = yield stripeApiCall.deleteCard(action);
    yield put({
      type: DELETE_CARD.SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: DELETE_CARD.FAIL,
      payload: error,
    });
  }
}
export default function* addCardTokenWatcher() {
  yield takeLatest(ADD_BANK_TOKEN.API, getBankTokenFromStripe);
  yield takeLatest(GET_CARD_LIST.API, getCardListStripe);
  yield takeLatest(ADD_BANK.API, addBank);
  yield takeLatest(GET_BANK_LIST.API, getBankListStripe);
  yield takeLatest(DELETE_BANK.API, deleteBank);
  yield takeLatest(DELETE_CARD.API, deleteCard);
  yield takeLatest(PAYMENT_INTENT.API, createPayment);
  yield takeLatest(ATTACH_PAYMENT_INTENT.API, attachPayment);
}
