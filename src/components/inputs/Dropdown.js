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
  data,
  onSelect,
  containerStyle = {},
  required = false,
  error = '',
  OnPressLabel,
  donePress,
  cancelPress,
  ...dropdownProps
}) => {
  const navigation = useNavigation();
  const [value, setValue] = useState(null);
  const [isVisible, setVisibility] = useState(false);
  useEffect(() => {
    return navigation.addListener('focus', () => {
      setValue('');
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
  return (
    <View
      style={[
        styles.container,
        containerStyle,
        {paddingTop: Value.CONSTANT_VALUE_0},
      ]}>
      <View
        style={[
          styles.container,
          {marginVertical: Value.CONSTANT_VALUE_0},
          containerStyle,
        ]}>
        {Platform.OS === 'ios' ? (
          <View style={styles.bottom}>
            <TouchableOpacity
              onPress={() => {
                setVisibility(true);
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
              <Image
                source={Images.arrowDown}
                style={value ? STYLE_ONE : STYLE_TWO}
              />
              {value && (
                <Text style={styles.buttonTextStyle}>{value?.name}</Text>
              )}
              <View
                style={[
                  value ? styles.linebelowFloat : styles.linebelow,
                  {borderBottomColor: error ? Colors.RED : Colors.INPUT_BORDER},
                ]}
              />
            </TouchableOpacity>
            <CustomPicker
              isVisible={isVisible}
              cancel={() => {
                setVisibility(false);
              }}
              done={(selectedItem, index) => {
                setVisibility(false);
                onSelect(selectedItem);
                setValue(selectedItem);
              }}
              data={data}
              selected={value}
              onValueChange={onSelect}
              selectedValue={value}
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
              defaultButtonText={value}
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
              rowStyle={styles.rowStyle}
              rowTextStyle={styles.rowTextStyle}
              selectedRowTextStyle={{fontFamily: Fonts.OpenSansBold}}
              dropdownStyle={styles.dropdownStyle}
              buttonStyle={{
                ...styles.buttonStyle,
                borderColor: error ? 'red' : Colors.BORDER_LINE,
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
