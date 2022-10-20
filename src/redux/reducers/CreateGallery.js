import {
  GET_GALLERY,
  GET_GALLERY_FAIL,
  GET_GALLERY_SUCCESS,
  GET_DELETE_GALLERY,
  GET_DELETE_GALLERY_SUCCESS,
  GET_DELETE_GALLERY_FAIL,
} from '../Type';

const initState = {
  gallery_data: {},
  gallery_success: false,
  gallery_loading: false,

  delete_gallery_success: false,
  delete_gallery_loading: false,
  delete_gallery__error_msg: '',
};
export default (state = initState, action) => {
  console.log(action?.data?.data?.data, "action.data.data.data", action.type, "type");
  switch (action.type) {
    /**
     * Gallery
     */
    case GET_GALLERY:

      return {
        ...state,
        gallery_data: {},
        gallery_success: false,
        gallery_loading: true,
      };
    case GET_GALLERY_SUCCESS:
      return {
        ...state,
        gallery_data: action.data.data.data,
        gallery_success: true,
        gallery_loading: false,
      };
    case GET_GALLERY_FAIL:
      return {
        ...state,
        gallery_data: {},
        gallery_success: false,
        gallery_loading: false,
      };
    case GET_DELETE_GALLERY:
      return {
        ...state,
        delete_gallery_success: false,
        delete_gallery_loading: true,
        delete_gallery__error_msg: '',
      };
    case GET_DELETE_GALLERY_SUCCESS:
      return {
        ...state,
        delete_gallery_success: true,
        delete_gallery_loading: false,
        delete_gallery__error_msg: '',
      };
    case GET_DELETE_GALLERY_FAIL:
      return {
        ...state,
        delete_gallery_success: false,
        delete_gallery_loading: false,
        delete_gallery__error_msg: action.data.msg,
      };
    default:
      return state;
  }
};
