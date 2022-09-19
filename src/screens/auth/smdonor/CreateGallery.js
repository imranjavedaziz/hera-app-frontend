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
import {CircleBtn} from '../../../components/Header';
import globalStyle from '../../../styles/global';
import Strings from '../../../constants/Strings';
import {width} from '../../../utils/responsive';
import openCamera from '../../../utils/openCamera';
import {askCameraPermission} from '../../../utils/permissionManager';
import Colors from '../../../constants/Colors';
import { Fonts } from '../../../constants/Constants';
import videoPicker from '../../../utils/videoPicker';
import BottomSheetComp from '../../../components/BottomSheet';

const CreateGallery = ({route}) => {
  const navigation = useNavigation();
  const [gallery, setGallery] = useState(['', '', '', '', '', '']);
  const [gIndex, setGIndex] = useState(0);
  const [video,setVideo] = useState('');
  const [isOpen, setOpen] = useState(false);
  const cb = image => {
    const gImages = gallery;
    gImages[gImages] = image.path;
    console.log('image', image.path);
    setGallery(oldImg => {
      return oldImg.map((img, i) => {
        if (i === gIndex) {
          console.log('image', image.path);
          return image.path;
        }
        return img;
      });
    });
    setGIndex(gIndex + 1);
  };
  const selectVideo = ()=>{
    videoPicker()
    .then(v=>{
        console.log(v);
        setVideo(v.path);
    })
  }
  React.useEffect(() => {
    console.log('route-', route.params);
  }, [route]);
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
        <View style={{
            borderWidth: 2,
            borderColor: Colors.GREEN,
            borderRadius: 40,
            marginBottom: 15,
        }}>
          <Image
            source={{uri: route.params.userImage}}
            style={{width: 40, height: 40, borderRadius: 20, borderWidth: 2,borderColor: Colors.CLEAR}}
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
          <Text style={{textAlign: 'center',marginTop: 5, color: Colors.BLACK,fontFamily: Fonts.OpenSansRegular}}>
            You can upload maximum 6 photos
          </Text>
          <Text style={{textAlign: 'center', color: Colors.BLACK,fontFamily: Fonts.OpenSansRegular}}>
            (png, jpeg format)
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {gallery.map((img, index) => (
            <ImageBackground
              key={index}
              style={{
                width: width / 3 - 2,
                height: width / 3 - 2,
                backgroundColor: Colors.BORDER_LINE,
                marginTop: 3,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              imageStyle={{
                resizeMode: 'cover',
              }}
              source={img ? {uri: img} : null}>
              {gIndex === index && (
                <TouchableOpacity onPress={()=>setOpen(true)}>
                  <Image
                    source={Images.camera}
                    style={{
                      tintColor: Colors.BLACK,
                      maxWidth: 25,
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
              )}
            </ImageBackground>
          ))}
        </View>
        <TouchableOpacity onPress={selectVideo}>
            <ImageBackground
            style={{
                width: width,
                height: (width / 3 - 2) * 1.5,
                backgroundColor: Colors.BORDER_LINE,
                marginTop: 3,
                alignItems: 'center',
                justifyContent: 'center'
            }}
            source={video?{uri: video}:null}
            imageStyle={{
                resizeMode: 'contain'
            }}
            >
                {
                    !video ? (
                        <>
                            <Text style={{fontSize: 16,fontFamily: Fonts.OpenSansBold,color: Colors.BLACK}}>Upload Video</Text>
                            <Text style={{fontSize: 13,fontFamily: Fonts.OpenSansRegular,color: Colors.BLACK}}>Add a short 60 sec video</Text>
                            <Text style={{fontSize: 13,fontFamily: Fonts.OpenSansRegular,color: Colors.BLACK}}>(AVI, MOV, MP4 format)</Text>
                        </>
                    ):
                    <Image source={Images.playButton}/>
                }
            </ImageBackground>
        </TouchableOpacity>
        <Button label={Strings.sm_create_gallery.Btn} />
      </View>
    </Container>
    <BottomSheetComp isOpen={isOpen} setOpen={setOpen}>
        <View style={{width: '100%',paddingHorizontal: 20,paddingVertical: 10}}>
            <TouchableOpacity onPress={()=>{openCamera(0,cb);setOpen(false);}} style={{paddingVertical: 20,borderBottomWidth: 1,borderBottomColor: Colors.BORDER_LINE}}>
                <Text style={{fontSize: 16,fontFamily: Fonts.OpenSansBold,color: Colors.BLACK}}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{openCamera(1,cb);setOpen(false);}} style={{paddingVertical: 20,}}>
                <Text style={{fontSize: 16,fontFamily: Fonts.OpenSansBold,color: Colors.BLACK}}>Open Gallery</Text>
            </TouchableOpacity>
        </View>
    </BottomSheetComp>
    </>
  );
};
export default CreateGallery;
