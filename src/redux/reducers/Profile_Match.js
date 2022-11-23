import {
  PROFILE_MATCH,
  PROFILE_MATCH_FAIL,
  PROFILE_MATCH_SUCCESS,
  PROFILE_MATCH_RESPONSE,
  PROFILE_MATCH_RESPONSE_FAIL,
  PROFILE_MATCH_RESPONSE_SUCCESS,
} from '../Type';

const initState = {
  profile_match_success: false,
  profile_match_loading: false,
  profile_match_error_msg: '',
  profile_match_response_success: false,
  profile_match_response_loading: false,
  profile_match_response_error_msg: '',
  profile_match_response_res: '',
  profile_match_data_status:{}
};

export default (state = initState, action) => {
  switch (action.type) {
    /**
     * PROFILE MATCH
     */
    case PROFILE_MATCH: {
      return {
        ...state,
        profile_match_success: false,
        profile_match_loading: true,
        profile_match_error_msg: '',
      };
    }
    case PROFILE_MATCH_FAIL: {
      return {
        ...state,
        profile_match_success: false,
        profile_match_loading: false,
        profile_match_error_msg: action.data.msg,
      };
    }
    case PROFILE_MATCH_SUCCESS: {
      return {
        ...state,
        profile_match_success: true,
        profile_match_loading: false,
        profile_match_error_msg: action.data?.data?.message,
      };
    }
    /**
     * PROFILE MATCH RESPONSE
     */
    case PROFILE_MATCH_RESPONSE: {
      return {
        ...state,
        profile_match_response_success: false,
        profile_match_response_loading: true,
        profile_match_response_error_msg: '',
        profile_match_response_res: '',
      };
    }
    case PROFILE_MATCH_RESPONSE_FAIL: {
      return {
        ...state,
        profile_match_response_success: false,
        profile_match_response_loading: false,
        profile_match_response_error_msg: action.data.msg,
        profile_match_response_res: '',
      };
    }
    case PROFILE_MATCH_RESPONSE_SUCCESS: {
      return {
        ...state,
        profile_match_response_success: true,
        profile_match_response_loading: false,
        profile_match_response_error_msg: '',
        profile_match_response_res: action.data?.data?.message,
        profile_match_data_status: action.data?.data?.data
      };
    }
    default:
      return state;
  }
};
