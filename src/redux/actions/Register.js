import {
  AUTH_REGISTER,
  SAVE_BASIC_DETAIL,
  GET_STATES_DETAIL,
  GET_PROFILE_SETTER_DETAIL,
} from '../Type';

export const ptbRegister = payload => {
  return {
    type: AUTH_REGISTER,
    data: payload,
  };
};

export const saveBasicDetail = payload => {
  return {
    type: SAVE_BASIC_DETAIL,
    data: payload,
  };
};

export const getStates = () => {
  return {
    type: GET_STATES_DETAIL,
  };
};
export const getProfileSetterDetail = () => {
  return {
    type: GET_PROFILE_SETTER_DETAIL,
  };
};
