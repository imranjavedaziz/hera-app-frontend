import {DONOR_DASHBOARD} from '../Type';

export const getDonorDashboard = (payload) => {
  return {
    type: DONOR_DASHBOARD,
    data: payload,
  };
};
