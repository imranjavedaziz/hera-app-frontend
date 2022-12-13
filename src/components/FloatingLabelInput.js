// FloatingLabelInput
import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
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
  fade: {opacity: 0.4},
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
  verifyEmail: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    color: '#1dbff1',
    top: 7,
    marginLeft: 170,
    textDecorationLine: 'underline',
  },
  //Change

  firstName: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 16,
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
  verifiedEmail: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    color: '#1dbff1',
    marginLeft: 160,
    textDecorationLine: 'underline',
    top: 32,
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
    edited,
    verifyEmail,
    onPressVerify,
    endComponentPress,
    lineColor = false,
    show,
    ...textInputProps
  } = props;
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  console.log(isFocused, 'isFocused');
  return (
    <View
      style={[
        {flex: Value.CONSTANT_VALUE_1, marginTop: Value.CONSTANT_VALUE_30},
        containerStyle,
      ]}>
      <View>
        {verifyEmail && (
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                isFocused || textInputProps.value
                  ? styles.firstName
                  : styles.firstNameCopy,
                edited === false && styles.fade,
              ]}
              accessible={true}
              accessibilityLabel={label}>
              {label}
              {required && <Text style={{color: Colors.RED}}>*</Text>}
            </Text>
            <TouchableOpacity onPress={onPressVerify}>
              <Text
                style={
                  isFocused || textInputProps.value
                    ? styles.verifyEmail
                    : styles.verifiedEmail
                }>
                Verify
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {!verifyEmail && (
          <>
            <Text
              style={[
                isFocused || textInputProps.value
                  ? styles.firstName
                  : styles.firstNameCopy,
                edited === false && styles.fade,
              ]}
              accessible={true}
              accessibilityLabel={label}>
              {label}
              {required && <Text style={{color: Colors.RED}}>*</Text>}
            </Text>
          </>
        )}
        {endComponent && (
          <TouchableOpacity
            onPress={() => {
              endComponentPress;
            }}>
            <TextInput
              style={[
                styles.InputTextField,
                isFocused ? styles.focusBorder : styles.blurBorder,
                error ? {borderBottomColor: Colors.RED} : null,
              ]}
              onFocus={handleFocus}
              onBlur={handleBlur}
              blurOnSubmit
              {...textInputProps}
            />
          </TouchableOpacity>
        )}
        {!endComponent && (
          <TextInput
            style={[
              styles.InputTextField,
              isFocused ? styles.focusBorder : styles.blurBorder,
              lineColor && {borderBottomColor: Colors.LIGHT_BLACK47},
              error ? {borderBottomColor: Colors.RED} : null,
              edited === false && styles.fade,
            ]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            blurOnSubmit
            {...textInputProps}
          />
        )}
        {endComponent && (
          <TouchableOpacity onPress={handleBlur}>
            <View style={styles.endComponent}>{endComponent()}</View>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errMessage}>{error}</Text>}
    </View>
  );
};
export default FloatingLabelInput;
