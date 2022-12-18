import {
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_TOAST,
  HIDE_TOAST,
  HIDE_EDIT_LOADER,
  SHOW_EDIT_LOADER,
  HIDE_MESSAGE_TOAST,
  SHOW_MESSAGE_TOAST,
} from '../constants';

export const showAppLoader = (text = '') => ({
  type: SHOW_LOADER,
  payload: {text: text},
});

export const hideAppLoader = () => ({
  type: HIDE_LOADER,
});

export const showAppToast = (isErrToast, text = '') => ({
  type: SHOW_TOAST,
  payload: {isErrToast, text},
});

export const hideAppToast = () => ({
  type: HIDE_TOAST,
});
export const showEditAppLoader = (text = '') => ({
  type: SHOW_EDIT_LOADER,
  payload: {text: text},
});

export const hideEditLoader = () => ({
  type: HIDE_EDIT_LOADER,
});
export const showMessageAppToast = (
  isMessageErrToast,
  toastMessageText = '',
  push,
  pushRes = '',
  navigation,
) => ({
  type: SHOW_MESSAGE_TOAST,
  payload: {isMessageErrToast, toastMessageText, push, pushRes, navigation},
});

export const hideMessageAppToast = () => ({
  type: HIDE_MESSAGE_TOAST,
});
