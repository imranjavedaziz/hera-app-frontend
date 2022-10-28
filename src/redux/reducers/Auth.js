import {
  SET_USER,
  SIGNOUT_USER,
  UPDATE_TOKEN,
  UPDATE_REG_STEP,
  SET_BASIC_DETAILS,
  SET_ATTRIBUTES,
} from '../constants';
import {
  AUTH_LOG_IN,
  AUTH_LOG_IN_FAIL,
  AUTH_LOG_IN_SUCCESS,
  AUTH_MOBILE_NUMBER,
  AUTH_MOBILE_NUMBER_SUCCESS,
  AUTH_MOBILE_NUMBER_FAIL,
  AUTH_VERIFY_OTP,
  AUTH_VERIFY_OTP_FAIL,
  AUTH_VERIFY_OTP_SUCCESS,
  AUTH_LOG_OUT,
  AUTH_LOG_OUT_SUCCESS,
  AUTH_LOG_OUT_FAIL,
  AUTH_REGISTER,
  AUTH_REGISTER_FAIL,
  AUTH_REGISTER_SUCCESS,
  UPDATE_PROFILE_IMG,
  UPDATE_PROFILE_IMG_SUCCESS,
  UPDATE_PROFILE_IMG_FAIL,
} from '../Type';

const initState = {
  user: {
    access_token: '',
    country_code: '',
    created_at: '',
    dob: '',
    email: '',
    first_name: '',
    id: null,
    last_name: '',
    middle_name: '',
    phone_no: '',
    profile_pic: '',
    registration_step: 1,
    role_id: '',
    updated_at: '',
    username: '',
  },
  basic: {
    bio: '',
    created_at: '',
    gender_id: '',
    id: null,
    occupation: null,
    relationship_status_id: '',
    sexual_orientations_id: '',
    updated_at: '',
    user_id: null,
  },
  attributes: {
    created_at: '',
    education_id: '',
    eye_colour_id: '',
    father_ethnicity_id: '',
    hair_colour_id: '',
    height_id: '',
    id: null,
    mother_ethnicity_id: '',
    race_id: '',
    updated_at: '',
    user_id: '',
    weight_id: '',
  },
  gallery: {
    doner_photo_gallery: [],
    doner_video_gallery: [],
  },
  log_in_success: false,
  log_in_loading: false,
  token: '',
  user_id: '',
  log_in_error_msg: '',
  log_in_data: '',
  mobile_number_success: false,
  mobile_number_loading: false,
  mobile_number_error_msg: '',
  verify_otp_success: false,
  verify_otp_loading: false,
  verify_otp_error_msg: '',
  log_out_success: false,
  log_out_loading: false,
  log_out_error_msg: '',
  register_user_success: false,
  register_user_loading: false,
  register_user_error_msg: '',
  update_user_profile_img_success: false,
  update_user_profile_img_fail: false,
  update_user_profile_img_error_msg: '',
};

export default (action, state = initState) => {
  switch (action.type) {
    /**
     * SignIn
     */
    case AUTH_LOG_IN: {
      return {
        ...state,
        log_in_success: false,
        log_in_loading: true,
        token: '',
        log_in_error_msg: '',
        log_in_data: {},
      };
    }
    case AUTH_LOG_IN_FAIL: {
      return {
        ...state,
        log_in_success: false,
        log_in_loading: false,
        token: '',
        log_in_error_msg: action.data.msg,
        log_in_data: '',
      };
    }
    case AUTH_LOG_IN_SUCCESS: {
      const {access_token} = action.data.data.data;
      return {
        ...state,
        user: action?.data?.data?.data,
        log_in_success: true,
        log_in_loading: false,
        token: access_token,
        log_in_data: action?.data?.data?.data,
        log_in_error_msg: '',
      };
    }
    /**
     * Set User
     */
    case SET_USER:
      return {
        ...state,
        user: action?.data?.data?.data,
      };
    /**
     * Update Token
     */
    case UPDATE_TOKEN:
      return {
        ...state,
        token: action,
        user: {
          ...state.user,
          access_token: action.payload,
        },
      };
    case UPDATE_REG_STEP:
      return {
        ...state,
        user: {
          ...state.user,
          registration_step: state.user.registration_step + 1,
        },
      };
    case SET_BASIC_DETAILS:
      return {
        ...state,
        basic: action,
      };
    case SET_ATTRIBUTES:
      return {
        ...state,
        attributes: action,
      };
    case SIGNOUT_USER:
      return {
        ...state,
        user: initState.user,
        gallery: initState.gallery,
      };
    case AUTH_MOBILE_NUMBER: {
      return {
        ...state,
        mobile_number_success: false,
        mobile_number_loading: true,
        mobile_number_error_msg: '',
      };
    }
    case AUTH_MOBILE_NUMBER_FAIL: {
      return {
        ...state,
        mobile_number_success: false,
        mobile_number_loading: false,
        mobile_number_error_msg: action.data.msg,
      };
    }
    case AUTH_MOBILE_NUMBER_SUCCESS: {
      return {
        ...state,
        mobile_number_success: true,
        mobile_number_loading: false,
        mobile_number_error_msg: '',
      };
    }
    case AUTH_VERIFY_OTP: {
      return {
        ...state,
        verify_otp_success: false,
        verify_otp_loading: true,
        verify_otp_error_msg: '',
      };
    }
    case AUTH_VERIFY_OTP_FAIL: {
      return {
        ...state,
        verify_otp_success: false,
        verify_otp_loading: false,
        verify_otp_error_msg: action.data.msg,
      };
    }
    case AUTH_VERIFY_OTP_SUCCESS: {
      return {
        ...state,
        verify_otp_success: true,
        verify_otp_loading: false,
        verify_otp_error_msg: '',
      };
    }
    case AUTH_LOG_OUT: {
      return {
        ...state,
        log_out_success: false,
        log_out_loading: true,
        log_out_error_msg: '',
      };
    }
    case AUTH_LOG_OUT_FAIL: {
      return {
        ...state,
        log_out_success: false,
        log_out_loading: false,
        log_out_error_msg: action.data.msg,
      };
    }
    case AUTH_LOG_OUT_SUCCESS: {
      return {
        ...state,
        log_out_success: true,
        log_out_loading: false,
        log_out_error_msg: '',
        token: '',
        log_in_data: '',
        registerUser: '',
      };
    }
    /**
     * REGISTER PTB USER
     */
    case AUTH_REGISTER: {
      return {
        ...state,
        register_user_success: false,
        register_user_loading: true,
        register_user_error_msg: '',
        user: {},
        registerUser: action?.data?.data?.data,
      };
    }
    case AUTH_REGISTER_FAIL: {
      return {
        ...state,
        register_user_success: false,
        register_user_loading: false,
        register_user_error_msg: action.data.msg,
        registerUser: '',
        user: {},
      };
    }
    case AUTH_REGISTER_SUCCESS: {
      const {access_token} = action.data.data.data;
      return {
        ...state,
        register_user_success: true,
        register_user_loading: false,
        registerUser: action.data,
        register_user_error_msg: '',
        user: action?.data?.data?.data,
        token: access_token,
      };
    }
    /**
     * UPDATE PROFILE IMG
     */
    case UPDATE_PROFILE_IMG: {
      console.log('REDUCER UPDATE PROFILE IMAGE -->', action.data);
      return {
        ...state,
        update_user_profile_img_success: false,
        update_user_profile_img_loading: true,
        update_user_profile_img_error_msg: '',
      };
    }
    case UPDATE_PROFILE_IMG_FAIL: {
      return {
        ...state,
        update_user_profile_img_success: false,
        update_user_profile_img_loading: false,
        update_user_profile_img_error_msg: action.data.msg,
      };
    }
    case UPDATE_PROFILE_IMG_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          profile_pic: action?.data?.data?.data,
        },
        update_user_profile_img_success: true,
        update_user_profile_img_loading: false,
        update_user_profile_img_error_msg: '',
      };
    }

    default:
      return state;
  }
};
