import {ApiPath} from '../constants';
import axiosRequest from '../utils/axiosRequest';

export const DocumentUploadApi = (data, isPayment = false) => {
  return axiosRequest.post(
    isPayment ? ApiPath.documentPaymentUpload : ApiPath.documentUpload,
    data,
  );
};
export const DocumentGetApi = (payload, page = 1, limit = 15) => {
  return axiosRequest.get(
    `${ApiPath.chatMedia}?to_user_id=${payload.data}&page=${payload.page}&limit=${payload.limit}`,
  );
};
