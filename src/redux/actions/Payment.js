import {
  GET_MATCH_LIST,
  GET_PAYMENT_REQUEST_LIST,
  UPDATE_REQUEST_STATUS,
  PAYMENT_TRANSFER,
} from '../Type';

export const getMatchList = payload => {
  return {
    type: GET_MATCH_LIST,
    data: payload,
  };
};
export const getPaymentRequestList = () => {
  return {
    type: GET_PAYMENT_REQUEST_LIST,
  };
};
export const updateRequestStatus = data => {
  return {
    type: UPDATE_REQUEST_STATUS,
    data: data,
  };
};
export const paymentTransfer = data => {
  return {
    type: PAYMENT_TRANSFER,
    data: data,
  };
};
