import {MESSAGE_ID_DETAIL} from '../Type';

const INITIAL = {
  messageIdRx: '',
};

export default (state = INITIAL, action) => {
  console.log(action.type === MESSAGE_ID_DETAIL, 'messageIdRxLoggg');
  console.log(action.payload?.data, 'messageIdRxLoggg');
  if (action.type === MESSAGE_ID_DETAIL) {
    return {
      ...state,
      messageIdRx: action.payload?.data,
    };
  } else {
    return state;
  }
};
