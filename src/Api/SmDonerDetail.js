import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const SmDonorDetailApi = data => {
//   console.log(`${ApiPath.doner_profile_details}?user_id=${data}`, 'u<<rl');
  return axiosRequest.get(`${ApiPath.doner_profile_details}?user_id=${data}`);
};
