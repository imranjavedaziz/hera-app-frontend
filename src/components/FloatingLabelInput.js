// FloatingLabelInput
import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import Colors from '../constants/Colors';
import {Prencentage, Value} from '../constants/FixedValues';
import Alignment from '../constants/Alignment';
import {Fonts} from '../constants/Constants';

const styles = {
  container: {
    paddingTop: Value.CONSTANT_VALUE_18,
    flex: Value.CONSTANT_VALUE_0,
    width: Prencentage.PRECENTAGE_100,
    marginVertical: Value.CONSTANT_VALUE_20,
  },
  label: {
    position: Alignment.ABSOLUTE,
    left: Value.CONSTANT_VALUE_0,
    zIndex: -1,
    color: Colors.LABEL_BLACK,
    fontFamily: Fonts.OpenSansRegular,
  },
  floated: {
    top: Value.CONSTANT_VALUE_0,
    fontSize: Value.CONSTANT_VALUE_14,
  },
  unfloated: {
    top: Value.CONSTANT_VALUE_24,
    fontSize: Value.CONSTANT_VALUE_18,
  },
  input: {
    minHeight: Value.CONSTANT_VALUE_40,
    fontSize: Value.CONSTANT_VALUE_18,
    color: Colors.BLACK,
    borderBottomWidth: Value.CONSTANT_VALUE_1,
    paddingBottom: Value.CONSTANT_VALUE_10,
    textVerticleAlignment: Alignment.CENTER,
    fontFamily: Fonts.OpenSansBold,
  },
  focusBorder: {
    borderBottomColor: Colors.BLUE,
  },
  blurBorder: {
    borderBottomColor: Colors.INPUT_BORDER,
  },
  endComponent: {
    position: Alignment.ABSOLUTE,
    right: Value.CONSTANT_VALUE_10,
    bottom: Value.CONSTANT_VALUE_15,
    borderRadius: Value.CONSTANT_VALUE_50,
    zIndex: Value.CONSTANT_VALUE_2,
  },
  errMessage: {
    color: 'red',
    textAlign: Alignment.RIGHT,
    marginTop: Value.CONSTANT_VALUE_5,
    // marginBottom: 5,
    fontSize: Value.CONSTANT_VALUE_14,
    lineHeight: Value.CONSTANT_VALUE_21,
    textVerticleAlignment: Alignment.CENTER,
    fontFamily: Fonts.OpenSansRegular,
  },
};
const FloatingLabelInput = props => {
  const [isFocused, setFocused] = useState(false);
  const {
    label,
    containerStyle = {},
    fixed = false,
    endComponent = null,
    required = false,
    error = '',
    ...textInputProps
  } = props;
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  return (
    <View style={[styles.container, containerStyle, {paddingTop: 0}]}>
      <View style={[styles.container, {marginVertical: 0}, containerStyle]}>
        <Text
          style={[
            styles.label,
            isFocused || textInputProps.value || fixed
              ? styles.floated
              : styles.unfloated,
          ]}
          accessible={true}
          accessibilityLabel={label}>
          {label}
          {required && <Text style={[styles.label, {color: 'red'}]}>*</Text>}
        </Text>
        <TextInput
          style={[
            styles.input,
            isFocused ? styles.focusBorder : styles.blurBorder,
            error ? {borderBottomColor: 'red'} : null,
          ]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          blurOnSubmit
          {...textInputProps}
        />
        {endComponent && (
          <View style={styles.endComponent}>{endComponent()}</View>
        )}
      </View>
      {error && <Text style={styles.errMessage}>{error}</Text>}
    </View>
  );
};
export default FloatingLabelInput;
