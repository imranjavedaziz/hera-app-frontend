import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const ProfileMatchApi = data => {
  return axiosRequest.post(ApiPath.profileMatchRequest, data);
};
