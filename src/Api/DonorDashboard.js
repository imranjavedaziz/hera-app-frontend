import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const DonorDashboardApi = () => {
  return axiosRequest.get(
    `${ApiPath.ptbProfileCard}?state_ids%5B%5D=1&page=1&limit=${10}`,
  );
};
