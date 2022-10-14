import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {IconHeader} from '../../../components/Header';
import Images from '../../../constants/Images';
import Container from '../../../components/Container';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import ProfileImage from '../../../components/dashboard/PtbProfile/ProfileImage';
import Strings from '../../../constants/Strings';
import Subscribe from '../../../components/dashboard/PtbProfile/subscribe';
import PtbAccount from '../../../components/dashboard/PtbProfile/PtbAccount';
import {useSelector} from 'react-redux';
import {askCameraPermission} from '../../../../utils/permissionManager';
import styleSheet from '../../../styles/auth/smdonor/registerScreen';
import BottomSheetComp from '../../../components/BottomSheet';
import Auth from '../../../redux/reducers/auth';
import openCamera from '../../../utils/openCamera';

const PtbProfile = () => {
  const navigation = useNavigation();
  const updateRegister = useSelector(state => state.auth);
  const [isOpen, setOpen] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [gIndex, setGIndex] = useState(0);
  const authService = Auth();
  const cb = image => {
    setOpen(false);
    setGallery(oldImg => {
      return oldImg.map((img, i) => {
        if (i === gIndex) {
          return {uri: image.path};
        }
        return img;
      });
    });
    const setLoading = loading => {
      setGallery(oldImg => {
        return oldImg.map((img, i) => {
          if (i === gIndex) {
            return {uri: img.uri};
          }
          return img;
        });
      });
    };
    setGIndex(gIndex + 1);
    const reqData = new FormData();
    reqData.append('role_id', 2);
    reqData.append('first_name', updateRegister?.user?.first_name);
    reqData.append('middle_name', updateRegister?.user?.middle_name);
    reqData.append('last_name', updateRegister?.user?.last_name);
    reqData.append('dob', updateRegister?.user?.dob);
    reqData.append('email', updateRegister?.user?.email);
    reqData.append('password', updateRegister?.user?.confirm_password);
    reqData.append('country_code', updateRegister?.user?.country_code);
    reqData.append('phone_no', updateRegister?.user?.phone_no);
    reqData.append('file', {
      name: image.filename,
      type: image.mime,
      uri: image.path,
    });
    console.log(reqData, 'reqData:::::::::::');
    authService.registerUser(reqData);
  };

  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      style={styles.headerIcon}
      leftPress={() => navigation.goBack()}
    />
  );

  return (
    <>
      <Container
        mainStyle={true}
        scroller={true}
        showHeader={true}
        showsVerticalScrollIndicator={true}
        headerComp={headerComp}>
        <View style={styles.mainContainer}>
          <ProfileImage
            Heading={Strings.smSetting.ptbProfile}
            Name={Strings.smSetting.ProfileName}
            source={{uri: updateRegister?.user?.profile_pic}}
            onPressCamera={() => setOpen(true)}
          />
          <Subscribe
            Icon={Images.STAR}
            MainText={Strings.subscribe.Subscribe_Now}
            InnerText={Strings.subscribe.Plans}
          />
          <PtbAccount
            leftIcon={Images.preferences}
            title={Strings.smSetting.EditPreferences}
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
            onPress={() => navigation.navigate('Setting')}
          />
          <PtbAccount
            leftIcon={Images.writing}
            title={Strings.smSetting.Inquiry}
          />
          <PtbAccount
            leftIcon={Images.information}
            title={Strings.smSetting.AboutUs}
          />
          <View style={styles.buttoncontainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{Strings.smSetting.Btn}</Text>
            </TouchableOpacity>
          </View>
          <BottomSheetComp isOpen={isOpen} setOpen={setOpen}>
            <View style={styleSheet.imgPickerContainer}>
              <TouchableOpacity
                onPress={() => {
                  openCamera(0, cb);
                  setOpen(false);
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
        </View>
      </Container>
    </>
  );
};

export default PtbProfile;
