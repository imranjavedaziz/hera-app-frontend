// CreateGallery
import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Container from '../../../../components/Container';
import Button from '../../../../components/Button';
import Images from '../../../../constants/Images';
import globalStyle from '../../../../styles/global';
import Strings from '../../../../constants/Strings';
import openCamera from '../../../../utils/openCamera';
import {Routes} from '../../../../constants/Constants';
import videoPicker from '../../../../utils/videoPicker';
import BottomSheetComp from '../../../../components/BottomSheet';
import styleSheet from '../../../../styles/auth/smdonor/registerScreen';
import styles from '../../../../styles/auth/smdonor/createGalleryScreen';
import style from './styles';
import User from '../../../../services/User';
import {useSelector, useDispatch} from 'react-redux';
import {
  getUserGallery,
  deleteGallery,
} from '../../../../redux/actions/CreateGallery';
import ImageView from 'react-native-image-viewing';
import {CircleBtn} from '../../../../components/Header';
import Video from 'react-native-video';
import {hideAppLoader, showAppLoader} from '../../../../redux/actions/loader';

const Gallery = ({route}) => {
  const userService = User();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loadingGalleryRef = useRef(false);
  const [showModal, setShowModal] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [photoGallery, setPhotoGallery] = useState([]);
  const [gallery, setGallery] = useState([
    {id: 0, uri: '', loading: false},
    {id: 1, uri: '', loading: false},
    {id: 2, uri: '', loading: false},
    {id: 3, uri: '', loading: false},
    {id: 4, uri: '', loading: false},
    {id: 5, uri: '', loading: false},
  ]);
  const [gIndex, setGIndex] = useState(0);
  const [video, setVideo] = useState({file_url: '', loading: false});
  const [isOpen, setOpen] = useState(false);
  const [isDel, setDel] = useState(false);
  const [rmvImgCount, setRmvImgCount] = useState(0);
  const [imgPreviewindex, setImgPreviewIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [remove, setRemove] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef();
  const {gallery_success, gallery_loading, gallery_data} = useSelector(
    state => state.CreateGallery,
  );
  useEffect(() => {
    dispatch(getUserGallery());
  }, []);
  useEffect(() => {
    if (loadingGalleryRef.current && !gallery_loading) {
      dispatch(showAppLoader());
      if (gallery_success) {
        setPhotoGallery(gallery_data?.doner_photo_gallery);
        updateGallery();
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
  const cb = image => {
    setOpen(false);
    setGallery(oldImg => {
      return oldImg.map((img, i) => {
        if (i === gIndex) {
          return {id: i, uri: image.path, loading: true};
        }
        return img;
      });
    });
    const setLoading = loading => {
      setGallery(oldImg => {
        return oldImg.map((img, i) => {
          if (i === gIndex) {
            return {uri: img.uri, loading};
          }
          return img;
        });
      });
    };
    setGIndex(gIndex + 1);
    const reqData = new FormData();
    reqData.append('image', {
      name: image.filename,
      type: image.mime,
      uri: image.path,
    });
    userService.createGallery(reqData, setLoading);
  };
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
      const fileName = v?.path.substring(v?.path.lastIndexOf("/") + 1)
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
  const ImageClick = index => {
    setImgPreviewIndex(index);
    if (gIndex === index && rmvImgCount === 0) {
      return setOpen(true);
    }
    if (index < gIndex && rmvImgCount === 0) {
      setIsVisible(true);
    }
    return;
  };

  function handelDel(index) {
    setDel(true);
    let pushArr = remove;
    let isExist = pushArr.findIndex(val => val === index);
    if (isExist === -1) {
      pushArr.push(index);
      setRmvImgCount(rmvImgCount + 1);
    } else {
      pushArr.splice(isExist, 1);
      setRmvImgCount(rmvImgCount - 1);
    }
    setRemove(pushArr);
  }
  console.log(remove,"REMOVE")
  const deleteImg = () => {
    let payload = {
      ids: remove,
    };
    dispatch(deleteGallery(payload));
    console.log(payload,"POAYLOAD RMV IMG")
    dispatch(getUserGallery());
    setDel(false);
    setRmvImgCount(0);
  };

  const updateGallery = () => {
    const url =
      gallery_data?.doner_photo_gallery?.length > 0 &&
      gallery_data?.doner_photo_gallery.map((item, i) => {
        return item.file_url;
      });
    console.log('Gallery_DATA', url);
    setGallery(oldImg => {
      return oldImg.map((img, i) => {
        if (i <= gallery_data?.doner_photo_gallery?.length) {
          return {id: i, uri: url[i], loading: false};
        }
        return img;
      });
    });
    for (var i = 0; i < url?.length; ++i) {
      images.push({uri: url[i]});
    }
    setGIndex(url?.length);
  };
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconBack}
      onPress={navigation.goBack}
      accessibilityLabel="Cross Button, Go back"
      style={{marginLeft: 30}}
    />
  );
  console.log(video, 'vedio:::::::::::::::');
  return (
    <>
      <Container
        showHeader={true}
        headerEnd={false}
        headerComp={headerComp}
        style={{marginHorizontal: 0}}>
        <View style={globalStyle.mainContainer}>
          <Text style={globalStyle.screenTitle}>
            {Strings.sm_create_gallery.myGallery}
          </Text>
          <View style={styles.galleryImgContainer}>
            {gallery.map((img, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => ImageClick(index)}
                activeOpacity={gIndex === index ? 0.1 : 1}>
                <ImageBackground
                  key={img.id}
                  style={styles.galleryImgView}
                  imageStyle={{
                    resizeMode: 'cover',
                  }}
                  source={img.uri ? {uri: img.uri} : null}>
                  {img.uri ? (
                    <TouchableOpacity
                      onPress={() => {
                        handelDel(img.id);
                      }}
                      style={{}}>
                      <Image
                        source={
                          remove.includes(img.id) === true
                            ? Images.iconRadiosel
                            : Images.iconRadiounsel
                        }
                        style={styles.selectIcon}
                      />
                    </TouchableOpacity>
                  ) : null}
                  {gIndex === index && (
                    <TouchableOpacity onPress={() => setOpen(true)} style={{}}>
                      <Image source={Images.camera} style={styles.camIcon} />
                    </TouchableOpacity>
                  )}
                  {img.loading && <ActivityIndicator />}
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            disabled={video?.file_url === '' ? false : true}
            onPress={() =>
              video?.file_url === '' ? selectVideo() : setIsPlaying(p => !p)
            }>
            <ImageBackground
              style={styles.videoContainer}
              imageStyle={{
                resizeMode: 'contain',
              }}>
              {video?.file_url === '' ? (
                <>
                  <Text style={styles.videoTitle}>Upload Video</Text>
                  <Text style={styles.videoPara}>Add a short 60 sec video</Text>
                  <Text style={styles.videoPara}>(AVI, MOV, MP4 format)</Text>
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
                    resizeMode={'cover'}
                    style={styles.video}
                  />
                  <Image source={Images.playButton} style={styles.playIcon} />
                </View>
              )}
            </ImageBackground>
          </TouchableOpacity>
          {isDel && rmvImgCount !== 0 ? (
            <View style={styles.delContainer}>
              <Text style={styles.selectedText}>
                {rmvImgCount} Photos Selected
              </Text>
              <TouchableOpacity
                style={styles.deleteBtnContainer}
                onPress={() => setShowModal(true)}>
                <Image source={Images.trashRed} style={{}} />
                <Text style={styles.rmvText}>Remove From Gallery</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Button
              style={styles.btn}
              label={Strings.sm_create_gallery.Btn}
              onPress={() => navigation.navigate(Routes.SmDashboard)}
            />
          )}
        </View>
      </Container>

      <BottomSheetComp isOpen={isOpen} setOpen={setOpen}>
        <View style={styleSheet.imgPickerContainer}>
          <TouchableOpacity
            onPress={() => {
              openCamera(0, cb);
            }}
            style={[styleSheet.pickerBtn, styleSheet.pickerBtnBorder]}>
            <Text style={styleSheet.pickerBtnLabel}>{Strings.PTB_Profile.Open_Camera}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              openCamera(1, cb);
            }}
            style={styleSheet.pickerBtn}>
            <Text style={styleSheet.pickerBtnLabel}> {Strings.PTB_Profile.Open_Gallery}</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetComp>
      <Modal
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <View style={[style.centeredView]}>
          <View style={style.modalView}>
            <Text style={style.modalHeader}>
              {Strings.sm_create_gallery.modalTitle}
            </Text>
            <Text style={style.modalSubHeader}>
              {Strings.sm_create_gallery.modalsubTitle}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
                deleteImg();
                navigation.navigate(Routes.SmSetting);
              }}>
              <Text style={style.modalOption1}>
                {Strings.sm_create_gallery.modalText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
              }}>
              <Text style={style.modalOption2}>
                {Strings.sm_create_gallery.modalText_2}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ImageView
        images={images}
        imageIndex={imgPreviewindex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </>
  );
};

export default Gallery;
