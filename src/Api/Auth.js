import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const loginInApi = data => {
  return axiosRequest.post(ApiPath.login, data);
};

export const mobileNumberApi = data => {
  return axiosRequest.post(ApiPath.sendOtp, data);
};

export const verifyOtpApi = data => {
  return axiosRequest.post(ApiPath.verifyOtp, data);
};

export const logOutApi = () => {
  return axiosRequest.post(ApiPath.logout);
};

export const updateProfileImgApi = data => {
  return axiosRequest.post(ApiPath.update_profile_img, data);
};
