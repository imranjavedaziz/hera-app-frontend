// CreateGallery
import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Container from '../../../components/Container';
import Button from '../../../components/Button';
import Images from '../../../constants/Images';
import globalStyle from '../../../styles/global';
import Strings from '../../../constants/Strings';
import openCamera from '../../../utils/openCamera';
import {Routes} from '../../../constants/Constants';
import videoPicker from '../../../utils/videoPicker';
import BottomSheetComp from '../../../components/BottomSheet';
import styleSheet from '../../../styles/auth/smdonor/registerScreen';
import styles from '../../../styles/auth/smdonor/createGalleryScreen';
import User from '../../../Api/User';
import {useSelector, useDispatch} from 'react-redux';
import {
  getUserGallery,
  deleteGallery,
} from '../../../redux/actions/CreateGallery';
import {hideAppLoader, showAppLoader} from '../../../redux/actions/loader';
import VideoUploading from '../../../components/VideoUploading';

import ImageView from 'react-native-image-viewing';
const CreateGallery = () => {
  const userService = User();
  const navigation = useNavigation();
  const videoRef = useRef();
  const dispatch = useDispatch();
  const [visible, setIsVisible] = useState(false);

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
  const [gIndex, setGIndex] = useState(0);
  const [video, setVideo] = useState({file_url: '', loading: false});
  const [isOpen, setOpen] = useState(false);
  const [isDel, setDel] = useState(false);
  const [rmvImgCount, setRmvImgCount] = useState(0);
  const [imgPreviewindex, setImgPreviewIndex] = useState(0);
  const images = [];
  const [remove, setRemove] = useState([]);
  const [isVideo, setIsVideo] = useState(false);

  const {gallery_success, gallery_loading, gallery_data} = useSelector(
    state => state.CreateGallery,
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
      return setOpen(true);
    } else if (index < gIndex && rmvImgCount === 0) {
      setIsVisible(true);
    } else {
      return;
    }
  };
  useEffect(() => {
    if (loadingGalleryRef.current && !gallery_loading) {
      dispatch(showAppLoader());
      if (gallery_success) {
        updateGallery();

        dispatch(hideAppLoader());
      } else {
        dispatch(hideAppLoader());
      }
    }
    loadingGalleryRef.current = gallery_loading;
  }, [gallery_success, gallery_loading]);

  const updateGallery = () => {
    const url =
      gallery_data?.doner_photo_gallery?.length > 0 &&
      gallery_data?.doner_photo_gallery.map((item, i) => {
        return item.file_url;
      });
    setGallery(oldImg => {
      return oldImg.map((img, i) => {
        console.log('IMG', img);
        if (i <= gallery_data?.doner_photo_gallery?.length) {
          return {id: i, uri: url[i], loading: false};
        }
        return {id: i, uri: '', loading: false};
      });
    });
    for (let i = 0; i < url?.length; ++i) {
      images.push({uri: url[i]});
    }
    setGIndex(url?.length);
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
  remove.sort();
  let del = [];
  let iterator = 0;
  gallery_data?.doner_photo_gallery?.map((item, index) => {
    if (index === remove[iterator]) {
      del.push(item.id.toString());
      iterator++;
    }
  });
  const deleteImg = () => {
    let payload = {
      ids: del,
    };
    console.log('PAYLOAD', payload);
    dispatch(deleteGallery(payload));
    dispatch(getUserGallery());
    setDel(false);
    setRemove([]);
    setRmvImgCount(0);
  };
  const openBottomVideoSheet = () => {
    setOpen(true);
    setIsVideo(true);
  };
  const headerComp = () => {
    <></>;
  };
  return (
    <>
      <Container
        showHeader={true}
        headerEnd={true}
        headerComp={headerComp}
        style={{marginHorizontal: 0}}>
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
          {/* <TouchableOpacity onPress={selectVideo}>
            <ImageBackground
              style={styles.videoContainer}
              source={video.uri ? {uri: video.uri} : null}
              imageStyle={styles.resizeContain}>
              {!video.uri ? (
                <>
                  <Text style={styles.videoTitle}>
                    {Strings.sm_create_gallery.uploadVideo}
                  </Text>
                  <Text style={styles.videoPara}>
                    {Strings.sm_create_gallery.videoDuration}
                  </Text>
                  <Text style={styles.videoPara}>
                    {Strings.sm_create_gallery.videoFormat}
                  </Text>
                </>
              ) : video.loading ? (
                <ActivityIndicator />
              ) : (
                <Image source={Images.playButton} />
              )}
            </ImageBackground>
          </TouchableOpacity> */}

          <VideoUploading
            disabled={video?.file_url === '' ? false : true}
            style={styles.videoContainer}
            imageOverlay={styles.imageOverlayWrapper}
            videoStyle={styles.video}
            onEnd={() => setIsPlaying(false)}
            onPress={() =>
              video?.file_url === ''
                ? openBottomVideoSheet()
                : setIsPlaying(p => !p)
            }
            videoRef={videoRef}
            isPlaying={isPlaying}
            video={video}
          />

          {isDel && rmvImgCount !== 0 ? (
            <View style={styles.delContainer}>
              <Text style={styles.selectedText}>
                {rmvImgCount} Photos Selected
              </Text>
              <TouchableOpacity
                style={styles.deleteBtnContainer}
                onPress={() => deleteImg()}>
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
              // openCamera(0, cb);
              !isVideo ? openCamera(0, cb) : selectVideo(0);
            }}
            style={[styleSheet.pickerBtn, styleSheet.pickerBtnBorder]}>
            <Text style={styleSheet.pickerBtnLabel}>
              {Strings.sm_create_gallery.bottomSheetCamera}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // openCamera(1, cb);
              !isVideo ? openCamera(1, cb) : selectVideo(1);
            }}
            style={styleSheet.pickerBtn}>
            <Text style={styleSheet.pickerBtnLabel}>
              {Strings.sm_create_gallery.bottomSheetGallery}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetComp>
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
