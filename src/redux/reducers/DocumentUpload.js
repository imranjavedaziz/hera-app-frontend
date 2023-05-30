import {
  DOCUMENT_UPLOAD_PAYMENT,
  DOCUMENT_UPLOAD,
  DOCUMENT_UPLOAD_FAIL,
  DOCUMENT_UPLOAD_SUCCESS,
  DOCUMENT_GET,
  DOCUMENT_GET_FAIL,
  DOCUMENT_GET_SUCCESS,
  DOCUMENT_GET_ClEAN,
  REQUEST_DOCUMENT_UPLOAD_FAIL,
  REQUEST_DOCUMENT_UPLOAD_PAYMENT,
  REQUEST_DOCUMENT_UPLOAD_SUCCESS,
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
  request_document_upload_success: false,
  request_document_upload_res: '',
  request_document_upload_fail: false,
  request_document_upload_error_msg: '',
  request_document_upload_loading: false,
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
    case DOCUMENT_GET_ClEAN:
    case DOCUMENT_GET:
      return {
        ...state,
        document_get_success: false,
        document_get_loading: true,
        document_get_error_msg: '',
        document_get_res: '',
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
        document_get_res: '',
        document_get_fail: true,
      };
    /**
     * DOCUMENT_UPLOAD
     */

    case REQUEST_DOCUMENT_UPLOAD_PAYMENT: {
      return {
        ...state,
        request_document_upload_success: false,
        request_document_upload_res: '',
        request_document_upload_fail: false,
        request_document_upload_error_msg: '',
        request_document_upload_loading: true,
      };
    }
    case REQUEST_DOCUMENT_UPLOAD_FAIL: {
      return {
        ...state,
        request_document_upload_success: false,
        request_document_upload_res: '',
        request_document_upload_fail: true,
        request_document_upload_error_msg: action.data.msg,
        request_document_upload_loading: false,
      };
    }
    case REQUEST_DOCUMENT_UPLOAD_SUCCESS: {
      return {
        ...state,
        request_document_upload_success: true,
        request_document_upload_res: action?.data?.data?.data,
        request_document_upload_fail: false,
        request_document_upload_error_msg: '',
        request_document_upload_loading: false,
      };
    }
    default:
      return state;
  }
};
