import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const loginInApi = data => {
  return axiosRequest.post(ApiPath.login, data);
};

