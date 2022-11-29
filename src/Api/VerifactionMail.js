import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';
export const verifyEmail = data => {
  return axiosRequest.post(ApiPath.verifyEmail, data);
};
export const sendVerificationMail = data => {
  return axiosRequest.post(ApiPath.send_verification_mail, data);
};
