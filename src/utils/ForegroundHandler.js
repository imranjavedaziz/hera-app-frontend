import { useEffect } from 'react';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import PushNotification, { Importance } from 'react-native-push-notification';

const ForegroundHandler = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(remoteMessage => {
      console.log('Notification Unsubscribe', remoteMessage);
      const { notification, messageId } = remoteMessage;
      if (Platform.OS === 'ios') {
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
  }, []);
  return null;
};

export default ForegroundHandler;
