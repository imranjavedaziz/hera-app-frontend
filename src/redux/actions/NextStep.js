import {NEXT_STEP} from '../Type';

export const NextStep = payload => {
  return {
    type: NEXT_STEP,
    data: payload,
  };
};
