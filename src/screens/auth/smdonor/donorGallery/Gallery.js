//Donor gallery
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Container from '../../../../components/Container';
import Images from '../../../../constants/Images';
import globalStyle from '../../../../styles/global';
import Strings from '../../../../constants/Strings';
import openCamera from '../../../../utils/openCamera';
import videoPicker from '../../../../utils/videoPicker';
import styleSheet from '../../../../styles/auth/smdonor/registerScreen';
import styles from '../../../../styles/auth/smdonor/createGalleryScreen';
import style from './styles';
import User from '../../../../Api/User';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUserGallery,
  deleteGallery,
} from '../../../../redux/actions/CreateGallery';
import ImageView from 'react-native-image-viewing';
import { CircleBtn } from '../../../../components/Header';
import { hideAppLoader, showAppLoader } from '../../../../redux/actions/loader';
import VideoUploading from '../../../../components/VideoUploading';
import RNSDWebImage from 'react-native-sdwebimage';
import ActionSheet from 'react-native-actionsheet';
import FastImage from 'react-native-fast-image';
import { BottomSheetComp, ModalMiddle } from '../../../../components';
import { statusHide } from '../../../../utils/responsive';
import ImageLoading from '../../../../components/ImageLoading';
import _, { memoize } from 'lodash';
const getImageSource = memoize((images) => images.map((image) => image))

const counter = 0;
const Gallery = () => {
  const userService = User();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loadingGalleryRef = useRef(false);
  const [showModal, setShowModal] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [threeOption, setThreeOption] = useState([]);
  let actionSheet = useRef();
  const [gallery, setGallery] = useState([
    { id: 0, uri: '', loading: false },
    { id: 1, uri: '', loading: false },
    { id: 2, uri: '', loading: false },
    { id: 3, uri: '', loading: false },
    { id: 4, uri: '', loading: false },
    { id: 5, uri: '', loading: false },
  ]);
  const [gIndex, setGIndex] = useState(0);
  const [video, setVideo] = useState({ file_url: '', loading: false, id: 0 });
  const [isOpen, setOpen] = useState(false);
  const [isDel, setDel] = useState(false);
  const [rmvImgCount, setRmvImgCount] = useState(0);
  const [rmvVideoCount, setRmvVideoCount] = useState(0);
  const [imgPreviewindex, setImgPreviewIndex] = useState(0);
  const [remove, setRemove] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [selVideo, setSelVideo] = useState(false);
  const [loadScreen, setLoadScreen] = useState(true);
  const [images, _setImages] = useState([]);

  const videoRef = useRef();
  const {
    gallery_success,
    gallery_loading,
    gallery_data,
    delete_gallery_success,
    delete_gallery_loading,
  } = useSelector(state => state.CreateGallery);

  useEffect(() => {
    loadScreen && dispatch(showAppLoader());
    dispatch(getUserGallery());
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      if (loadingGalleryRef.current && !gallery_loading) {
        dispatch(showAppLoader());
        if (gallery_success) {
          updateGallery();
          setVideo({
            file_url: gallery_data?.doner_video_gallery?.file_url
              ? gallery_data?.doner_video_gallery?.file_url
              : '',
            loading: false,
            id: gallery_data?.doner_video_gallery?.id,
          });
          setLoadScreen(false);
          dispatch(hideAppLoader());
        } else {
          dispatch(hideAppLoader());
        }
      }
      loadingGalleryRef.current = gallery_loading;
    }, [gallery_success, gallery_loading]),
  );

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
    }, [delete_gallery_success, delete_gallery_loading, dispatch]),
  );

  const cb = image => {
    setOpen(false);
    const setLoading = loading => {
      setGallery(oldImg => {
        return oldImg.map((img, i) => {
          if (i === gIndex) {
            return { id: i, uri: img.uri, loading };
          }
          return img;
        });
      });
    };
    setGIndex(gIndex + 1);
    const fileName = image?.path.substring(image?.path.lastIndexOf('/') + 1);
    const reqData = new FormData();
    reqData.append('image', {
      name: fileName,
      type: image.mime,
      uri: image.path,
    });
    userService.createGallery(reqData, setLoading);
  };
  const selectVideo = index => {
    videoPicker(index).then(v => {
      if (v?.path) {
        setVideo({ file_url: v.path, loading: false });
        setOpen(false);
      } else {
        setVideo({ file_url: '', loading: false });
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
        setVideo(old => ({ ...old, loading })),
      );
    });
  };
  const ImageClick = index => {
    setImgPreviewIndex(index);
    if (gIndex === index && rmvImgCount === 0) {
      return Platform.OS === 'ios' ? iosPhotoSheet() : setOpen(true);
    } else if (index < gIndex && rmvImgCount === 0) {
      return setIsVisible(true);
    } else {
      return;
    }
  };

  const deleteAction = () => {
    Alert.alert(
      Strings.sm_create_gallery.modalTitle,
      Strings.sm_create_gallery.modalsubTitle,
      [
        {
          text: Strings.sm_create_gallery.modalText,
          onPress: () => {
            deleteImg(selVideo);
          },
        },
        {
          text: Strings.sm_create_gallery.modalText_2,
          onPress: () => null,
        },
      ],
    );
    return true;
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
  const deleteImg = selVideo => {
    if (selVideo) {
      setDel(false);
      setRmvVideoCount(0);
      setSelVideo(false);
    } else {
      let payload = { ids: remove?.join() };
      dispatch(showAppLoader());
      dispatch(deleteGallery(payload));
      setDel(false);
      setRmvImgCount(0);
      setRemove([]);
    }
  };

  const updateGallery = () => {
    const url =
      gallery_data?.doner_photo_gallery?.length > 0 &&
      gallery_data?.doner_photo_gallery.map((item, i) => {
        if (!images.includes(item)) {
          return item;
        } else {
          return null;
        }
      });
    setGallery(oldImg => {
      return oldImg.map((img, i) => {
        if (i <= gallery_data?.doner_photo_gallery?.length) {
          return { id: url[i]?.id, uri: url[i]?.file_url, loading: false };
        }
        return { id: i, uri: '', loading: false };
      });
    });
    for (let i = 0; i < url?.length; ++i) {
      if (_.isEmpty(gallery_data?.doner_photo_gallery)) {
        return null
      } else {
        _setImages([...url].map(e => { return { uri: e.file_url } }));
      }
    }
    if (url?.length === undefined) {
      setGIndex(0);
      return;
    }
    setGIndex(url?.length);
  };

  const handleThreeOption = option => {
    switch (option) {
      case Strings.sm_create_gallery.bottomSheetCamera:
        !isVideo ? openCamera(0, cb) : selectVideo(0);
        break;
      case Strings.sm_create_gallery.bottomSheetGallery:
        !isVideo ? openCamera(1, cb) : selectVideo(1);
        break;
      case Strings.Subscription.Cancel:
        console.log('Cancel');
        break;
    }
  };
  const openActionSheet = () => {
    setThreeOption([
      Strings.sm_create_gallery.bottomSheetCamera,
      Strings.sm_create_gallery.bottomSheetGallery,
      Strings.Subscription.Cancel,
    ]);
    setTimeout(() => {
      actionSheet.current.show();
    }, 300);
  };
  const iosPhotoSheet = () => {
    setIsVideo(false);
    openActionSheet();
  };
  const iosVideoSheet = () => {
    setIsVideo(true);
    openActionSheet();
  };
  const bottomSheetVideo = () => {
    Platform.OS === 'ios' ? iosVideoSheet() : openBottomVideoSheet();
  };
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconBack}
      onPress={navigation.goBack}
      accessibilityLabel="Cross Button, Go back"
      style={style.header}
    />
  );
  const openBottomVideoSheet = () => {
    setOpen(true);
    setIsVideo(true);
  };
  const [imageIndex, setImageIndex] = useState("")
  return (
    <>
      <Container
        showHeader={true}
        headerEnd={false}
        headerComp={headerComp}
        style={style.containerStyle}>
        <View style={[globalStyle.mainContainer, { marginTop: statusHide(105) }]}>
          {loadScreen === false && (
            <>
              <Text style={globalStyle.screenTitle}>
                {Strings.sm_create_gallery.myGallery}
              </Text>
              <View style={styles.galleryImgContainer}>
                {gallery.map((img, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => ImageClick(index)}
                    activeOpacity={gIndex === index ? 0.1 : 1}>
                    <ImageLoading
                      isFastImg={true}
                      key={index}
                      style={[styles.galleryImgView, styles.imageStyling]}
                      source={{
                        uri: img.uri,
                        priority: FastImage.priority.normal,
                        cache: FastImage.cacheControl.immutable,
                      }}>
                      {img.uri && (
                        <TouchableOpacity
                          style={{
                            height:50,width:50,bottom:25,left:20
                          }}
                          onPress={() => {
                            handelDel(img.id);
                          }}>
                          <RNSDWebImage
                            source={
                              remove.includes(img.id)
                                ? Images.iconRadiosel
                                : Images.iconWhite
                            }
                            style={styles.selectIcon}
                          />
                        </TouchableOpacity>
                      )}
                      {gIndex === index && (
                        <TouchableOpacity
                          onPress={() => {
                            Platform.OS === 'ios'
                              ? iosPhotoSheet()
                              : setOpen(true);
                          }}
                          style={{}}>
                          <RNSDWebImage
                            source={Images.camera}
                            style={styles.camIcon}
                          />
                        </TouchableOpacity>
                      )}
                      {img.loading && <ActivityIndicator />}
                    </ImageLoading>
                  </TouchableOpacity>
                ))}
              </View>
              <VideoUploading
                apply={true}
                disabled={video?.file_url === '' ? false : true}
                style={styles.videoContainer}
                imageOverlay={styles.imageOverlayWrapper}
                videoStyle={styles.video}
                onEnd={() => setIsPlaying(false)}
                onPress={() =>
                  video?.file_url === ''
                    ? bottomSheetVideo()
                    : setIsPlaying(p => !p)
                }
                videoRef={videoRef}
                isPlaying={isPlaying}
                video={video}
                selVideo={selVideo}
                handelDel={handelDel}
                rmvImgCount={rmvImgCount}
                remove={remove}
                counter={counter}
              />
              {(isDel && rmvImgCount !== 0) || (isDel && rmvVideoCount > 0) ? (
                <View style={styles.delContainer}>
                  {rmvVideoCount > 0 && (
                    <Text style={styles.selectedText}>
                      {rmvVideoCount} Video Selected
                    </Text>
                  )}
                  {rmvImgCount > 0 && (
                    <Text style={styles.selectedText}>
                      {rmvImgCount}{' '}
                      {rmvImgCount === 1
                        ? Strings.sm_create_gallery.Item
                        : Strings.sm_create_gallery.Items}
                    </Text>
                  )}
                  <TouchableOpacity
                    style={styles.deleteBtnContainer}
                    onPress={() => {
                      Platform.OS === 'ios'
                        ? deleteAction()
                        : setShowModal(true);
                    }}>
                    <Image source={Images.trashRed} />
                    <Text style={styles.rmvText}>Remove From Gallery</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </>
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
              !isVideo ? openCamera(0, cb) : selectVideo(0);
              setOpen(false);
            }}
            style={[styleSheet.pickerBtn, styleSheet.pickerBtnBorder]}>
            <Text style={styleSheet.pickerBtnLabel}>
              {Strings.sm_create_gallery.bottomSheetCamera}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              !isVideo ? openCamera(1, cb) : selectVideo(1);
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
        String_1={Strings.sm_create_gallery.modalTitle}
        String_2={Strings.sm_create_gallery.modalsubTitle}
        String_3={Strings.sm_create_gallery.modalText}
        String_4={Strings.sm_create_gallery.modalText_2}
        onPressNav={() => {
          setShowModal(false);
          deleteImg(selVideo);
        }}
        onPressOff={() => {
          setShowModal(false);
        }}
      />
      <ImageView
        images={getImageSource(images)}
        imageIndex={imgPreviewindex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        onImageIndexChange={(index) => setImageIndex(index)}
        FooterComponent={() => (
          <View style={[styles.root]}>
            <TouchableOpacity onPress={() => {
              if (!imageIndex < 1) {
                setImgPreviewIndex(oldind => oldind - 1)
              }
            }}>
              <Image source={Images.backCarousel} />
            </TouchableOpacity>
            <Text style={[styles.text, { color: '#fff' }]}>
              {`${imageIndex + 1}/${images.length}`}
            </Text>
            <TouchableOpacity onPress={() => {
              if (imgPreviewindex < images.length - 1) {
                setImgPreviewIndex(oldind => oldind + 1)
              }
            }}>
              <Image source={Images.frontCarousel} />
            </TouchableOpacity>
          </View>
        )}
      />
    </>
  );
};
export default React.memo(Gallery);
