import {
  PAYMENT_INTENT,
  ADD_BANK_TOKEN,
  GET_CARD_LIST,
  ADD_BANK,
  GET_BANK_LIST,
  DELETE_BANK,
  DELETE_CARD,
  ATTACH_PAYMENT_INTENT,
} from '../actions/stripe.action';

// Getting List of Card
const getCardListResponse = {
  info: null,
  success: false,
  error: null,
  failed: false,
  loading: false,
  status: GET_CARD_LIST.END,
};
// Getting List of Bank
const getBankListResponse = {
  info: null,
  error: null,
  success: false,
  failed: false,
  loading: false,
  status: GET_BANK_LIST.END,
};
// ADD Bank
const addBanks = {
  success: false,
  failed: false,
  loading: false,
  status: ADD_BANK.END,
  cardSource: null,
};

const deleteBankResponse = {
  info: null,
  success: false,
  failed: false,
  loading: false,
  status: DELETE_BANK.END,
};
const deleteCardResponse = {
  info: null,
  success: false,
  failed: false,
  loading: false,
  status: DELETE_CARD.END,
};

const paymentIntentRes = {
  success: false,
  error: null,
  info: null,
  failed: false,
  loading: false,
  status: PAYMENT_INTENT.END,
};
const attachPaymentIntentRes = {
  success: false,
  error: null,
  info: null,
  failed: false,
  loading: false,
  status: ATTACH_PAYMENT_INTENT.END,
};

const bankResponse = {
  success: false,
  failed: false,
  loading: false,
  status: ADD_BANK_TOKEN.END,
  info: null,
};
export function addBankTokenReducer(state = bankResponse, action) {
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
      return {
        ...state,
        bankResponse: {
          success: false,
          failed: false,
          loading: false,
          status: ADD_BANK_TOKEN.END,
          info: null,
        },
      };
    default:
      return state;
  }
}

export function createPaymentIntentReducer(state = paymentIntentRes, action) {
  switch (action?.type) {
    case PAYMENT_INTENT.START:
      return {
        ...state,
        paymentIntentRes: {loading: true, status: PAYMENT_INTENT.START},
      };
    case PAYMENT_INTENT.SUCCESS:
      return {
        ...state,
        paymentIntentRes: {
          info: action?.payload,
          loading: false,
          status: PAYMENT_INTENT.SUCCESS,
        },
      };
    case PAYMENT_INTENT.FAIL:
      return {
        ...state,
        paymentIntentRes: {
          error: action?.payload,
          loading: false,
          status: PAYMENT_INTENT.FAIL,
        },
      };
    case PAYMENT_INTENT.END:
      return {
        ...state,
        paymentIntentRes: {loading: false, status: PAYMENT_INTENT.END},
      };
    case PAYMENT_INTENT.CLEAN:
      return paymentIntentRes;
    default:
      return state;
  }
}
export function attachPaymentIntentReducer(
  state = attachPaymentIntentRes,
  action,
) {
  switch (action?.type) {
    case ATTACH_PAYMENT_INTENT.START:
      return {
        ...state,
        attachPaymentIntentRes: {
          loading: true,
          status: ATTACH_PAYMENT_INTENT.START,
        },
      };
    case ATTACH_PAYMENT_INTENT.SUCCESS:
      return {
        ...state,
        attachPaymentIntentRes: {
          info: action?.payload,
          loading: false,
          status: ATTACH_PAYMENT_INTENT.SUCCESS,
        },
      };
    case ATTACH_PAYMENT_INTENT.FAIL:
      return {
        ...state,
        attachPaymentIntentRes: {
          error: action?.payload,
          loading: false,
          status: ATTACH_PAYMENT_INTENT.FAIL,
        },
      };
    case ATTACH_PAYMENT_INTENT.END:
      return {
        ...state,
        attachPaymentIntentRes: {
          loading: false,
          status: ATTACH_PAYMENT_INTENT.END,
        },
      };
    case ATTACH_PAYMENT_INTENT.CLEAN:
      return attachPaymentIntentRes;
    default:
      return state;
  }
}

export function getCardListReducer(state = getCardListResponse, action) {
  switch (action?.type) {
    case GET_CARD_LIST.START:
      return {
        ...state,
        getCardListResponse: {loading: true, status: GET_CARD_LIST.START},
      };
    case GET_CARD_LIST.SUCCESS:
      return {
        ...state,
        getCardListResponse: {
          info: action?.payload,
          loading: false,
          status: GET_CARD_LIST.SUCCESS,
        },
      };
    case GET_CARD_LIST.FAIL:
      return {
        ...state,
        getCardListResponse: {
          error: action?.payload,
          loading: false,
          status: GET_CARD_LIST.FAIL,
        },
      };
    case GET_CARD_LIST.END:
      return {
        ...state,
        getCardListResponse: {loading: false, status: GET_CARD_LIST.END},
      };
    case GET_CARD_LIST.CLEAN:
      return {
        getCardListResponse: {
          info: null,
          success: false,
          error: null,
          failed: false,
          loading: false,
          status: GET_CARD_LIST.END,
        },
      };
    default:
      return state;
  }
}

export function getBankListReducer(state = getBankListResponse, action) {
  switch (action?.type) {
    case GET_BANK_LIST.START:
      return {
        ...state,
        getBankListResponse: {loading: true, status: GET_BANK_LIST.START},
      };
    case GET_BANK_LIST.SUCCESS:
      return {
        ...state,
        getBankListResponse: {
          error: null,
          info: action?.payload,
          loading: false,
          status: GET_BANK_LIST.SUCCESS,
        },
      };
    case GET_BANK_LIST.FAIL:
      return {
        ...state,
        getBankListResponse: {
          error: action?.payload,
          info: null,
          loading: false,
          status: GET_BANK_LIST.FAIL,
        },
      };
    case GET_BANK_LIST.END:
      return {
        ...state,
        getBankListResponse: {loading: false, status: GET_BANK_LIST.END},
      };
    case GET_BANK_LIST.CLEAN:
      return {
        getBankListResponse: {
          info: null,
          success: false,
          error: null,
          failed: false,
          loading: false,
          status: GET_BANK_LIST.END,
        },
      };
    default:
      return state;
  }
}

export function addBankReducer(state = addBanks, action) {
  switch (action?.type) {
    case ADD_BANK.START:
      return {
        ...state,
        addBanks: {
          loading: true,
          status: ADD_BANK.START,
        },
      };
    case ADD_BANK.SUCCESS:
      return {
        ...state,
        addBanks: {
          loading: false,
          status: ADD_BANK.SUCCESS,
          cardSource: action.source,
          info: action?.payload,
        },
      };
    case ADD_BANK.FAIL:
      return {
        ...state,
        addBanks: {
          info: action?.payload,
          loading: false,
          status: ADD_BANK.FAIL,
        },
      };
    case ADD_BANK.END:
      return {
        ...state,
        addBanks: {loading: false, status: ADD_BANK.END},
      };
    case ADD_BANK.CLEAN:
      return {
        addBanks: {
          success: false,
          failed: false,
          loading: false,
          status: ADD_BANK.END,
          cardSource: null,
        },
      };
    default:
      return state;
  }
}

export function deleteCardReducer(state = deleteCardResponse, action) {
  switch (action?.type) {
    case DELETE_CARD.START:
      return {
        ...state,
        deleteCardResponse: {
          loading: true,
          status: DELETE_CARD.START,
          success: false,
          failed: false,
        },
      };
    case DELETE_CARD.SUCCESS:
      return {
        ...state,
        deleteCardResponse: {
          loading: false,
          status: DELETE_CARD.SUCCESS,
          info: action?.payload,
          success: true,
          failed: false,
        },
      };
    case DELETE_CARD.FAIL:
      return {
        ...state,
        deleteCardResponse: {
          info: action?.payload,
          loading: false,
          status: DELETE_CARD.FAIL,
          success: false,
          failed: true,
        },
      };
    case DELETE_CARD.END:
      return {
        ...state,
        deleteCardResponse: {loading: false, status: DELETE_CARD.END},
      };
    case DELETE_CARD.CLEAN:
      return deleteCardResponse;
    default:
      return state;
  }
}

export function deleteBankReducer(state = deleteBankResponse, action) {
  switch (action?.type) {
    case DELETE_BANK.START:
      return {
        ...state,
        deleteBankResponse: {
          loading: true,
          status: DELETE_BANK.START,
          success: false,
          failed: false,
        },
      };
    case DELETE_BANK.SUCCESS:
      return {
        ...state,
        deleteBankResponse: {
          loading: false,
          status: DELETE_BANK.SUCCESS,
          info: action?.payload,
          success: true,
          failed: false,
        },
      };
    case DELETE_BANK.FAIL:
      return {
        ...state,
        deleteBankResponse: {
          info: action?.payload,
          loading: false,
          status: DELETE_BANK.FAIL,
          success: false,
          failed: true,
        },
      };
    case DELETE_BANK.END:
      return {
        ...state,
        deleteBankResponse: {loading: false, status: DELETE_BANK.END},
      };
    case DELETE_BANK.CLEAN:
      return deleteBankResponse;
    default:
      return state;
  }
}
