import {View, Text, TouchableOpacity, Platform, ScrollView} from 'react-native';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import Header, {IconHeader} from '../../../components/Header';
import Images from '../../../constants/Images';
import styles from './style';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ProfileImage from '../../../components/dashboard/PtbProfile/ProfileImage';
import Strings from '../../../constants/Strings';
import Subscribe, {Subscribed} from '../../../components/dashboard/PtbProfile/subscribe';
import PtbAccount from '../../../components/dashboard/PtbProfile/PtbAccount';
import {useDispatch, useSelector} from 'react-redux';
import {logOut, updateProfileImg} from '../../../redux/actions/Auth';
import {Routes, ABOUT_URL} from '../../../constants/Constants';
import openCamera from '../../../utils/openCamera';
import {askCameraPermission} from '../../../utils/permissionManager';
import ActionSheet from 'react-native-actionsheet';
import {BottomSheetComp} from '../../../components';
import {getEditProfile} from '../../../redux/actions/Edit_profile';
import {hideAppLoader, showAppLoader} from '../../../redux/actions/loader';
import openWebView from '../../../utils/openWebView';

const PtbProfile = () => {
  const navigation = useNavigation();
  const [isOpen, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [threeOption, setThreeOption] = useState([]);
  let actionSheet = useRef();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const GetLoadingRef = useRef(false);
  const first_name = useSelector(state => state?.Auth?.user?.first_name);
  const last_name = useSelector(state => state?.Auth?.user?.last_name);
  const profileImg = useSelector(state => state.Auth?.user?.profile_pic);
  const subscriptionStatus = useSelector(state=>state.Subscription.subscription_status_res);
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
    <IconHeader
      leftIcon={Images.circleIconBack}
      style={styles.headerIcon}
      leftPress={() => navigation.navigate(Routes.PtbDashboard)}
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
    askCameraPermission();
  };
  const openAndroidSheet = () => {
    setOpen(true);
    askCameraPermission();
  };

  const cb = image => {
    setOpen(false);
    setFile(image);
  };

  console.log('file', file);
  useEffect(() => {
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
      <View style={styles.flex}>
        <Header end={false}>{headerComp()}</Header>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainContainer}>
            <View style={styles.imgView}>
              <ProfileImage
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
            <View>
              {
                typeof subscriptionStatus === "object" && typeof subscriptionStatus.data === "object" && subscriptionStatus.data?.status && !subscriptionStatus.data?.is_trial && (<Subscribed/>)
              }
              {
                typeof subscriptionStatus === "object" && typeof subscriptionStatus.data === "object" && !subscriptionStatus.data?.status || subscriptionStatus.data?.is_trial && (
                  <Subscribe
                    Icon={Images.STAR}
                    MainText={Strings.subscribe.Subscribe_Now}
                    InnerText={Strings.subscribe.Plans}
                  />)
              }
              <PtbAccount
                leftIcon={Images.preferences}
                title={Strings.smSetting.EditPreferences}
                BlueDot
                onPress={() =>
                  navigation.navigate('SetPreference', {EditPreferences: true})
                }
              />
              <PtbAccount
                leftIcon={Images.video}
                title={Strings.smSetting.AddVideo}
                BlueDot
                onPress={() => navigation.navigate(Routes.MyVideo)}
              />
              <PtbAccount
                leftIcon={Images.person}
                BlueDot={name?.email_verified === 0 ? true : false}
                title={Strings.smSetting.EditProfile}
                onPress={() => navigation.navigate(Routes.EditProfile)}
              />
              <PtbAccount
                leftIcon={Images.setting2}
                title={Strings.smSetting.Settings}
                onPress={() => navigation.navigate(Routes.Settings)}
              />
              <PtbAccount
                leftIcon={Images.writing}
                title={Strings.smSetting.Inquiry}
                onPress={() => navigation.navigate('Support')}
              />
              <PtbAccount
                leftIcon={Images.information}
                title={Strings.smSetting.AboutUs}
                onPress={()=>openWebView(ABOUT_URL)}
              />
            </View>
            <View style={styles.buttoncontainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => logoutScreen()}>
                <Text style={styles.buttonText}>{Strings.smSetting.Btn}</Text>
              </TouchableOpacity>
              <Text style={styles.AppVersion}>
                {Strings.smSetting.AppVersion}
              </Text>
            </View>
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
        </ScrollView>
      </View>
    </>
  );
};
export default React.memo(PtbProfile);
