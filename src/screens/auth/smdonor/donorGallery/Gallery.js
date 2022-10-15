// CreateGallery
import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  FlatList,
} from 'react-native';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
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
import {getUserGallery} from '../../../../redux/actions/auth';
import ImageView from 'react-native-image-viewing';
import {CircleBtn} from '../../../../components/Header';

const Gallery = ({route}) => {
  const userService = User();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [gallery, setGallery] = useState([
    {id: 0, uri: null, loading: false, isSelected: false},
    {id: 1, uri: null, loading: false, isSelected: false},
    {id: 2, uri: null, loading: false, isSelected: false},
    {id: 3, uri: null, loading: false, isSelected: false},
    {id: 4, uri: null, loading: false, isSelected: false},
    {id: 5, uri: null, loading: false, isSelected: false},
  ]);
  const photoGallery = useSelector(
    state => state.auth.gallery.doner_photo_gallery,
  );
  const [gIndex, setGIndex] = useState(0);
  const [video, setVideo] = useState({uri: '', loading: false});
  const [isOpen, setOpen] = useState(false);
  const [isDel, setDel] = useState(false);
  const [rmvImgCount, setRmvImgCount] = useState(0);
  const [imgPreviewindex, setImgPreviewIndex] = useState(0);
  const [screens, setscreens] = useState(false);
  const [images, setImages] = useState([]);
  const [remove, setRemove] = useState([
    {id: 0, isSelected: false},
    {id: 1, isSelected: false},
    {id: 2, isSelected: false},
    {id: 3, isSelected: false},
    {id: 4, isSelected: false},
    {id: 5, isSelected: false},
  ]);
  React.useEffect(() => {
    dispatch(getUserGallery());
    updateGallery();
  }, []);

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
      reqData.append('image', {
        name: v.filename,
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

  const handelDel = (img) => {
   let updateData =  gallery.map(obj => {
      if (obj.id === img?.item?.id) {
        return {
          ...obj,
          isSelected: !obj.isSelected,
        };
      }
      return obj;
    });
    console.log("updated",updateData)
    setGallery(updateData);
    // setDel(true);
    // const temp = [];

    // remove.map((item, idx) => {
    //   if (index === idx) {
    //     if (item.isSelected === true) {
    //       temp.push({id: idx, isSelected: false});
    //       setRmvImgCount(rmvImgCount - 1);
    //       return;
    //     } else {
    //       temp.push({id: idx, isSelected: true});
    //       setRmvImgCount(rmvImgCount + 1);
    //       return;
    //     }
    //   } else {
    //     if (item.isSelected === true) {
    //       temp.push({id: idx, isSelected: true});
    //       return;
    //     } else {
    //       temp.push({id: idx, isSelected: false});
    //       return;
    //     }
    //   }
    // });
    // setRemove(temp);
  };
  const deleteImg = () => {
    console.log('PHOTO', photoGallery);
    const ids = {ids: []};
    let index = [];
    remove.map((item, ind) => {
      if (item.isSelected === true) {
        index.push(ind);
      }
    });
    let p = 0;
    photoGallery.map((item, i) => {
      console.log('look', i, index[i]);
      if (i == index[p]) {
        ids.ids?.push({id: item.id});
        p++;
      }
    });
    console.log('IDS', ids);
    console.log('Selected - IDS', index);
    let upDateData = gallery.map(obj => {
      if (index.includes(obj?.id)) {
        return {...obj, uri: null};
      }
      return obj;
    });
    console.log('Updated Data is  =', upDateData);
    setTimeout(() => {
      setGallery(upDateData);
    }, 1);
    //  setGallery(upDateData);
    setGIndex(gIndex - index.length);

    //  remove.map((item, idx) => {
    //   console.log('Remove item is ', item);
    // });
    // setRemove(rem);

    // userService.deleteGallery(ids);
    //dispatch(getUserGallery());
    fetch(
      `https://mbc-qa-backend-new.kiwi-internal.com/api/v1/delete-gallery`,
      {
        method: 'DELETE',

        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9tYmMtcWEtYmFja2VuZC1uZXcua2l3aS1pbnRlcm5hbC5jb21cL2FwaVwvdjFcL3JlZnJlc2gtdG9rZW4iLCJpYXQiOjE2NjU3NTQ3ODksImV4cCI6MTY2NTgyMjIxNCwibmJmIjoxNjY1ODE4NjE0LCJqdGkiOiJIdHoyS2RoTzZQMDdEeno5Iiwic3ViIjoxMzYsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.NHk1V8V9FaRXIHH8IhvKiMw10jGj7WjgCLZ0jtlQz58',
        },
        body: JSON.stringify(ids),
      },
    )
      .then(response => response.json())

      .then(response => console.log('responce', response));
  };

  const updateGallery = () => {
    const url = photoGallery.map((item, i) => {
      return item.file_url;
    });
    console.log('Gallery_DATA', url);
    setGallery(oldImg => {
      return oldImg.map((img, i) => {
        if (i < photoGallery.length) {
          return {id: i, uri: url[i], loading: false,isSelected:false};
        }
        return img;
      });
    });
    for (var i = 0; i < url.length; ++i) {
      images.push({uri: url[i]});
    }
    setGIndex(url.length);
  };
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconBack}
      onPress={navigation.goBack}
      accessibilityLabel="Cross Button, Go back"
      style={{marginLeft: 30}}
    />
  );
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
            <FlatList
              data={gallery}
              numColumns={3}
              renderItem={(img) => {
                return (
                  <TouchableOpacity
                    onPress={() => ImageClick(img?.id)}
                    activeOpacity={gIndex === img?.id ? 0.1 : 1}>
                    <ImageBackground
                      style={styles.galleryImgView}
                      imageStyle={{
                        resizeMode: 'cover',
                      }}
                      source={{uri: img?.item?.uri}}>
                      {img?.item?.uri ? (
                        <TouchableOpacity
                          onPress={() => handelDel(img)}
                          style={{}}>
                          <Image
                            source={
                              img?.item?.isSelected
                                ? Images.iconRadiosel
                                : Images.iconRadiounsel
                            }
                            style={styles.selectIcon}
                          />
                        </TouchableOpacity>
                      ) : null}
                      {gIndex === img?.id && (
                        <TouchableOpacity
                          onPress={() => setOpen(true)}
                          style={{}}>
                          <Image
                            source={Images.camera}
                            style={styles.camIcon}
                          />
                        </TouchableOpacity>
                      )}
                      {img.loading && <ActivityIndicator />}
                    </ImageBackground>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <TouchableOpacity onPress={selectVideo}>
            <ImageBackground
              style={styles.videoContainer}
              source={video.uri ? {uri: video.uri} : null}
              imageStyle={{
                resizeMode: 'contain',
              }}>
              {!video.uri ? (
                <>
                  <Text style={styles.videoTitle}>Upload Video</Text>
                  <Text style={styles.videoPara}>Add a short 60 sec video</Text>
                  <Text style={styles.videoPara}>(AVI, MOV, MP4 format)</Text>
                </>
              ) : video.loading ? (
                <ActivityIndicator />
              ) : (
                <Image source={Images.playButton} />
              )}
            </ImageBackground>
          </TouchableOpacity>
          {gallery?.length>0? (
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
            <Text style={styleSheet.pickerBtnLabel}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              openCamera(1, cb);
            }}
            style={styleSheet.pickerBtn}>
            <Text style={styleSheet.pickerBtnLabel}>Open Gallery</Text>
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
