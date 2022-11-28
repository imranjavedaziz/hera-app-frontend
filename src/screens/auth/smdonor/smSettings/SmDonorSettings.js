import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import Header, {CircleBtn} from '../../../../components/Header';
import Images from '../../../../constants/Images';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
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
import {getEditProfile} from '../../../../redux/actions/Edit_profile';
import {hideAppLoader, showAppLoader} from '../../../../redux/actions/loader';

const SmDonorSettings = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const profileImg = useSelector(state => state.Auth?.user?.profile_pic);
  const first_name = useSelector(state => state?.Auth?.user?.first_name);
  const last_name = useSelector(state => state?.Auth?.user?.last_name);
  const [isOpen, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [threeOption, setThreeOption] = useState([]);
  let actionSheet = useRef();
  const GetLoadingRef = useRef(false);
  const {
    get_user_detail_res,
    get_user_detail_success,
    get_user_detail_loading,
    get_user_detail_error,
  } = useSelector(state => state.Edit_profile);
  useFocusEffect(
    useCallback(() => {
      dispatch(showAppLoader());
      dispatch(getEditProfile());
    }, [dispatch]),
  );
  //GET USER DETAIL
  useFocusEffect(
    useCallback(() => {
      if (GetLoadingRef.current && !get_user_detail_loading) {
        dispatch(showAppLoader());
        if (get_user_detail_success) {
          setName(get_user_detail_res);
          dispatch(hideAppLoader());
        }
        if (get_user_detail_error) {
          dispatch(hideAppLoader());
        }
      }
      GetLoadingRef.current = get_user_detail_loading;
    }, [get_user_detail_success, get_user_detail_loading, get_user_detail_res]),
  );
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
              }}>
              <ProfileImage
                smProfile={true}
                Heading={Strings.smSetting.ptbProfile}
                onPressImg={() => {
                  Platform.OS === 'ios' ? openIosSheet() : openAndroidSheet();
                }}
                Name={
                  name?.first_name === undefined ? first_name : name?.first_name
                }
                LastName={
                  name?.last_name === undefined ? last_name : name?.last_name
                }
                source={{
                  uri: profileImg,
                }}
              />
            </View>
            <View style={Styles.highlightContainer}>
              <TouchableOpacity style={Styles.flexRow}>
                <Image source={Images.preferences} />
                <Text style={Styles.text}>
                  {Strings.smSetting.EditAttribute}
                </Text>
              </TouchableOpacity>
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
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(Routes.EditProfile, {smProfile: true});
                }}
                style={Styles.flexRow}>
                <Image source={Images.person} />
                <Text style={Styles.text}>{Strings.smSetting.EditProfile}</Text>
              </TouchableOpacity>
              {name?.email_verified === 0 && <View style={Styles.dot} />}
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
