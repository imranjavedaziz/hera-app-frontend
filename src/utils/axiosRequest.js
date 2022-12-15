// request
import axios from 'axios';
import {api_url} from '../constants/Constants';
import {store} from '../redux/store';
import {showAppToast} from '../redux/actions/loader';
import {updateToken, signoutUser} from '../redux/actions/Auth';
import ApiPath from '../constants/ApiPath';

const axiosRequest = axios.create({
  baseURL: api_url,
});

axiosRequest.interceptors.request.use(
  request => {
    const token = store.getState().Auth.token;
    console.log(token, 'token:::::::::');
    if (token) {
      request.headers = {
        // 'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
    }
    return request;
  },
  error => {
    console.log(error, 'error:::::::');
    return Promise.reject(error);
  },
);

axiosRequest.interceptors.response.use(
  response => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest._retry === false) {
      const tokenRes = await axiosRequest.get(ApiPath.refreshToken);
      store.dispatch(updateToken(tokenRes.data.token));
      // get access token from refresh token and retry
      originalRequest._retry = true;
      return axiosRequest(originalRequest);
    } else if (error.response.status === 404 && error.response.data.message) {
      store.dispatch(showAppToast(true, error.response.data.message));
    } else if (
      (error.response.status === 402 || error.response.status === 403) &&
      error.response.data.message
    ) {
      store.dispatch(showAppToast(true, error.response.data.message));
      store.dispatch(signoutUser());
    } else if (error.response.status === 417 && error.response.data.message) {
      return error.response.data.message;
    }
    return Promise.reject(error);
  },
);

export default axiosRequest;
