import {
  ADD_CARD_TOKEN,
  PAYMENT_INTENT,
  UPDATE_CARD_TOKEN,
  ADD_BANK_TOKEN,
  UPDATE_BANK_TOKEN,
  GET_CUSTOMER_ID,
  GET_CARD_LIST,
  ADD_CARD,
  GET_BANK_LIST,
  DELETE_BANK,
  DELETE_CARD,
} from '../actions/stripe.action';

const initialState = {
  tokenResponse: {
    success: false,
    failed: false,
    loading: false,
    status: ADD_CARD_TOKEN.END,
  },
};
const getCardListResponse = {
  info: null,
  success: false,
  error: null,
  failed: false,
  loading: false,
  status: GET_CUSTOMER_ID.END,
};
const getBankListResponse = {
  info: null,
  error: null,
  success: false,
  failed: false,
  loading: false,
  status: GET_BANK_LIST.END,
};
const addCards = {
  success: false,
  failed: false,
  loading: false,
  status: ADD_CARD.END,
  isCreatingCardSource: false,
  cardSource: null,
};
const updateTokenState = {
  cardResponse: {
    success: false,
    failed: false,
    loading: false,
    status: UPDATE_CARD_TOKEN.END,
  },
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
const updateBankTokenState = {
  bankUpdateResponse: {
    success: false,
    failed: false,
    loading: false,
    status: UPDATE_BANK_TOKEN.END,
  },
};
const paymentIntentState = {
  paymentIntentRes: {
    success: false,
    failed: false,
    loading: false,
    status: PAYMENT_INTENT.END,
  },
};

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

export function addCardTokenReducer(state = initialState, action) {
  switch (action?.type) {
    case ADD_CARD_TOKEN.START:
      return {
        ...state,
        tokenResponse: {loading: true, status: ADD_CARD_TOKEN.START},
      };
    case ADD_CARD_TOKEN.SUCCESS:
      return {
        ...state,
        tokenResponse: {
          info: action?.payload,
          loading: false,
          status: ADD_CARD_TOKEN.SUCCESS,
        },
      };
    case ADD_CARD_TOKEN.FAIL:
      return {
        ...state,
        tokenResponse: {
          info: action?.payload,
          loading: false,
          status: ADD_CARD_TOKEN.FAIL,
        },
      };
    case ADD_CARD_TOKEN.END:
      return {
        ...state,
        tokenResponse: {loading: false, status: ADD_CARD_TOKEN.END},
      };
    case ADD_CARD_TOKEN.CLEAN:
      return initialState;
    default:
      return state;
  }
}

export function updateCardTokenReducer(state = updateTokenState, action) {
  switch (action?.type) {
    case UPDATE_CARD_TOKEN.START:
      return {
        ...state,
        cardResponse: {loading: true, status: UPDATE_CARD_TOKEN.START},
      };
    case UPDATE_CARD_TOKEN.SUCCESS:
      return {
        ...state,
        cardResponse: {
          info: action?.payload,
          loading: false,
          status: UPDATE_CARD_TOKEN.SUCCESS,
        },
      };
    case UPDATE_CARD_TOKEN.FAIL:
      return {
        ...state,
        cardResponse: {
          info: action?.payload,
          loading: false,
          status: UPDATE_CARD_TOKEN.FAIL,
        },
      };
    case UPDATE_CARD_TOKEN.END:
      return {
        ...state,
        cardResponse: {loading: false, status: UPDATE_CARD_TOKEN.END},
      };
    case UPDATE_CARD_TOKEN.CLEAN:
      return updateTokenState;
    default:
      return state;
  }
}

export function updateBankTokenReducer(state = updateBankTokenState, action) {
  switch (action?.type) {
    case UPDATE_BANK_TOKEN.START:
      return {
        ...state,
        bankUpdateResponse: {loading: true, status: UPDATE_BANK_TOKEN.START},
      };
    case UPDATE_BANK_TOKEN.SUCCESS:
      return {
        ...state,
        bankUpdateResponse: {
          info: action?.payload,
          loading: false,
          status: UPDATE_BANK_TOKEN.SUCCESS,
        },
      };
    case UPDATE_BANK_TOKEN.FAIL:
      return {
        ...state,
        bankUpdateResponse: {
          info: action?.payload,
          loading: false,
          status: UPDATE_BANK_TOKEN.FAIL,
        },
      };
    case UPDATE_BANK_TOKEN.END:
      return {
        ...state,
        bankUpdateResponse: {loading: false, status: UPDATE_BANK_TOKEN.END},
      };
    case UPDATE_BANK_TOKEN.CLEAN:
      return updateBankTokenState;
    default:
      return state;
  }
}

export function createPaymentIntentReducer(state = paymentIntentState, action) {
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
          info: action?.payload,
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
      return paymentIntentState;
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
      return getCardListResponse;
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
        getCardListResponse: {loading: false, status: GET_BANK_LIST.END},
      };
    case GET_BANK_LIST.CLEAN:
      return getBankListResponse;
    default:
      return state;
  }
}

export function addCardReducer(state = addCards, action) {
  switch (action?.type) {
    case ADD_CARD.START:
      return {
        ...state,
        addCards: {
          loading: true,
          status: ADD_CARD.START,
          isCreatingCardSource: true,
        },
      };
    case ADD_CARD.SUCCESS:
      return {
        ...state,
        addCards: {
          loading: false,
          status: ADD_CARD.SUCCESS,
          isCreatingCardSource: false,
          cardSource: action.source,
          info: action?.payload,
        },
      };
    case ADD_CARD.FAIL:
      return {
        ...state,
        addCards: {
          isCreatingCardSource: false,
          info: action?.payload,
          loading: false,
          status: ADD_CARD.FAIL,
        },
      };
    case ADD_CARD.END:
      return {
        ...state,
        addCards: {loading: false, status: ADD_CARD.END},
      };
    case ADD_CARD.CLEAN:
      return addCards;
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
