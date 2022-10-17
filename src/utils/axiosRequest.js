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
    console.log(store.getState().Auth.token, "store.getState()");
    const token = store.getState().Auth.token;
    console.log(token, "token::::::::");
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
    console.log(originalRequest, "originalRequest::::::");
    console.log(error.response.status, "error.response.status");
    // console.log(originalRequest._retry, "originalRequest._retry");
    if (error.response.status === 401) {
      console.log('inside token fail')
      const tokenRes = await axiosRequest.get(ApiPath.refreshToken);
      console.log(tokenRes, "tokenRes:::::::");
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
      console.log('Axio MSG', error.response.data.message);
      return error.response.data.message;
    }
    // console.log('ERROR', error.message);
    return Promise.reject(error);
  },
);

export default axiosRequest;
