import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const setPreferenceApi = () => {
  return axiosRequest.get(ApiPath.preference_setter_data);
};

export const savePreferenceApi = data => {
  return axiosRequest.post(ApiPath.setPreferences, data);
};

export const getPreferenceApi = () => {
  return axiosRequest.get(ApiPath.get_preference);
};
