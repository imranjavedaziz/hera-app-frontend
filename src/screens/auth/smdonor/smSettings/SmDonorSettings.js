import {Text, View, Image, TouchableOpacity, Platform} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Container from '../../../../components/Container';
import {CircleBtn} from '../../../../components/Header';
import Images from '../../../../constants/Images';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import globalStyle from '../../../../styles/global';
import Strings from '../../../../constants/Strings';
import Colors from '../../../../constants/Colors';
import Button from '../../../../components/Button';
import Styles from './Styles';
import {Routes} from '../../../../constants/Constants';
import {updateProfileImg} from '../../../../redux/actions/Auth';
import openCamera from '../../../../utils/openCamera';
import styleSheet from '../../../../styles/auth/smdonor/registerScreen';
import BottomSheetComp from '../../../../components/BottomSheet';
import {logOut} from '../../../../redux/actions/Auth';
import ActionSheet from 'react-native-actionsheet';

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
    />
  );
  const cb = image => {
    setOpen(false);
    setFile(image);
    // dispatch(updateImg(image))
  };
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

  const handleThreeOption = option => {
    switch (option) {
      case Strings.sm_create_gallery.bottomSheetCamera:
        openCamera(0, cb);
        break;
      case Strings.sm_create_gallery.bottomSheetGallery:
        openCamera(1, cb);
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

  const openIosSheet = () => {
    openActionSheet();
  };
  const openAndroidSheet = () => {
    setOpen(true);
  };

  return (
    <>
      <Container
        scroller={true}
        showHeader={true}
        headerComp={headerComp}
        headerEnd={false}>
        <View style={Styles.headerContainer}>
          <View style={[Styles.profileImgContainner]}>
            <Image
              style={Styles.profileImg}
              source={{
                uri: profileImg,
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                Platform.OS === 'ios' ? openIosSheet() : openAndroidSheet();
              }}>
              <View style={[Styles.camBtn, Styles.camSelectedBtn]}>
                <Image source={Images.camera} style={Styles.camImg} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={[globalStyle.screenTitle, Styles.tittle, Styles.textColor]}>
          {Strings.smSetting.profile}
        </Text>
        <Text style={Styles.usernameText}>{userName}</Text>
        <View style={Styles.highlightContainer}>
          <View style={Styles.flexRow}>
            <Image source={Images.preferences} />
            <Text style={Styles.text}>{Strings.smSetting.EditAttribute}</Text>
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
            color={Colors.PINK}
            // onPress={authService.logout}
            onPress={() => logoutScreen()}
          />
          <Text style={Styles.greyText}>{Strings.smSetting.AppVersion}</Text>
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
