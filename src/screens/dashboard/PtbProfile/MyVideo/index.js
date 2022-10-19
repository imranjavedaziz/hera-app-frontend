import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Images from '../../../../constants/Images';
import {IconHeader} from '../../../../components/Header';
import Container from '../../../../components/Container';
import styles from './style';
import Strings from '../../../../constants/Strings';
import videoPicker from '../../../../utils/videoPicker';
import openCamera from '../../../../utils/openCamera';
import styleSheet from '../../../../styles/auth/smdonor/registerScreen';
import BottomSheetComp from '../../../../components/BottomSheet';
import Video from 'react-native-video';
const MyVideo = () => {
  const [video, setVideo] = useState({uri: '', loading: false});
  const [isOpen, setOpen] = useState(false);
  const navigation = useNavigation();
  const cb = v => {
    setOpen(false);
    videoPicker().then(v => {
      setVideo({uri: v.path, loading: true});
      const reqData = new FormData();
      reqData.append('image', {
        name: v.filename,
        type: v.mime,
        uri: v.path,
      });
      console.log(reqData, 'reqData');
    });
  };
  const selectVideo = () => {
    videoPicker().then(v => {
      setVideo({uri: v.path, loading: true});
      const reqData = new FormData();
      reqData.append('image', {
        name: v.filename,
        type: v.mime,
        uri: v.path,
      });
      console.log(reqData, 'reqData');
    });
  };
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      style={styles.headerIcon}
      leftPress={() => navigation.goBack()}
    />
  );

  return (
    <>
      <Container
        mainStyle={true}
        scroller={true}
        showHeader={true}
        showsVerticalScrollIndicator={true}
        headerComp={headerComp}>
        <View style={styles.mainContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>{Strings.smSetting.MyVideo}</Text>
          </View>
          <View style={styles.innerHeadingContainer}>
            <Text style={styles.innerHeading}>
              {Strings.smSetting.VideoContent}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setOpen(true);
            }}>
            <ImageBackground
              style={styles.VdoContainer}
              source={video.uri ? {uri: video.uri} : null}>
              {!video.uri ? (
                <>
                  <View style={styles.innerVdo}>
                    <Text style={styles.vdoHeading}>
                      {Strings.smSetting.UploadVideo}
                    </Text>
                    <Text style={styles.content}>
                      {Strings.smSetting.ShortVideo}
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  <Video
                    controls={true}
                    onError={err => console.log(err)}
                    paused={true}
                  />
                  <Image source={Images.playButton} />
                </>
              )}
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </Container>
      <BottomSheetComp isOpen={isOpen} setOpen={setOpen}>
        <View style={styleSheet.imgPickerContainer}>
          <TouchableOpacity
            onPress={() => {
              openCamera(0, cb);
              setOpen(false);
            }}
            style={[styleSheet.pickerBtn, styleSheet.pickerBtnBorder]}>
            <Text style={styleSheet.pickerBtnLabel}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={selectVideo} style={styleSheet.pickerBtn}>
            <Text style={styleSheet.pickerBtnLabel}>Open Gallery</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetComp>
    </>
  );
};

export default MyVideo;
