import {
  PREPEND_CHAT,
  APPEND_CHAT,
  EMPTY_CHAT,
  FEEDBACK_CHAT,
  FEEDBACK_CHAT_SUCCESS,
  FEEDBACK_CHAT_FAIL,
  PUSH_NOTIFICATION,
  PUSH_NOTIFICATION_SUCCESS,
  PUSH_NOTIFICATION_FAIL,
} from '../Type';

const initState = {
  chats: [],
  feedback_data: '',
  feedback_success: false,
  feedback_loading: true,
  notification_data: '',
  notification_success: false,
  notification_loading: true,
};

export default (state = initState, action) => {
  console.log(action.data, 'payload', action.type, 'type');
  switch (action.type) {
    case PREPEND_CHAT:
      return {
        ...state,
        chats: [action.payload, ...state.chats],
      };
    case APPEND_CHAT:
     let sortedData=action?.payload?.sort(function(a, b){return b?.time - a?.time});
      return {
        ...state,
        chats: sortedData,
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
        feedback_data: action.data,
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
    case PUSH_NOTIFICATION:
      return {
        ...state,
        notification_data: '',
        notification_success: false,
        notification_loading: true,
      };
    case PUSH_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notification_data: action.data,
        notification_success: true,
        notification_loading: false,
      };
    case PUSH_NOTIFICATION_FAIL:
      return {
        ...state,
        notification_data: '',
        fnotification_success: false,
        notification_loading: false,
      };
    default:
      return state;
  }
};
