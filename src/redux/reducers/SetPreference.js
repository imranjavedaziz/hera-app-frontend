import {
  SET_PREFERENCE,
  SET_PREFERENCE_FAIL,
  SET_PREFERENCE_SUCCESS,
  SAVE_PREFERENCE,
  SAVE_PREFERENCE_FAIL,
  SAVE_PREFERENCE_SUCCESS,
} from '../Type';

const initState = {
  set_preference_res: [
    {
      role_id_looking_for: '',
      age: '',
      height: '',
      race: '',
      education: '',
      hair_colour: '',
      eye_colour: '',
      ethnicity: '',
      state: '',
    },
  ],
  set_preference_success: false,
  set_preference_loading: false,
  set_preference_error_msg: '',

  save_preference_success: false,
  save_preference_loading: false,
  save_preference_error_msg: '',
  save_preference_res: '',
};

export default (state = initState, action) => {
  switch (action.type) {
    // SET PREFERENCE
    case SET_PREFERENCE: {
      return {
        ...state,
        set_preference_success: false,
        set_preference_loading: true,
        set_preference_error_msg: '',
        set_preference_res: action.data,
      };
    }
    case SET_PREFERENCE_FAIL: {
      return {
        ...state,
        set_preference_success: false,
        set_preference_loading: false,
        set_preference_error_msg: action.data.msg,
        set_preference_res: '',
      };
    }
    case SET_PREFERENCE_SUCCESS: {
      return {
        ...state,
        set_preference_success: true,
        set_preference_loading: false,
        set_preference_error_msg: '',
        set_preference_res: action?.data?.data?.data,
      };
    }
    /**
     * SAVE PREFERENCE
     */
    case SAVE_PREFERENCE: {
      return {
        ...state,
        save_preference_success: false,
        save_preference_loading: true,
        save_preference_error_msg: '',
      };
    }
    case SAVE_PREFERENCE_FAIL: {
      return {
        ...state,
        save_preference_success: false,
        save_preference_loading: false,
        save_preference_error_msg: action.data.msg,
      };
    }
    case SAVE_PREFERENCE_SUCCESS: {
      return {
        ...state,
        save_preference_success: true,
        save_preference_loading: false,
        save_preference_error_msg: '',
        save_preference_res: action?.data?.data?.data,
      };
    }
    default:
      return state;
  }
};
