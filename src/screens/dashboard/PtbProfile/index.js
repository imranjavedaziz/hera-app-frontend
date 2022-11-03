import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {IconHeader} from '../../../components/Header';
import Images from '../../../constants/Images';
import Container from '../../../components/Container';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import ProfileImage from '../../../components/dashboard/PtbProfile/ProfileImage';
import Strings from '../../../constants/Strings';
import Subscribe from '../../../components/dashboard/PtbProfile/subscribe';
import PtbAccount from '../../../components/dashboard/PtbProfile/PtbAccount';
import {useDispatch, useSelector} from 'react-redux';
import {logOut, updateProfileImg} from '../../../redux/actions/Auth';
import {Routes} from '../../../constants/Constants';
import BottomSheetComp from '../../../components/BottomSheet';
import openCamera from '../../../utils/openCamera';
import {askCameraPermission} from '../../../utils/permissionManager';

const PtbProfile = () => {
  const navigation = useNavigation();
  const [isOpen, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const profileImg = useSelector(state => state.Auth?.user?.profile_pic);
  const first_name = useSelector(state => state?.Auth?.user?.first_name);
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      style={styles.headerIcon}
      leftPress={() => navigation.goBack()}
    />
  );

  const cb = image => {
    setOpen(false);
    setFile(image);
  };

  console.log('file', file);
  useEffect(() => {
    askCameraPermission();
    return navigation.addListener('focus', () => {});
  }, [navigation]);
  useEffect(() => {
    const reqData = new FormData();
    {
      file !== null &&
        reqData.append('file', {
          name: 'name',
          type: file.mime,
          uri: file.path,
        });
      dispatch(updateProfileImg(reqData));
    }
  }, [file, dispatch]);
  const logoutScreen = () => {
    dispatch(logOut());
    navigation.navigate(Routes.Landing);
  };
  return (
    <>
      <Container
      style={{flex:1, marginHorizontal: 0, marginTop:0}}
        scroller={false}
        showHeader={true}
        showsVerticalScrollIndicator={true}
        headerComp={headerComp}>
        <View style={styles.mainContainer}>
          <ProfileImage
            Heading={Strings.smSetting.ptbProfile}
            onPressImg={() => setOpen(true)}
            Name={first_name}
            source={{
              uri: profileImg,
            }}
          />
          <Subscribe
            Icon={Images.STAR}
            MainText={Strings.subscribe.Subscribe_Now}
            InnerText={Strings.subscribe.Plans}
          />
          <PtbAccount
            leftIcon={Images.preferences}
            title={Strings.smSetting.EditPreferences}
            BlueDot
            onPress={() => navigation.navigate('SetPreference')}
          />
          <PtbAccount
            leftIcon={Images.video}
            title={Strings.smSetting.AddVideo}
            onPress={() => navigation.navigate('MyVideo')}
          />
          <PtbAccount
            leftIcon={Images.person}
            title={Strings.smSetting.EditProfile}
          />
          <PtbAccount
            leftIcon={Images.setting2}
            title={Strings.smSetting.Settings}
          />
          <PtbAccount
            leftIcon={Images.writing}
            title={Strings.smSetting.Inquiry}
            onPress={() => navigation.navigate('Support')}
          />
          <PtbAccount
            leftIcon={Images.information}
            title={Strings.smSetting.AboutUs}
          />
          <View style={styles.buttoncontainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => logoutScreen()}>
              <Text style={styles.buttonText}>{Strings.smSetting.Btn}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <BottomSheetComp isOpen={isOpen} setOpen={setOpen}>
          <View style={styles.imgPickerContainer}>
            <TouchableOpacity
              onPress={() => {
                openCamera(0, cb);
              }}
              style={[styles.pickerBtn, styles.pickerBtnBorder]}>
              <Text style={styles.pickerBtnLabel}>
                {Strings.sm_create_gallery.bottomSheetCamera}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                openCamera(1, cb);
              }}
              style={styles.pickerBtn}>
              <Text style={styles.pickerBtnLabel}>
                {Strings.sm_create_gallery.bottomSheetGallery}
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetComp>
      </Container>
    </>
  );
};

export default PtbProfile;
