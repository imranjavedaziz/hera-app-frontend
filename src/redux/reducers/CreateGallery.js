import {GET_GALLERY, GET_GALLERY_FAIL, GET_GALLERY_SUCCESS} from '../Type';

const initState = {
  gallery: {},
};
export default (state = initState, action) => {
  switch (action.type) {
    /**
     * Gallery
     */
    case GET_GALLERY:
      return {
        ...state,
        gallery: {},
      };
    case GET_GALLERY_SUCCESS:
      return {
        ...state,
        gallery: action.data.data.data,
      };
    case GET_GALLERY_FAIL:
      return {
        ...state,
        gallery: {},
      };
    default:
      return state;
  }
};
