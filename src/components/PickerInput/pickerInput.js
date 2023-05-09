import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, Platform} from 'react-native';
import Colors from '../../constants/Colors';
import {style} from './styles';
import CustomPicker from '../CustomPicker';
import {Picker} from '@react-native-picker/picker';

const PickerInput = ({
  label,
  description,
  error,
  image,
  onFocus,
  recordList = [],
  selectedRecord,
  valueSelectedHandler,
  isDisable = false,
  defaultSelected = true,
  prompt,
}) => {

  const [isFocused, setIsFocused] = React.useState(false);
  const [isVisible, setVisibility] = useState(false);

  const [selected, setSelected] = useState();

  useEffect(() => {
    if (!selectedRecord && recordList.length >= 1 && defaultSelected) {
      valueSelectedHandler(recordList[0]);
      setSelected(recordList[0]);
    } else {
      setSelected(selectedRecord);
    }
  }, [recordList]);
  console.log(selected,'selectedRecordselectedRecord');
  function getborderColor() {
    if (error) {
      return Colors.RED;
    } else if (isFocused) {
      return Colors.blurBorder;
    } else {
      return Colors.LIGHT_BLACK47;
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
            borderColor: getborderColor(),
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
            setIsFocused(true);
            // onFocus();
            if (Platform.OS === 'android' && recordList.length > 0) {
              pickerRef.current.focus();
            } else {
              setVisibility(true);
            }
          }}
          resizeMode="center">
          <View style={style().infoContainer}>
            <Text style={style({isDisable: isDisable}).textInput}>
              {' '}
              {selected?.title ?? ''}
            </Text>
            <Image source={image} style={{opacity: isDisable ? 0.3 : 1}} />
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
            setIsFocused(false);
          }}
          done={record => {
            setIsFocused(false);
            setVisibility(false);
            setSelected(record);
            valueSelectedHandler(record);
          }}
          recordList={recordList}
          selected={selected ?? selectedRecord}
        />
      )}
      {Platform.OS === 'android' && recordList.length > 0 && (
        <Picker
          style={{height: 0, color: Colors.BACKGROUND, top: -3}}
          dropdownIconColor={Colors.BACKGROUND}
          placeholder=""
          prompt={prompt ?? 'Select currency'}
          ref={pickerRef}
          enabled={false}
          selectedValue={selected?.id ?? selectedRecord?.id ?? null}
          onValueChange={(_itemValue, itemIndex) => {
            console.log('item selected');
            setSelected(recordList[itemIndex]);
            valueSelectedHandler(recordList[itemIndex]);
          }}
          onBlur={() => {
            console.log('item nnot selected');
            setIsFocused(false);
          }}
          itemStyle={{
            backgroundColor: Colors.MIDDLE_SHEET,
            color: Colors.TEXT_SHEET,
            height: 0,
          }}>
          {recordList.length > 0 &&
            recordList.map((value, i) => {
              return (
                <Picker.Item
                  label={'  ' + value.title}
                  value={value.id ?? i}
                  key={i}
                />
              );
            })}
        </Picker>
      )}
    </View>
  );
};

export default PickerInput;
