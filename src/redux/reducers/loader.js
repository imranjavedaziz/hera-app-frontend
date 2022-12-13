import {SHOW_LOADER, HIDE_LOADER, SHOW_TOAST, HIDE_TOAST} from '../constants';

const initState = {
  loading: false,
  text: '',
  showToast: false,
  isErrToast: true,
  toastText: '',
  push: false,
  pushRes: '',
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
        pushRes: payload.pushRes,
        push: payload.push,
      };
    case HIDE_TOAST:
      return {
        ...state,
        showToast: false,
      };
    default:
      return state;
  }
};
