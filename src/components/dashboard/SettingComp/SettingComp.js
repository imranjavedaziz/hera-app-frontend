import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';

const SettingComp = ({icon, Heading, Description}) => {
  return (
    <View>
      <TouchableOpacity style={styles.mainContainer}>
        <View style={styles.row}>
          <Image source={icon} />
          <Text style={styles.headingText}>{Heading}</Text>
        </View>
        <Text style={styles.description}>{Description}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingComp;
