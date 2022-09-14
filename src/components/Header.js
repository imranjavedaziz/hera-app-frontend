// Header
import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Colors from '../constants/Colors';
import {Value, Prencentage} from '../constants/FixedValues';
import Alignment from '../constants/Alignment';

const styles = {
  container: {
    flex: Value.CONSTANT_VALUE_0,
    width: Prencentage.PRECENTAGE_100,
    paddingVertical: Value.CONSTANT_VALUE_10,
    paddingHorizontal: Value.CONSTANT_VALUE_20,
    flexDirection: Alignment.ROW,
    backgroundColor: Colors.BACKGROUND,
  },
  start: {
    justifyContent: Alignment.SPACE_BETWEEN,
  },
  end: {
    justifyContent: Alignment.FLEXEND,
  },
  circle: {
    flex: Value.CONSTANT_VALUE_0,
  },
  img: {
    maxWidth: Value.CONSTANT_VALUE_50,
    resizeMode: 'cover',
    maxHeight: Value.CONSTANT_VALUE_50,
    flex: Value.CONSTANT_VALUE_0,
  },
};
export const CircleBtn = ({icon, onPress,...otherProps}) => (
  <TouchableOpacity style={styles.circle} onPress={onPress} {...otherProps} accessible={true} accessibilityRole="button">
    <Image accessible={false} source={icon} style={styles.img} />
  </TouchableOpacity>
);
const Header = ({end = false, children}) => {
  return (
    <View style={[styles.container, end ? styles.end : styles.start]}>
      {children}
    </View>
  );
};
export default Header;
