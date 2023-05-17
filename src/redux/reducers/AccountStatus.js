import {
  ACCOUNT_STATUS,
  ACCOUNT_STATUS_FAIL,
  ACCOUNT_STATUS_SUCCESS,
} from '../Type';

const initState = {
  account_status_success: false,
  account_status_loading: false,
  account_status_error_msg: '',
  account_status_res: '',
  account_status_fail: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case ACCOUNT_STATUS: {
      return {
        ...state,
        account_status_success: false,
        account_status_loading: true,
        account_status_error_msg: '',
        account_status_fail: false,
      };
    }
    case ACCOUNT_STATUS_FAIL: {
      return {
        ...state,
        account_status_success: false,
        account_status_loading: false,
        account_status_error_msg: action.data.msg,
        account_status_res: '',
        account_status_fail: true,
      };
    }
    case ACCOUNT_STATUS_SUCCESS: {
      return {
        ...state,
        account_status_success: true,
        account_status_loading: false,
        account_status_error_msg: '',
        account_status_res: action?.data?.data?.data,
        account_status_fail: false,
      };
    }
    default:
      return state;
  }
};
