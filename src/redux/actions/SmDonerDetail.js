import {SM_DONOR_DETAIL} from '../Type';

export const SmDonerDetail = data => {
  console.log('actiondataa', data);
  return {
    type: SM_DONOR_DETAIL,
    data: data,
  };
};
