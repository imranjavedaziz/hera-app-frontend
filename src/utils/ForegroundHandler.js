import React, {useEffect} from 'react';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';

const ForegroundHandler = () => {
  // PushNotification.configure({
  //   // (optional) Called when Token is generated (iOS and Android)
  //   onRegister: function (token) {
  //     console.log('TOKEN:', token);
  //   },

  //   // (required) Called when a remote is received or opened, or local notification is opened
  //   onNotification: function (notification) {
  //     console.log('NOTIFICATION:', notification);

  //     // process the notification

  //     // (required) Called when a remote is received or opened, or local notification is opened
  //     notification.finish(PushNotificationIOS.FetchResult.NoData);
  //   },

  //   // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  //   onAction: function (notification) {
  //     console.log('ACTION:', notification.action);
  //     console.log('NOTIFICATION:', notification);

  //     // process the action
  //   },

  //   // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  //   onRegistrationError: function (err) {
  //     console.error(err.message, err);
  //   },

  //   // IOS ONLY (optional): default: all - Permissions to register.
  //   permissions: {
  //     alert: true,
  //     badge: true,
  //     sound: true,
  //   },

  //   // Should the initial notification be popped automatically
  //   // default: true
  //   popInitialNotification: true,

  //   /**
  //    * (optional) default: true
  //    * - Specified if permissions (ios) and token (android and ios) will requested or not,
  //    * - if not, you must call PushNotificationsHandler.requestPermissions() later
  //    * - if you are not using remote notification or do not have Firebase installed, use this:
  //    *     requestPermissions: Platform.OS === 'ios'
  //    */
  //   requestPermissions: true,
  // });
  useEffect(() => {
    const unsubscribe = messaging().onMessage(remoteMessage => {
      console.log('Notification Unsubscribe', remoteMessage);
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
            channelId: 'high-priority', // (required)
            channelName: 'My channel', // (required)
            channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
            playSound: false, // (optional) default: true
            soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
            importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
          },
          created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
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
