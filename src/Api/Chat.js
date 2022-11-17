import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const chatFeedback = data => {
  return axiosRequest.post(ApiPath.chat_feedback, data);
};
