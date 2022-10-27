// VIDEO UPLOADING COMPONENT
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../screens/dashboard/PtbProfile/MyVideo/style';
import Strings from '../constants/Strings';
import Video from 'react-native-video';
import Images from '../constants/Images';
import Alignment from '../constants/Alignment';

const VideoUploading = props => {
  return (
    <TouchableOpacity
      disabled={props?.disabled}
      onPress={() => props?.onPress()}>
      <ImageBackground style={props?.style}>
        {props?.video?.file_url === '' && (
          <>
            <View style={styles.innerVdo}>
              <Text style={styles.vdoHeading}>
                {Strings.smSetting.UploadVideo}
              </Text>
              <Text style={styles.content}>{Strings.smSetting.ShortVideo}</Text>
            </View>
          </>
        )}
        {props?.video?.loading && <ActivityIndicator />}
        {props?.video?.file_url !== '' && (
          <View style={props?.imageOverlay}>
            <Video
              ref={props?.videoRef}
              onLoad={() => {
                props?.videoRef?.current?.seek(3);
                props?.videoRef?.current?.setNativeProps({
                  paused: true,
                });
              }}
              paused={!props?.isPlaying}
              source={{uri: `${props?.video?.file_url}`}}
              style={props?.videoStyle}
              resizeMode={Alignment.COVER}
            />
            <Image source={Images.playButton} style={styles.playIcon} />
          </View>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default VideoUploading;
