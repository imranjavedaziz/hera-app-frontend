import {NAVIGATION_ON_LANDING} from '../constants';

const initState = {
  navigateON: false,
};

export default (state = initState, {type = ''} = {}) => {
  switch (type) {
    case NAVIGATION_ON_LANDING:
      return {
        ...state,
        navigateON: true,
      };

    default:
      return state;
  }
};
