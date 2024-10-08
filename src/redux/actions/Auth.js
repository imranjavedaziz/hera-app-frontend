import {
  SET_USER,
  SIGNOUT_USER,
  UPDATE_TOKEN,
  UPDATE_REG_STEP,
  SET_BASIC_DETAILS,
  SET_ATTRIBUTES,
  USE_LOCAL_IMAGE,
  USE_NAME,
} from '../constants';
import {
  AUTH_LOG_IN,
  AUTH_MOBILE_NUMBER,
  AUTH_VERIFY_OTP,
  AUTH_LOG_OUT,
  AUTH_REGISTER,
  UPDATE_PROFILE_IMG,
  DEVICE_REGISTER,
  AUTH_MOBILE_NUMBER_RESET,
} from '../Type';

export const logIn = userInfo => {
  return {
    type: AUTH_LOG_IN,
    data: userInfo,
  };
};
export const deviceRegister = data => {
  return {
    type: DEVICE_REGISTER,
    data: data,
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

export const resetMobile = () => ({
  type: AUTH_MOBILE_NUMBER_RESET,
});

export const verifyOtp = payload => {
  return {
    type: AUTH_VERIFY_OTP,
    data: payload,
  };
};

export const logOut = payload => {
  return {
    type: AUTH_LOG_OUT,
    data: payload,
  };
};

export const ptbRegister = payload => {
  return {
    type: AUTH_REGISTER,
    data: payload,
  };
};
export const updateProfileImg = payload => {
  return {
    type: UPDATE_PROFILE_IMG,
    data: payload,
  };
};

export const updateLocalImg = img => {
  return {
    type: USE_LOCAL_IMAGE,
    data: img,
  };
};
export const updateName = img => {
  return {
    type: USE_NAME,
    data: img,
  };
};
