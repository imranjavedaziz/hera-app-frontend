import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const loginInApi = userid => {
  return axiosRequest.get(`${ApiPath.ptbProfileDetails}?user_id=${userid}`);
};
