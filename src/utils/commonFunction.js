
import {Alert, BackHandler, Platform} from 'react-native';

import {Routes} from '../constants/Constants';
import {ValidationMessages} from '../constants/Strings';
import moment from 'moment';
import {Images} from '../constants';
import numeral from 'numeral';
import {store} from '../redux/store';

export const deviceHandler = (navigation, screen) => {
  const backAction = () => {
    if (screen === 'deviceGoBack') {
      navigation.goBack();
    } else {
      Alert.alert(ValidationMessages.HOLD_ON, ValidationMessages.ALERT, [
        {
          text: ValidationMessages.CANCEL,
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: ValidationMessages.YES,
          onPress: () => {
            if (screen === 'goBack' && navigation.canGoBack()) {
              navigation.goBack();
            } else if (screen === 'exit') {
              BackHandler.exitApp();
            } else {
              navigation.navigate(Routes.Landing);
            }
          },
        },
      ]);
    }

    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  return () => backHandler.remove();
};
export function formatACNumber(accountNumber) {
  if (accountNumber) {
    // Remove all non-digit characters from the account number
    accountNumber = accountNumber.replace(/\D/g, '');

    // Split the account number into groups of four digits
    var groups = accountNumber.match(/.{1,4}/g);

    // Join the groups with hyphens and return the formatted string
    return groups.join('-');
  } else {
    return accountNumber;
  }
}
export function undoFormatACNumber(accountNumber) {
  if (accountNumber) {
    // Remove all non-digit characters from the account number
    accountNumber = accountNumber.replace(/\D/g, '');

    // Return the formatted string without hyphens
    return accountNumber;
  } else {
    return accountNumber;
  }
}

export function formatCardNumber(value) {
  if (!value) {
    return value;
  }
  return value
    .replace(/\s?/g, '')
    .replace(/(\d{4})/g, '$1 ')
    .trim();
}
export function padLeadingZeros(num, size) {
  var s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
}

export function monthGet(item) {
  const monthInt = item?.exp_month;
  switch (monthInt) {
    case 1:
      return 'Jan';
    case 2:
      return 'Feb';
    case 3:
      return 'Mar';
    case 4:
      return 'Apr';
    case 5:
      return 'May';
    case 6:
      return 'Jun';
    case 7:
      return 'Jul';
    case 8:
      return 'Aug';
    case 9:
      return 'Sep';
    case 10:
      return 'Oct';
    case 11:
      return 'Nov';
    case 12:
      return 'Dec';
    default:
      return '';
  }
}
export const getNumberFromString = text => {
  let number = text.replace(/[^\d]/g, '');
  return Number(number);
};

export function validateName(name) {
  const regEx = /^[a-zA-Z]*$/;

  return regEx.test(name);
}
export function isPositiveInteger(str) {
  if (typeof str !== 'string') {
    return false;
  }
  const num = Number(str);
  return Number.isInteger(num) && num >= 0;
}

export function formatExpiryDate(cardExpiry) {
  if (cardExpiry && cardExpiry !== undefined && cardExpiry.length > 1) {
    let txt = cardExpiry?.replace('/', '');
    if (txt.length > 2) {
      return txt.substr(0, 2) + '/' + (txt.substr(2) || '');
    }
    return txt;
  } else {
    cardExpiry;
  }
}
export function validateFullName(name) {
  const regEx = /^[a-zA-Z ]*$/;

  return regEx.test(name);
}
export const DateFormats = {
  MMMDDYYYY: 'MMM DD, YYYY',
  MMMMDDYYYY: 'MMMM DD, YYYY',
  YYYYMMDD: 'YYYY-MM-DD',
  utcFormat: 'YYYY-MM-DD HH:mm:ss',
};

export function dateStrToDate(str, format = DateFormats.MMMDDYYYY) {
  return moment(str, format);
}

export function dateToStringFormatter(date, format = DateFormats.MMMDDYYYY) {
  if (date) {
    return moment(date).format(format);
  } else {
    return '';
  }
}
export const validMobileNumber = text => {
  let number = text.replace(/[^\d]/g, '');
  const reg = /^\d{8,15}$/;
  return reg.test(number);
};
export const validateZipCode = text => {
  const reg = /(^[a-zA-Z0-9]*$)/;
  return reg.test(text);
};
export function validateImage(path) {
  const reg = /\.(jpg|jpeg|png)$/;
  return reg.test(path);
}
export function getFileExtension(filename, splitFrom) {
  return filename.substring(
    filename.lastIndexOf(splitFrom) + 1,
    filename.length,
  );
}
export const getMediaFormatedForLibrary = media => {
  return {
    uri: media.path,
    type: media.mime,
    name: getFileExtension(media.path, '/'),
  };
};
export const jsonToFormData = req => {
  let formData = new FormData();
  Object.entries(req).forEach(entry => {
    const [key, value] = entry;
    formData.append(key, value);
  });
  return formData;
};
export function validateExpiryDate(date) {
  let expirySplit = date.split('/');
  if (isNaN(date.replace('/', ''))) {
    return false;
  }
  return !(
    expirySplit.length !== 2 ||
    isInvalidMonth(expirySplit[0]) ||
    isInvalidYear(expirySplit[1]) ||
    isInvalidMonthYear(expirySplit[0], expirySplit[1])
  );
}
function isInvalidMonth(month) {
  return month > 12 || month < 1;
}

function isInvalidYear(date) {
  return date < moment().format('YY');
}

function isInvalidMonthYear(month, year) {
  return month <= moment().month() && year === moment().format('YY');
}

export const capitalizeStr = str => {
  const arr = str.toLowerCase().split(' ');
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr.join(' ');
};
export function getRoleData(roleId, role) {
  switch (true) {
    case roleId === 2:
      role = 'Intended Parent';
      break;
    case roleId === 3:
      role = 'Surrogate Mother';
      break;
    case roleId === 4:
      role = 'Egg Donor';
      break;
    case roleId === 5:
      role = 'Sperm Donor';
      break;
    default:
      role = 'Intended Parent';
      break;
  }
  return role;
}
export function getRequestTime(createdAt) {
  // Get the current date
  const currentDate = new Date();

  // Convert the "created_at" string to a Date object
  const createdAtDate = new Date(createdAt);

  // Format the date based on the comparison with the current date
  let time;
  if (createdAtDate.toDateString() === currentDate.toDateString()) {
    time = 'Today';
  } else {
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
    if (createdAtDate.toDateString() === yesterday.toDateString()) {
      time = 'Yesterday';
    } else {
      // Format the date as "month day, year" (e.g., May 26, 2023)
      const options = {year: 'numeric', month: 'long', day: 'numeric'};
      time = createdAtDate.toLocaleDateString(undefined, options);
    }
  }

  return time;
}
const ZERO = 0;

export const calculateStripeAmount = amount => {
  const {stripe_processing_fees, stripe_additional_fees} =
    store.getState().Auth;
  if (amount > ZERO) {
    const taxAmount =
      (amount * stripe_processing_fees) / 100 + stripe_additional_fees;
    return taxAmount.toFixed(2);
  }
  return ZERO;
};

export const calculateTotalStripeAmount = amount => {
  const {stripe_processing_fees, stripe_additional_fees} =
    store.getState().Auth;
  if (amount > ZERO) {
    const taxAmount =
      (amount * stripe_processing_fees) / 100 + stripe_additional_fees;
    return (taxAmount + parseFloat(amount)).toFixed(2);
  }
  return ZERO;
};
export const digitBeforeDecimal = (txt, maxToEight = true) => {
  if (!txt || txt === '') {
    return '';
  }
  let updatedTxt = txt.replace(/,/g, '');
  let formatted = parseFloat(updatedTxt);

  if(Platform.OS==='android'){
    formatted = formatted?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  else{
    formatted = formatted?.toLocaleString('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  }
  updatedTxt = formatted;
  if (formatted.length >= 8 && maxToEight) {
    updatedTxt = formatted.substring(0, 8);
  }
  return updatedTxt === 'NaN' ? '' : updatedTxt;
};
export function convertDateFormat(dateString) {
  const date = new Date(dateString);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formattedDate = date.toLocaleString('en-US', options);

  return `${formattedDate}`;
}
export function getCardImage(cardType) {
  const cardTypeLowercase = cardType.toLowerCase();
  const cardTypeToImageMap = {
    visa: Images.iconVisacardbig,
    mastercard: Images.iconMasterbig,
    'american express': Images.iconAmexbig,
    unionpay: Images.iconUnionPaybig,
    jcb: Images.iconJcbbig,
    discover: Images.iconDiscoverbig,
    amex: Images.iconAmexbig,
  };
  return cardTypeToImageMap[cardTypeLowercase] || Images.defaultCardbig;
}
export const formatDigit = digit => {
  const formatted = numeral(digit).format('0,0.00');
  return formatted;
};
