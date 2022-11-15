import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './style';

const ChatImagComp = ({source}) => {
  return (
    <View style={styles.ImageView}>
      <Image style={styles.ImageStyle} source={source} />
    </View>
  );
};

export default ChatImagComp;
