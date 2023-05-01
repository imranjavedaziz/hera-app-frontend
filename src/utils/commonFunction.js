import {Alert, BackHandler} from 'react-native';
import {Routes} from '../constants/Constants';
import {ValidationMessages} from '../constants/Strings';

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
