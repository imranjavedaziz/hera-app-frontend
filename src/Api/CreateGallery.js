import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const getUserGalleryApi = () => {
  return axiosRequest.get(ApiPath.getGallery);
};

export const deleteGalleryApi = data => {
  // console.log(`${ApiPath.deleteGallery}?${data}`, 'newurl');
  return axiosRequest.delete(`${ApiPath.deleteGallery}?${data}`);
};
