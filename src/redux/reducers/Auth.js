import {
  SET_USER,
  SIGNOUT_USER,
  UPDATE_TOKEN,
  UPDATE_REG_STEP,
  SET_BASIC_DETAILS,
  SET_ATTRIBUTES,
  GET_GALLERY,
} from '../constants';
import {AUTH_LOG_IN, AUTH_LOG_IN_FAIL, AUTH_LOG_IN_SUCCESS} from '../Type';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
};

export default (state = initState, action) => {
  console.log(action?.data?.data, "action.data.data");
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
        log_in_data: action.data,
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
      // AsyncStorage.setItem('token', access_token);
      return {
        ...state,
        user:action?.data?.data?.data,

        log_in_success: true,
        log_in_loading: false,
        token: access_token,
        log_in_data: action.data,
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
          access_token: action,
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
    default:
      return state;
  }
};
