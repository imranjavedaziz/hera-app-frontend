import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const PtbDashboardApi = () => {
  return axiosRequest.get(ApiPath.parentsMatchedDoner);
};
