import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const PtbDashboardApi = () => {
  return axiosRequest.get(ApiPath.parentsMatchedDoner);
};
export const PtbProfileDetailApi = (data) => {
  console.log("url",`${ApiPath.ptbProfileDetails}?user_id=${data}`)
  return axiosRequest.get(`${ApiPath.ptbProfileDetails}?user_id=${data}`);
};

