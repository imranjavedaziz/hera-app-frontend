import {IMAGE_STORE} from '../constants';

const INITIAL = {
  imgStore: '',
};

export default (state = INITIAL, action) => {
  if (action.type === IMAGE_STORE) {
    return {
      ...state,
      imgStore: action.data,
    };
  } else {
    return state;
  }
};
