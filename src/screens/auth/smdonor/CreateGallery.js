// CreateGallery
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Container from '../../../components/Container';
import Button from '../../../components/Button';
import Images from '../../../constants/Images';
import globalStyle from '../../../styles/global';
import Strings from '../../../constants/Strings';
import openCamera from '../../../utils/openCamera';
import {Routes} from '../../../constants/Constants';
import videoPicker from '../../../utils/videoPicker';
import styleSheet from '../../../styles/auth/smdonor/registerScreen';
import styles from '../../../styles/auth/smdonor/createGalleryScreen';
import sty from '../../auth/smdonor/donorGallery/styles';
import User from '../../../Api/User';
import {useSelector, useDispatch} from 'react-redux';
import {
  getUserGallery,
  deleteGallery,
} from '../../../redux/actions/CreateGallery';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
} from '../../../redux/actions/loader';
import VideoUploading from '../../../components/VideoUploading';
import {updateRegStep} from '../../../redux/actions/Auth';
import ActionSheet from 'react-native-actionsheet';
import ImageView from 'react-native-image-viewing';
import {BottomSheetComp} from '../../../components';
const CreateGallery = () => {
  const userService = User();
  const navigation = useNavigation();
  const videoRef = useRef();
  const dispatch = useDispatch();
  const [visible, setIsVisible] = useState(false);
  const [threeOption, setThreeOption] = useState([]);
  let actionSheet = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [gallery, setGallery] = useState([
    {id: 0, uri: '', loading: false},
    {id: 1, uri: '', loading: false},
    {id: 2, uri: '', loading: false},
    {id: 3, uri: '', loading: false},
    {id: 4, uri: '', loading: false},
    {id: 5, uri: '', loading: false},
  ]);
  const profileImg = useSelector(state => state?.Auth?.user?.profile_pic);
  const loadingGalleryRef = useRef(false);
  const loadRef = useRef(false);
  const [gIndex, setGIndex] = useState(0);
  const [video, setVideo] = useState({file_url: '', loading: false});
  const [isOpen, setOpen] = useState(false);
  const [isDel, setDel] = useState(false);
  const [rmvImgCount, setRmvImgCount] = useState(0);
  const [rmvVideoCount, setRmvVideoCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [imgPreviewindex, setImgPreviewIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [remove, setRemove] = useState([]);
  const [isVideo, setIsVideo] = useState(false);
  const [selVideo, setSelVideo] = useState(false);

  const {
    gallery_success,
    gallery_loading,
    gallery_data,
    delete_gallery_success,
    delete_gallery_loading,
    delete_gallery__error_msg,
  } = useSelector(state => state.CreateGallery);
  useEffect(() => {
    dispatch(getUserGallery());
  }, []);
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
          });
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
      if (loadRef.current && !delete_gallery_loading) {
        dispatch(showAppLoader());
        if (delete_gallery_success) {
          dispatch(hideAppLoader());
          dispatch(getUserGallery());
        } else {
          dispatch(hideAppLoader());
          showAppToast(true, delete_gallery__error_msg);
        }
      }
      loadRef.current = delete_gallery_loading;
    }, [delete_gallery_success, delete_gallery_loading]),
  );

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
    images.push({uri: image.path});
    const setLoading = loading => {
      setGallery(oldImg => {
        return oldImg.map((img, i) => {
          if (i === gIndex) {
            return {id: i, uri: img.uri, loading};
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
  const updateGallery = () => {
    const url =
      gallery_data?.doner_photo_gallery?.length > 0 &&
      gallery_data?.doner_photo_gallery.map((item, i) => {
        return item.file_url;
      });
    setGallery(oldImg => {
      return oldImg.map((img, i) => {
        if (i <= gallery_data?.doner_photo_gallery?.length) {
          return {id: i, uri: url[i], loading: false};
        }
        return {id: i, uri: '', loading: false};
      });
    });
    for (let i = 0; i < url?.length; ++i) {
      images.push({uri: url[i]});
    }
    if (url?.length === undefined) {
      setGIndex(0);
      return;
    }
    setGIndex(url?.length);
  };
  function handelDel(index) {
    if (isVideo) {
      setSelVideo(!selVideo);
      setDel(true);
      if (selVideo === false) {
        setRmvVideoCount(1);
      } else {
        setRmvVideoCount(0);
      }
      return;
    } else if (isVideo === false) {
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
  }
  remove.sort();
  let del = [];
  let iterator = 0;
  if (remove.length) {
    gallery_data?.doner_photo_gallery?.map((item, index) => {
      if (index === remove[iterator]) {
        del.push(`ids[]=${item.id}`);
        iterator++;
      }
    });
  } else {
    del.push(`ids[]=${gallery_data?.doner_video_gallery?.id}`);
  }
  const deleteImg = (val) => {
    if (selVideo) {
      dispatch(showAppLoader());
      dispatch(deleteGallery(del.join('&')));
      dispatch(getUserGallery());
      setDel(false);
      setRmvVideoCount(0);
      setSelVideo(false);
      return;
    } else {
      dispatch(showAppLoader());
      dispatch(deleteGallery(del.join('&')));
      dispatch(getUserGallery());
      setDel(false);
      setRmvImgCount(0);
      setRemove([]);
    }
  };
  const headerComp = () => {
    <></>;
  };

  const openBottomVideoSheet = () => {
    setOpen(true);
    setIsVideo(true);
  };

  const handleThreeOption = option => {
    switch (option) {
      case Strings.sm_create_gallery.bottomSheetCamera:
        !isVideo ? openCamera(0, cb) : selectVideo(0);
        break;
      case Strings.sm_create_gallery.bottomSheetGallery:
        !isVideo ? openCamera(1, cb) : selectVideo(1);
        break;
    }
  };
  const openActionSheet = () => {
    setThreeOption([
      Strings.sm_create_gallery.bottomSheetCamera,
      Strings.sm_create_gallery.bottomSheetGallery,
    ]);
    setTimeout(() => {
      actionSheet.current.show();
    }, 300);
  };
  const iosVideoSheet = () => {
    setIsVideo(true);
    openActionSheet();
  };
  const iosPhotoSheet = () => {
    setIsVideo(false);
    openActionSheet();
  };
  const bottomSheetVideo = () => {
    Platform.OS === 'ios' ? iosVideoSheet() : openBottomVideoSheet();
  };
  return (
    <>
      <Container
        showHeader={true}
        headerEnd={true}
        headerComp={headerComp}
        style={styles.zeromargin}>
        <View style={globalStyle.mainContainer}>
          <View style={styles.profileImgContainner}>
            <Image source={{uri: profileImg}} style={styles.profileImg} />
          </View>
          <Text style={[globalStyle.screenTitle, styles.title]}>
            {Strings.sm_create_gallery.Title}
          </Text>
          <View
            style={[globalStyle.screenSubTitle, styles.subTitle]}
            accessible={true}
            accessibilityLabel={`${Strings.sm_create_gallery.Subtitle1} ${Strings.sm_create_gallery.Subtitle2} ${Strings.sm_create_gallery.Subtitle3}`}>
            <Text
              style={globalStyle.screenSubTitle}
              numberOfLines={2}
              accessible={false}>
              {Strings.sm_create_gallery.Subtitle1}
            </Text>
            <Text
              style={globalStyle.screenSubTitle}
              accessible={false}
              numberOfLines={1}>
              {Strings.sm_create_gallery.Subtitle2}
            </Text>
            <Text
              style={globalStyle.screenSubTitle}
              accessible={false}
              numberOfLines={1}>
              {Strings.sm_create_gallery.Subtitle3}
            </Text>
            <Text style={styles.p1}>{Strings.sm_create_gallery.maxUpload}</Text>
            <Text style={styles.p2}>{Strings.sm_create_gallery.imagetype}</Text>
          </View>
          <View style={styles.galleryImgContainer}>
            {gallery.map((img, index) => (
              <TouchableOpacity
                key={img.id}
                onPress={() => ImageClick(index)}
                activeOpacity={gIndex === index ? 0.1 : 1}>
                <ImageBackground
                  key={img.id}
                  style={styles.galleryImgView}
                  imageStyle={styles.resize}
                  source={img.uri ? {uri: img.uri} : null}>
                  {img.uri && selVideo === false ? (
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
                    <TouchableOpacity
                      onPress={() => {
                        Platform.OS === 'ios' ? iosPhotoSheet() : setOpen(true);
                      }}>
                      <Image source={Images.camera} style={styles.camIcon} />
                    </TouchableOpacity>
                  )}
                  {img.loading && <ActivityIndicator />}
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
          <VideoUploading
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
                  {rmvImgCount} Photos Selected
                </Text>
              )}
              <TouchableOpacity
                style={styles.deleteBtnContainer}
                onPress={() => {
                  Platform.OS === 'ios' ? deleteAction() : setShowModal(true);
                }}>
                <Image source={Images.trashRed} style={{}} />
                <Text style={styles.rmvText}>Remove From Gallery</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Button
              style={styles.btn}
              label={Strings.sm_create_gallery.Btn}
              onPress={() => {
                dispatch(updateRegStep());
                navigation.navigate(Routes.SmDashboard);
              }}
            />
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
            }}
            style={[styleSheet.pickerBtn, styleSheet.pickerBtnBorder]}>
            <Text style={styleSheet.pickerBtnLabel}>
              {Strings.sm_create_gallery.bottomSheetCamera}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              !isVideo ? openCamera(1, cb) : selectVideo(1);
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
        <View style={[sty.centeredView]}>
          <View style={sty.modalView}>
            <Text style={sty.modalHeader}>
              {Strings.sm_create_gallery.modalTitle}
            </Text>
            <Text style={sty.modalSubHeader}>
              {Strings.sm_create_gallery.modalsubTitle}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
                deleteImg(selVideo);
              }}>
              <Text style={sty.modalOption1}>
                {Strings.sm_create_gallery.modalText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
              }}>
              <Text style={sty.modalOption2}>
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

export default CreateGallery;
