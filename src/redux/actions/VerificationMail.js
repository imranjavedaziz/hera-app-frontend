import {VERIFY_MAIL, SEND_VERIFICATION_MAIL} from '../Type';

export const verifyEmail = userInfo => {
  return {
    type: VERIFY_MAIL,
    data: userInfo,
  };
};
export const sendVerificationMail = () => {
  return {
    type: SEND_VERIFICATION_MAIL,
    data: '',
  };
};
