import {VERIFY_MAIL, SEND_VERIFICATION_MAIL} from '../Type';

export const verifyEmail = userInfo => {
  return {
    type: VERIFY_MAIL,
    data: userInfo,
  };
};
export const sendVerificationMail = data => {
  return {
    type: SEND_VERIFICATION_MAIL,
    data: data,
  };
};
