import { REASONS_LIST_DEACTIVATE, DEACTIVATE_ACCOUNT, } from '../Type';

export const deactivateAccount = data => {
  console.log("LINE NUMBER 4 DEACTIVATE ACTION",data);
  return {
    type: DEACTIVATE_ACCOUNT,
    data: data,
  };
};

export const getDeactivateReason = data => {
  return {
    type: REASONS_LIST_DEACTIVATE,
    data: data,
  };
};
