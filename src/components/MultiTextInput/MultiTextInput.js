import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import Colors from '../../constants/Colors';
import {Fonts} from '../../constants/Constants';
import {Value} from '../../constants/FixedValues';
import styles from './styles';

export default function MultiTextInput({
  placeholder = '',
  value,
  onChangeText,
  maxLength,
  title,
  required,
  blurOnSubmit,
  containerStyle,
  error = '',
  inputStyle = {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_16,
  },
  ...textInputProps
}) {
  const [isFocused, setFocused] = useState(false);
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  console.log(isFocused,'isfocusedd');
  return (
    <React.Fragment>
      <View style={containerStyle}>
        <View style={styles.row}>
          <Text style={styles.label}>
            {title}
            {required && <Text style={[styles.red]}>*</Text>}
          </Text>
        </View>
        <View
          style={[
            styles.container,
            styles.border,
            isFocused ? styles.focusBorder : styles.blurBorder,
            error ? styles.bottom : null,
          ]}>
          <TextInput
            style={[
              styles.input,
              isFocused && {paddingVertical: 0},
              isFocused ? styles.focusBorder : styles.blurBorder,
              error ? styles.red : null,
              inputStyle,
            ]}
            placeholder={placeholder}
            placeholderTextColor={Colors.LABEL_BLACK}
            value={value}
            maxLength={maxLength}
            onChangeText={value => onChangeText(value)}
            multiline={true}
            numberOfLines={6}
            testID="form-input"
            onFocus={handleFocus}
            onBlur={handleBlur}
            blurOnSubmit={false}
            keyboardType="name-phone-pad"
            // returnKeyType='next'
            {...textInputProps}
          />
          {error && <Text style={styles.errMessage}>{error}</Text>}
        </View>
      </View>
    </React.Fragment>
  );
}
