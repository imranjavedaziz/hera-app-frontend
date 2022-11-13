import {
  PROFILE_MATCH,
  PROFILE_MATCH_FAIL,
  PROFILE_MATCH_SUCCESS,
} from '../Type';

const initState = {
  profile_match_success: false,
  profile_match_loading: false,
  profile_match_error_msg: '',
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
    default:
      return state;
  }
};
