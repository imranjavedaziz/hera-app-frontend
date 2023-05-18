// OtpInputs
import React, {useState, useEffect, useRef} from 'react';
import {
  TextInput,
  View,
  Keyboard,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import Alignment from '../constants/Alignment';
import {Value, Prencentage} from '../constants/FixedValues';
import Colors from '../constants/Colors';
import {Fonts} from '../constants/Constants';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    marginTop: Value.CONSTANT_VALUE_60,
  },
  input: {
    padding: Value.CONSTANT_VALUE_10,
    borderTopWidth: Value.CONSTANT_VALUE_2,
    borderBottomWidth: Value.CONSTANT_VALUE_2,
    borderLeftWidth: Value.CONSTANT_VALUE_1,
    borderRightWidth: Value.CONSTANT_VALUE_1,
    fontSize: Value.CONSTANT_VALUE_16,
    textAlign: Alignment.CENTER,
    minWidth: Value.CONSTANT_VALUE_40,
    minHeight: Value.CONSTANT_VALUE_40,
    width: width / 8,
    height: width / 8,
    fontFamily: Fonts.OpenSansBold,
  },
  validInput: {
    borderColor: Colors.INPUT_BORDER,
  },
  invalidInput: {
    borderColor: Colors.RED,
  },
  input3or6: {
    borderTopRightRadius: Value.CONSTANT_VALUE_5,
    borderBottomRightRadius: Value.CONSTANT_VALUE_5,
    borderRightWidth: Value.CONSTANT_VALUE_2,
  },
  input1or4: {
    borderTopLeftRadius: Value.CONSTANT_VALUE_5,
    borderBottomLeftRadius: Value.CONSTANT_VALUE_5,
    borderLeftWidth: Value.CONSTANT_VALUE_2,
  },
  hyphen: {
    borderTopWidth: 0,
    marginHorizontal: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    height: Prencentage.PRECENTAGE_100,
    textAlignVertical: Alignment.CENTER,
    color: Colors.hypenColor,
  },
});
const OtpInputs = ({onChange, isValid = true}) => {
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
  useEffect(() => {
    console.log('isValid-', isValid);
  }, [isValid]);
  useEffect(() => {
    const otp = code.join('');
    onChange(otp);
  }, [code]);

  return (
    <View style={styles.container}>
      {code.map((c, i) => (
        <View
          key={i}
          style={{
            flex: 0,
            width: i === 2 ? width / 4 : width / 8,
            height: width / 8,
            borderWidth: 0,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <TextInput
            value={c}
            onChangeText={v => updateCode(v, i)}
            keyboardType="number-pad"
            style={[
              styles.input,
              i === 0 || i === 3 ? styles.input1or4 : {},
              i === 2 || i === 5 ? styles.input3or6 : {},
              isValid ? styles.validInput : styles.invalidInput,
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
          {i === 2 && (
            <Text
              style={[
                styles.input,
                styles.hyphen,
                {fontFamily: Fonts.OpenSansRegular},
              ]}>
              —
            </Text>
          )}
        </View>
      ))}
    </View>
  );
};
export default OtpInputs;
