// OtpInputs
import React, {useState, useEffect, useRef} from 'react';
import {TextInput, View, Keyboard, StyleSheet, Text} from 'react-native';
import Alignment from '../constants/Alignment';
import {Value, Prencentage} from '../constants/FixedValues';

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: Prencentage.PRECENTAGE_100,
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    padding: Value.CONSTANT_VALUE_10,
  },
  input: {
    padding: Value.CONSTANT_VALUE_10,
    borderTopWidth: Value.CONSTANT_VALUE_1,
    borderBottomWidth: Value.CONSTANT_VALUE_1,
    borderLeftWidth: Value.CONSTANT_VALUE_FRAC50,
    borderRightWidth: Value.CONSTANT_VALUE_FRAC50,
    fontSize: Value.CONSTANT_VALUE_18,
    lineHeight: Value.CONSTANT_VALUE_20,
    textAlign: Alignment.CENTER,
    minWidth: Value.CONSTANT_VALUE_40,
    minHeight: Value.CONSTANT_VALUE_40,
  },
  input3or6: {
    borderTopRightRadius: Value.CONSTANT_VALUE_5,
    borderBottomRightRadius: Value.CONSTANT_VALUE_5,
    borderRightWidth: Value.CONSTANT_VALUE_1,
  },
  input1or4: {
    borderTopLeftRadius: Value.CONSTANT_VALUE_5,
    borderBottomLeftRadius: Value.CONSTANT_VALUE_5,
    borderLeftWidth: Value.CONSTANT_VALUE_1,
  },
  hyphen: {
    borderTopWidth: 0,
    marginHorizontal: 0,
    borderBottomWidth: 0,
    height: Prencentage.PRECENTAGE_100,
    textAlignVertical: Alignment.CENTER,
  },
});
const OtpInputs = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const refs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const updateCode = (value, index) => {
    if (value) {
      if (index === 5) {
        Keyboard.dismiss();
      } else {
        refs[index + 1].current?.focus();
      }
    } else if (index) {
      refs[index - 1].current?.focus();
    }
    setCode(values => {
      return values.map((v, k) => {
        if (k === index) {
          return value;
        }
        return v;
      });
    });
  };
  const focusInput = index => {
    if (index && !code[index - 1]) {
      refs[index - 1].current?.focus();
    }
  };
  const autofill = newCode => {
    if (!isNaN(newCode) && newCode.length === 6) {
      setCode(newCode.split(''));
    }
  };
  return (
    <View style={styles.container}>
      {code.map((c, i) => (
        <>
          <TextInput
            value={c}
            onChangeText={v => updateCode(v, i)}
            keyboardType="number-pad"
            style={[
              styles.input,
              i === 0 || i === 3 ? styles.input1or4 : {},
              i === 2 || i === 5 ? styles.input3or6 : {},
            ]}
            maxLength={1}
            ref={refs[i]}
            onFocus={() => focusInput(i)}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace') {
                updateCode('', i);
              } else updateCode(nativeEvent.key, i);
            }}
            key={i.toString()}
            autoFocus={i === 0}
          />
          {i === 2 && <Text style={[styles.input, styles.hyphen]}>-</Text>}
        </>
      ))}
    </View>
  );
};
export default OtpInputs;
