// Dropdown
import React, {useEffect, useState} from 'react';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Colors from '../../constants/Colors';
import Images from '../../constants/Images';
import styles from './styles';

import CustomPicker from './CustomPicker/CustomPicker';
import {Fonts} from '../../constants/Constants';
import {Alignment} from '../../constants';
import {Value} from '../../constants/FixedValues';
import {useNavigation} from '@react-navigation/native';

const Dropdown = ({
  label,
  selectIndex,
  data,
  onSelect,
  containerStyle = {},
  required = false,
  error = '',
  OnPressLabel,
  donePress,
  newValue,
  cancelPress,
  defaultValue,
  ...dropdownProps
}) => {
  const [isFocused, setFocused] = useState(false);
  const navigation = useNavigation();
  const [value, setValue] = useState(null);
  const [isVisible, setVisibility] = useState(false);
  const [isCome, setCome] = useState(false);
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  useEffect(() => {
    const previousValue = () => {
      isCome &&
        defaultValue !== undefined &&
        setValue(Platform.OS === 'ios' ? defaultValue : defaultValue);
    };
    return previousValue();
  }, [defaultValue, isCome]);
  console.log(defaultValue, 'defaultValuedefaultValue');
  useEffect(() => {
    return navigation.addListener('focus', () => {
      setCome(true);
    });
  }, [navigation, setValue]);
  const STYLE_ONE = {
    position: Alignment.ABSOLUTE,
    right: Value.CONSTANT_VALUE_0,
    bottom: Value.CONSTANT_VALUE_10,
    zIndex: Value.CONSTANT_VALUE_2,
  };
  const STYLE_TWO = {
    position: Alignment.ABSOLUTE,
    right: Value.CONSTANT_VALUE_0,
    bottom: Value.CONSTANT_VALUE_0,
    zIndex: Value.CONSTANT_VALUE_2,
  };

  const STYLE_CONDITION = value ? STYLE_ONE : STYLE_TWO;
  return (
    <View
      style={[
        styles.container,
        containerStyle,
        {paddingTop: Value.CONSTANT_VALUE_0},
      ]}>
      <View style={[{marginVertical: Value.CONSTANT_VALUE_0}, containerStyle]}>
        {Platform.OS === 'ios' ? (
          <View style={styles.bottom}>
            <TouchableOpacity
              onPress={() => {
                setVisibility(true);
                setCome(false);
                setFocused(true);
              }}>
              <View style={styles.marginBottom}>
                <Text
                  style={value ? styles.IOSfloated : styles.unIosfloated}
                  accessible={true}
                  accessibilityLabel={label}>
                  {label}
                  {required && (
                    <Text style={[styles.label, styles.red]}>*</Text>
                  )}
                </Text>
              </View>
              <Image source={Images.arrowDown} style={STYLE_CONDITION} />
              {value && (
                <Text style={styles.buttonTextStyle}>{value?.name}</Text>
              )}
              <View
                style={[
                  value ? styles.linebelowFloat : styles.linebelow,
                  {borderBottomColor: error ? Colors.RED : Colors.INPUT_BORDER},
                  isFocused && {borderBottomColor: Colors.SKY_BLUE},
                ]}
              />
            </TouchableOpacity>
            <CustomPicker
              isVisible={isVisible}
              cancel={() => {
                setVisibility(false);
                setFocused(false);
              }}
              done={(selectedItem, index) => {
                setVisibility(false);
                onSelect(selectedItem);
                setValue(selectedItem);
                setFocused(false);
              }}
              data={data}
              selected={value}
              onValueChange={onSelect}
              selectedValue={value}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </View>
        ) : (
          <>
            <Text
              style={value ? styles.IOSfloated : styles.unIosfloated}
              accessible={true}
              accessibilityLabel={label}>
              {label}
              {required && (
                <Text style={[styles.label, {color: 'red'}]}>*</Text>
              )}
            </Text>
            <SelectDropdown
              data={data}
              defaultValue={value?.name}
              selectIndex={selectIndex}
              defaultButtonText={value?.name}
              onSelect={(selectedItem, index) => {
                setValue(selectedItem);
                onSelect(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
                return item.name;
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
              rowStyle={styles.rowStyle}
              rowTextStyle={styles.rowTextStyle}
              selectedRowTextStyle={{fontFamily: Fonts.OpenSansBold}}
              dropdownStyle={styles.dropdownStyle}
              buttonStyle={{
                ...styles.buttonStyle,
                borderColor: error ? Colors.RED : Colors.INPUT_BORDER,
              }}
              buttonTextStyle={{
                ...styles.buttonTextStyle,
                display: value ? 'flex' : 'none',
              }}
              dropdownIconPosition="right"
              renderDropdownIcon={() => <Image source={Images.arrowDown} />}
              {...dropdownProps}
            />
          </>
        )}
      </View>
      {error && <Text style={styles.errMessage}>{error}</Text>}
    </View>
  );
};
export default Dropdown;
