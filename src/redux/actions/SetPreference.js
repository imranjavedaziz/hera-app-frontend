import { SET_PREFERENCE } from "../Type";


export const SetPreferenceRes = payload => {
    return {
      type: SET_PREFERENCE,
      data: payload,
    };
  };