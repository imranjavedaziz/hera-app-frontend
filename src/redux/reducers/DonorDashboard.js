import {
  DONOR_DASHBOARD,
  DONOR_DASHBOARD_FAIL,
  DONOR_DASHBOARD_SUCCESS,
} from '../Type';

const initState = {
  get_donor_dashboard_success: false,
  get_donor_dashboard_loading: false,
  get_donor_dashboard_error_msg: '',
  get_donor_dashboard_res: {},
};

export default (state = initState, action) => {
  console.log(action.data);
  switch (action.type) {
    /**
     * GET DONOR DASHBOARD CARDS
     */
    case DONOR_DASHBOARD:
      return {
        ...state,
        get_donor_dashboard_success: false,
        get_donor_dashboard_loading: true,
        get_donor_dashboard_error_msg: '',
        get_donor_dashboard_res: {},
      };
    case DONOR_DASHBOARD_SUCCESS:
      return {
        ...state,
        get_donor_dashboard_success: true,
        get_donor_dashboard_loading: false,
        get_donor_dashboard_error_msg: '',
        get_donor_dashboard_res: action.data.data,
      };
    case DONOR_DASHBOARD_FAIL:
      return {
        ...state,
        get_donor_dashboard_success: false,
        get_donor_dashboard_loading: false,
        get_donor_dashboard_error_msg: action.data.msg,
        get_donor_dashboard_res: {},
      };
    default:
      return state;
  }
};
