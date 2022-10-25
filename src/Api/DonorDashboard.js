import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const DonorDashboardApi = (payload) => {
  console.log(payload, "payload:::::");
  return axiosRequest.get(
    `${ApiPath.ptbProfileCard}?keyword=${payload?.keyword}&state_ids${payload?.state_ids}&limit=${payload?.limit}&page=${payload.page}`
  );
};
