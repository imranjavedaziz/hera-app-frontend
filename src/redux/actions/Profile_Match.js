import {PROFILE_MATCH} from '../Type';

export const profileMatch = data => {
  return {
    type: PROFILE_MATCH,
    data: data,
  };
};
