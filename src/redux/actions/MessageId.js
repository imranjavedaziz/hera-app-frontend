import {MESSAGE_ID_DETAIL, MESSAGE_ID_DETAIL_CLEAR} from '../Type';

export const getMessageID = data => {
  return {
    type: MESSAGE_ID_DETAIL,
    payload: {data},
  };
};
export const clearMessageID = data => {
  return {
    type: MESSAGE_ID_DETAIL_CLEAR,
    payload: {},
  };
};
