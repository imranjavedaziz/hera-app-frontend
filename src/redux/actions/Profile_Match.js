import {PROFILE_MATCH, PROFILE_MATCH_RESPONSE} from '../Type';

export const profileMatch = data => {
  return {
    type: PROFILE_MATCH,
    data: data,
  };
};

export const profileMatchResponse = data => {
  return {
    type: PROFILE_MATCH_RESPONSE,
    data: data,
  };
};
