import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const DonorDashboardApi = (payload) => {
   return axiosRequest.get(
    payload?.state_ids !== ''
    ? `${ApiPath.ptbProfileCard}?keyword=${payload?.keyword}&state_ids[]=${payload?.state_ids}&limit=${payload?.limit}&page=${payload.page}`
    : `${ApiPath.ptbProfileCard}?keyword=${payload?.keyword}&limit=${payload?.limit}&page=${payload.page}`,
    );
};
