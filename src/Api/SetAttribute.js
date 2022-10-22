import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const getAttributes = () => {
  return axiosRequest.get(ApiPath.get_attributes);
};

export const saveAttributes = data => {
  return axiosRequest.post(ApiPath.setAttributes, data);
};
