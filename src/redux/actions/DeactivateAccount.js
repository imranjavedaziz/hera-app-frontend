import { REASONS_LIST_DEACTIVATE, DEACTIVATE_ACCOUNT, } from '../Type';

export const deactivateAccount = data => {
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
