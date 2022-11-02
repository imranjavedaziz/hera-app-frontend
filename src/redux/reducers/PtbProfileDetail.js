import {
  PTB_PROFILE_DETAIL,
  PTB_PROFILE_DETAI_SUCCESS,
  PTB_PROFILE_DETAI_FAIL,
  SEND_LIKE_PTB,
  SEND_LIKE_PTB_SUCCESS,
  SEND_LIKE_PTB_FAIL,
} from '../Type';

const initState = {
  get_ptb_profile_detail_success: false,
  get_ptb_profile_detail_loading: false,
  get_ptb_profile_detail_error_msg: '',
  get_ptb_profile_detail_res: {},
  
  send_like_ptb_success: false,
  send_like_ptb_loading: false,
  send_like_ptb_error_msg: '',
  send_like_ptb_res: {},
};

export default (state = initState, action) => {
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
    /**
     * POST LIKE TO PTB PROFILE
     */
    case SEND_LIKE_PTB:
      return {
        ...state,
        send_like_ptb_success: false,
        send_like_ptb_loading: true,
        send_like_ptb_error_msg: '',
        send_like_ptb_res: {},
      };
    case SEND_LIKE_PTB_SUCCESS:
      return {
        ...state,
        send_like_ptb_success: true,
        send_like_ptb_loading: false,
        send_like_ptb_error_msg: '',
        send_like_ptb_res: action.data.data,
      };
    case SEND_LIKE_PTB_FAIL:
      return {
        ...state,
        send_like_ptb_success: false,
        send_like_ptb_loading: false,
        send_like_ptb_error_msg: action.data.msg,
        send_like_ptb_res: {},
      };
    default:
      return state;
  }
};
