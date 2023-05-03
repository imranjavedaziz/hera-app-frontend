import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const accountStatusApi = () => {
  return axiosRequest.get(ApiPath.account_status);
};
