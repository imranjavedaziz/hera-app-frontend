import {MESSAGE_ID_DETAIL} from '../Type';

const INITIAL = {
  messageIdRx: '',
};

export default (state = INITIAL, action) => {
  if (action.type === MESSAGE_ID_DETAIL) {
    return {
      ...state,
      messageIdRx: action.payload?.data,
    };
  } else {
    return state;
  }
};
