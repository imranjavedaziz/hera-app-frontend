import { View, Image } from 'react-native';
import React from 'react';
import styles from './style';

const ChatImagComp = ({ source }) => {
  return (
    <View style={styles.ImageView}>
      <Image style={styles.ImageStyle} source={{ uri: source }} />
    </View>
  );
};

export default ChatImagComp;
