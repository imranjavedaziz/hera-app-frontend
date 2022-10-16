import {
  PTB_DASHBOARD,
  PTB_DASHBOARD_FAIL,
  PTB_DASHBOARD_SUCCESS,
} from '../Type';

const initState = {
  get_ptb_dashboard_success: false,
  get_ptb_dashboard_loading: false,
  get_ptb_dashboard_error_msg: '',
  get_ptb_dashboard_res: {},
};

export default (state = initState, action) => {
  console.log(action.data);
  switch (action.type) {
    /**
     * GET PROFILE SETTER
     */
    case PTB_DASHBOARD:
      return {
        ...state,
        get_ptb_dashboard_success: false,
        get_ptb_dashboard_loading: true,
        get_ptb_dashboard_error_msg: '',
        get_ptb_dashboard_res: {},
      };
    case PTB_DASHBOARD_SUCCESS:
      return {
        ...state,
        get_ptb_dashboard_success: true,
        get_ptb_dashboard_loading: false,
        get_ptb_dashboard_error_msg: '',
        get_ptb_dashboard_res: action.data,
      };
    case PTB_DASHBOARD_FAIL:
      return {
        ...state,
        get_ptb_dashboard_success: false,
        get_ptb_dashboard_loading: false,
        get_ptb_dashboard_error_msg: action.data.msg,
        get_ptb_dashboard_res: {},
      };
    default:
      return state;
  }
};
