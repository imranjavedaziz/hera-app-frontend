import {
  CREATE_SUBSCRIPTION,
  CREATE_SUBSCRIPTION_SUCCESS,
  CREATE_SUBSCRIPTION_FAIL,
  SUBSCRIPTION_PLAN,
  SUBSCRIPTION_PLAN_SUCCESS,
  SUBSCRIPTION_PLAN_FAIL,
  SUBSCRIPTION_STATUS,
  SUBSCRIPTION_STATUS_SUCCESS,
  SUBSCRIPTION_STATUS_FAIL
} from '../Type';

const initState = {
  // CREATE
  create_subscription_success: false,
  create_subscription_loading: false,
  create_subscription_error_msg: '',
  create_subscription_res: '',
  // PLAN
  subscription_plan_success: false,
  subscription_plan_loading: false,
  subscription_plan_error_msg: '',
  subscription_plan_res: '',
  // STATUS
  subscription_status_success: false,
  subscription_status_loading: false,
  subscription_status_error_msg: '',
  subscription_status_res: '',

};

export default (state = initState, action) => {
  console.log('action.?.message', action.data?.data?.message);
  switch (action.type) {
    /**
     * CREATE_SUBSCRIPTION 
     */
    case CREATE_SUBSCRIPTION:
      return {
        ...state,
        create_subscription_success: false,
        create_subscription_loading: true,
        create_subscription_error_msg: '',
        create_subscription_res: action.data,

      };
    case CREATE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        create_subscription_success: true,
        create_subscription_loading: false,
        create_subscription_error_msg: '',
        subscription_status_res: action.data?.data?.message,
      };
    case CREATE_SUBSCRIPTION_FAIL:
      return {
        ...state,
        create_subscription_success: false,
        create_subscription_loading: false,
        create_subscription_error_msg: action.data.msg,
        create_subscription_res: action?.data?.data,
      };
    /**
      * GET SUBSCRIPTION PLAN
     */
    case SUBSCRIPTION_PLAN: {
      return {
        ...state,
        subscription_plan_success: false,
        subscription_plan_loading: true,
        subscription_plan_error_msg: '',
        subscription_plan_res: action.data,
      };
    }
    case SUBSCRIPTION_PLAN_SUCCESS: {
      return {
        ...state,
        subscription_plan_success: false,
        subscription_plan_loading: false,
        subscription_plan_error_msg: action.data.msg,
        subscription_plan_res: {},
      };
    }
    case SUBSCRIPTION_PLAN_FAIL: {
      return {
        ...state,
        subscription_plan_success: true,
        subscription_plan_loading: false,
        subscription_plan_error_msg: '',
        subscription_plan_res: action?.data?.data,
      };
    }
    /**
      * GET SUBSCRIPTION STATUS
     */
    case SUBSCRIPTION_STATUS: {
      return {
        ...state,
        subscription_status_success: false,
        subscription_status_loading: true,
        subscription_status_error_msg: '',
        subscription_status_res: action.data,
      };
    }
    case SUBSCRIPTION_STATUS_SUCCESS: {
      return {
        ...state,
        subscription_status_success: false,
        subscription_status_loading: false,
        subscription_status_error_msg: action.data.msg,
        subscription_status_res: {},
      };
    }
    case SUBSCRIPTION_STATUS_FAIL: {
      return {
        ...state,
        subscription_status_success: true,
        subscription_status_loading: false,
        subscription_status_error_msg: '',
        subscription_status_res: action?.data?.data,
      };
    }
    default:
      return state;
  }
};
