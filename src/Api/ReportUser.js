import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const ReportUserApi = data => {
  return axiosRequest.post(ApiPath.report_user, data);
};
