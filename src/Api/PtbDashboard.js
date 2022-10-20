import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const PtbDashboardApi = () => {
  return axiosRequest.get(ApiPath.parentsMatchedDoner);
};
export const PtbProfileDetailApi = (data) => {
  return axiosRequest.get(`${ApiPath.ptbProfileDetails}?user_id=${data}`);
};

