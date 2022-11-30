import {
  VERIFY_MAIL,
  VERIFY_MAIL_SUCCESS,
  VERIFY_MAIL_FAIL,
  SEND_VERIFICATION_MAIL,
  SEND_VERIFICATION_MAIL_SUCCESS,
  SEND_VERIFICATION_MAIL_FAIL,
} from '../Type';

const initState = {
  verify_mail_success: false,
  verify_mail_loading: false,
  verify_mail_error_msg: '',
  verify_mail_res: '',
  send_verification_success: false,
  send_verification_loading: false,
  send_verification_error_msg: '',
  send_verification_res: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    /**
     * INQUIRY FORM
     */
    case VERIFY_MAIL:
      return {
        ...state,
        verify_mail_success: false,
        verify_mail_loading: true,
        verify_mail_error_msg: '',
      };
    case VERIFY_MAIL_SUCCESS:
      return {
        ...state,
        verify_mail_success: true,
        verify_mail_loading: false,
        verify_mail_error_msg: '',
        verify_mail_res: action.data?.data?.message,
      };
    case VERIFY_MAIL_FAIL:
      return {
        ...state,
        verify_mail_success: false,
        verify_mail_loading: false,
        verify_mail_error_msg: action.data.msg,
      };

    /**
     * SEND VERIFICATION MAIL
     */
    case SEND_VERIFICATION_MAIL: {
      return {
        ...state,
        send_verification_success: false,
        send_verification_loading: true,
        send_verification_error_msg: '',
        send_verification_res: action.data,
      };
    }
    case SEND_VERIFICATION_MAIL_FAIL: {
      return {
        ...state,
        send_verification_success: false,
        send_verification_loading: false,
        send_verification_error_msg: action.data.msg,
        send_verification_res: {},
      };
    }
    case SEND_VERIFICATION_MAIL_SUCCESS: {
      return {
        ...state,
        send_verification_success: true,
        send_verification_loading: false,
        send_verification_error_msg: '',
        send_verification_res: action?.data?.data,
      };
    }
    default:
      return state;
  }
};
