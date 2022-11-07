// Dropdown
import React, {useState} from 'react';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Colors from '../../constants/Colors';
import Images from '../../constants/Images';
import styles from './styles';

import CustomPicker from './CustomPicker/CustomPicker';

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
  
  const [value, setValue] = useState(null);
  const [isFocused, setIsFocused] = React.useState(false);
  const [isVisible, setVisibility] = useState(false);
 
  return (
    <View style={[styles.container, containerStyle, {paddingTop: 0}]}>
      <View style={[styles.container, {marginVertical: 0}, containerStyle]}>
        {Platform.OS === 'ios' ? (
          <View style={{marginBottom: 10}}>
            <TouchableOpacity
              onPress={() => {
                setVisibility(true);
              }}>
              <View>
                <Text
                  style={[
                    styles.IOSlabel,
                    value ? styles.floated : styles.unfloated,
                  ]}
                  accessible={true}
                  accessibilityLabel={label}>
                  {label}
                  {required && (
                    <Text style={[styles.label, {color: 'red'}]}>*</Text>
                  )}
                </Text>
              </View>
              <Image source={Images.arrowDown} style={{left: '90%'}} />
              {value && (
                <Text style={styles.buttonTextStyle}>{value?.name}</Text>
              )}
              <View
                style={[
                  styles.linebelow,
                  {borderBottomColor: error ? 'red' : Colors.BORDER_LINE},
                ]}
              />
            </TouchableOpacity>
            <CustomPicker
              isVisible={isVisible}
              cancel={() => {
                setVisibility(false);
                setIsFocused(false);
              }}
              done={(selectedItem, index) => {
                console.log(selectedItem, 'selectedItem');
                setIsFocused(false);
                setVisibility(false);
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
              style={[styles.label, value ? styles.floated : styles.unfloated]}
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
              selectedRowTextStyle={{fontWeight: 'bold'}}
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
