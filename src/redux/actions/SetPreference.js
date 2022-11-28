import {SET_PREFERENCE, SAVE_PREFERENCE, GET_PREFERENCE} from '../Type';

export const SetPreferenceRes = () => {
  return {
    type: SET_PREFERENCE,
    data: {},
  };
};

export const SavePreference = payload => {
  return {
    type: SAVE_PREFERENCE,
    data: payload,
  };
};

export const GetPreferenceRes = () => {
  return {
    type: GET_PREFERENCE,
    data: {},
  };
};
