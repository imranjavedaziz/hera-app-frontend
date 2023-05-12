import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const kycUpdateApi = data => {
  return axiosRequest.post(ApiPath.kyc_update, data);
};
export const bankUpdateApi = data => {
  return axiosRequest.post(ApiPath.update_bank_account, data);
};
