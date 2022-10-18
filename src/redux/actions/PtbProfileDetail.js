import {PTB_PROFILE_DETAIL} from '../Type';
export const getPtbProfileDetail = (data) => {
   console.log("datasaneesh",data)
    return {
      type: PTB_PROFILE_DETAIL,
      data: data,
    };
  };