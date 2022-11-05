import {
  SUPPORT_FORM,
  SUPPORT_FORM_FAIL,
  SUPPORT_FORM_SUCCESS,
  GET_USER_TYPE,
  GET_USER_TYPE_FAIL,
  GET_USER_TYPE_SUCCESS,
} from '../Type';

const initState = {
  get_support_form_success: false,
  get_support_form_loading: false,
  get_support_form_error_msg: '',
  get_support_form_res: '',
  get_user_type_success: false,
  get_user_type_loading: false,
  get_user_type_error_msg: '',
  get_user_type_res: {},
};

export default (state = initState, action) => {
  console.log('action.?.message', action.data?.data?.message);
  switch (action.type) {
    /**
     * INQUIRY FORM
     */
    case SUPPORT_FORM:
      return {
        ...state,
        get_support_form_success: false,
        get_support_form_loading: true,
        get_support_form_error_msg: '',
      };
    case SUPPORT_FORM_SUCCESS:
      return {
        ...state,
        get_support_form_success: true,
        get_support_form_loading: false,
        get_support_form_error_msg: '',
        get_support_form_res: action.data?.data?.message,
      };
    case SUPPORT_FORM_FAIL:
      return {
        ...state,
        get_support_form_success: false,
        get_support_form_loading: false,
        get_support_form_error_msg: action.data.msg,
      };
    /**
     * GET USER TYPE
     */
    case GET_USER_TYPE: {
      return {
        ...state,
        get_user_type_success: false,
        get_user_type_loading: true,
        get_user_type_error_msg: '',
        get_user_type_res: action.data,
      };
    }
    case GET_USER_TYPE_FAIL: {
      return {
        ...state,
        get_user_type_success: false,
        get_user_type_loading: false,
        get_user_type_error_msg: action.data.msg,
        get_user_type_res: {},
      };
    }
    case GET_USER_TYPE_SUCCESS: {
      return {
        ...state,
        get_user_type_success: true,
        get_user_type_loading: false,
        get_user_type_error_msg: '',
        get_user_type_res: action?.data?.data,
      };
    }
    default:
      return state;
  }
};
