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
  matchedUsers: [],
  feedback_data: {},
  feedback_success: false,
  feedback_loading: true,
};

export default (state = initState, {type = '', payload = null} = {}) => {
  console.log(payload, 'payload');
  switch (type) {
    case PREPEND_CHAT:
      return {
        ...state,
        chats: [payload, ...state.chats],
        matchedUsers: [payload.user_id, ...state.matchedUsers],
      };
    case APPEND_CHAT:
      return {
        ...state,
        chats: payload,
        matchedUsers: [...state.matchedUsers, payload.user_id],
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
        feedback_data: {},
        feedback_success: false,
        feedback_loading: true,
      };
    case FEEDBACK_CHAT_SUCCESS:
      return {
        ...state,
        feedback_data: payload.data.data.data,
        feedback_success: true,
        feedback_loading: false,
      };
    case FEEDBACK_CHAT_FAIL:
      return {
        ...state,
        feedback_data: {},
        feedback_success: false,
        feedback_loading: false,
      };
    default:
      return state;
  }
};
