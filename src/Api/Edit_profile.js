import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const getEditProfileApi = () => {
  return axiosRequest.get(ApiPath.get_user_detail);
};
export const updateEditProfileApi = data => {
  return axiosRequest.post(ApiPath.update_user_detail, data);
};

export const toggleNotificationApi = data => {
  return axiosRequest.post(ApiPath.updateNotifyStatus, data);
}
