import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const createSubscriptionApi = data => {
  return axiosRequest.post(ApiPath.createSubscription, data);
};

export const subscriptionPlanApi = () => {
  return axiosRequest.get(ApiPath.subscriptionPlan);
};

export const subscriptionStatusApi = () => {
  return axiosRequest.get(ApiPath.subscriptionStatus);
};
