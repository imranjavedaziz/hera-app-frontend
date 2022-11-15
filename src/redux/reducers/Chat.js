import { PREPEND_CHAT, APPEND_CHAT, EMPTY_CHAT } from "../Type";

const initState = {
  chats: [],
  matchedUsers: [],
};

export default (state = initState, { type = '', payload = null } = {}) => {
    switch (type) {
        case PREPEND_CHAT:
          return {
            ...state,
            chats: [ payload, ...state.chats ],
            matchedUsers: [ payload.user_id , ...state.matchedUsers ],
          };
        case APPEND_CHAT:
          return {
            ...state,
            chats: [ ...state.chats, payload ],
            matchedUsers: [ ...state.matchedUsers, payload.user_id ],
          };
          case EMPTY_CHAT:
            return {
              ...state,
              chats: [],
              matchedUsers: [],
            };
        default:
          return state;
      }
};
