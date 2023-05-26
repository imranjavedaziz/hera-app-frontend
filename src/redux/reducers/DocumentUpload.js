import {
  DOCUMENT_UPLOAD_PAYMENT,
  DOCUMENT_UPLOAD,
  DOCUMENT_UPLOAD_FAIL,
  DOCUMENT_UPLOAD_SUCCESS,
  DOCUMENT_GET,
  DOCUMENT_GET_FAIL,
  DOCUMENT_GET_SUCCESS,
} from '../Type';

const initState = {
  document_upload_success: false,
  document_upload_res: '',
  document_upload_fail: false,
  document_upload_error_msg: '',
  document_upload_loading: false,
  document_get_success: false,
  document_get_res: {},
  document_get_fail: false,
  document_get_error_msg: '',
  document_get_loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    /**
     * DOCUMENT_UPLOAD
     */
    case DOCUMENT_UPLOAD_PAYMENT:
    case DOCUMENT_UPLOAD: {
      return {
        ...state,
        document_upload_success: false,
        document_upload_res: '',
        document_upload_fail: false,
        document_upload_error_msg: '',
        document_upload_loading: true,
      };
    }
    case DOCUMENT_UPLOAD_FAIL: {
      return {
        ...state,
        document_upload_success: false,
        document_upload_res: '',
        document_upload_fail: true,
        document_upload_error_msg: action.data.msg,
        document_upload_loading: false,
      };
    }
    case DOCUMENT_UPLOAD_SUCCESS: {
      return {
        ...state,
        document_upload_success: true,
        document_upload_res: action?.data?.data?.data,
        document_upload_fail: false,
        document_upload_error_msg: '',
        document_upload_loading: false,
      };
    }
    case DOCUMENT_GET:
      return {
        ...state,
        document_get_success: false,
        document_get_loading: true,
        document_get_error_msg: '',
        document_get_res: {},
        document_get_fail: false,
      };
    case DOCUMENT_GET_SUCCESS:
      return {
        ...state,
        document_get_success: true,
        document_get_loading: false,
        document_get_error_msg: '',
        document_get_res: action.data,
        document_get_fail: false,
      };
    case DOCUMENT_GET_FAIL:
      return {
        ...state,
        document_get_success: false,
        document_get_loading: false,
        document_get_error_msg: action.data.msg,
        document_get_res: {},
        document_get_fail: true,
      };
    default:
      return state;
  }
};
