import {REPORT_USER} from '../Type';

export const ReportUser = payload => {
  return {
    type: REPORT_USER,
    data: payload,
  };
};
