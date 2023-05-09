import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const GetMatchListApi = payload => {
  return axiosRequest.get(`${ApiPath.match_list}?keyword=${payload?.keyword}`);
};
