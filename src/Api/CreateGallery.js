import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';
import {hideAppLoader, showAppToast} from '../redux/actions/loader';

export const getUserGalleryApi = () => {
  return axiosRequest.get(ApiPath.getGallery);
};

export const deleteGallery = data => {
  console.log("delIMG",data)
  return axiosRequest.delete(ApiPath.deleteGallery, data);
};
