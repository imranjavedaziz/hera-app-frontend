import { CREATE_SUBSCRIPTION, SUBSCRIPTION_PLAN, SUBSCRIPTION_STATUS, } from '../Type';

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
