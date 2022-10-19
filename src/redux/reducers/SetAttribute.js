import {
  GET_ATTRIBUTE,
  GET_ATTRIBUTE_FAIL,
  GET_ATTRIBUTE_SUCCESS,
  SAVE_ATTRIBUTE,
  SAVE_ATTRIBUTE_FAIL,
  SAVE_ATTRIBUTE_SUCCESS,
} from '../Type';

const initState = {
  set_attribute_res: [],
  set_attribute_success: false,
  set_attribute_loading: false,
  set_attribute_error_msg: '',

  save_attribute_success: false,
  save_attribute_loading: false,
  save_attribute_error_msg: '',
};

export default (state = initState, action) => {
  console.log(action.data?.data, 'action.data', 'action.type', action.type);
  switch (action.type) {
    case GET_ATTRIBUTE: {
      return {
        ...state,
        set_attribute_success: false,
        set_attribute_loading: true,
        set_attribute_error_msg: '',
        set_attribute_res: action.data,
      };
    }
    case GET_ATTRIBUTE_FAIL: {
      return {
        ...state,
        set_attribute_success: false,
        set_attribute_loading: false,
        set_attribute_error_msg: action.data.msg,
        set_attribute_res: '',
      };
    }
    case GET_ATTRIBUTE_SUCCESS: {
      return {
        ...state,
        set_attribute_success: true,
        set_attribute_loading: false,
        set_attribute_error_msg: '',
        set_attribute_res: action.data?.data?.data,
      };
    }
    /**
     * SAVE ATTRIBUTE
     */
    case SAVE_ATTRIBUTE: {
      return {
        ...state,
        save_attribute_success: false,
        save_attribute_loading: false,
        save_attribute_error_msg: '',
      };
    }
    case SAVE_ATTRIBUTE_FAIL: {
      return {
        ...state,
        save_attribute_success: false,
        save_attribute_loading: false,
        save_attribute_error_msg: action.data.msg,
      };
    }
    case SAVE_ATTRIBUTE_SUCCESS: {
      return {
        ...state,
        save_attribute_success: true,
        save_attribute_loading: false,
        save_attribute_error_msg:action.data?.data?.message,
      };
    }
    default:
      return state;
  }
};
