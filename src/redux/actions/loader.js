import { SHOW_LOADER, HIDE_LOADER, SHOW_TOAST, HIDE_TOAST } from "../constants";

export const showAppLoader = (text='') => ({
  type: SHOW_LOADER,
  payload: {text: text}
})

export const hideAppLoader = () => ({
  type: HIDE_LOADER,
})

export const showAppToast = (text='') => ({
  type: SHOW_TOAST,
  payload: {text}
})

export const hideAppToast = () => ({
  type: HIDE_TOAST,
})
