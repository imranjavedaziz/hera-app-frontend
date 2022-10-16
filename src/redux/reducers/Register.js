import {
  AUTH_REGISTER,
  AUTH_REGISTER_FAIL,
  AUTH_REGISTER_SUCCESS,
  SAVE_BASIC_DETAIL,
  SAVE_BASIC_DETAIL_FAIL,
  SAVE_BASIC_DETAIL_SUCCESS,
  GET_STATES_DETAIL,
  GET_STATES_DETAIL_SUCCESS,
  GET_STATES_DETAIL_FAIL,
  GET_PROFILE_SETTER_DETAIL,
  GET_PROFILE_SETTER_SUCCESS,
  GET_PROFILE_SETTER_FAIL,
} from '../Type';

const initState = {
  registerUser: [
    {
      country_code: '',
      dob: '',
      email: '',
      first_name: '',
      last_name: '',
      middle_name: '',
      phone_no: '',
      file: {},
      role_id: '',
      password: '',
    },
  ],
  register_user_success: false,
  register_user_loading: false,
  register_user_error_msg: '',
  save_basic_detail_success: false,
  save_basic_detail_loading: false,
  save_basic_detail_error_msg: '',
  get_state_res: {},
  get_state_success: false,
  get_state_loading: false,
  get_state_error_msg: '',
  get_profile_setter_res: {},
  get_profile_setter_success: false,
  get_profile_setter_loading: false,
  get_profile_setter_error_msg: '',
};

export default (state = initState, action) => {
  console.log(action.data);
  switch (action.type) {
    // register ptb user
    case AUTH_REGISTER: {
      return {
        ...state,
        register_user_success: false,
        register_user_loading: true,
        register_user_error_msg: '',
        registerUser: action.data,
      };
    }
    case AUTH_REGISTER_FAIL: {
      return {
        ...state,
        register_user_success: false,
        register_user_loading: false,
        register_user_error_msg: action.data.msg,
        registerUser: '',
      };
    }
    case AUTH_REGISTER_SUCCESS: {
      return {
        ...state,
        register_user_success: true,
        register_user_loading: false,
        registerUser: action.data,
        register_user_error_msg: '',
      };
    }
    /**
     * SAVE BASIC DETAIL
     */
    case SAVE_BASIC_DETAIL: {
      return {
        ...state,
        save_basic_detail_success: false,
        save_basic_detail_loading: true,
        save_basic_detail_error_msg: '',
      };
    }
    case SAVE_BASIC_DETAIL_FAIL: {
      return {
        ...state,
        save_basic_detail_success: false,
        save_basic_detail_loading: false,
        save_basic_detail_error_msg: action.data.msg,
      };
    }
    case SAVE_BASIC_DETAIL_SUCCESS: {
      return {
        ...state,
        save_basic_detail_success: true,
        save_basic_detail_loading: false,
        save_basic_detail_error_msg: '',
      };
    }
    /**
     * GET STATES
     */
    case GET_STATES_DETAIL:
      return {
        ...state,
        get_state_res: {},
        get_state_success: false,
        get_state_loading: true,
        get_state_error_msg: '',
      };
    case GET_STATES_DETAIL_SUCCESS:
      return {
        ...state,
        get_state_res: action?.data,
        get_state_success: true,
        get_state_loading: false,
        get_state_error_msg: '',
      };
    case GET_STATES_DETAIL_FAIL:
      return {
        ...state,
        get_state_res: {},
        get_state_success: false,
        get_state_loading: false,
        get_state_error_msg: action.data.msg,
      };
    /**
     * GET PROFILE SETTER
     */
    case GET_PROFILE_SETTER_DETAIL:
      return {
        ...state,
        get_profile_setter_res: {},
        get_profile_setter_success: false,
        get_profile_setter_loading: true,
        get_profile_setter_error_msg: '',
      };
    case GET_PROFILE_SETTER_SUCCESS:
      return {
        ...state,
        get_profile_setter_res: action.data,
        get_profile_setter_success: true,
        get_profile_setter_loading: false,
        get_profile_setter_error_msg: '',
      };
    case GET_PROFILE_SETTER_FAIL:
      return {
        ...state,
        get_profile_setter_res: {},
        get_profile_setter_success: false,
        get_profile_setter_loading: false,
        get_profile_setter_error_msg: action.data.msg,
      };
    default:
      return state;
  }
};
