// VIDEO UPLOADING COMPONENT
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from '../screens/dashboard/PtbProfile/MyVideo/style';
import Strings from '../constants/Strings';
import Video from 'react-native-video';
import { TextTrackType } from 'react-native-video';

import Images from '../constants/Images';

const VideoUploading = props => {
  return (
    <TouchableOpacity onPress={() => props?.onPress()}>
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
          <>
            {props?.rmvImgCount <= 0 && (
              <TouchableWithoutFeedback>
                <TouchableOpacity
                  onPress={() => props?.handelDel(136, true)}
                  style={styles.videoSel}>
                  <Image
                    source={
                      props?.selVideo
                        ? Images.iconRadiosel
                        : Images.iconRadiounsel
                    }
                  />
                </TouchableOpacity>
              </TouchableWithoutFeedback>
            )}
            <View style={props?.imageOverlay}>
              <Video
                ref={props?.videoRef}
                onLoad={() => {
                  props?.videoRef?.current?.seek(3);
                  props?.videoRef?.current?.setNativeProps({
                    paused: true,
                  });
                }}
                controls
                muted
                paused={!props?.isPlaying}
                source={{uri: `${props?.video?.file_url}`}}
                style={props?.videoStyle}
                resizeMode={Alignment.COVER}
                onEnd={() => {
                  props?.onEnd();
                }}
                // selectedTextTrack={{
                // type: "index",
                // value: 0
                // }}
                // subtitleStyle={{ paddingBottom: 150, fontSize: 20 }}
                // textTracks={[
                //   {
                //   title: "English CC",
                //   language: "en",
                //   type: TextTrackType.VTT, // "text/vtt"
                //   uri: "https://rsysdemo-b7be9.web.app/MIB2-subtitles-pt-BR.vtt" // "https://bitdash-a.akamaihd.net/content/sintel/subtitles/subtitles_en.vtt"
                //   },
                //   {
                //   title: "Spanish Subtitles",
                //   language: "es",
                //   type: TextTrackType.VTT, // "application/x-subrip"
                //   uri: "https://brenopolanski.github.io/html5-video-webvtt-example/MIB2-subtitles-pt-BR.vtt"
                //   }
                //   ]
                // }
                
              />
              {/* {!props?.isPlaying && (
                <Image source={Images.playButton} style={styles.playIcon} />
              )} */}
            </View>
          </>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default VideoUploading;
