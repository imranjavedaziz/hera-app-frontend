import React, {useState, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import NotificationService from '../utils/notificationService';
import ForegroundHandler from '../utils/ForegroundHandler';
import uuid from 'react-native-uuid';
export const NotificationContext = React.createContext();

const NotificationContextManager = props => {
  const [fcmToken, setFcmToken] = useState('');
  const [Device_ID, setDevice_ID] = useState('');
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
      getDeviceId();
      console.log('Authorization status:', authStatus);
    }
  };

  const getFcmToken = async () => {
    console.log(
      'myMethod: ',
      'isDeviceRegisteredForRemoteMessages', messaging().isDeviceRegisteredForRemoteMessages,
    )
    if (
      Platform.OS === 'ios' &&
      !messaging().isDeviceRegisteredForRemoteMessages
    ) {
      console.log('myMethod: ', 'registerDeviceForRemoteMessages')
      await messaging().registerDeviceForRemoteMessages()
    }
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
  const getDeviceId = async () => {
    const device_id = await uuid.v4();
    setDevice_ID(device_id);
    console.log(device_id, 'old device_id');
    if (device_id) {
      setDevice_ID(device_id);
      console.log('Your device_id is:', device_id);
    } else {
      console.log('Failed', 'No token device_id');
    }
  };

  // useOnBackToApp()

  return (
    <NotificationContext.Provider
      value={{
        fcmToken,
        Device_ID,
      }}>
      <ForegroundHandler />
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextManager;
