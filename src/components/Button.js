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
    lineHeight: Value.CONSTANT_VALUE_16,
    color: Colors.BLACK,
    textAlign: Alignment.CENTER,
    flex: Value.CONSTANT_VALUE_0,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    fontFamily: Fonts.OpenSansBold,
  },
};
const Button = props => {
  const {
    label = '',
    color = Colors.COLOR_A3C6C4,
    style = {},
    disabled,
    ...otherProps
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={Value.CONSTANT_VALUE_FRAC80}
      style={[styles.btn, {backgroundColor: color}, style]}
      {...otherProps}
      accessibilityRole="button"
      accessible={true}
      disabled={disabled}
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
