import {
  DEACTIVATE_ACCOUNT,
  DEACTIVATE_ACCOUNT_SUCCESS,
  DEACTIVATE_ACCOUNT_FAIL,
  REASONS_LIST_DEACTIVATE,
  REASONS_LIST_FAIL,
  REASONS_LIST_SUCCESS,
} from '../Type';

const initState = {
  /*  CREATE */
  deactivate_account_success: false,
  deactivate_account_loading: false,
  deactivate_account_error_msg: '',
  deactivate_account_res: '',
  /*  REASON LIST  */
  get_reason_list_success: false,
  get_reason_list_loading: false,
  get_reason_list_error_msg: '',
  get_reason_list_res: '',
};

export default (state = initState, action) => {
  switch (action.type) {
    /**
     * DEACTIVATE_ACCOUNT
     */
    case DEACTIVATE_ACCOUNT:
      return {
        ...state,
        deactivate_account_success: false,
        deactivate_account_loading: true,
        deactivate_account_error_msg: '',
        deactivate_account_res: action.data,
      };
    case DEACTIVATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        deactivate_account_success: true,
        deactivate_account_loading: false,
        deactivate_account_error_msg: '',
        subscription_status_res: action.data?.data?.message,
      };
    case DEACTIVATE_ACCOUNT_FAIL:
      return {
        ...state,
        deactivate_account_success: false,
        deactivate_account_loading: false,
        deactivate_account_error_msg: action.data.msg,
        deactivate_account_res: action?.data?.data,
      };
    /** GET DEACTIVATE REASON LIST */
    case REASONS_LIST_DEACTIVATE: {
      return {
        ...state,
        get_reason_list_success: false,
        get_reason_list_loading: true,
        get_reason_list_error_msg: '',
        get_reason_list_res: '',
      };
    }
    case REASONS_LIST_SUCCESS: {
      console.log("LINE NUMBER 66 REDUCER", {
        ...state,
        get_reason_list_success: true,
        get_reason_list_loading: false,
        get_reason_list_error_msg: '',
        get_reason_list_res: action?.data?.data,
      });
      return {
        ...state,
        get_reason_list_success: true,
        get_reason_list_loading: false,
        get_reason_list_error_msg: '',
        get_reason_list_res: action?.data?.data,
      };
    }
    case REASONS_LIST_FAIL: {
      return {
        ...state,
        get_reason_list_success: false,
        get_reason_list_loading: false,
        get_reason_list_error_msg: action?.data?.msg,
        get_reason_list_res: {},
      };
    }
    default:
      return state;
  }
};
