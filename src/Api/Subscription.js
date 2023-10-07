import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const createSubscriptionPaymentPageApi = data => {
  return axiosRequest.post(ApiPath.createSubscriptionPaymentPage, data);
};

export const createSubscriptionApi = data => {
  return axiosRequest.post(ApiPath.createSubscription, data);
};

export const subscriptionPlanApi = () => {
  return axiosRequest.get(ApiPath.subscriptionPlan);
};

export const subscriptionStatusApi = () => {
  return axiosRequest.get(ApiPath.subscriptionStatus);
};

export const cancelStripeSubscriptionApi = () => {
  return axiosRequest.post(ApiPath.cancelSubscription);
};
