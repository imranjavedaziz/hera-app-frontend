import {
  ADD_BANK_TOKEN,
} from '../actions/stripe.action';

const addBankState = {
  tokenResponse: {
    success: false,
    failed: false,
    loading: false,
    status: ADD_BANK_TOKEN.END,
  },
};
export function addBankTokenReducer(state = addBankState, action) {
  switch (action?.type) {
    case ADD_BANK_TOKEN.START:
      return {
        ...state,
        bankResponse: {loading: true, status: ADD_BANK_TOKEN.START},
      };
    case ADD_BANK_TOKEN.SUCCESS:
      return {
        ...state,
        bankResponse: {
          info: action?.payload,
          loading: false,
          status: ADD_BANK_TOKEN.SUCCESS,
        },
      };
    case ADD_BANK_TOKEN.FAIL:
      return {
        ...state,
        bankResponse: {
          info: action?.payload,
          loading: false,
          status: ADD_BANK_TOKEN.FAIL,
        },
      };
    case ADD_BANK_TOKEN.END:
      return {
        ...state,
        bankResponse: {loading: false, status: ADD_BANK_TOKEN.END},
      };
    case ADD_BANK_TOKEN.CLEAN:
      return addBankState;
    default:
      return state;
  }
}
