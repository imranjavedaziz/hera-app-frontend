// Short Video screen
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import Images from '../../../../constants/Images';
import {IconHeader} from '../../../../components/Header';
import Container from '../../../../components/Container';
import styles from './style';
import Strings from '../../../../constants/Strings';
import videoPicker from '../../../../utils/videoPicker';
import styleSheet from '../../../../styles/auth/smdonor/registerScreen';
import BottomSheetComp from '../../../../components/BottomSheet';
import Video from 'react-native-video';
import {useDispatch, useSelector} from 'react-redux';
import {showAppLoader, hideAppLoader} from '../../../../redux/actions/loader';
import {getUserGallery} from '../../../../redux/actions/CreateGallery';
import User from '../../../../services/User';

const MyVideo = () => {
  const [video, setVideo] = useState({file_url: '', loading: false});
  const [isOpen, setOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();
  const userService = User();
  const loadingGalleryRef = useRef(false);
  const navigation = useNavigation();
  const videoRef = useRef();

  const {gallery_success, gallery_loading, gallery_data} = useSelector(
    state => state.CreateGallery,
  );
  useEffect(() => {
    dispatch(getUserGallery());
  }, [dispatch]);
  // GET GALLERY DATA
  useEffect(() => {
    if (loadingGalleryRef.current && !gallery_loading) {
      dispatch(showAppLoader());
      if (gallery_success) {
        setVideo({
          file_url: gallery_data?.doner_video_gallery?.file_url
            ? gallery_data?.doner_video_gallery?.file_url
            : '',
          loading: false,
        });
        dispatch(hideAppLoader());
      } else {
        dispatch(hideAppLoader());
      }
    }
    loadingGalleryRef.current = gallery_loading;
  }, [gallery_success, gallery_loading]);
// SELECT VEDIO
  const selectVideo = () => {
    videoPicker().then(v => {

        if (v?.path) {
          setVideo({file_url: v.path, loading: false});
          setOpen(false);
        } else {
          setVideo({file_url: '', loading: false});
          setOpen(false);
        }

      const reqData = new FormData();
      const fileName = v?.path.substring(v?.path.lastIndexOf('/') + 1);
      reqData.append('video', {
        name: fileName,
        type: v.mime,
        uri: v.path,
      });
      userService.createGallery(reqData, loading =>
        setVideo(old => ({...old, loading})),
      );
    });
  };
  // HEADER COMPONENT
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
            disabled={video?.file_url === '' ? false : true}
            onPress={() =>
              video?.file_url === '' ? setOpen(true) : setIsPlaying(p => !p)
            }>
            <ImageBackground style={styles.VdoContainer}>
              {video?.file_url === '' ? (
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
              ) : video.loading ? (
                <ActivityIndicator />
              ) : (
                <View style={styles.imageOverlayWrapper}>
                  <Video
                    ref={videoRef}
                    onLoad={() => {
                      videoRef?.current?.seek(3);
                      videoRef?.current?.setNativeProps({
                        paused: true,
                      });
                    }}
                    paused={!isPlaying}
                    source={{uri: `${video?.file_url}`}}
                    style={styles.video}
                  />
                  <Image source={Images.playButton} style={styles.playIcon} />
                </View>
              )}
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </Container>
      <BottomSheetComp isOpen={isOpen} setOpen={setOpen}>
        <View style={styleSheet.imgPickerContainer}>
          <TouchableOpacity
            onPress={() => {
              selectVideo(0);
            }}
            style={[styleSheet.pickerBtn, styleSheet.pickerBtnBorder]}>
            <Text style={styleSheet.pickerBtnLabel}>
              {Strings.PTB_Profile.Open_Camera}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              selectVideo(1);
            }}
            style={styleSheet.pickerBtn}>
            <Text style={styleSheet.pickerBtnLabel}>
              {Strings.PTB_Profile.Open_Gallery}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetComp>
    </>
  );
};

export default MyVideo;
