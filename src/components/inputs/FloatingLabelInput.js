// FloatingLabelInput
import React, {useState} from 'react';
import {Text, TextInput, Platform, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../constants';
import styles from './styles';

const FloatingLabelInput = props => {
  const [isFocused, setFocused] = useState(false);
  const {
    messageStyle = false,
    label,
    containerStyle = {},
    fixed = false,
    endComponent = null,
    required = false,
    error = '',
    inputStyle = {},
    maxLength,
    lineColor,
    endComponentPress,
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
              ? Platform.OS === 'ios'
                ? styles.iosFloatingText
                : styles.floated
              : Platform.OS === 'ios'
              ? styles.unIosfloatedText
              : styles.unfloated,
            messageStyle && styles.floatedmessage,
          ]}
          accessible={true}
          accessibilityLabel={label}>
          {label}
          {required && <Text style={[styles.label, {color: 'red'}]}>*</Text>}
        </Text>
        {endComponent ? (
          <TouchableOpacity onPress={endComponentPress}>
            <TextInput
              style={[
                styles.input,
                isFocused ? styles.focusBorder : styles.blurBorder,
                lineColor && {borderColor: Colors.LIGHT_BLACK47},
                error ? {borderColor: 'red'} : null,
                inputStyle,
              ]}
              maxLength={maxLength}
              onFocus={handleFocus}
              onBlur={handleBlur}
              blurOnSubmit
              {...textInputProps}
            />
          </TouchableOpacity>
        ) : (
          <TextInput
            style={[
              styles.input,
              isFocused ? styles.focusBorder : styles.blurBorder,
              lineColor && {borderColor: Colors.LIGHT_BLACK47},
              error ? {borderColor: 'red'} : null,
              inputStyle,
            ]}
            maxLength={maxLength}
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
