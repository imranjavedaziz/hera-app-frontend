import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';
import {
  showAppLoader,
  hideAppLoader,
  showAppToast,
} from '../redux/actions/loader';
import {Routes} from '../constants/Constants';
import {setUser, signoutUser} from '../redux/actions/auth';
import getRoute from '../utils/getRoute';

const Auth = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const sendOtp = data => {
    dispatch(showAppLoader());
    axiosRequest
      .post(ApiPath.sendOtp, data)
      .then(async response => {
        await dispatch(showAppToast(false, response.data.message));
        navigation.navigate(Routes.OTP, data);
      })
      .finally(() => {
        dispatch(hideAppLoader());
      });
  };
  const verifyOtp = data => {
    dispatch(showAppLoader());
    axiosRequest
      .post(ApiPath.verifyOtp, data)
      .then(async response => {
        await dispatch(showAppToast(false, response.data.message));
        navigation.navigate(Routes.Profile, data);
      })
      .finally(() => {
        dispatch(hideAppLoader());
      });
  };
  const registerUser = data => {
    console.log(ApiPath.register, "ApiPath.register::::::::::::");
    console.log(data, "data::::::::::::");
    dispatch(showAppLoader());

    axiosRequest
      .post(ApiPath.register, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(async response => {
        const dataRes = response.data.data;
        await dispatch(showAppToast(false, response.data.message));
        await dispatch(setUser(dataRes));
        navigation.navigate(
          getRoute(
            dataRes.access_token,
            dataRes.role_id,
            dataRes.registration_step,
          ),
          data,
        );
      })
      .finally(() => {
        dispatch(hideAppLoader());
      });
  };
  const login = data => {
    dispatch(showAppLoader());
    axiosRequest
      .post(ApiPath.login, data)
      .then(async response => {
        const dataRes = response.data.data;
        await dispatch(showAppToast(false, response.data.message));
        await dispatch(setUser(dataRes));
        navigation.navigate(
          getRoute(
            dataRes.access_token,
            dataRes.role_id,
            dataRes.registration_step,
          ),
          data,
        );
      })
      .finally(() => {
        dispatch(hideAppLoader());
      });
  };
  const logout = () => {
    axiosRequest.get(ApiPath.logout)
    .finally(()=>{
      dispatch(signoutUser());
      navigation.reset({
        index: 0,
        routes: [{name: Routes.Landing}]
      });
    })
  };
  return {
    sendOtp,
    verifyOtp,
    registerUser,
    login,
    logout,
  };
};
export default Auth;
