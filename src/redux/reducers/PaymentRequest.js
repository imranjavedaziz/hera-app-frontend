import {
  SEND_PAYMENT_REQUEST,
  SEND_PAYMENT_REQUEST_FAIL,
  SEND_PAYMENT_REQUEST_SUCCESS,
} from '../Type';

const initState = {
  send_payment_request_success: false,
  send_payment_request_loading: false,
  send_payment_request_error_msg: '',
  send_payment_request_res: {},
  send_payment_request_fail: false,
};

export default (state = initState, action) => {
    switch (action.type) {
      /**
       * SEND PAYMENT REQ
       */
      case SEND_PAYMENT_REQUEST:
        return {
          ...state,
          send_payment_request_success: false,
          send_payment_request_loading: true,
          send_payment_request_error_msg: '',
          send_payment_request_res: {},
          send_payment_request_fail: false,
        };
      case SEND_PAYMENT_REQUEST_SUCCESS:
        return {
          ...state,
          send_payment_request_success: true,
          send_payment_request_loading: false,
          send_payment_request_res: action.data,
        };
      case SEND_PAYMENT_REQUEST_FAIL:
        return {
          ...state,
          send_payment_request_loading: false,
          get_match_list_error_msg: action.data.msg,
          send_payment_request_fail: true,
        };
      default:
        return state;
    }
  };
