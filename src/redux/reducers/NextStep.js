import {NEXT_STEP, NEXT_STEP_FAIL, NEXT_STEP_SUCCESS} from '../Type';

const initState = {
  next_step_success: false,
  next_step_res: '',
  next_step_fail: false,
  next_step_error_msg: '',
  next_step_loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    /**
     * DOCUMENT_UPLOAD
     */
    case NEXT_STEP: {
      return {
        ...state,
        next_step_success: false,
        next_step_res: '',
        next_step_fail: false,
        next_step_error_msg: '',
        next_step_loading: true,
      };
    }
    case NEXT_STEP_FAIL: {
      return {
        ...state,
        next_step_success: false,
        next_step_res: '',
        next_step_fail: true,
        next_step_error_msg: action.data.msg,
        next_step_loading: false,
      };
    }
    case NEXT_STEP_SUCCESS: {
      return {
        ...state,
        next_step_success: true,
        next_step_res: action?.data?.data?.message,
        next_step_fail: false,
        next_step_error_msg: action.data.msg,
        next_step_loading: false,
      };
    }
    default:
      return state;
  }
};
