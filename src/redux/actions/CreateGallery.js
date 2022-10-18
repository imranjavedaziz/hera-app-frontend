import { GET_DELETE_GALLERY, GET_GALLERY } from "../Type";

export const getUserGallery = () => {
  return {
    type: GET_GALLERY,
    data: {}
  };
};
export const deleteGallery = (payload) => {
  return {
    type: GET_DELETE_GALLERY,
    data: payload
  };
};
