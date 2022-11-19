import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import {Value} from '../constants/FixedValues';
import Colors from '../constants/Colors';

interface Props {
  currentTime: number;
  duration: number;
  onSlideCapture: (data: {seekTime: number}) => void;
  onSlideStart: () => void;
  onSlideComplete: () => void;
}

export const ProgressBar: React.FC<Props> = ({
  currentTime,
  duration,
  onSlideCapture,
  onSlideStart,
  onSlideComplete,
}) => {
  const position = getMinutesFromSeconds(currentTime);
  const fullDuration = getMinutesFromSeconds(duration);

  return (
    <View style={styles.wrapper}>
      <Slider
        value={currentTime}
        minimumValue={0}
        maximumValue={duration}
        step={1}
        onValueChange={handleOnSlide}
        onSlidingStart={onSlideStart}
        onSlidingComplete={onSlideComplete}
        minimumTrackTintColor={Colors.RED}
        maximumTrackTintColor={Colors.WHITE}
        thumbTintColor={Colors.RED}
      />
      <View style={styles.timeWrapper}>
        <Text style={styles.timeLeft}>{position}</Text>
        <Text style={styles.timeRight}>{fullDuration}</Text>
      </View>
    </View>
  );

  function getMinutesFromSeconds(time: number) {
    const minutes =
      time >= Value.CONSTANT_VALUE_60
        ? Math.floor(time / Value.CONSTANT_VALUE_60)
        : 0;
    const seconds = Math.floor(time - minutes * Value.CONSTANT_VALUE_60);

    return `${minutes >= Value.CONSTANT_VALUE_10 ? minutes : '0' + minutes}:${
      seconds >= Value.CONSTANT_VALUE_10 ? seconds : '0' + seconds
    }`;
  }

  function handleOnSlide(time: number) {
    onSlideCapture({seekTime: time});
  }
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  timeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  timeLeft: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    paddingLeft: 10,
  },
  timeRight: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'right',
    paddingRight: 10,
  },
});
