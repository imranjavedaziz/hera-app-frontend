import {
  PREPEND_CHAT,
  APPEND_CHAT,
  EMPTY_CHAT,
  FEEDBACK_CHAT,
  FEEDBACK_CHAT_SUCCESS,
  FEEDBACK_CHAT_FAIL,
} from '../Type';

const initState = {
  chats: [],
  feedback_data: '',
  feedback_success: false,
  feedback_loading: true,
};

export default ( state = initState, action) => {
  console.log(action.data, 'payload',action.type,'type');
  switch (action.type) {
    case PREPEND_CHAT:
      return {
        ...state,
        chats: [action.payload, ...state.chats],
      };
    case APPEND_CHAT:
      return {
        ...state,
        chats: action.payload,
      };
    case EMPTY_CHAT:
      return {
        ...state,
        chats: [],
        matchedUsers: [],
      };

    case FEEDBACK_CHAT:
      return {
        ...state,
        feedback_data: '',
        feedback_success: false,
        feedback_loading: true,
      };
    case FEEDBACK_CHAT_SUCCESS:
      return {
        ...state,
        feedback_data:action.data,
        feedback_success: true,
        feedback_loading: false,
      };
    case FEEDBACK_CHAT_FAIL:
      return {
        ...state,
        feedback_data: '',
        feedback_success: false,
        feedback_loading: false,
      };
    default:
      return state;
  }
};
