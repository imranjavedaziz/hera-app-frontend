// FloatingLabelInput
import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import Colors from '../constants/Colors';
import {Prencentage, Value} from '../constants/FixedValues';
import Alignment from '../constants/Alignment';

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
    height: Value.CONSTANT_VALUE_40,
    fontSize: Value.CONSTANT_VALUE_18,
    lineHeight: Value.CONSTANT_VALUE_26,
    color: Colors.BLACK,
    borderBottomWidth: Value.CONSTANT_VALUE_1,
    paddingBottom: Value.CONSTANT_VALUE_10,
    textVerticleAlignment: Alignment.CENTER,
  },
  focusBorder: {
    borderBottomColor: Colors.BLUE,
  },
  blurBorder: {
    borderBottomColor: Colors.INPUT_BORDER,
  },
};
const FloatingLabelInput = props => {
  const [isFocused, setFocused] = useState(false);
  const {label,containerStyle={},fixed=false, ...textInputProps} = props;
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  return (
    <View style={[styles.container,containerStyle]}>
      <Text
        style={[
          styles.label,
          (isFocused || textInputProps.value || fixed) ? styles.floated : styles.unfloated,
        ]}
        accessible={true} accessibilityLabel={label}
        >
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          isFocused ? styles.focusBorder : styles.blurBorder,
        ]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        blurOnSubmit
        {...textInputProps}
      />
    </View>
  );
};
export default FloatingLabelInput;
