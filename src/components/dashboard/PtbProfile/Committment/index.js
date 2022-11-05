import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';

const Commitment = ({MainText, Months, Icon, Style, onPress}) => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={[styles.mainContainer, Style]}>
        <View style={styles.innerView}>
          <Text style={styles.mainText}>{MainText}</Text>
          <Text style={styles.innerText}>{Months}</Text>
        </View>
        <Image style={styles.Icon} source={Icon} />
      </TouchableOpacity>
    </>
  );
};

export default Commitment;
