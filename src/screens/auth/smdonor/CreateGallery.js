// CreateGallery
import React, {useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
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

const CreateGallery = ({route}) => {
  const navigation = useNavigation();
  const [gallery, setGallery] = useState(['', '', '', '', '', '']);
  const [gIndex, setGIndex] = useState(0);
  const [video, setVideo] = useState('');
  const [isOpen, setOpen] = useState(false);
  const cb = image => {
    const gImages = gallery;
    gImages[gImages] = image.path;
    setGallery(oldImg => {
      return oldImg.map((img, i) => {
        if (i === gIndex) {
          return image.path;
        }
        return img;
      });
    });
    setGIndex(gIndex + 1);
  };
  const selectVideo = () => {
    videoPicker().then(v => {
      setVideo(v.path);
    });
  };
  const headerComp = () => (
    <TouchableOpacity onPress={navigation.goBack}>
      <Text style={globalStyle.underlineText}>Later</Text>
    </TouchableOpacity>
  );
  return (
    <>
      <Container
        showHeader={true}
        headerEnd={true}
        headerComp={headerComp}
        style={{marginHorizontal: 0}}>
        <View style={globalStyle.mainContainer}>
          <View style={styles.profileImgContainner}>
            <Image
              source={{uri: route.params.userImage}}
              style={styles.profileImg}
            />
          </View>
          <Text style={globalStyle.screenTitle}>
            {Strings.sm_create_gallery.Title}
          </Text>
          <View
            style={[
              globalStyle.screenSubTitle,
              {marginBottom: 20, maxWidth: '90%'},
            ]}
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
            <Text style={styles.p1}>You can upload maximum 6 photos</Text>
            <Text style={styles.p2}>(png, jpeg format)</Text>
          </View>
          <View style={styles.galleryImgContainer}>
            {gallery.map((img, index) => (
              <ImageBackground
                key={index}
                style={styles.galleryImgView}
                imageStyle={{
                  resizeMode: 'cover',
                }}
                source={img ? {uri: img} : null}>
                {gIndex === index && (
                  <TouchableOpacity onPress={() => setOpen(true)}>
                    <Image source={Images.camera} style={styles.camIcon} />
                  </TouchableOpacity>
                )}
              </ImageBackground>
            ))}
          </View>
          <TouchableOpacity onPress={selectVideo}>
            <ImageBackground
              style={styles.videoContainer}
              source={video ? {uri: video} : null}
              imageStyle={{
                resizeMode: 'contain',
              }}>
              {!video ? (
                <>
                  <Text style={styles.videoTitle}>Upload Video</Text>
                  <Text style={styles.videoPara}>Add a short 60 sec video</Text>
                  <Text style={styles.videoPara}>(AVI, MOV, MP4 format)</Text>
                </>
              ) : (
                <Image source={Images.playButton} />
              )}
            </ImageBackground>
          </TouchableOpacity>
          <Button
            label={Strings.sm_create_gallery.Btn}
            onPress={() => navigation.navigate(Routes.Landing)}
          />
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
    </>
  );
};
export default CreateGallery;
