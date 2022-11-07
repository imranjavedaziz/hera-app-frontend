import React from 'react';
import {View, TouchableOpacity, StyleSheet,Image} from 'react-native';
import Images from '../constants/Images';

interface Props {
  playing: boolean;
  showPreviousAndNext: boolean;
  showSkip: boolean;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  onPlay: () => void;
  onPause: () => void;
  skipForwards?: () => void;
  skipBackwards?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export const PlayerControls: React.FC<Props> = ({
  playing,
  showPreviousAndNext,
  showSkip,
  previousDisabled,
  nextDisabled,
  onPlay,
  onPause,
  skipForwards,
  skipBackwards,
  onNext,
  onPrevious,
}) => (
  <View style={styles.wrapper}>
    {/* {showPreviousAndNext && (
    
    )} */}

<TouchableOpacity
        style={[styles.touchable, previousDisabled && styles.touchableDisabled]}
        onPress={onPrevious}
        disabled={previousDisabled}
        >
        {/* <VideoPrevious /> */}
        <Image source={Images.STAR}/>
      </TouchableOpacity>
    {showSkip && (
      <TouchableOpacity style={styles.touchable} onPress={skipBackwards}>
        {/* <VideoSkipBack /> */}
        <Image source={Images.STAR}/>

      </TouchableOpacity>
    )}

    <TouchableOpacity
      style={styles.touchable}
      onPress={playing ? onPause : onPlay}>
      {/* {playing ? <VideoPause /> : <VideoPlay />} */}
      {playing ?<Image source={Images.BACK_ICON}/>: <Image source={Images.BACK_ICON}/>}
    </TouchableOpacity>

    {showSkip && (
      <TouchableOpacity style={styles.touchable} onPress={skipForwards}>
        {/* <VideoSkipForward /> */}
      {playing ?<Image source={Images.search}/>: <Image source={Images.BACK_ICON}/>}
      </TouchableOpacity>
    )}

    {showPreviousAndNext && (
      <TouchableOpacity
        style={[styles.touchable, nextDisabled && styles.touchableDisabled]}
        onPress={onNext}
        disabled={nextDisabled}>
        {/* <VideoNext /> */}
        <Image source={Images.GEAR_ICON}/>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 3,
  },
  touchable: {
    padding: 5,
  },
  touchableDisabled: {
    opacity: 0.3,
  },
});
