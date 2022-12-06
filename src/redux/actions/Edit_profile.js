import {UPDATE_USER_DETAIL, GET_USER_DETAIL, TOGGLE_NOTIFICATION} from '../Type';

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

export const toggleNotification = data => ({
  type: TOGGLE_NOTIFICATION,
  data,
})
