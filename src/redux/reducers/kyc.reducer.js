import {
  KYC_STATUS,
  KYC_UPDATE,
  BANK_UPDATE,
  BANK_UPDATE_FAIL,
  BANK_UPDATE_SUCCESS,
} from '../Type';

const initialState = {
  kycResponse: {
    success: false,
    failed: false,
    loading: false,
    status: KYC_UPDATE.END,
  },
};

const initialStatusState = {
  kycStatusResponse: {
    success: false,
    failed: false,
    loading: false,
    status: KYC_STATUS.END,
  },
};
const initialStateBank = {
  bank_update_res: '',
  bank_update_success: false,
  bank_update_loading: false,
  bank_update_error_msg: '',
  bank_update_fail: false,
};

export default function kycUpdateReducer(action, state = initialState) {
  switch (action?.type) {
    case KYC_UPDATE.START:
      return {
        ...state,
        kycResponse: {
          loading: true,
          status: KYC_UPDATE.START,
        },
      };

    case KYC_UPDATE.SUCCESS:
      return {
        ...state,
        kycResponse: {
          info: action?.payload,
          loading: false,
          status: KYC_UPDATE.SUCCESS,
        },
      };

    case KYC_UPDATE.FAIL:
      return {
        ...state,
        kycResponse: {
          info: action?.payload,
          loading: false,
          status: KYC_UPDATE.FAIL,
        },
      };

    case KYC_UPDATE.END:
      return {
        ...state,
        kycResponse: {
          loading: false,
          status: KYC_UPDATE.END,
        },
      };
    default:
      return state;
  }
}

export function kycStatusReducer(action, state = initialStatusState) {
  switch (action?.type) {
    case KYC_STATUS.START:
      return {
        ...state,
        kycStatusResponse: {
          loading: true,
          status: KYC_STATUS.START,
        },
      };

    case KYC_STATUS.SUCCESS:
      return {
        ...state,
        kycStatusResponse: {
          info: action?.payload,
          loading: false,
          status: KYC_STATUS.SUCCESS,
        },
      };

    case KYC_STATUS.FAIL:
      return {
        ...state,
        kycStatusResponse: {
          info: action?.payload,
          loading: false,
          status: KYC_STATUS.FAIL,
        },
      };

    case KYC_STATUS.END:
      return {
        ...state,
        kycStatusResponse: {
          loading: false,
          status: KYC_STATUS.END,
        },
      };
    default:
      return state;
  }
}

export function bankUpdateReducer(action, state = initialStateBank) {
  switch (action?.type) {
    case BANK_UPDATE:
      return {
        ...state,
        bank_update_res: '',
        bank_update_success: false,
        bank_update_loading: true,
        bank_update_error_msg: '',
        bank_update_fail: false,
      };

    case BANK_UPDATE_SUCCESS:
      return {
        ...state,
        bank_update_res: action.payload,
        bank_update_success: true,
        bank_update_loading: false,
        bank_update_error_msg: '',
        bank_update_fail: false,
      };

    case BANK_UPDATE_FAIL:
      return {
        ...state,
        bank_update_res: '',
        bank_update_success: false,
        bank_update_loading: false,
        bank_update_error_msg: action.payload.msg,
        bank_update_fail: true,
      };
    default:
      return state;
  }
}
