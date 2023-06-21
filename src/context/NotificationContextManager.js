import React, {useState, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import NotificationService from '../utils/notificationService';
import ForegroundHandler from '../utils/ForegroundHandler';
import uuid from 'react-native-uuid';
import {Platform} from 'react-native';
export const NotificationContext = React.createContext();
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
const NotificationContextManager = props => {
  const [fcmToken, setFcmToken] = useState('');
  const [Device_ID, setDevice_ID] = useState('');
  //Get fcmToken
  useEffect(() => {
    requestUserPermission();
  }, []);

  const requestUserPermission = async () => {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        getFcmToken();
        getDeviceId();
      }
    } else {
      // Permission not granted, request it using PermissionsAndroid
      const permissionStatus = await request(
        PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        // PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      console.log(permissionStatus, 'permissionStatus');
      if (permissionStatus === RESULTS.GRANTED) {
        // Permission granted, perform necessary actions
        getFcmToken();
        getDeviceId();
      } else {
        console.log('Permission denied');
      }
    }
  };
  const getFcmToken = async () => {
    console.log(
      'myMethod: ',
      'isDeviceRegisteredForRemoteMessages',
      messaging().isDeviceRegisteredForRemoteMessages,
    );
    if (
      Platform.OS === 'ios' &&
      !messaging().isDeviceRegisteredForRemoteMessages
    ) {
      console.log('myMethod: ', 'registerDeviceForRemoteMessages');
      await messaging().registerDeviceForRemoteMessages();
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
