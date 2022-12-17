// request
import axios from 'axios';
import {api_url} from '../constants/Constants';
import {store} from '../redux/store';
import {hideAppLoader, showAppToast} from '../redux/actions/loader';
import {updateToken, signoutUser} from '../redux/actions/Auth';
import ApiPath from '../constants/ApiPath';
import NetInfo from '@react-native-community/netinfo';
import {ValidationMessages} from '../constants/Strings';
import { navigationRef } from '../navigations/Main';
import { Routes } from '../constants/Constants';
import {StackActions} from '@react-navigation/native';

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
    if ((await NetInfo.isConnected.fetch()) !== true) {
      store.dispatch(
        showAppToast(true, ValidationMessages.NO_INTERNET_CONNECTION),
      );
      store.dispatch(hideAppLoader());
    }
    if(error.response.status === 421 || error.response.status === 422){
      if(error.response.status === 422){
        const popAction = StackActions.replace(Routes.Subscription);
        navigationRef.current?.dispatch(popAction);
      }
      else{
        navigationRef.current?.navigate(Routes.Subscription);
      }
      store.dispatch(updateSubscriptionStatus(0));
      return Promise.reject(error);
    }
    else if (error.response.status === 401 && !Boolean(originalRequest._retry)) {
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
      navigationRef.current?.reset({
        index: 0,
        routes: [{name: Routes.Landing}],
      });
    } else if (error.response.status === 417 && error.response.data.message) {
      return error.response.data.message;
    }
    return Promise.reject(error);
  },
);

export default axiosRequest;
