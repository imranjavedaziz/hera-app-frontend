import {PTB_PROFILE_DETAIL} from '../Type';
export const getPtbProfileDetail = data => {
  return {
    type: PTB_PROFILE_DETAIL,
    data: data,
  };
};
