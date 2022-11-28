// VIDEO UPLOADING COMPONENT
import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Platform,
  ActivityIndicator,
} from 'react-native';
import styles from '../screens/dashboard/PtbProfile/MyVideo/style';
import Strings from '../constants/Strings';
import Video from 'react-native-video';
import Images from '../constants/Images';
import FastImage from 'react-native-fast-image';
import {Alignment, Colors} from '../constants';
import {MaterialIndicator} from 'react-native-indicators';
import {Value} from '../constants/FixedValues';

const VideoUploading = props => {
  const [loadingState, setLoadingState] = React.useState(false);
  const IMG_CONDI = props?.remove?.includes(props?.video?.id)
    ? Images.iconRadiosel
    : Images.iconWhite;

  const IMG_CONDITWO = props?.remove?.includes(props?.video?.id)
    ? Images.iconRadiosel
    : Images.iconRadiounsel;
  return (
    <TouchableOpacity onPress={() => props?.onPress()}>
      {props?.apply === true && props?.video?.loading && (
        <MaterialIndicator
          color={Colors.COLOR_A3C6C4}
          style={{
            width: Value.CONSTANT_VALUE_50,
            height: Value.CONSTANT_VALUE_50,
          }}
          size={25}
        />
      )}
      <FastImage style={props?.style}>
        {props?.video?.file_url !== '' ? (
          <>
            {props?.apply === true && (
              <TouchableWithoutFeedback>
                <TouchableOpacity
                  onPress={() => props?.handelDel(props?.video?.id, true)}
                  style={styles.videoSel}>
                  <Image source={IMG_CONDI} />
                </TouchableOpacity>
              </TouchableWithoutFeedback>
            )}
            <View style={props?.imageOverlay}>
              <Video
                source={{uri: `${props?.video?.file_url}`}}
                style={props?.videoStyle}
                controls
                audioOnly
                ref={props?.videoRef}
                resizeMode={Alignment.COVER}
                onLoad={() => {
                  props?.videoRef?.current?.seek(0);
                  props?.videoRef?.current?.setNativeProps({
                    paused: true,
                  });
                  setLoadingState(!loadingState);
                }}
                paused={!props?.isPlaying}
                onEnd={() => {
                  props?.onEnd();
                  setLoadingState(!loadingState);
                }}
                onLoadStart={() => {
                  setLoadingState(!loadingState);
                }}
                onVideoBuffer={() => {
                  setLoadingState(!loadingState);
                }}
              />
              {Platform.OS === 'android' &&
                !props?.isPlaying &&
                props?.counter === 0 && (
                  <Image source={Images.playButton} style={styles.playIcon} />
                )}
              {loadingState && (
                <View style={styles.videoCover}>
                  <ActivityIndicator />
                </View>
              )}
            </View>
            {props?.apply === true && (
              <TouchableWithoutFeedback>
                <TouchableOpacity
                  onPress={() => props?.handelDel(props?.video?.id, true)}
                  style={styles.videoSel}>
                  <Image source={IMG_CONDITWO} />
                </TouchableOpacity>
              </TouchableWithoutFeedback>
            )}
          </>
        ) : (
          <>
            <View style={styles.innerVdo}>
              <Text style={styles.vdoHeading}>
                {Strings.smSetting.UploadVideo}
              </Text>
              <Text style={styles.content}>{Strings.smSetting.ShortVideo}</Text>
            </View>
          </>
        )}
      </FastImage>
    </TouchableOpacity>
  );
};

export default React.memo(VideoUploading);
