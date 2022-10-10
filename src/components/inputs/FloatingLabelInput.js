// FloatingLabelInput
import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from './styles';

const FloatingLabelInput = props => {
  const [isFocused, setFocused] = useState(false);
  const {
    label,
    containerStyle = {},
    fixed = false,
    endComponent = null,
    required = false,
    error = '',
    inputStyle = {},
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
            error ? {borderColor: 'red'} : null,
            inputStyle
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
