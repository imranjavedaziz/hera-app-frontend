import { CREATE_SUBSCRIPTION, SUBSCRIPTION_PLAN, SUBSCRIPTION_STATUS,UPDATE_SUBSCRIPTION_STATUS, SUBSCRIPTION_STATUS_SUCCESS } from '../Type';

export const createSubscription = data => {
  return {
    type: CREATE_SUBSCRIPTION,
    data,
  };
};

export const getSubscriptionPlan = data => {
  return {
    type: SUBSCRIPTION_PLAN,
    data,
  };
};

export const getSubscriptionStatus = data => {
  return {
    type: SUBSCRIPTION_STATUS,
    data,
  };
};
export const updateSubscriptionStatus = data => ({
  type: UPDATE_SUBSCRIPTION_STATUS,
  data,
})

export const updateTrail = data => ({
  type: SUBSCRIPTION_STATUS_SUCCESS,
  data,
})
