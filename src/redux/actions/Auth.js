import {
  SET_USER,
  SIGNOUT_USER,
  UPDATE_TOKEN,
  UPDATE_REG_STEP,
  SET_BASIC_DETAILS,
  SET_ATTRIBUTES,
  GET_GALLERY,
} from '../constants';
import axiosRequest from '../../utils/axiosRequest';
import ApiPath from '../../constants/ApiPath';
import {
  AUTH_LOG_IN,
  AUTH_MOBILE_NUMBER,
  AUTH_VERIFY_OTP,
  AUTH_LOG_OUT,
  AUTH_REGISTER,
  UPDATE_PROFILE_IMG,
} from '../Type';

export const logIn = userInfo => {
  return {
    type: AUTH_LOG_IN,
    data: userInfo,
  };
};

export const setUser = payload => ({
  type: SET_USER,
  payload,
});

export const setBasicDetails = payload => ({
  type: SET_BASIC_DETAILS,
  payload,
});

export const setSMDAttributes = payload => ({
  type: SET_ATTRIBUTES,
  payload,
});

export const signoutUser = () => ({
  type: SIGNOUT_USER,
});

export const updateToken = token => ({
  type: UPDATE_TOKEN,
  payload: token,
});

export const updateRegStep = () => ({
  type: UPDATE_REG_STEP,
});

export const mobileNumber = payload => {
  return {
    type: AUTH_MOBILE_NUMBER,
    data: payload,
  };
};

export const verifyOtp = payload => {
  return {
    type: AUTH_VERIFY_OTP,
    data: payload,
  };
};

export const logOut = () => {
  return {
    type: AUTH_LOG_OUT,
    data: {},
  };
};

export const ptbRegister = payload => {
  return {
    type: AUTH_REGISTER,
    data: payload,
  };
};

// export const getUserGallery = () => async dispatch => {
//   const result = await axiosRequest.get(ApiPath.getGallery);
//   //  console.log("RES",result.data.data)
//   dispatch({
//     type: GET_GALLERY,
//     payload: result.data.data,
//   });
// };
