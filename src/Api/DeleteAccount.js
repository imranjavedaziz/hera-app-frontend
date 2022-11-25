import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const deleteAccountApi = data => {
  return axiosRequest.delete(`${ApiPath.delete_account}?password=${data}`);
};
