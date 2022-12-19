import {MESSAGE_ID_DETAIL} from '../Type';

export const getMessageID = data => {
  return {
    type: MESSAGE_ID_DETAIL,
    payload: {data},
  };
};
