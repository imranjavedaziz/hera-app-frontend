import {GET_ATTRIBUTE, SAVE_ATTRIBUTE, GET_USER_ATTRIBUTE} from '../Type';

export const getAttribute = () => {
  return {
    type: GET_ATTRIBUTE,
    data: {},
  };
};

export const saveAttribute = payload => {
  return {
    type: SAVE_ATTRIBUTE,
    data: payload,
  };
};
export const getUserAttribute = () => {
  return {
    type: GET_USER_ATTRIBUTE,
    data: {},
  };
};
