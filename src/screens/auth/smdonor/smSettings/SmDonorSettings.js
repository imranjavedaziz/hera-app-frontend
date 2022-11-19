import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Container from '../../../../components/Container';
import Header, {CircleBtn} from '../../../../components/Header';
import Images from '../../../../constants/Images';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import globalStyle from '../../../../styles/global';
import Strings from '../../../../constants/Strings';
import Colors from '../../../../constants/Colors';
import Button from '../../../../components/Button';
import Styles from './Styles';
import {Routes} from '../../../../constants/Constants';
import {updateProfileImg, logOut} from '../../../../redux/actions/Auth';
import openCamera from '../../../../utils/openCamera';
import styleSheet from '../../../../styles/auth/smdonor/registerScreen';
import ActionSheet from 'react-native-actionsheet';
import {BottomSheetComp} from '../../../../components';
import ProfileImage from '../../../../components/dashboard/PtbProfile/ProfileImage';
import {Alignment} from '../../../../constants';
import {Value} from '../../../../constants/FixedValues';

const SmDonorSettings = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const profileImg = useSelector(state => state.Auth?.user?.profile_pic);
  const first_name = useSelector(state => state?.Auth?.user?.first_name);
  const last_name = useSelector(state => state?.Auth?.user?.last_name);
  const userName = `${first_name} ${last_name}`;
  const [isOpen, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [threeOption, setThreeOption] = useState([]);
  let actionSheet = useRef();
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconBack}
      onPress={navigation.goBack}
      accessibilityLabel="Cross Button, Go back"
      Fixedstyle={{marginLeft: 30, marginTop: 54}}
    />
  );

  const handleThreeOption = option => {
    switch (option) {
      case Strings.sm_create_gallery.bottomSheetCamera:
        openCamera(0, cb);
        break;
      case Strings.sm_create_gallery.bottomSheetGallery:
        openCamera(1, cb);
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

  const openIosSheet = () => {
    openActionSheet();
  };
  const openAndroidSheet = () => {
    setOpen(true);
  };

  const cb = image => {
    setOpen(false);
    setFile(image);
  };
  useEffect(() => {
    const reqData = new FormData();
    file !== null &&
      reqData.append('file', {
        name: 'name',
        type: file.mime,
        uri: file.path,
      });
    dispatch(updateProfileImg(reqData));
  }, [file, dispatch]);

  const logoutScreen = () => {
    dispatch(logOut());
    navigation.navigate(Routes.Landing);
  };

  return (
    <>
      <View style={Styles.flex}>
        <Header end={false}>{headerComp()}</Header>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={Styles.headerContainer}>
            <View
              style={{
                alignItems: Alignment.CENTER,
                // marginBottom: Value.CONSTANT_VALUE_90,
              }}>
              <ProfileImage
                smProfile={true}
                Heading={Strings.smSetting.ptbProfile}
                onPressImg={() => {
                  Platform.OS === 'ios' ? openIosSheet() : openAndroidSheet();
                }}
                Name={first_name}
                LastName={last_name}
                source={{
                  uri: profileImg,
                }}
              />
            </View>
            <View style={Styles.highlightContainer}>
              <View style={Styles.flexRow}>
                <Image source={Images.preferences} />
                <Text style={Styles.text}>
                  {Strings.smSetting.EditAttribute}
                </Text>
              </View>
              <View style={Styles.dot} />
            </View>
            <TouchableOpacity
              style={Styles.contain}
              onPress={() => navigation.navigate(Routes.donorGallery)}>
              <Image source={Images.galleryimage} />
              <Text style={[Styles.text, Styles.extraTxt]}>
                {Strings.smSetting.Gallery}
              </Text>
            </TouchableOpacity>
            <View style={Styles.highlightContainer}>
              <View style={Styles.flexRow}>
                <Image source={Images.person} />
                <Text style={Styles.text}>{Strings.smSetting.EditProfile}</Text>
              </View>
              <View style={Styles.dot} />
            </View>
            <View style={Styles.contain}>
              <Image source={Images.setting2} />
              <Text style={[Styles.text, Styles.extraTxt]}>
                {Strings.smSetting.Settings}
              </Text>
            </View>
            <TouchableOpacity
              style={Styles.contain}
              onPress={() => {
                navigation.navigate(Routes.Support);
              }}>
              <Image source={Images.writing} />
              <Text style={Styles.text}>{Strings.smSetting.Inquiry}</Text>
            </TouchableOpacity>
            <View style={Styles.contain}>
              <Image source={Images.information} />
              <Text style={[Styles.text, Styles.extraTxt]}>
                {Strings.smSetting.AboutUs}
              </Text>
            </View>
            <View style={Styles.BtnContainer}>
              <Button
                style={Styles.Btn}
                label={Strings.smSetting.Btn}
                color={Colors.BTNCOLR}
                onPress={() => logoutScreen()}
              />
              <Text style={Styles.greyText}>
                {Strings.smSetting.AppVersion}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
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

export default SmDonorSettings;
