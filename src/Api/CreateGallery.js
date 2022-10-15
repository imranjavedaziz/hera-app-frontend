import axiosRequest from "../utils/axiosRequest";
import ApiPath from "../constants/ApiPath";



export const getUserGalleryApi = () => {
  return axiosRequest.get(ApiPath.getGallery);
};
