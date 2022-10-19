import {GET_ATTRIBUTE, SAVE_ATTRIBUTE} from '../Type';

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
