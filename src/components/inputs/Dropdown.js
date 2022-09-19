// Dropdown
import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Colors from '../../constants/Colors';
import Images from '../../constants/Images';
import styles from './styles';

const Dropdown = ({
  label,
  data,
  onSelect,
  containerStyle = {},
  required = false,
  error = '',
}) => {
  const [value, setValue] = useState(null);
  return (
    <View style={[styles.container, containerStyle, {paddingTop: 0}]}>
      <View style={[styles.container, {marginVertical: 0}, containerStyle]}>
        <Text
          style={[styles.label, value ? styles.floated : styles.unfloated]}
          accessible={true}
          accessibilityLabel={label}>
          {label}
          {required && <Text style={[styles.label, {color: 'red'}]}>*</Text>}
        </Text>
        <SelectDropdown
          data={data}
          defaultButtonText={null}
          disableAutoScroll={false}
          onSelect={(selectedItem, index) => {
            setValue(selectedItem);
            onSelect(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          rowStyle={styles.rowStyle}
          rowTextStyle={styles.rowTextStyle}
          dropdownStyle={styles.dropdownStyle}
          buttonStyle={{
            ...styles.buttonStyle,
            borderColor: error ? 'red' : Colors.BORDER_LINE,
          }}
          buttonTextStyle={{...styles.buttonTextStyle,display: value ? 'flex' : 'none',}}
          dropdownIconPosition="right"
          renderDropdownIcon={() => <Image source={Images.arrowDown} />}
        />
      </View>
      {error && <Text style={styles.errMessage}>{error}</Text>}
    </View>
  );
};
export default Dropdown;
