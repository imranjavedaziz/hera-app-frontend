import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Slider} from '@miblanchard/react-native-slider';
import { Value } from '../constants/FixedValues';

import Colors from '../constants/Colors';

const RangeSlider = ({value, setValue}) => {
  const slide = ({}) => {
    console.log(value);
  };
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
      onValueChange={value => setValue(value)}
      onSlidingComplete={slide}
    />
  );
};

export default RangeSlider;

const styles = StyleSheet.create({
  thumb:{
      height: Value.CONSTANT_VALUE_35,
      width: Value.CONSTANT_VALUE_35,
      borderRadius: Value.CONSTANT_VALUE_40,
      borderColor: Colors.BACKGROUND,
      borderWidth: Value.CONSTANT_VALUE_3,
  }
});
