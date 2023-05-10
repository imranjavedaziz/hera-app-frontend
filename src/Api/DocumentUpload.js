import {ApiPath} from '../constants';
import axiosRequest from '../utils/axiosRequest';

export const DocumentUploadApi = (data,isPayment=false) => {
  return axiosRequest.post(isPayment?ApiPath.documentPaymentUpload:ApiPath.documentUpload, data);
};
export const DocumentGetApi = data => {
  return axiosRequest.get(`${ApiPath.chatMedia}?to_user_id=${data}`);
};
