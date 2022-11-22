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

  const IOS_CON_ONE =
    Platform.OS === 'ios' ? styles.iosFloatingText : styles.floated;
  const IOS_CON =
    Platform.OS === 'ios' ? styles.unIosfloatedText : styles.unfloated;

  return (
    <View style={[styles.container, containerStyle, {paddingTop: 0}]}>
      <View style={[styles.container, {marginVertical: 0}, containerStyle]}>
        <Text
          style={[
            styles.label,
            isFocused || textInputProps.value || fixed ? IOS_CON_ONE : IOS_CON,
            messageStyle && styles.floatedmessage,
          ]}
          accessible={true}
          accessibilityLabel={label}>
          {label}
          {required && (
            <Text style={[styles.label, {color: Colors.RED}]}>*</Text>
          )}
        </Text>
        {endComponent ? (
          <TouchableOpacity onPress={endComponentPress}>
            <TextInput
              style={[
                styles.input,
                isFocused ? styles.focusBorder : styles.blurBorder,
                lineColor && {borderColor: Colors.LIGHT_BLACK47},
                error && {borderColor: Colors.RED},
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
export default React.memo(FloatingLabelInput);
