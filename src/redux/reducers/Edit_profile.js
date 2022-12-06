import {
  GET_USER_DETAIL,
  GET_USER_DETAIL_FAIL,
  GET_USER_DETAIL_SUCCESS,
  UPDATE_USER_DETAIL,
  UPDATE_USER_DETAIL_FAIL,
  UPDATE_USER_DETAIL_SUCCESS,
  TOGGLE_NOTIFICATION,
  TOGGLE_NOTIFICATION_FAIL,
} from '../Type';

const initState = {
  get_user_detail_res: {
    id: 0,
    role_id: 1,
    first_name: '',
    middle_name: '',
    last_name: "'",
    email: '',
    email_verified: 0,
    phone_no: '',
    dob: '',
    user_profile: null,
    location: null,
    subscription: null,
    notification_setting: {
      notify_status: true,
    }
  },
  get_user_detail_success: false,
  get_user_detail_loading: false,
  get_user_detail_error: '',
  update_user_detail_success: false,
  update_user_detail_loading: false,
  update_user_detail__error_msg: '',
  update_user_detail_res: '',
};
export default (state = initState, action) => {
  switch (action.type) {
    /**
     * Gallery
     */
    case GET_USER_DETAIL:
      return {
        ...state,
        get_user_detail_res: initState.get_user_detail_res,
        get_user_detail_success: false,
        get_user_detail_loading: true,
        get_user_detail_error: '',
      };
    case GET_USER_DETAIL_SUCCESS:
      return {
        ...state,
        get_user_detail_res: action.data.data.data,
        get_user_detail_success: true,
        get_user_detail_loading: false,
        get_user_detail_error: '',
      };
    case GET_USER_DETAIL_FAIL:
      return {
        ...state,
        get_user_detail_res: initState.get_user_detail_res,
        get_user_detail_success: false,
        get_user_detail_loading: false,
        get_user_detail_error: action.data.msg,
      };
    case TOGGLE_NOTIFICATION: {
      return {
        ...state,
        get_user_detail_res: {
          ...state.get_user_detail_res,
          notification_setting: {
            ...state.get_user_detail_res.notification_setting,
            notify_status: action.data.notify_status
          }
        }
      }
    }
    case TOGGLE_NOTIFICATION_FAIL: {
      return {
        ...state,
        get_user_detail_res: {
          ...state.get_user_detail_res,
          notification_setting: {
            ...state.get_user_detail_res.notification_setting,
            notify_status: action.data
          }
        }
      }
    }
    case UPDATE_USER_DETAIL:
      return {
        ...state,
        update_user_detail_success: false,
        update_user_detail_loading: true,
        update_user_detail__error_msg: '',
        update_user_detail_res: '',
      };
    case UPDATE_USER_DETAIL_SUCCESS:
      return {
        ...state,
        update_user_detail_success: true,
        update_user_detail_loading: false,
        update_user_detail__error_msg: '',
        update_user_detail_res: action.data?.data?.message,
      };
    case UPDATE_USER_DETAIL_FAIL:
      return {
        ...state,
        update_user_detail_success: false,
        update_user_detail_loading: false,
        update_user_detail__error_msg: action.data.msg,
        update_user_detail_res: '',
      };
    default:
      return state;
  }
};
