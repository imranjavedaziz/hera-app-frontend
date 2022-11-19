// FloatingLabelInput
import React, {useState} from 'react';
import {Text, TextInput, Platform, TouchableOpacity, View} from 'react-native';
import {Colors, Strings} from '../../constants';
import {ConstantsCode, Fonts} from '../../constants/Constants';
import {Value} from '../../constants/FixedValues';
import styles from './styles';

const InputLabel = props => {
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
    labelsINput = false,
    maxLength,
    lineColor,
    Code = false,
    number = false,
    endComponentPress,
    ...textInputProps
  } = props;
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  return (
    <>
      {Code && (
        <View>
          <Text style={styles.codeText}>{label}</Text>
          <TextInput
            editable={false}
            placeholder={ConstantsCode.Country_CODE}
            placeholderTextColor={Colors.textPLace}
            style={[styles.codeInputText, styles.blurBorder]}
          />
        </View>
      )}
      {number && (
        <>
          <View style={{height: 50, flex: 1, marginLeft: 17.3}}>
            <Text style={styles.NumberText}>{label}</Text>
            <TextInput
              editable={true}
              maxLength={maxLength}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={[
                styles.InputText,
                isFocused ? styles.focusBorder : styles.blurBorder,
                lineColor && {borderColor: Colors.LIGHT_BLACK47},
                error ? {borderColor: Colors.RED} : null,
              ]}
              blurOnSubmit
              {...textInputProps}
            />
          </View>
          {error && <Text style={styles.errMessage}>{error}</Text>}
        </>
      )}
      {labelsINput && (
        <>
          <View style={{flex: 1, marginTop: 30}}>
            <Text
              style={
                isFocused || textInputProps.value
                  ? styles.firstName
                  : styles.firstNameCopy
              }>
              {label}
              {required && <Text style={{color: Colors.RED}}>*</Text>}
            </Text>
            <TextInput
              editable={true}
              maxLength={maxLength}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={[
                styles.InputTextField,
                isFocused ? styles.focusBorder : styles.blurBorder,
                lineColor && {borderColor: Colors.LIGHT_BLACK47},
                error ? {borderColor: Colors.RED} : null,
              ]}
              blurOnSubmit
              {...textInputProps}
            />
          </View>
          {error && <Text style={styles.errMessage}>{error}</Text>}
        </>
      )}
    </>
  );
};
export default InputLabel;
