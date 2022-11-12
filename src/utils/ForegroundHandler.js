import React, {useEffect} from 'react';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import {Alert, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

const ForegroundHandler = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(remoteMessage => {
      console.log('Notification handle in foreground', remoteMessage);
      const {notification, messageId} = remoteMessage;
      Alert.alert('Push Notification arrived!', notification.body);
      if (Platform.OS === 'ios') {
        PushNotificationIOS.addNotificationRequest({
          id: messageId,
          body: notification.body,
          title: notification.title,
          sound: 'default',
        });
      } else {
        PushNotification.localNotification({
          channelId: 'your-channel-id',
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
  }, []);
  return null;
};

export default ForegroundHandler;
