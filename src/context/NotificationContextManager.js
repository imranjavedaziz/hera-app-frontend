import React, {useState, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import NotificationService from '../utils/notificationService';
import ForegroundHandler from '../utils/ForegroundHandler';

export const NotificationContext = React.createContext();

const NotificationContextManager = props => {
  const [fcmToken, setFcmToken] = useState('');

  //Get fcmToken
  useEffect(() => {
    requestUserPermission();
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFcmToken();
      console.log('Authorization status:', authStatus);
    }
  };

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    setFcmToken(fcmToken);
    console.log(fcmToken, 'old Token');
    if (fcmToken) {
      setFcmToken(fcmToken);
      console.log('Your Firebase Token is:', fcmToken);
      // await NotificationService.getNotification();
      await NotificationService.onNotificationOpenedApp();
      await NotificationService.setBackgroundMessageHandler();
    } else {
      console.log('Failed', 'No token received');
    }
  };

  // useOnBackToApp()

  return (
    <NotificationContext.Provider
      value={{
        fcmToken,
      }}>
      <ForegroundHandler />
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextManager;
