import {NOTIFICATION_COUNT} from '../Type';
import {
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_TOAST,
  HIDE_TOAST,
  SHOW_EDIT_LOADER,
  HIDE_EDIT_LOADER,
  SHOW_MESSAGE_TOAST,
  HIDE_MESSAGE_TOAST,
} from '../constants';

const initState = {
  loading: false,
  text: '',
  showToast: false,
  isErrToast: true,
  toastText: '',
  push: false,
  pushRes: '',
  editLoading: false,
  showMessageToast: false,
  isMessageErrToast: '',
  toastMessageText: '',
  notification_count: 0,
};

export default (state = initState, {type = '', payload = null} = {}) => {
  switch (type) {
    case SHOW_LOADER:
      return {
        ...state,
        loading: true,
        text: payload.text,
      };
    case HIDE_LOADER:
      return {
        ...state,
        loading: false,
      };
    case SHOW_TOAST:
      return {
        ...state,
        showToast: true,
        isErrToast: payload.isErrToast,
        toastText: payload.text,
      };
    case HIDE_TOAST:
      return {
        ...state,
        showToast: false,
      };

    case SHOW_EDIT_LOADER:
      return {
        ...state,
        editLoading: true,
        text: payload.text,
      };
    case HIDE_EDIT_LOADER:
      return {
        ...state,
        editLoading: false,
      };
    case SHOW_MESSAGE_TOAST:
      return {
        ...state,
        showMessageToast: true,
        isMessageErrToast: payload.isMessageErrToast,
        toastMessageText: payload.toastMessageText,
        pushRes: payload.pushRes,
        push: payload.push,
        navigation: payload.navigation,
      };
    case HIDE_MESSAGE_TOAST:
      return {
        ...state,
        showMessageToast: false,
        isMessageErrToast: initState.isMessageErrToast,
        toastMessageText: initState.toastMessageText,
        push: initState.push,
        navigation: initState.navigation,
      };
    case NOTIFICATION_COUNT:
      return {
        ...state,
        notification_count: payload,
      };
    default:
      return state;
  }
};
