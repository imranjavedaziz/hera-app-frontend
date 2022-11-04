import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const getUserGalleryApi = () => {
  return axiosRequest.get(ApiPath.getGallery);
};

export const deleteGalleryApi = data => {
  console.log(data,'data:::::')
  console.log(`${ApiPath.deleteGallery}?ids=${data?.ids}`,'`${ApiPath.deleteGallery}?ids=${data?.ids}`')
  return axiosRequest.delete(`${ApiPath.deleteGallery}?ids=${data?.ids}`);
};
