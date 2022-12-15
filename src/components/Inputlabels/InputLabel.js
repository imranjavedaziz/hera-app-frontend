// FloatingLabelInput
import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {Colors} from '../../constants';
import {ConstantsCode} from '../../constants/Constants';
import styles from './styles';

const InputLabel = props => {
  const [isFocused, setFocused] = useState(false);
  const {
    label,
    required = false,
    error = '',
    labelsINput = false,
    maxLength,
    lineColor,
    Code = false,
    number = false,
    support = false,
    endComponentPress,
    inputRef,
    NumVal,
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
          <View style={styles.numberView}>
            <Text style={styles.NumberText}>{label}</Text>
            <TextInput
              editable={true}
              maxLength={maxLength}
              onFocus={handleFocus}
              ref={inputRef}
              onBlur={handleBlur}
              style={[
                styles.InputText,
                isFocused ? styles.focusBorder : styles.blurBorder,
                lineColor && {borderColor: Colors.LIGHT_BLACK47},
                !isFocused && error ? {borderColor: Colors.RED} : null,
              ]}
              blurOnSubmit
              {...textInputProps}
            />
          </View>
          {!isFocused && error && (
            <Text
              style={support ? styles.errMessageSupport : styles.errMessage}>
              {error}
            </Text>
          )}
        </>
      )}
      {labelsINput && (
        <>
          <View style={styles.labelView}>
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
