import {PTB_PROFILE_DETAIL, SEND_LIKE_PTB} from '../Type';
export const getPtbProfileDetail = data => {
  return {
    type: PTB_PROFILE_DETAIL,
    data: data,
  };
};

export const sendLikePtb = payload => {
  return {
    type: SEND_LIKE_PTB,
    data: payload,
  };
};
