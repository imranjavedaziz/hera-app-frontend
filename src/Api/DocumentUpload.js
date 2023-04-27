import {ApiPath} from '../constants';
import axiosRequest from '../utils/axiosRequest';

export const DocumentUploadApi = data => {
  return axiosRequest.post(ApiPath.documentUpload, data);
};
export const DocumentGetApi = data => {
  return axiosRequest.get(`${ApiPath.chatMedia}?to_user_id=${data}`);
};
