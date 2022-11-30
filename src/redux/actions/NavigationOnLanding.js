import {NAVIGATION_ON_LANDING} from '../constants';

export const navigateOnLanding = payload => {
  console.log('hihihihi');
  return {
    type: NAVIGATION_ON_LANDING,
    data: payload,
  };
};
