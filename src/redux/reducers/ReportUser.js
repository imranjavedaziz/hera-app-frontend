import {REPORT_USER, REPORT_USER_FAIL, REPORT_USER_SUCCESS} from '../Type';

const initState = {
  report_user_success: false,
  report_user_loading: false,
  report_user_error: '',
};
export default (state = initState, action = null) => {
  switch (action.type) {
    case REPORT_USER:
      return {
        ...state,
        report_user_success: false,
        report_user_loading: true,
        report_user_error: '',
      };
    case REPORT_USER_SUCCESS:
      return {
        ...state,
        report_user_success: true,
        report_user_loading: false,
        report_user_error: action.data?.data?.message,
      };
    case REPORT_USER_FAIL:
      return {
        ...state,
        report_user_success: false,
        report_user_loading: false,
        report_user_error: action.data.msg,
      };
    default:
      return state;
  }
};
