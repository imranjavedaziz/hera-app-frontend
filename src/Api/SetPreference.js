import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';


export const setPreferenceApi = () => {
  return  axiosRequest.get(ApiPath.preference_setter_data)
};
