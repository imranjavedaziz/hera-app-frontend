import {
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_FAIL,
  DELETE_ACCOUNT_SUCCESS,
} from '../Type';

const initState = {
  delete_account_success: false,
  delete_account_loading: false,
  delete_account__error_msg: '',
  delete_account_res: '',
};
export default (state = initState, action) => {
  switch (action.type) {
    case DELETE_ACCOUNT:
      return {
        ...state,
        delete_account_success: false,
        delete_account_loading: true,
        delete_account__error_msg: '',
        delete_account_res: action.data,
      };
    case DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        delete_account_success: true,
        delete_account_loading: false,
        delete_account__error_msg: '',
        delete_account_res: action.data?.data?.message,
      };
    case DELETE_ACCOUNT_FAIL:
      return {
        ...state,
        delete_account_success: false,
        delete_account_loading: false,
        delete_account__error_msg: action.data?.msg,
        delete_account_res: action.data?.data,
      };
    default:
      return state;
  }
};
