import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Slider} from '@miblanchard/react-native-slider';

import Colors from '../constants/Colors';

const RangeSlider = ({value, setValue}) => {
  const slide = ({}) => {
    console.log(value);
  };
  return (
    <Slider
      //  animateTransitions
      containerStyle={{}}
      maximumTrackTintColor={Colors.INPUT_BORDER}
      maximumValue={84}
      minimumTrackTintColor={Colors.SKY_BLUE}
      minimumValue={58}
      step={1}
      thumbTintColor={Colors.SKY_BLUE}
      thumbStyle={{
        height: 35,
        width: 35,
        borderRadius: 40,
        borderColor: Colors.BACKGROUND,
        borderWidth: 3,
      }}
      value={value}
      onValueChange={value => setValue(value)}
      onSlidingComplete={slide}
    />
  );
};

export default RangeSlider;

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     marginLeft: 10,
  //     marginRight: 10,
  //     alignItems: 'stretch',
  //     justifyContent: 'center',
  // },
});
