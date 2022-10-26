import {
  SM_DONOR_DETAIL,
  SM_DONOR_DETAIL_FAIL,
  SM_DONOR_DETAIL_SUCCESS,
} from '../Type';

const initState = {
  get_sm_donor_success: false,
  get_sm_donor_loading: false,
  get_sm_donor_error_msg: '',
  get_sm_donor_res: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    /**
     * GET SMDONOR DETAIL
     */
    case SM_DONOR_DETAIL:
      return {
        ...state,
        get_sm_donor_success: false,
        get_sm_donor_loading: true,
        get_sm_donor_error_msg: '',
        get_sm_donor_res: {},
      };
    case SM_DONOR_DETAIL_SUCCESS:
      return {
        ...state,
        get_sm_donor_success: true,
        get_sm_donor_loading: false,
        get_sm_donor_error_msg: '',
        get_sm_donor_res: action.data?.data?.data,
      };
    case SM_DONOR_DETAIL_FAIL:
      return {
        ...state,
        get_sm_donor_success: false,
        get_sm_donor_loading: false,
        get_sm_donor_error_msg: action.data.msg,
        get_sm_donor_res: {},
      };
    default:
      return state;
  }
};
