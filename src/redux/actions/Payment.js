import {GET_MATCH_LIST} from '../Type';

export const getMatchList = payload => {
  return {
    type: GET_MATCH_LIST,
    data: payload,
  };
};
