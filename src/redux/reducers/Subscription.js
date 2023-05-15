import {
  CREATE_SUBSCRIPTION,
  CREATE_SUBSCRIPTION_SUCCESS,
  CREATE_SUBSCRIPTION_FAIL,
  SUBSCRIPTION_PLAN,
  SUBSCRIPTION_PLAN_SUCCESS,
  SUBSCRIPTION_PLAN_FAIL,
  SUBSCRIPTION_STATUS,
  SUBSCRIPTION_STATUS_SUCCESS,
  SUBSCRIPTION_STATUS_FAIL,
  UPDATE_SUBSCRIPTION_STATUS,
  CANCEL_SUBSCRIPTION,
  CANCEL_SUBSCRIPTION_FAIL,
  CANCEL_SUBSCRIPTION_SUCCESS,
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
  subscription_status_res: {
    data: {is_trial: true, status: 1}
  },
  // CANCEL
  cancel_subscription_success: false,
  cancel_subscription_loading: false,
  cancel_subscription_error_msg: '',
  cancel_subscription_res: '',
};

export default (state = initState, action) => {
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
        create_subscription_res: action.data?.data?.message,
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
        subscription_plan_res: '',
      };
    }
    case SUBSCRIPTION_PLAN_SUCCESS: {
      return {
        ...state,
        subscription_plan_success: true,
        subscription_plan_loading: false,
        subscription_plan_error_msg: '',
        subscription_plan_res: action?.data?.data,
      };
    }
    case SUBSCRIPTION_PLAN_FAIL: {
      return {
        ...state,
        subscription_plan_success: false,
        subscription_plan_loading: false,
        subscription_plan_error_msg: action?.data?.msg,
        subscription_plan_res: {},
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
      };
    }
    case SUBSCRIPTION_STATUS_SUCCESS: {
      return {
        ...state,
        subscription_status_success: true,
        subscription_status_loading: false,
        subscription_status_error_msg: '',
        subscription_status_res: action?.data?.data,
      };
    }
    case SUBSCRIPTION_STATUS_FAIL: {
      return {
        ...state,
        subscription_status_success: false,
        subscription_status_loading: false,
        subscription_status_error_msg: '',
      };
    }
    case UPDATE_SUBSCRIPTION_STATUS: {
      return {
        ...state,
        subscription_status_res: {
          ...state.subscription_status_res,
          data: {
            ...state.subscription_status_res.data,
            status: action?.data,
          }
        }
      }
    }
    /**
     * CREATE_SUBSCRIPTION
     */
    case CANCEL_SUBSCRIPTION:
      return {
        ...state,
        cancel_subscription_success: false,
        cancel_subscription_loading: true,
        cancel_subscription_error_msg: '',
        create_subscription_res: action.data,
      };
    case CANCEL_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        cancel_subscription_success: true,
        cancel_subscription_loading: false,
        cancel_subscription_res: action.data?.data?.message,
      };
    case CANCEL_SUBSCRIPTION_FAIL:
      return {
        ...state,
        cancel_subscription_loading: false,
        cancel_subscription_error_msg: action.data.msg,
      };
    default:
      return state;
  }
};
