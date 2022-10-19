// CreateGallery
import React, {useState, useEffect} from 'react';
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
import User from '../../../services/User';
import {useSelector} from 'react-redux';

const CreateGallery = () => {
  const userService = User();
  const navigation = useNavigation();
  const [gallery, setGallery] = useState([
    {id: 0, uri: '', loading: false},
    {id: 1, uri: '', loading: false},
    {id: 2, uri: '', loading: false},
    {id: 3, uri: '', loading: false},
    {id: 4, uri: '', loading: false},
    {id: 5, uri: '', loading: false},
  ]);
  const profileImg = useSelector(state => state?.Auth?.user);
  const [gIndex, setGIndex] = useState(0);
  const [video, setVideo] = useState({uri: '', loading: false});
  const [isOpen, setOpen] = useState(false);
  const [isDel, setDel] = useState(false);
  const [rmvImgCount, setRmvImgCount] = useState(0);
  const [remove, setRemove] = useState([
    {id: 0, isSelected: false},
    {id: 1, isSelected: false},
    {id: 2, isSelected: false},
    {id: 3, isSelected: false},
    {id: 4, isSelected: false},
    {id: 5, isSelected: false},
  ]);
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
      setVideo({uri: v.path, loading: true});
      const reqData = new FormData();
      reqData.append('vedio', {
        name: v.filename,
        type: v.mime,
        uri: v.path,
      });
      userService.createGallery(reqData);
    });
  };
  const ImageClick = index => {
    if (gIndex === index) {
      return setOpen(true);
    }
    return;
  };

  const handelDel = index => {
    setDel(true);
    const temp = [];
    remove.map((item, idx) => {
      if (index === idx) {
        if (item.isSelected === true) {
          temp.push({id: idx, isSelected: false});
          setRmvImgCount(rmvImgCount - 1);
          return;
        } else {
          temp.push({id: idx, isSelected: true});
          setRmvImgCount(rmvImgCount + 1);
          return;
        }
      } else {
        if (item.isSelected === true) {
          temp.push({id: idx, isSelected: true});
          return;
        } else {
          temp.push({id: idx, isSelected: false});
          return;
        }
      }
    });
    setRemove(temp);
  };
  const deleteImg = () => {
    let index = [];
    remove.map((item, ind) => {
      if (item.isSelected === true) {
        index.push(ind);
      }
    });
    let pointer = 0;
    const filterItem = gallery.map((oldImg, i) => {
      if (i === index[pointer]) {
        pointer++;
        return {id: i, uri: '', loading: false};
      } else {
        return {id: i, uri: oldImg.uri, loading: false};
      }
    });
    setGIndex(gIndex - index.length);
    function sortImg(a, b) {
      if (a.uri === '') {
        return 1;
      } else {
        return -1;
      }
    }
    filterItem.sort(sortImg);
    setGallery(filterItem);
    setRemove(item => {
      return item.map(i => {
        return {isSelected: false};
      });
    });
    setDel(false);
    setRmvImgCount(0);
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
        style={{}}>
        <View style={globalStyle.mainContainer}>
          <View style={styles.profileImgContainner}>
            <Image source={{uri: profileImg}} style={styles.profileImg} />
          </View>
          <Text style={globalStyle.screenTitle}>
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
                onPress={() => ImageClick(index)}
                activeOpacity={gIndex === index ? 0.1 : 1}>
                <ImageBackground
                  key={img.id}
                  style={styles.galleryImgView}
                  imageStyle={styles.resizeContain}
                  source={img.uri ? {uri: img.uri} : null}>
                  {gallery[index].uri ? (
                    <TouchableOpacity
                      onPress={() => handelDel(index)}
                      style={{}}>
                      <Image
                        source={
                          remove[index].isSelected
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
          <TouchableOpacity onPress={selectVideo}>
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
          </TouchableOpacity>
          {isDel && rmvImgCount !== 0 ? (
            <View style={styles.delContainer}>
              <Text style={styles.selectedText}>
                {rmvImgCount} Photo Selected
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
              openCamera(0, cb);
            }}
            style={[styleSheet.pickerBtn, styleSheet.pickerBtnBorder]}>
            <Text style={styleSheet.pickerBtnLabel}>
              {Strings.sm_create_gallery.bottomSheetCamera}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              openCamera(1, cb);
            }}
            style={styleSheet.pickerBtn}>
            <Text style={styleSheet.pickerBtnLabel}>
              {Strings.sm_create_gallery.bottomSheetGallery}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetComp>
    </>
  );
};

export default CreateGallery;
