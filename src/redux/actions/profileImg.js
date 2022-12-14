import {IMAGE_STORE} from '../constants';

export const saveLocalImg = data => {
  return {
    type: IMAGE_STORE,
    data: data,
  };
};
