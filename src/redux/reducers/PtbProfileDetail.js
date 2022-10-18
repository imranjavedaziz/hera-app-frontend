import {
  PTB_PROFILE_DETAIL,
  PTB_PROFILE_DETAI_SUCCESS,
  PTB_PROFILE_DETAI_FAIL,
} from '../Type';

const initState = {
  get_ptb_profile_detail_success: false,
  get_ptb_profile_detail_loading: false,
  get_ptb_profile_detail_error_msg: '',
  get_ptb_profile_detail_res: {},
};

export default (state = initState, action) => {
  console.log('actiondata', action.data);
  switch (action.type) {
    /**
     * GET PROFILE SETTER
     */
    case PTB_PROFILE_DETAIL:
      return {
        ...state,
        get_ptb_profile_detail_success: false,
        get_ptb_profile_detail_loading: true,
        get_ptb_profile_detail_error_msg: '',
        get_ptb_profile_detail_res: {},
      };
    case PTB_PROFILE_DETAI_SUCCESS:
      return {
        ...state,
        get_ptb_profile_detail_success: true,
        get_ptb_profile_detail_loading: false,
        get_ptb_profile_detail_error_msg: '',
        get_ptb_profile_detail_res: action?.data?.data?.data,
      };
    case PTB_PROFILE_DETAI_FAIL:
      return {
        ...state,
        get_ptb_profile_detail_success: false,
        get_ptb_profile_detail_loading: false,
        get_ptb_profile_detail_error_msg: action.data.msg,
        get_ptb_profile_detail_res: {},
      };
    default:
      return state;
  }
};
