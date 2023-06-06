// request
import axios from 'axios';
import {Platform} from 'react-native';
import {api_url, Routes} from '../constants/Constants';
import {store} from '../redux/store';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
} from '../redux/actions/loader';
import {
  updateToken,
  signoutUser,
  updateRefreshToken,
} from '../redux/actions/Auth';
import ApiPath from '../constants/ApiPath';
import NetInfo from '@react-native-community/netinfo';
import {ValidationMessages} from '../constants/Strings';
import {navigationRef} from '../navigations/Main';
import {StackActions} from '@react-navigation/native';
import {updateSubscriptionStatus} from '../redux/actions/Subsctiption';
import jwt_decode from 'jwt-decode';
import {GET_BANK_LIST, GET_CARD_LIST} from '../redux/actions/stripe.action';
import {ACCOUNT_STATUS_CLEAN} from '../redux/Type';
import {NotificationsCount} from '../redux/actions/NotificationsCount';
import DeviceInfo from 'react-native-device-info';

const axiosRequest = axios.create({
  baseURL: api_url,
});

let isRefreshing = false;
let refreshSubscribers = [];
axiosRequest.interceptors.request.use(
  request => {
    const token = store.getState().Auth.token;
    const Version = DeviceInfo.getVersion();
    console.log(token, 'token:::::::::');
    if (token) {
      request.headers = {
        // 'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
    }
    request.headers.Platform = Platform.OS;
    request.headers.Version = Version;
    console.log('request.headers', request.headers);
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
    const originalRequest = error.request;
    const token = store.getState().Auth.token;
    let decodedToken = '';
    if (token) {
      decodedToken = jwt_decode(token);
    }
    const currentTime = Date.now() / 1000;
    if ((await NetInfo.isConnected.fetch()) !== true) {
      store.dispatch(
        showAppToast(true, ValidationMessages.NO_INTERNET_CONNECTION),
      );
      store.dispatch(hideAppLoader());
    }
    if (error.response.status === 421 || error.response.status === 422) {
      if (error.response.status === 422) {
        const popAction = StackActions.replace(Routes.Subscription);
        navigationRef.current?.dispatch(popAction);
      } else {
        navigationRef.current?.navigate(Routes.Subscription);
      }
      store.dispatch(updateSubscriptionStatus(0));
      return Promise.reject(error);
    } else if (error.response.status === 308) {
      console.log('error.response', JSON.stringify(error.response.data));
      navigationRef.current?.navigate(Routes.UpgradeApp, error.response.data);
    } else if (
      error.response.status === 401 &&
      decodedToken.exp < currentTime
    ) {
      store.dispatch(showAppLoader());
      const refresh_token = store.getState().Auth.refresh_token;
      if (!isRefreshing) {
        isRefreshing = true;
        axios
          .post(`${api_url}${ApiPath.refreshToken}`, {
            refresh_token: refresh_token,
          })
          .then(response => {
            // handle success
            store.dispatch(updateToken(response?.data?.token));
            store.dispatch(updateRefreshToken(response?.data?.refresh_token));
            if (
              !store.getState().Auth.isRefreshUpdate &&
              !store.getState().Auth.isTokenUpdate
            ) {
              store.dispatch(
                showAppToast(false, 'Token update failed. Please try again.'),
              );
            } else {
              const currentRoute =
                navigationRef.current?.getCurrentRoute().name;
              const previousRoute =
                navigationRef.current?.getCurrentRoute()?.params;
              const popAction = StackActions.replace(
                currentRoute,
                previousRoute,
              );
              navigationRef.current?.dispatch(popAction);
              store.dispatch(hideAppLoader());
            }
            refreshSubscribers.forEach(callback => callback(response?.data));
            originalRequest._retry = true;
            refreshSubscribers = [];
            isRefreshing = false;
            return axiosRequest(originalRequest);
          })
          .catch(error => {
            store.dispatch(showAppToast(true, error.message));
            // handle error
            navigationRef.current?.reset({
              index: 0,
              routes: [{name: Routes.Landing}],
            });
          });
      }
      console.log(
        error?.response?.data?.message,
        'error.response.data.message>>>>>>',
      );
    } else if (
      (error.response.status === 404 || error.response.status === 414) &&
      typeof error.response.data.message === 'string'
    ) {
      store.dispatch(showAppToast(true, error.response.data.message));
    } else if (
      (error.response.status === 402 || error.response.status === 403) &&
      error.response.data.message
    ) {
      store.dispatch(showAppToast(true, error.response.data.message));
      store.dispatch(signoutUser());
      store.dispatch({type: GET_CARD_LIST.CLEAN});
      store.dispatch({type: GET_BANK_LIST.CLEAN});
      store.dispatch({type: ACCOUNT_STATUS_CLEAN});
      store.dispatch(NotificationsCount(0));
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
