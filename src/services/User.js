// User
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
import {
  setBasicDetails,
  setSMDAttributes,
  updateRegStep,
} from '../redux/actions/auth';
import axios from 'axios';

const User = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userData = useSelector(state => state.auth);
  const saveBasicDetails = data => {
    dispatch(showAppLoader());
    axiosRequest
      .post(ApiPath.profileRegister, data)
      .then(async response => {
        await dispatch(showAppToast(false, response.data.message));
        await dispatch(updateRegStep());
        await dispatch(setBasicDetails(response.data.data));
        navigation.navigate(
          userData.user.role_id === '2'
            ? Routes.SetPreference
            : Routes.SetAttributes,
          data,
        );
      })
      .finally(() => {
        dispatch(hideAppLoader());
      });
  };
  const setAttributes = data => {
    dispatch(showAppLoader());
    axiosRequest
      .post(ApiPath.setAttributes, data)
      .then(async response => {
        await dispatch(showAppToast(false, response.data.message));
        await dispatch(updateRegStep());
        await dispatch(setSMDAttributes(response.data.data));
        navigation.navigate(Routes.CreateGallery,data);
      })
      .finally(() => {
        dispatch(hideAppLoader());
      });
  };
  const createGallery = (data,setLoading) => {
    setLoading(true);
    axiosRequest
      .post(ApiPath.setGallery, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(async response => {
        console.log('response', response.data.data);
        setLoading(false)
      }).finally(() => {
        dispatch(showAppToast(false, 'Gallery Updated Successfully!'));
      });
  };
  const deleteGallery =  async(data)=>{
     console.log("DATAdel", data);
    axiosRequest
    .delete(ApiPath.deleteGallery,data)
    .then(async response => {
      dispatch(( response.message));
      console.log(' DELETE response', response)
    }).catch((e)=>{console.log("error12",e)})
    .finally(() => {
    
      dispatch(hideAppLoader());
    });

  }
  const setPreferences = (data) => {
    dispatch(showAppLoader());
    axiosRequest
      .post(ApiPath.setPreferences, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(async response => {
        console.log('response', response.data.data);
      })
      .finally(() => {
        dispatch(hideAppLoader());
      });
  };

  return {
    userData,
    saveBasicDetails,
    setAttributes,
    createGallery,
    deleteGallery,
    setPreferences,
  };
};
export default User;
