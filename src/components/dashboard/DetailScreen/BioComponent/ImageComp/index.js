import {View, Text} from 'react-native';
import React from 'react';
import styles from './style';
const BioComponent = ({Name, Detail}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.text}>{Name}</Text>
      <Text style={styles.textBold}>{Detail}</Text>
    </View>
  );
};

export default BioComponent;
