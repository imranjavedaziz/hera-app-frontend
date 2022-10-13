import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './style';

const Subscribe = ({MainText, InnerText, Icon}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image style={styles.icon} source={Icon} />
        <Text style={styles.mainText}>{MainText}</Text>
      </View>
      <Text style={styles.innerText}>{InnerText}</Text>
    </View>
  );
};

export default Subscribe;
