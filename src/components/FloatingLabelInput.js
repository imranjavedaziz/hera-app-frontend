// FloatingLabelInput
import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View, Platform} from 'react-native';
import Colors from '../constants/Colors';
import {Value} from '../constants/FixedValues';
import Alignment from '../constants/Alignment';
import {Fonts} from '../constants/Constants';

const styles = {
  focusBorder: {
    borderBottomColor: Colors.SKY_BLUE,
    borderBottomWidth: 2,
  },
  blurBorder: {
    borderBottomColor: Colors.INPUT_BORDER,
    borderBottomWidth: 2,
  },
  endComponent: {
    position: Alignment.ABSOLUTE,
    right: Value.CONSTANT_VALUE_0,
    bottom: Value.CONSTANT_VALUE_15,
    borderRadius: Value.CONSTANT_VALUE_50,
    zIndex: Value.CONSTANT_VALUE_2,
  },
  errMessage: {
    color: Colors.RED,
    textAlign: Alignment.RIGHT,
    marginTop: Value.CONSTANT_VALUE_5,
    fontSize: Value.CONSTANT_VALUE_14,
    lineHeight: Value.CONSTANT_VALUE_21,
    textVerticleAlignment: Alignment.CENTER,
    fontFamily: Fonts.OpenSansRegular,
  },
  //Change

  firstName: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    color: '#000000',
    top: 8,
  },
  firstNameCopy: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0,
    color: Colors.BLACK_0,
    top: 32,
  },
  InputTextField: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    letterSpacing: 0,
    color: '#353a3a',
    top: 2,
    minHeight: 40,
  },
};
const FloatingLabelInput = props => {
  const [isFocused, setFocused] = useState(false);
  const {
    label,
    containerStyle = {},
    endComponent = null,
    required = false,
    error = '',
    endComponentPress,
    lineColor = false,
    ...textInputProps
  } = props;
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  return (
    <View
      style={[
        {flex: Value.CONSTANT_VALUE_1, marginTop: Value.CONSTANT_VALUE_30},
        containerStyle,
      ]}>
      <View>
        <Text
          style={
            isFocused || textInputProps.value
              ? styles.firstName
              : styles.firstNameCopy
          }
          accessible={true}
          accessibilityLabel={label}>
          {label}
          {required && <Text style={{color: Colors.RED}}>*</Text>}
        </Text>
        {endComponent ? (
          <TouchableOpacity onPress={endComponentPress}>
            <TextInput
              style={[
                styles.InputTextField,
                isFocused ? styles.focusBorder : styles.blurBorder,
                error ? {borderColor: Colors.RED} : null,
              ]}
              onFocus={handleFocus}
              onBlur={handleBlur}
              blurOnSubmit
              {...textInputProps}
            />
          </TouchableOpacity>
        ) : (
          <TextInput
            style={[
              styles.InputTextField,
              isFocused ? styles.focusBorder : styles.blurBorder,
              lineColor && {borderColor: Colors.LIGHT_BLACK47},
              error ? {borderColor: Colors.RED} : null,
            ]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            blurOnSubmit
            {...textInputProps}
          />
        )}
        {endComponent && (
          <View style={styles.endComponent}>{endComponent()}</View>
        )}
      </View>
      {error && <Text style={styles.errMessage}>{error}</Text>}
    </View>
  );
};
export default FloatingLabelInput;
