import {
  SET_USER,
  SIGNOUT_USER,
  UPDATE_TOKEN,
  UPDATE_REG_STEP,
  SET_BASIC_DETAILS,
  SET_ATTRIBUTES,
} from '../constants';

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
