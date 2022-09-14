// request
import axios from 'axios';
import { api_url } from '../constants/Constants';

const axiosRequest = axios.create({
    baseURL: api_url,
});

axiosRequest.interceptors.request.use(
  (request) => {
    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        // get access token from refresh token and retry
        originalRequest._retry = true;
        return axiosRequest(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default axiosRequest;
