import {ACCOUNT_STATUS, ACCOUNT_STATUS_CLEAN} from '../Type';

export const getAccountStatus = () => {
  return {
    type: ACCOUNT_STATUS,
  };
};
export const cleanAccountStatus = () => ({type: ACCOUNT_STATUS_CLEAN});
