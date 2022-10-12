import {
  SET_USER,
  SIGNOUT_USER,
  UPDATE_TOKEN,
  UPDATE_REG_STEP,
  SET_BASIC_DETAILS,
  SET_ATTRIBUTES,
  GET_GALLERY,
} from '../constants';

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
  gallery:{
    doner_photo_gallery:[],
    doner_video_gallery:[],
  },
};

export default (state = initState, {type = '', payload = null} = {}) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload,
      };
    case UPDATE_TOKEN:
      return {
        ...state,
        user: {
          ...state.user,
          access_token: payload,
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
        basic: payload,
      };
    case SET_ATTRIBUTES:
      return {
        ...state,
        attributes: payload,
      };
    case SIGNOUT_USER:
      return {
        ...state,
        user: initState.user,
        gallery:initState.gallery
      };
    case GET_GALLERY:
      return {
        ...state,
        gallery: payload,
      }
    default:
      return state;
  }
};
