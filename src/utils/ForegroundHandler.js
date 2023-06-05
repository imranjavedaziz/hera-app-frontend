import React, {useEffect, useRef} from 'react';

import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import {AppState, Platform} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';
import {useDispatch, useSelector} from 'react-redux';
// import {useToast} from 'react-native-toast-notifications';
import {showMessageAppToast} from '../redux/actions/loader';
import * as RootNavigation from '../utils/RootNavigation';
import Toast from 'react-native-toast-notifications';
import {MessageToast} from '../components';
export const navigationRef = React.createRef();
const ForegroundHandler = () => {
  const messageIdRx = useSelector(state => state.MessageId);
  const toastRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = messaging().onMessage(remoteMessage => {
      console.log('Notification Method Unsubscribe', remoteMessage);
      const {notification, messageId} = remoteMessage;
      const {recieverId} = remoteMessage?.data;
      const showNotification =
        messageIdRx?.messageIdRx === parseInt(recieverId);
      if (Platform.OS === 'ios' && AppState.currentState !== 'background') {
        if (
          showNotification === true &&
          remoteMessage?.data.notify_type === 'chat'
        ) {
          return null;
        } else if (
          remoteMessage?.data.notify_type === 'payment_request' ||
          remoteMessage?.data.notify_type === 'payment_declined' ||
          remoteMessage?.data.notify_type === 'payment_transfer'
        ) {
          toastRef?.current?.show(remoteMessage?.notification.body, {
            type: 'custom',
            placement: 'top',
            duration: 2000,
            offset: 30,
            animationType: 'slide-in',
          });
          dispatch(
            showMessageAppToast(
              true,
              remoteMessage?.notification.body,
              true,
              remoteMessage?.data,
              RootNavigation,
            ),
          );
        } else {
          toastRef?.current?.show(remoteMessage?.notification.title, {
            type: 'custom',
            placement: 'top',
            duration: 2000,
            offset: 30,
            animationType: 'slide-in',
          });
          dispatch(
            showMessageAppToast(
              true,
              remoteMessage?.notification.title,
              true,
              remoteMessage?.data,
              RootNavigation,
            ),
          );
        }
        PushNotificationIOS.addNotificationRequest({
          id: messageId,
          body: notification.body,
          title: notification.title,
          sound: 'default',
        });
      } else {
        PushNotification.createChannel(
          {
            channelId: 'high-priority',
            channelName: 'My channel',
            channelDescription: 'A channel to categorise your notifications',
            playSound: false,
            soundName: 'default',
            importance: Importance.HIGH,
            vibrate: true,
          },
          created => console.log(`createChannel returned '${created}'`),
        );
        PushNotification.localNotification({
          channelId: 'high-priority',
          id: messageId,
          body: 'android body',
          title: 'android notif title',
          soundName: 'default',
          vibrate: true,
          playSound: true,
        });
      }
    });
    return unsubscribe;
  }, [messageIdRx]);
  return (
    <>
      {Platform.OS === 'ios' && (
        <Toast
          ref={toastRef}
          renderType={{
            custom: toast => <MessageToast />,
          }}
        />
      )}
    </>
  );
};

export default ForegroundHandler;
