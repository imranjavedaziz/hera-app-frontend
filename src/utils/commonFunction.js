import {Alert, BackHandler} from 'react-native';
import {Routes} from '../constants/Constants';
import {ValidationMessages} from '../constants/Strings';

export const deviceHandler = (navigation, screen) => {
  const backAction = () => {
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
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  return () => backHandler.remove();
};
