// User
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';
import {
  showAppLoader,
  hideAppLoader,
} from '../redux/actions/loader';
import { getUserGallery } from '../redux/actions/CreateGallery';
import { Routes } from '../constants/Constants';
const User = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const createGallery = (data, setLoading) => {
    setLoading(true);
    axiosRequest
      .post(ApiPath.setGallery, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log('response', response.data.data);
        dispatch(getUserGallery());
        setLoading(false);
      })
      .finally(e => {
        console.log(e, 'e.log');
        setLoading(false);
      });
  };
  const setPreferences = data => {
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
  const changePassword = (data)=>{
    dispatch(showAppLoader());
    axiosRequest
      .post(ApiPath.change_password, data)
      .then(async response => {
        console.log('response', response.data.data);
        navigation.goBack();
      })
      .finally(() => {
        dispatch(hideAppLoader());
      });
  }
  const resetPassword = (data)=>{
    dispatch(showAppLoader());
    axiosRequest
      .post(ApiPath.resetPassword, data)
      .then(async response => {
        console.log('response', response.data.data);
        navigation.navigate(Routes.Login);
      })
      .finally(() => {
        dispatch(hideAppLoader());
      });
  }

  return {
    createGallery,
    setPreferences,
    changePassword,
    resetPassword,
  };
};
export default User;
