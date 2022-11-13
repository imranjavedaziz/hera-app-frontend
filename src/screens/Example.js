import {View, Text} from 'react-native';
import React from 'react';

const PushNotificationExample = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 18, fontWeight: '800', color: 'black'}}>
        You received push notification
      </Text>
    </View>
  );
};

export default PushNotificationExample;
