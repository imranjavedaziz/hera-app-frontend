import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Platform,
  Alert,
} from 'react-native';

import React, {useState, useEffect, useRef, useCallback} from 'react';
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
import BottomSheetComp from '../../../../components/BottomSheet';

const MyVideo = () => {
  const [video, setVideo] = useState({file_url: '', loading: false});
  const [isOpen, setOpen] = useState(false);
  const [isLoader, setLoader] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [remove, setRemove] = useState([]);
  const dispatch = useDispatch();
  const userService = User();
  const loadingGalleryRef = useRef(false);
  const navigation = useNavigation();
  const videoRef = useRef();

  const {
    gallery_success,
    gallery_loading,
    gallery_data,
    delete_gallery_success,
    delete_gallery_loading,
  } = useSelector(state => state.CreateGallery);
  useEffect(() => {
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
  const videoPlay = () => {
    console.log('inside vedio play');
    if (video?.file_url === '') {
      setOpen(true);
    } else {
      setIsPlaying(!isPlaying);
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
      Strings.sm_create_gallery.modalsubTitle,
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
      <BottomSheetComp isOpen={isOpen} setOpen={setOpen}>
        <View style={styleSheet.imgPickerContainer}>
          <TouchableOpacity
            onPress={() => {
              selectVideo(0);
            }}
            style={[styleSheet.pickerBtn, styleSheet.pickerBtnBorder]}>
            <Text style={styleSheet.pickerBtnLabel}>
              {Strings.sm_create_gallery.bottomSheetCamera}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              selectVideo(1);
            }}
            style={styleSheet.pickerBtn}>
            <Text style={styleSheet.pickerBtnLabel}>
              {Strings.sm_create_gallery.bottomSheetGallery}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetComp>
      <Modal
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <View style={[styles.centeredView]}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>
              {Strings.smSetting.Remove_Video}
            </Text>
            <Text style={styles.modalSubHeader}>
              {Strings.sm_create_gallery.modalsubTitle}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
                deleteVideo();
              }}>
              <Text style={styles.modalOption1}>
                {Strings.sm_create_gallery.modalText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
              }}>
              <Text style={styles.modalOption2}>
                {Strings.sm_create_gallery.modalText_2}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default MyVideo;
