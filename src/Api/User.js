// User
import {useDispatch} from 'react-redux';
import axiosRequest from '../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';
import {showAppLoader, hideAppLoader} from '../redux/actions/loader';
import {showAppToast} from '../redux/actions/loader';

const User = () => {
  const dispatch = useDispatch();
  const createGallery = (data, setLoading) => {
    setLoading(true);
    axiosRequest
      .post(ApiPath.setGallery, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(async response => {
        console.log('response', response.data.data);
        await dispatch(showAppToast(false, response.data.message));
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

  return {
    createGallery,
    setPreferences,
  };
};
export default User;
