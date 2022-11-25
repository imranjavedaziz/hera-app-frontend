import {DELETE_ACCOUNT} from '../Type';

export const deleteAccount = payload => {
  return {
    type: DELETE_ACCOUNT,
    data: payload,
  };
};
