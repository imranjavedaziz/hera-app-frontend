import {MESSAGE_ID_DETAIL, MESSAGE_ID_DETAIL_CLEAR} from '../Type';

const INITIAL = {
  messageIdRx: [],
};

export default (state = INITIAL, action) => {
  if (action.type === MESSAGE_ID_DETAIL) {
    return {
      ...state,
      messageIdRx: action.payload,
    };
  }
  if (action.type === MESSAGE_ID_DETAIL_CLEAR) {
    return {
      ...state,
      messageIdRx: INITIAL.messageIdRx,
    };
  } else {
    return state;
  }
};
