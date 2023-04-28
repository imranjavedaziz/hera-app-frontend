import {ApiPath} from '../constants';
import axiosRequest from '../utils/axiosRequest';

export const NextStepApi = data => {
  return axiosRequest.post(ApiPath.next_steps, data);
};
