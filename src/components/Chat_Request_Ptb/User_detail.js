import {View, Text} from 'react-native';
import React from 'react';
import styles from './style';
const User_detail = ({Name, Type}) => {
  return (
    <View style={styles.innerContainer}>
      <Text style={styles.Name}>{Name}</Text>
      <Text style={styles.Type}>{Type}</Text>
    </View>
  );
};

export default User_detail;
