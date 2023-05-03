import {Alert, BackHandler} from 'react-native';
import {Routes} from '../constants/Constants';
import {ValidationMessages} from '../constants/Strings';
import moment from 'moment';

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
export function padLeadingZeros(num, size) {
  var s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
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
  let txt = cardExpiry.replace('/', '');
  if (txt.length > 2) {
    return txt.substr(0, 2) + '/' + (txt.substr(2) || '');
  }
  return txt;
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
