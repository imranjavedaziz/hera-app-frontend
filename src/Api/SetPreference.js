import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';


export const setPreferenceApi = data => {
  return axiosRequest.post(ApiPath.setPreferences, data);
};