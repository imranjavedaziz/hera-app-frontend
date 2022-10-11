import {Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './style';
import {useNavigation} from '@react-navigation/native';

const PtbAccount = ({leftIcon, title, onPress, BlueDot}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={onPress}>
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
