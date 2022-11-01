import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const supportApi = data => {
  return axiosRequest.post(ApiPath.enquiry, data);
};

export const userTypeApi = () => {
  return axiosRequest.get(ApiPath.userType);
};
