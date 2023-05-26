import {
  SET_USER,
  SIGNOUT_USER,
  UPDATE_TOKEN,
  UPDATE_REG_STEP,
  SET_BASIC_DETAILS,
  SET_ATTRIBUTES,
  USE_LOCAL_IMAGE,
  USE_NAME,
} from '../constants';

import {
  AUTH_LOG_IN,
  AUTH_LOG_IN_FAIL,
  AUTH_LOG_IN_SUCCESS,
  AUTH_MOBILE_NUMBER,
  AUTH_MOBILE_NUMBER_SUCCESS,
  AUTH_MOBILE_NUMBER_FAIL,
  AUTH_MOBILE_NUMBER_RESET,
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
  DEVICE_REGISTER,
  DEVICE_REGISTER_FAIL,
  DEVICE_REGISTER_SUCCESS,
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
  login: false,
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
  register_user_success_data: null,
  register_user_loading: false,
  register_user_error_msg: '',
  update_user_profile_img_success: false,
  update_user_profile_img_fail: false,
  update_user_profile_img_error_msg: '',
  update_message: '',
  device_info: {
    device_id: '',
    device_token: '',
    device_type: '',
  },
  device_info_error_msg: '',
  device_info_loading: false,
  device_info_success: false,
};

export default (state = initState, action) => {
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
        register_user_success: false,
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
        login: true,
        register_user_success: false,
      };
    }

    case USE_LOCAL_IMAGE: {
      return {
        ...state,
        user: {
          ...state.user,
          profile_pic: action.data,
        },
      };
    }
    case USE_NAME: {
      return {
        ...state,
        user: {
          ...state.user,
          first_name: action.data.first_name,
          last_name: action.data.last_name,
          middle_name: action.data.middle_name,
        },
      };
    }
    // DEVICE REGISTER
    case DEVICE_REGISTER: {
      return {
        ...state,
        device_info_success: false,
        device_info_loading: true,
        device_info_error_msg: '',
        device_info: {},
      };
    }
    case DEVICE_REGISTER_FAIL: {
      return {
        ...state,
        device_info_success: false,
        device_info_loading: false,
        device_info_error_msg: action.data.msg,
        device_info: {},
      };
    }
    case DEVICE_REGISTER_SUCCESS: {
      return {
        ...state,
        device_info_success: true,
        device_info_loading: false,
        device_info_error_msg: '',
        device_info: action?.data?.data?.data,
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
        register_user_success: false,
        registration_step: 1,
      };
    case AUTH_MOBILE_NUMBER: {
      return {
        ...state,
        mobile_number_success: false,
        mobile_number_loading: true,
        mobile_number_error_msg: '',
      };
    }
    case AUTH_MOBILE_NUMBER_RESET: {
      return {
        ...state,
        mobile_number_success: false,
        mobile_number_loading: false,
        mobile_number_error_msg: '',
        register_user_success_data: null,
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
        register_user_success_data: action.data,
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
        user: initState.user,
        gallery: initState.gallery,
        register_user_success: false,
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
        // user: initState.user,
        log_in_data: action?.data?.data?.data,
      };
    }
    case AUTH_REGISTER_FAIL: {
      return {
        ...state,
        register_user_success: false,
        register_user_loading: false,
        register_user_error_msg: action.data.msg,
        registerUser: '',
        // user: initState.user,
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
        log_in_data: action?.data?.data?.data,
        user: {
          ...action?.data?.data?.data,
          profile_pic: state.user.profile_pic,
        },
        token: access_token,
        login: true,
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
        update_message: action.data?.data?.message,
      };
    }

    default:
      return state;
  }
};
