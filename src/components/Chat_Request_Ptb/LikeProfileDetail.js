import {View, Text} from 'react-native';
import React from 'react';
import styles from './style';
const LikeProfileDetail = ({likeProfile, Start_Converstation}) => {
  return (
    <View style={styles.innerView}>
      <Text style={styles.LikeProfile}>{likeProfile}</Text>
      <Text style={styles.StartConversation}>{Start_Converstation}</Text>
    </View>
  );
};

export default LikeProfileDetail;
