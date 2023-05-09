import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, Platform} from 'react-native';
import Colors from '../../constants/Colors';
import {style} from './styles';
import CustomPicker from '../CustomPicker';
import SelectDropdown from 'react-native-select-dropdown';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../../constants/Constants';
import {Images} from '../../constants';

const PickerInput = ({
  label,
  description,
  error,
  image,
  onFocus,
  data = [],
  selectedRecord,
  valueSelectedHandler,
  isDisable = false,
  defaultSelected = true,
  prompt,
  onSelect,
  selectIndex,
  defaultValue,
  containerStyle = {},
  required = false,
  lineColor = false,
  OnPressLabel,
  donePress,
  newValue,
  cancelPress,
  heighter,
  userType,
  weight,
  education,
  educationStyle,
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
  function getborderColor() {
    if (error) {
      return Colors.RED;
    } else if (isFocused) {
      return Colors.SKY_BLUE;
    } else {
      return Colors.INPUT_BORDER;
    }
  }
  const pickerRef = useRef();

  return (
    <View style={{flexWrap: 'wrap'}}>
      <View style={style().containerView}>
        <Text style={style().label}>{label}</Text>
        <Text style={style().asteriskText}>*</Text>
      </View>
      <View
        style={
          style({
            borderBottomColor: getborderColor(),
            showBorder: error || isFocused,
            isDisable: isDisable,
          }).inputContainer
        }>
        <TouchableOpacity
          activeOpacity={1}
          style={style().dobField}
          enabled={!isDisable}
          onPress={() => {
            if (isDisable) {
              return;
            }
            setFocused(true);
            if (Platform.OS === 'android' && data.length > 0) {
              pickerRef.current.focus();
            } else {
              setVisibility(true);
            }
          }}
          resizeMode="center">
          <View style={style().infoContainer}>
            {!heighter && !weight && value && (
              <Text
                style={style({isDisable: isDisable}).buttonTextStyle}
                numberOfLines={1}>
                {value?.id}
              </Text>
            )}
            {heighter && value && (
              <Text
                style={style({isDisable: isDisable}).buttonTextStyle}
                numberOfLines={1}>
                {parseInt(value?.name / 12)} ft {value?.name % 12} in
              </Text>
            )}
            {!heighter && weight && value && (
              <Text
                style={style({isDisable: isDisable}).buttonTextStyle}
                numberOfLines={1}>
                {value?.name + ' pounds'}
              </Text>
            )}
            <Image
              source={Images.arrowDown}
              style={{opacity: isDisable ? 0.3 : 1}}
            />
          </View>
        </TouchableOpacity>
      </View>
      {description && (
        <View style={[style().descContainerView, style().containerView]}>
          <Text style={style().asteriskGreenText}>*</Text>
          <Text style={style().descText}>{description}</Text>
        </View>
      )}
      <Text style={style().errorText}>{error ? error : ''}</Text>
      {Platform.OS === 'ios' && (
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
      )}
      {Platform.OS === 'android' && data.length > 0 && (
        <SelectDropdown
        ref={pickerRef}
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
          rowStyle={style().rowStyle}
          rowTextStyle={style().rowTextStyle}
          selectedRowTextStyle={{fontFamily: Fonts.OpenSansRegular}}
          dropdownStyle={style().dropdownStyle}
          buttonStyle={{
            ...style().buttonStyle,
            borderColor: error
              ? Colors.RED
              : lineColor
              ? Colors.LIGHT_BLACK47
              : Colors.INPUT_BORDER,
          }}
          buttonTextStyle={{
            ...style().buttonTextStyle,
            display: value ? 'flex' : 'none',
          }}
          dropdownIconPosition="right"
          renderDropdownIcon={() => <Image source={Images.arrowDown} />}
          {...dropdownProps}
        />
      )}
    </View>
  );
};

export default PickerInput;
