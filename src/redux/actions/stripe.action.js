import {KYC_STATUS, KYC_UPDATE, BANK_UPDATE} from '../Type';

export const GET_CARD_LIST = {
  API: 'GET_CARD_LIST_API',
  START: 'GET_CARD_LIST_START',
  SUCCESS: 'GET_CARD_LIST_SUCCESS',
  FAIL: 'GET_CARD_LIST_FAIL',
  END: 'GET_CARD_LIST_END',
  CLEAN: 'GET_CARD_LIST_CLEAN',
};
export const GET_BANK_LIST = {
  API: 'GET_BANK_LIST_API',
  START: 'GET_BANK_LIST_START',
  SUCCESS: 'GET_BANK_LIST_SUCCESS',
  FAIL: 'GET_BANK_LIST_FAIL',
  END: 'GET_BANK_LIST_END',
  CLEAN: 'GET_BANK_LIST_CLEAN',
};
export const ADD_BANK = {
  API: 'ADD_BANK_API',
  START: 'ADD_BANK_START',
  SUCCESS: 'ADD_BANK_SUCCESS',
  FAIL: 'ADD_BANK_FAIL',
  END: 'ADD_BANK_END',
  CLEAN: 'ADD_BANK_CLEAN',
};

export const PAYMENT_INTENT = {
  API: 'PAYMENT_INTENT_API',
  START: 'PAYMENT_INTENT_START',
  SUCCESS: 'PAYMENT_INTENT_SUCCESS',
  FAIL: 'PAYMENT_INTENT_FAIL',
  END: 'PAYMENT_INTENT_END',
  CLEAN: 'PAYMENT_INTENT_CLEAN',
};
export const ATTACH_PAYMENT_INTENT = {
  API: 'ATTACH_PAYMENT_INTENT_API',
  START: 'ATTACH_PAYMENT_INTENT_START',
  SUCCESS: 'ATTACH_PAYMENT_INTENT_SUCCESS',
  FAIL: 'ATTACH_PAYMENT_INTENT_FAIL',
  END: 'ATTACH_PAYMENT_INTENT_END',
  CLEAN: 'ATTACH_PAYMENT_INTENT_CLEAN',
};
export const ADD_BANK_TOKEN = {
  API: 'ADD_BANK_TOKEN_API',
  START: 'ADD_BANK_TOKEN_START',
  SUCCESS: 'ADD_BANK_TOKEN_SUCCESS',
  FAIL: 'ADD_BANK_TOKEN_FAIL',
  END: 'ADD_BANK_TOKEN_END',
  CLEAN: 'ADD_BANK_TOKEN_CLEAN',
};

export const DELETE_BANK = {
  API: 'DELETE_BANK_API',
  START: 'DELETE_BANK_START',
  SUCCESS: 'DELETE_BANK_SUCCESS',
  FAIL: 'DELETE_BANK_FAIL',
  END: 'DELETE_BANK_END',
  CLEAN: 'DELETE_BANK_CLEAN',
};
export const DELETE_CARD = {
  API: 'DELETE_CARD_API',
  START: 'DELETE_CARD_START',
  SUCCESS: 'DELETE_CARD_SUCCESS',
  FAIL: 'DELETE_CARD_FAIL',
  END: 'DELETE_CARD_END',
  CLEAN: 'DELETE_CARD_CLEAN',
};

export const addBankToken = data => {
  return {
    type: ADD_BANK_TOKEN.API,
    data,
  };
};
export const getCardList = data => {
  return {
    type: GET_CARD_LIST.API,
    data,
  };
};
export const getBankList = data => {
  return {
    type: GET_BANK_LIST.API,
    data,
  };
};

export const addBank = (customerId, cardData, token) => {
  return {
    type: ADD_BANK.API,
    customerId,
    cardData,
    token,
  };
};

export const createPaymentIntent = data => {
  return {
    type: PAYMENT_INTENT.API,
    data,
  };
};
export const attachPaymentIntent = (customerId, id) => {
  return {
    type: ATTACH_PAYMENT_INTENT.API,
    customerId,
    id,
  };
};
export const kyc_update = data => {
  return {
    type: KYC_UPDATE.KYC_UPDATE_API,
    data,
  };
};
export const bank_update = data => {
  return {
    type: BANK_UPDATE,
    data,
  };
};

export const kyc_status_update = data => {
  return {
    type: KYC_STATUS.API,
    data,
  };
};
export const deleteCard = data => {
  return {
    type: DELETE_CARD.API,
    data,
  };
};
export const deleteBank = data => {
  return {
    type: DELETE_BANK.API,
    data,
  };
};
