import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const GetMatchListApi = payload => {
  return axiosRequest.get(`${ApiPath.match_list}?keyword=${payload?.keyword}`);
};
export const GetPaymentRequestListApi = () => {
  return axiosRequest.get(ApiPath.payment_request_list);
};
export const UpdateRequestStatus = data => {
  return axiosRequest.post(ApiPath.payment_request_status, data);
};
export const GetPaymentHistoryApi = (page = 1) => {
  return axiosRequest.get(`${ApiPath.transactionHistory}?page=${page}`);
};
export const paymentTransferApi = data => {
  return axiosRequest.post(ApiPath.payment_transfer, data);
};

export const GetMatchListPageApi = (page = 1) => {
  return axiosRequest.get(`${ApiPath.match_list}?page=${page}`);
};
export const GetPaymentRequestPageApi = (page = 1) => {
  return axiosRequest.get(`${ApiPath.payment_request_list}?page=${page}`);
};
