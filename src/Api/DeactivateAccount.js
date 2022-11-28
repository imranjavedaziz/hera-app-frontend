import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const deactivateAccountApi = data => {
  return axiosRequest.post(ApiPath.update_account_status, data);
};

export const getDeactivateReasonApi = () => {
  return axiosRequest.get(ApiPath.account_deactive_reason);
};
