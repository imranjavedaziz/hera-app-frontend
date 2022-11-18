// VIDEO UPLOADING COMPONENT
import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import styles from '../screens/dashboard/PtbProfile/MyVideo/style';
import Strings from '../constants/Strings';
import Video from 'react-native-video';
import Images from '../constants/Images';
import FastImage from 'react-native-fast-image';
import {Alignment, Colors} from '../constants';
import {MaterialIndicator} from 'react-native-indicators';

const VideoUploading = props => {
  return (
    <TouchableOpacity onPress={() => props?.onPress()}>
      {props?.video?.loading && (
        <MaterialIndicator color={Colors.COLOR_A3C6C4} />
      )}
      <FastImage style={props?.style}>
        {props?.video?.file_url !== '' ? (
          <>
            <TouchableWithoutFeedback>
              <TouchableOpacity
                onPress={() => props?.handelDel(props?.video?.id, true)}
                style={styles.videoSel}>
                <Image
                  source={
                    props?.remove?.includes(props?.video?.id)
                      ? Images.iconRadiosel
                      : Images.iconWhite
                  }
                />
              </TouchableOpacity>
            </TouchableWithoutFeedback>
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
                }}
                paused={!props?.isPlaying}
                onEnd={() => {
                  props?.onEnd();
                }}
              />
              {!props?.isPlaying && Platform.OS === 'android' && (
                <Image source={Images.playButton} style={styles.playIcon} />
              )}
            </View>
            <TouchableWithoutFeedback>
              <TouchableOpacity
                onPress={() => props?.handelDel(props?.video?.id, true)}
                style={styles.videoSel}>
                <Image
                  source={
                    props?.remove?.includes(props?.video?.id)
                      ? Images.iconRadiosel
                      : Images.iconRadiounsel
                  }
                />
              </TouchableOpacity>
            </TouchableWithoutFeedback>
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

export default VideoUploading;
