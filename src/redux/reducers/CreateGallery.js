import { GET_GALLERY, GET_GALLERY_FAIL, GET_GALLERY_SUCCESS } from "../Type";

const initState = {
  gallery_data: {},
  gallery_success: false,
  gallery_loading: false,
};
export default (state = initState, action) => {
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
      return{
        ...state,
        gallery_data: action.data.data.data,
        gallery_success: true,
        gallery_loading: false,
      };
    case GET_GALLERY_FAIL:
      return{
        ...state,
        gallery_data: {},
        gallery_success: false,
        gallery_loading: false,
      }
    default:
      return state;
  }
};
