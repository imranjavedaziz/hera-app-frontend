// request
import axios from 'axios';
import {api_url} from '../constants/Constants';
import {store} from '../redux/store';
import {showAppToast} from '../redux/actions/loader';
import {updateToken} from '../redux/actions/Auth';
import ApiPath from '../constants/ApiPath';

const axiosRequest = axios.create({
  baseURL: api_url,
});

axiosRequest.interceptors.request.use(
  request => {
    const token = store.getState().Auth.token;
    if (token) {
      request.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosRequest.interceptors.response.use(
  response => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      const tokenRes = await axiosRequest.get(ApiPath.refreshToken);
      store.dispatch(updateToken(tokenRes.data.token));
      // get access token from refresh token and retry
      originalRequest._retry = true;
      return axiosRequest(originalRequest);
    } else if (error.response.status === 404 && error.response.data.message) {
      store.dispatch(showAppToast(true, error.response.data.message));
    } else if (error.response.status === 417 && error.response.data.message) {
      // Validation msg
      // let messages = [];
      // Object.keys(error.response.data.message).forEach(key=>{
      //   messages = [...messages,...error.response.data.message[key]];
      // });
      // await store.dispatch(showAppToast(true,messages.join('\n')));
      return error.response.data.message;
    }
    return Promise.reject(error);
  },
);

export default axiosRequest;
