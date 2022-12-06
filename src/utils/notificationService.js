import messaging from '@react-native-firebase/messaging';

class NotificationService {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open
  async onNotificationOpenedApp() {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      return remoteMessage.notification;
    });
    return null;
  }

  async setBackgroundMessageHandler() {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('setBackgroundMessageHandler', remoteMessage.notification);
      return remoteMessage.notification;
    });
    return null;
  }
}

export default new NotificationService();
