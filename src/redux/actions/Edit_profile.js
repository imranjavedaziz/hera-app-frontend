import {UPDATE_USER_DETAIL, GET_USER_DETAIL} from '../Type';

export const getEditProfile = () => {
  return {
    type: GET_USER_DETAIL,
    data: {},
  };
};
export const updateEditProfile = payload => {
  return {
    type: UPDATE_USER_DETAIL,
    data: payload,
  };
};
