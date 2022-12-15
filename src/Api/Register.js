import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const ptbRegisterApi = data => {
  return axiosRequest.post(ApiPath.register, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const saveBasicDetailApi = data => {
  return axiosRequest.post(ApiPath.profileRegister, data);
};

export const getStateApi = () => {
  return axiosRequest.get(ApiPath.states);
};
export const getProfileSetterApi = () => {
  return axiosRequest.get(ApiPath.profile_setter_data);
};
export const donorProfileDetailApi = userid => {
  return axiosRequest.get(`${ApiPath.doner_profile_details}?user_id=${userid}`);
};
