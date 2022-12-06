import {
  PREPEND_CHAT,
  APPEND_CHAT,
  EMPTY_CHAT,
  FEEDBACK_CHAT,
  PUSH_NOTIFICATION,
} from '../Type';

export const prepend = data => ({
  type: PREPEND_CHAT,
  payload: data,
});

export const append = data => ({
  type: APPEND_CHAT,
  payload: data,
});

export const empty = () => ({
  type: EMPTY_CHAT,
});

export const chatFeedback = data => ({
  type: FEEDBACK_CHAT,
  payload: data,
});
export const pushNotification = data => ({
  type: PUSH_NOTIFICATION,
  payload: data,
});
