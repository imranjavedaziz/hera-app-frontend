import {
  GET_MATCH_LIST,
  GET_MATCH_LIST_FAIL,
  GET_MATCH_LIST_SUCCESS,
} from '../Type';

const initState = {
  get_match_list_success: false,
  get_match_list_loading: false,
  get_match_list_error_msg: '',
  get_match_list_res: {},
  get_match_list_fail: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    /**
     * GET MATCH LIST
     */
    case GET_MATCH_LIST:
      return {
        ...state,
        get_match_list_success: false,
        get_match_list_loading: true,
        get_match_list_error_msg: '',
        get_match_list_res: {},
        get_match_list_fail: false,
      };
    case GET_MATCH_LIST_SUCCESS:
      return {
        ...state,
        get_match_list_success: true,
        get_match_list_loading: false,
        get_match_list_error_msg: '',
        get_match_list_res: action.data,
        get_match_list_fail: false,
      };
    case GET_MATCH_LIST_FAIL:
      return {
        ...state,
        get_match_list_success: false,
        get_match_list_loading: false,
        get_match_list_error_msg: action.data.msg,
        get_match_list_res: '',
        get_match_list_fail: true,
      };
    default:
      return state;
  }
};
