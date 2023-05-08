import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Images from '../../../../constants/Images';
import {IconHeader} from '../../../../components/Header';
import Container from '../../../../components/Container';
import styles from './style';
import Strings from '../../../../constants/Strings';
import videoPicker from '../../../../utils/videoPicker';
import styleSheet from '../../../../styles/auth/smdonor/registerScreen';
import {useDispatch, useSelector} from 'react-redux';
import {showAppLoader, hideAppLoader} from '../../../../redux/actions/loader';
import {
  deleteGallery,
  getUserGallery,
} from '../../../../redux/actions/CreateGallery';
import User from '../../../../Api/User';
import VideoUploading from '../../../../components/VideoUploading';
import ActionSheet from 'react-native-actionsheet';
import {BottomSheetComp, ModalMiddle} from '../../../../components';
import {Colors} from '../../../../constants';
import {statusHide} from '../../../../utils/responsive';

const MyVideo = () => {
  const [video, setVideo] = useState({file_url: '', loading: false});
  const [isOpen, setOpen] = useState(false);
  const [isLoader, setLoader] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [remove, setRemove] = useState([]);
  const [openActionsheets, setOpenActionsheet] = useState(false);
  const [threeOption, setThreeOption] = useState([]);
  let actionSheet = useRef();
  const dispatch = useDispatch();
  const userService = User();
  const loadingGalleryRef = useRef(false);
  const navigation = useNavigation();
  const videoRef = useRef();
  const [counter, setCounter] = useState(0);

  const {
    gallery_success,
    gallery_loading,
    gallery_data,
    delete_gallery_success,
    delete_gallery_loading,
  } = useSelector(state => state.CreateGallery);
  useEffect(() => {
    isLoader && dispatch(showAppLoader());
    dispatch(getUserGallery());
  }, [dispatch]);

  function handelDel(index) {
    let pushArr = remove;
    let isExist = pushArr.findIndex(val => val === index);
    if (isExist === -1) {
      pushArr.push(index);
    } else {
      pushArr.splice(isExist, 1);
    }
    setRemove(pushArr);
  }
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
          id: gallery_data?.doner_video_gallery?.id,
        });
        setLoader(false);
        dispatch(hideAppLoader());
      } else {
        dispatch(hideAppLoader());
      }
    }
    loadingGalleryRef.current = gallery_loading;
  }, [gallery_success, gallery_loading]);

  // DELETE VIDEO

  useFocusEffect(
    useCallback(() => {
      if (loadingGalleryRef.current && !delete_gallery_loading) {
        dispatch(showAppLoader());
        if (delete_gallery_success) {
          dispatch(getUserGallery());
          dispatch(hideAppLoader());
        } else {
          dispatch(hideAppLoader());
        }
      }
      loadingGalleryRef.current = delete_gallery_loading;
    }, [delete_gallery_success, delete_gallery_loading]),
  );

  // SELECT VEDIO
  const selectVideo = index => {
    videoPicker(index).then(v => {
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
      userService.createGallery(reqData, () => {
        setOpen(false);
      });
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
  const videoPlay = () => {
    console.log('inside vedio play');
    if (video?.file_url === '') {
      Platform.OS === 'ios' ? iosVideoSheet() : setOpen(true);
    } else {
      setIsPlaying(!isPlaying);
      setCounter(counter + 1);
    }
  };
  const deleteVideo = () => {
    let payload = {
      ids: video?.id,
    };
    dispatch(showAppLoader());
    dispatch(deleteGallery(payload));
    setRemove([]);
  };
  const backAction = () => {
    Alert.alert(
      Strings.smSetting.Remove_Video,
      Strings.sm_create_gallery.modalsubTitleTwo,
      [
        {
          text: Strings.sm_create_gallery.modalText,
          onPress: () => deleteVideo(),
        },
        {
          text: Strings.sm_create_gallery.modalText_2,
          onPress: () => {
            console.log('Cancel');
          },
        },
      ],
    );
    return true;
  };

  const handleThreeOption = option => {
    switch (option) {
      case Strings.sm_create_gallery.bottomSheetCamera:
        selectVideo(0);
        setOpenActionsheet(false);
        break;
      case Strings.sm_create_gallery.bottomSheetGallery:
        selectVideo(1);
        setOpenActionsheet(false);
        break;
      case Strings.Subscription.Cancel:
        console.log('Cancel');
        setOpenActionsheet(false);
        break;
    }
  };
  const openActionSheet = () => {
    setOpenActionsheet(true);
    setThreeOption([
      Strings.sm_create_gallery.bottomSheetCamera,
      Strings.sm_create_gallery.bottomSheetGallery,
      Strings.Subscription.Cancel,
    ]);
    setTimeout(() => {
      actionSheet.current.show();
    }, 300);
  };

  const iosVideoSheet = () => {
    if (openActionsheets === false) {
      openActionSheet();
    }
  };
  return (
    <>
      <Container
        mainStyle={true}
        scroller={true}
        showHeader={true}
        fixedHeader={true}
        profileLoad={true}
        style={{backgroundColor: Colors.BACKGROUND, marginTop: statusHide(105)}}
        showsVerticalScrollIndicator={true}
        headerComp={headerComp}>
        <View style={styles.mainContainer}>
          <View>
            <Text style={styles.heading}>{Strings.smSetting.MyVideo}</Text>
          </View>
          <View style={styles.innerHeadingContainer}>
            <Text style={styles.innerHeading}>
              {Strings.smSetting.VideoContent}
            </Text>
          </View>
          {isLoader !== true && (
            <VideoUploading
              imageOverlay={styles.imageOverlayWrapper}
              style={styles.VdoContainer}
              disabled={video?.file_url === '' ? false : true}
              onEnd={() => {
                setIsPlaying(false);
                videoRef?.current?.seek(0);
                videoRef?.current?.setNativeProps({
                  paused: true,
                });
              }}
              onPress={() => videoPlay()}
              videoStyle={styles.video}
              videoRef={videoRef}
              isPlaying={isPlaying}
              video={video}
              handelDel={handelDel}
              remove={remove}
              counter={counter}
            />
          )}
          {video?.file_url !== '' && (
            <TouchableOpacity
              style={styles.deleteBtnContainer}
              onPress={() => {
                Platform.OS === 'ios' ? backAction() : setShowModal(true);
              }}>
              <Image source={Images.trashRed} />
              <Text style={styles.rmvText}>
                {Strings.smSetting.RemoveVideo}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Container>
      <ActionSheet
        ref={actionSheet}
        options={threeOption}
        destructiveButtonIndex={2}
        cancelButtonIndex={2}
        onPress={index => {
          handleThreeOption(threeOption[index]);
        }}
      />
      <BottomSheetComp isOpen={isOpen} setOpen={setOpen}>
        <View style={styleSheet.imgPickerContainer}>
          <TouchableOpacity
            onPress={() => {
              selectVideo(0);
              setOpen(false);
            }}
            style={[styleSheet.pickerBtn, styleSheet.pickerBtnBorder]}>
            <Text style={styleSheet.pickerBtnLabel}>
              {Strings.sm_create_gallery.bottomSheetCamera}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              selectVideo(1);
              setOpen(false);
            }}
            style={styleSheet.pickerBtn}>
            <Text style={styleSheet.pickerBtnLabel}>
              {Strings.sm_create_gallery.bottomSheetGallery}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetComp>
      <ModalMiddle
        showModal={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
        String_1={Strings.smSetting.Remove_Video}
        String_2={Strings.sm_create_gallery.modalsubTitleTwo}
        String_3={Strings.sm_create_gallery.modalText}
        String_4={Strings.sm_create_gallery.modalText_2}
        onPressNav={() => {
          setShowModal(false);
          deleteVideo();
        }}
        onPressOff={() => {
          setShowModal(false);
        }}
      />
    </>
  );
};

export default React.memo(MyVideo);
