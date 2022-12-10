import {MESSAGE_ID_DETAIL} from '../Type';

const INITIAL = {
  messageIdRx: [],
};

export default (state = INITIAL, action) => {
  switch (action.type) {
    case MESSAGE_ID_DETAIL: {
      return {
        ...state,
        messageIdRx: action.payload,
      };
    }
    default:
      return state;
  }
};
