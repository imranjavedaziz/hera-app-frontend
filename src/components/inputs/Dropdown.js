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
  heighter,
  weight,
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
      isCome && defaultValue !== undefined && setValue(defaultValue);
    };
    return previousValue();
  }, [defaultValue, isCome]);
  useEffect(() => {
    return navigation.addListener('focus', () => {
      setCome(true);
      defaultValue === undefined && setValue('');
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
  const IOSfloated = {
    fontFamily: Fonts.OpenSansRegular,
    lineHeight: 21,
    letterSpacing: 0,
    color: '#000000',
    top: Value.CONSTANT_VALUE_8,
    fontSize: Value.CONSTANT_VALUE_14,
  };
  const unIosfloated = {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    color: Colors.BLACK_0,
    top: 22,
  };
  const STYLE_CONDITION_THREE = value ? IOSfloated : unIosfloated;
  const STYLE_CONDITION = value ? STYLE_ONE : STYLE_TWO;
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={containerStyle}>
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
                  style={STYLE_CONDITION_THREE}
                  accessible={true}
                  accessibilityLabel={label}>
                  {label}
                  {required && (
                    <Text style={[styles.label, styles.red]}>*</Text>
                  )}
                </Text>
              </View>
              <Image source={Images.arrowDown} style={STYLE_CONDITION} />
              {!heighter && !weight && value && (
                <Text style={styles.buttonTextStyle} numberOfLines={1}>
                  {value?.name}
                </Text>
              )}
              {heighter && value && (
                <Text style={styles.buttonTextStyle} numberOfLines={1}>
                  {parseInt(value?.name / 12)} ft {value?.name % 12} in
                </Text>
              )}
              {!heighter && weight && value && (
                <Text style={styles.buttonTextStyle} numberOfLines={1}>
                  {value?.name + ' pounds'}
                </Text>
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
              weight={weight}
              highter={heighter}
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
              style={STYLE_CONDITION_THREE}
              accessible={true}
              accessibilityLabel={label}>
              {label}
              {required && (
                <Text style={[styles.label, {color: 'red'}]}>*</Text>
              )}
            </Text>
            <SelectDropdown
              data={data}
              defaultValue={value}
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
