import {Strings} from '../constants';

const getKycStatusFunction = status => {
  const statusMap = {
    verified: null,
    unverified: Strings.Hera_Pay.KYC_REJECTED,
    pending: Strings.Hera_Pay.KYC_PENDING,
    incomplete: Strings.Hera_Pay.KYC_INCOMPLETE,
  };

  return statusMap[status];
};

export default getKycStatusFunction;
