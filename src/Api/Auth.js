import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const loginInApi = data => {
  return axiosRequest.post(ApiPath.login, data);
};
export const deviceRegisterApi = data => {
  return axiosRequest.post(ApiPath.registerDevice, data);
};
export const mobileNumberApi = data => {
  return axiosRequest.post(ApiPath.sendOtp, data, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const verifyOtpApi = data => {
  return axiosRequest.post(ApiPath.verifyOtp, data);
};

export const logOutApi = data => {
  return axiosRequest.get(`${ApiPath.logout}?device_id=${data}`);
};
export const updateProfileImgApi = data => {
  return axiosRequest.post(ApiPath.update_profile_img, data);
};
