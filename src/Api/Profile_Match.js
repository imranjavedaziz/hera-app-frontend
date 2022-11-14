import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const ProfileMatchApi = data => {
  return axiosRequest.post(ApiPath.profileMatchRequest, data);
};
export const ProfileMatchResponseApi = data => {
  return axiosRequest.post(ApiPath.profile_match_request_response, data);
};
