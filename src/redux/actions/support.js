import {SUPPORT_FORM, GET_USER_TYPE} from '../Type';

export const SupportForm = data => {
  return {
    type: SUPPORT_FORM,
    data: data,
  };
};

export const UserType = () => {
  return {
    type: GET_USER_TYPE,
    data: {},
  };
};
