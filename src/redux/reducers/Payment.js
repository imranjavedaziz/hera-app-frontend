import {
  GET_MATCH_LIST,
  GET_MATCH_LIST_FAIL,
  GET_MATCH_LIST_SUCCESS,
  GET_PAYMENT_REQUEST_FAIL,
  GET_PAYMENT_REQUEST_LIST,
  GET_PAYMENT_REQUEST_SUCCESS,
  UPDATE_REQUEST_STATUS,
  UPDATE_REQUEST_STATUS_FAIL,
  UPDATE_REQUEST_STATUS_SUCCESS,
  TRANSACTION_HISTORY,
  TRANSACTION_HISTORY_FAIL,
  TRANSACTION_HISTORY_SUCCESS,
  PAYMENT_TRANSFER,
  PAYMENT_TRANSFER_FAIL,
  PAYMENT_TRANSFER_SUCCESS,
} from '../Type';

const initState = {
  get_match_list_success: false,
  get_match_list_loading: false,
  get_match_list_error_msg: '',
  get_match_list_res: {},
  get_match_list_fail: false,
  //get payment request list store
  get_payment_request_list_success: false,
  get_payment_request_list_loading: false,
  get_payment_request_list_error_msg: '',
  get_payment_request_list_res: {},
  get_payment_request_list_fail: false,

  //Update Status Request
  update_request_status_success: false,
  update_request_status_loading: false,
  update_request_status_error_msg: '',
  update_request_status_res: {},
  update_request_status_fail: false,

  //get payment history
  payment_history_success: false,
  payment_history_loading: false,
  payment_history_error_msg: '',
  payment_history_res: {data: []},
  payment_history_fail: false,
  //payment tranfer
  payment_transfer_success: false,
  payment_transfer_loading: false,
  payment_transfer_error_msg: '',
  payment_transfer_res: {},
  payment_transfer_fail: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    /**
     * GET MATCH LIST
     */
    case GET_MATCH_LIST:
      return {
        ...state,
        get_match_list_success: false,
        get_match_list_loading: true,
        get_match_list_error_msg: '',
        // get_match_list_res: {},
        get_match_list_fail: false,
      };
    case GET_MATCH_LIST_SUCCESS:
      return {
        ...state,
        get_match_list_success: true,
        get_match_list_loading: false,
        get_match_list_error_msg: '',
        get_match_list_res: action.data,
        get_match_list_fail: false,
      };
    case GET_MATCH_LIST_FAIL:
      return {
        ...state,
        get_match_list_success: false,
        get_match_list_loading: false,
        get_match_list_error_msg: action.data.msg,
        get_match_list_res: '',
        get_match_list_fail: true,
      };
    //GET PAYMENT REQUEST LSIT
    case GET_PAYMENT_REQUEST_LIST:
      return {
        ...state,
        get_payment_request_list_success: false,
        get_payment_request_list_loading: true,
        get_payment_request_list_error_msg: '',
        get_payment_request_list_res: {},
        get_payment_request_list_fail: false,
      };
    case GET_PAYMENT_REQUEST_SUCCESS:
      return {
        ...state,
        get_payment_request_list_success: true,
        get_payment_request_list_loading: false,
        get_payment_request_list_error_msg: '',
        get_payment_request_list_res: action.data,
        get_payment_request_list_fail: false,
      };
    case GET_PAYMENT_REQUEST_FAIL:
      return {
        ...state,
        get_payment_request_list_success: false,
        get_payment_request_list_loading: false,
        get_payment_request_list_error_msg: action.data.msg,
        get_payment_request_list_res: '',
        get_payment_request_list_fail: true,
      };
    //Update Request Status
    case UPDATE_REQUEST_STATUS:
      return {
        ...state,
        update_request_status_success: false,
        update_request_status_loading: true,
        update_request_status_error_msg: '',
        update_request_status_res: {},
        update_request_status_fail: false,
      };
    case UPDATE_REQUEST_STATUS_SUCCESS:
      return {
        ...state,
        update_request_status_success: true,
        update_request_status_loading: false,
        update_request_status_error_msg: '',
        update_request_status_res: action.data,
        update_request_status_fail: false,
      };
    case UPDATE_REQUEST_STATUS_FAIL:
      return {
        ...state,
        update_request_status_success: false,
        update_request_status_loading: false,
        update_request_status_error_msg: action.data.msg,
        update_request_status_res: '',
        update_request_status_fail: true,
      };

    //Payment history
    case TRANSACTION_HISTORY:
      return {
        ...state,
        payment_history_success: false,
        payment_history_loading: true,
        payment_history_error_msg: '',
        payment_history_res: {data: []},
        payment_history_fail: false,
      };
    case TRANSACTION_HISTORY_SUCCESS:
      return {
        ...state,
        payment_history_success: true,
        payment_history_loading: false,
        payment_history_res: action.data,
      };
    case TRANSACTION_HISTORY_FAIL:
      return {
        ...state,
        payment_history_loading: false,
        payment_history_error_msg: action.data.msg,
        payment_history_fail: true,
      };
    //Payment Transfer
    case PAYMENT_TRANSFER:
      return {
        ...state,
        payment_transfer_success: false,
        payment_transfer_loading: true,
        payment_transfer_error_msg: '',
        payment_transfer_res: {},
        payment_transfer_fail: false,
      };
    case PAYMENT_TRANSFER_SUCCESS:
      return {
        ...state,
        payment_transfer_success: true,
        payment_transfer_loading: false,
        payment_transfer_error_msg: '',
        payment_transfer_res: action.data,
        payment_transfer_fail: false,
      };
    case PAYMENT_TRANSFER_FAIL:
      return {
        ...state,
        payment_transfer_success: false,
        payment_transfer_loading: false,
        payment_transfer_error_msg: action.data.msg,
        payment_transfer_res: '',
        payment_transfer_fail: true,
      };
    default:
      return state;
  }
};
