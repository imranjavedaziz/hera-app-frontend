import {StyleSheet} from 'react-native';
import React from 'react';
import {Slider} from '@miblanchard/react-native-slider';
import {Value} from '../constants/FixedValues';
import Colors from '../constants/Colors';

const RangeSlider = ({value, setValue, onValueChange}) => {
  return (
    <Slider
      maximumTrackTintColor={Colors.INPUT_BORDER}
      maximumValue={84}
      minimumTrackTintColor={Colors.SKY_BLUE}
      minimumValue={58}
      step={1}
      thumbTintColor={Colors.SKY_BLUE}
      thumbStyle={styles.thumb}
      value={value}
      onValueChange={value => {
        onValueChange(value);
        setValue(value);
      }}
    />
  );
};

export default RangeSlider;

const styles = StyleSheet.create({
  thumb: {
    width: Value.CONSTANT_VALUE_30,
    height: Value.CONSTANT_VALUE_30,
    borderRadius: Value.CONSTANT_VALUE_40,
    borderColor: Colors.PURE_WHITE,
    borderWidth: Value.CONSTANT_VALUE_2,
  },
});
