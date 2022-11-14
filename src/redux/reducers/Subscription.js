import {
  CREATE_SUBSCRIPTION,
  CREATE_SUBSCRIPTION_SUCCESS,
  CREATE_SUBSCRIPTION_FAIL
} from '../Type';

const initState = {
  create_subscription_success: false,
  create_subscriptionloading: false,
  create_subscription_error_msg: '',
  create_subscription_res: '',
};

export default (state = initState, action) => {
  console.log('action.?.message', action.data?.data?.message);
  switch (action.type) {
    /**
     * INQUIRY FORM
     */
    case CREATE_SUBSCRIPTION:
      return {
        ...state,
        create_subscription_success: false,
        create_subscriptionloading: true,
        create_subscription_error_msg: '',
      };
    case CREATE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        create_subscription_success: true,
        create_subscriptionloading: false,
        create_subscription_error_msg: '',
        create_subscription_res: action.data?.data?.message,
      };
    case CREATE_SUBSCRIPTION_FAIL:
      return {
        ...state,
        create_subscription_success: false,
        create_subscriptionloading: false,
        create_subscription_error_msg: action.data.msg,
      };
    default:
      return state;
  }
};
