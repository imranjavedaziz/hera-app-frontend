import { PREPEND_CHAT, APPEND_CHAT, EMPTY_CHAT } from "../Type";

export const prepend = (data) => ({
  type: PREPEND_CHAT,
  payload: data,
});

export const append = (data) => ({
  type: APPEND_CHAT,
  payload: data,
});

export const empty = () => ({
  type: EMPTY_CHAT,
});
