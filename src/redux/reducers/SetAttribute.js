import {
  GET_ATTRIBUTE, GET_ATTRIBUTE_FAIL, GET_ATTRIBUTE_SUCCESS,
} from "../Type";

const initState = {
  set_attribute_res: [],
  set_attribute_success: false,
  set_attribute_loading: false,
  set_attribute_error_msg: '',
};

export default (state = initState, action) => {
  console.log(action.data,'action.data','action.type',action.type)
  switch (action.type) {
    case GET_ATTRIBUTE: {
      return {
        ...state,
        set_preference_success: false,
        set_preference_loading: true,
        set_preference_error_msg: '',
        set_preference_res: action.data,
      };
    }
    case GET_ATTRIBUTE_FAIL: {
      return {
        ...state,
        set_preference_success: false,
        set_preference_loading: false,
        set_preference_error_msg: action.data.msg,
        set_preference_res: '',
      };
    }
    case GET_ATTRIBUTE_SUCCESS: {
      return {
        ...state,
        set_preference_success: true,
        set_preference_loading: false,
        set_preference_error_msg: '',
        set_preference_res: action.data,
      };
    }
    default:
      return state;
  }
};
