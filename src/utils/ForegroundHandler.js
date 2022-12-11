import {useEffect} from 'react';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';
import {useSelector} from 'react-redux';

const ForegroundHandler = () => {
  const {messageIdRx} = useSelector(state => state.MessageId);
  console.log(messageIdRx?.data, 'message_id_resmessage_id_resmessage_id_res');
  useEffect(() => {
    const unsubscribe = messaging().onMessage(remoteMessage => {
      console.log('Notification Method Unsubscribe', remoteMessage);
      const {notification, messageId} = remoteMessage;
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
