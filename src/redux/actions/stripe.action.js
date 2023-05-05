import {KYC_STATUS, KYC_UPDATE} from '../Type';

export const ADD_CARD_TOKEN = {
  API: 'ADD_CARD_TOKEN_API',
  START: 'ADD_CARD_TOKEN_START',
  SUCCESS: 'ADD_CARD_TOKEN_SUCCESS',
  FAIL: 'ADD_CARD_TOKEN_FAIL',
  END: 'ADD_CARD_TOKEN_END',
  CLEAN: 'ADD_CARD_TOKEN_CLEAN',
};

export const ADD_CUSTOMER_ID = {
  API: 'ADD_CUSTOMER_ID_API',
  START: 'ADD_CUSTOMER_ID_START',
  SUCCESS: 'ADD_CUSTOMER_ID_SUCCESS',
  FAIL: 'ADD_CUSTOMER_ID_FAIL',
  END: 'ADD_CUSTOMER_ID_END',
  CLEAN: 'ADD_CUSTOMER_ID_CLEAN',
};
export const GET_CUSTOMER_ID = {
  API: 'GET_CUSTOMER_ID_API',
  START: 'GET_CUSTOMER_ID_START',
  SUCCESS: 'GET_CUSTOMER_ID_SUCCESS',
  FAIL: 'GET_CUSTOMER_ID_FAIL',
  END: 'GET_CUSTOMER_ID_END',
  CLEAN: 'GET_CUSTOMER_ID_CLEAN',
};
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
export const ADD_CARD = {
  API: 'ADD_CARD_API',
  START: 'ADD_CARD_START',
  SUCCESS: 'ADD_CARD_SUCCESS',
  FAIL: 'ADD_CARD_FAIL',
  END: 'ADD_CARD_END',
  CLEAN: 'ADD_CARD_CLEAN',
};
export const UPDATE_CARD_TOKEN = {
  API: 'UPDATE_CARD_TOKEN_API',
  START: 'UPDATE_CARD_TOKEN_START',
  SUCCESS: 'UPDATE_CARD_TOKEN_SUCCESS',
  FAIL: 'UPDATE_CARD_TOKEN_FAIL',
  END: 'UPDATE_CARD_TOKEN_END',
  CLEAN: 'UPDATE_CARD_TOKEN_CLEAN',
};

export const PAYMENT_INTENT = {
  API: 'PAYMENT_INTENT_API',
  START: 'PAYMENT_INTENT_START',
  SUCCESS: 'PAYMENT_INTENT_SUCCESS',
  FAIL: 'PAYMENT_INTENT_FAIL',
  END: 'PAYMENT_INTENT_END',
  CLEAN: 'PAYMENT_INTENT_CLEAN',
};

export const SAVE_CONTRIBUTION = {
  API: 'SAVE_CONTRIBUTION_API',
  START: 'SAVE_CONTRIBUTION_START',
  SUCCESS: 'SAVE_CONTRIBUTION_SUCCESS',
  FAIL: 'SAVE_CONTRIBUTION_FAIL',
  END: 'SAVE_CONTRIBUTION_END',
  CLEAN: 'SAVE_CONTRIBUTION_CLEAN',
};

export const GUEST_PAYMENT_INTENT = {
  API: 'GUEST_PAYMENT_INTENT_API',
  START: 'GUEST_PAYMENT_INTENT_START',
  SUCCESS: 'GUEST_PAYMENT_INTENT_SUCCESS',
  FAIL: 'GUEST_PAYMENT_INTENT_FAIL',
  END: 'GUEST_PAYMENT_INTENT_END',
  CLEAN: 'GUEST_PAYMENT_INTENT_CLEAN',
};
export const ADD_BANK_TOKEN = {
  API: 'ADD_BANK_API',
  START: 'ADD_BANK_START',
  SUCCESS: 'ADD_BANK_SUCCESS',
  FAIL: 'ADD_BANK_FAIL',
  END: 'ADD_BANK_END',
  CLEAN: 'ADD_BANK_CLEAN',
};

export const UPDATE_BANK_TOKEN = {
  API: 'UPDATE_BANK_TOKEN_API',
  START: 'UPDATE_BANK_TOKEN_START',
  SUCCESS: 'UPDATE_BANK_TOKEN_SUCCESS',
  FAIL: 'UPDATE_BANK_TOKEN_FAIL',
  END: 'UPDATE_BANK_TOKEN_END',
  CLEAN: 'UPDATE_BANK_TOKEN_CLEAN',
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
export const addCustomerId = data => {
  return {
    type: ADD_CUSTOMER_ID.API,
    data,
  };
};
export const getCustomerId = data => {
  return {
    type: GET_CUSTOMER_ID.API,
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
export const updateBankToken = data => {
  return {
    type: UPDATE_BANK_TOKEN.API,
    data,
  };
};

export const addCardToken = data => {
  return {
    type: ADD_CARD_TOKEN.API,
    data,
  };
};
export const addCard = (customerId, cardData, token) => {
  return {
    type: ADD_CARD.API,
    customerId,
    cardData,
    token,
  };
};
export const updateCardToken = data => {
  console.log(data, 'data');
  return {
    type: UPDATE_CARD_TOKEN.API,
    data,
  };
};
export const cleanCardToken = data => {
  return {
    type: UPDATE_CARD_TOKEN.CLEAN,
    data,
  };
};
export const cleanDeleted = () => {
  return {
    type: DELETE_BANK.CLEAN,
  };
};

export const cleanCardDeleted = () => {
  return {
    type: DELETE_CARD.CLEAN,
  };
};

export const cleanBankList = () => {
  return {
    type: GET_BANK_LIST.CLEAN,
  };
};
export const cleanCardList = () => {
  return {
    type: GET_CARD_LIST.CLEAN,
  };
};

export const createPaymentIntent = data => {
  return {
    type: PAYMENT_INTENT.API,
    data,
  };
};
export const saveCotribution = data => {
  return {
    type: SAVE_CONTRIBUTION.API,
    data,
  };
};
export const createGuestPaymentIntent = data => {
  return {
    type: GUEST_PAYMENT_INTENT.API,
    data,
  };
};

export const kyc_update = data => {
  return {
    type: KYC_UPDATE.KYC_UPDATE_API,
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
