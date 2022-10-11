// Button
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Colors from '../constants/Colors';
import {Value} from '../constants/FixedValues';
import Alignment from '../constants/Alignment';
import {Fonts} from '../constants/Constants';

const styles = {
  btn: {
    paddingHorizontal: Value.CONSTANT_VALUE_60,
    paddingVertical: Value.CONSTANT_VALUE_30,
    borderRadius: Value.CONSTANT_VALUE_40,
    minWidth: Value.CONSTANT_VALUE_100,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    flex: Value.CONSTANT_VALUE_0,
    marginVertical: 15,
    borderColor: 'black',
  },
  text: {
    fontSize: Value.CONSTANT_VALUE_14,
    lineHeight: Value.CONSTANT_VALUE_18,
    color: Colors.BLACK,
    textAlign: Alignment.CENTER,
    flex: Value.CONSTANT_VALUE_0,
    letterSpacing: 1.8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontFamily: Fonts.OpenSansBold,
  },
};
const Button = props => {
  const {label = '', color = Colors.GREEN, style = {}, ...otherProps} = props;
  return (
    <TouchableOpacity
      activeOpacity={Value.CONSTANT_VALUE_FRAC80}
      style={[styles.btn, {backgroundColor: color}, style]}
      {...otherProps}
      accessibilityRole="button"
      accessible={true}
      accessibilityLabel={label}>
      <Text
        style={styles.text}
        accessible={false}
        numberOfLines={Value.CONSTANT_VALUE_1}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
export default Button;
