import {
  SM_DONOR_DETAIL,
  SM_DONOR_DETAIL_FAIL,
  SM_DONOR_DETAIL_SUCCESS,
} from '../Type';

const initState = {
  get_sm_doner_success: false,
  get_sm_doner_loading: false,
  get_sm_doner_error_msg: '',
  get_sm_doner_res: {},
};

export default (state = initState, action) => {
    console.log('action.data?.data', action.data?.data)
  switch (action.type) {
    /**
     * GET SMDONOR DETAIL
     */
    case SM_DONOR_DETAIL:
      return {
        ...state,
        get_sm_doner_success: false,
        get_sm_doner_loading: true,
        get_sm_doner_error_msg: '',
        get_sm_doner_res: {},
      };
    case SM_DONOR_DETAIL_SUCCESS:
      return {
        ...state,
        get_sm_doner_success: true,
        get_sm_doner_loading: false,
        get_sm_doner_error_msg: '',
        get_sm_doner_res: action.data?.data?.data,
      };
    case SM_DONOR_DETAIL_FAIL:
      return {
        ...state,
        get_sm_doner_success: false,
        get_sm_doner_loading: false,
        get_sm_doner_error_msg: action.data.msg,
        get_sm_doner_res: {},
      };
    default:
      return state;
  }
};
