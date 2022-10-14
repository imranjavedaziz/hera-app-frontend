import {Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './style';

const PtbAccount = ({leftIcon, title, onPress, BlueDot}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.iconContent}>
          <Image source={leftIcon} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      {BlueDot && <View style={styles.blueDot} />}
    </TouchableOpacity>
  );
};
export default PtbAccount;
