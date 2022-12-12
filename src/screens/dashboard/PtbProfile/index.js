import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import Header, {IconHeader} from '../../../components/Header';
import Images from '../../../constants/Images';
import styles from './style';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ProfileImage from '../../../components/dashboard/PtbProfile/ProfileImage';
import Strings, {ValidationMessages} from '../../../constants/Strings';
import Subscribe, {
  Subscribed,
} from '../../../components/dashboard/PtbProfile/subscribe';
import PtbAccount, {
  ToggleNotification,
} from '../../../components/dashboard/PtbProfile/PtbAccount';
import {useDispatch, useSelector} from 'react-redux';
import {logOut, updateProfileImg} from '../../../redux/actions/Auth';
import {
  Routes,
  ABOUT_URL,
  TERMS_OF_USE_URL,
  PRIVACY_URL,
} from '../../../constants/Constants';
import openCamera from '../../../utils/openCamera';
import {askCameraPermission} from '../../../utils/permissionManager';
import ActionSheet from 'react-native-actionsheet';
import {BottomSheetComp} from '../../../components';
import {getEditProfile} from '../../../redux/actions/Edit_profile';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
} from '../../../redux/actions/loader';
import {getUserGallery} from '../../../redux/actions/CreateGallery';
import _ from 'lodash';
import openWebView from '../../../utils/openWebView';
import {empty} from '../../../redux/actions/Chat';

const PtbProfile = () => {
  const navigation = useNavigation();
  const [isOpen, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [threeOption, setThreeOption] = useState([]);
  let actionSheet = useRef();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [avaiableVideo, setVideoAviable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const GetLoadingRef = useRef(false);
  const first_name = useSelector(state => state?.Auth?.user?.first_name);
  const last_name = useSelector(state => state?.Auth?.user?.last_name);
  const profileImg = useSelector(state => state.Auth?.user?.profile_pic);
  const subscriptionStatus = useSelector(
    state => state.Subscription?.subscription_status_res,
  );
  const {
    get_user_detail_res,
    get_user_detail_success,
    get_user_detail_loading,
    get_user_detail_error,
  } = useSelector(state => state.Edit_profile);
  const {gallery_data} = useSelector(state => state.CreateGallery);

  useFocusEffect(
    useCallback(() => {
      dispatch(getEditProfile());
      dispatch(getUserGallery());
      videoAvaible();
    }, [dispatch]),
  );
  const LogoutLoadingRef = useRef(false);
  const {log_out_success, log_out_loading, log_out_error_msg} = useSelector(
    state => state.Auth,
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
  console.log('get_user_detail_res', get_user_detail_res);
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      style={styles.andHeaderIcon}
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
  React.useEffect(() => {
    console.log('subscriptionStatus', subscriptionStatus);
  }, [subscriptionStatus]);
  //logout
  useEffect(() => {
    if (LogoutLoadingRef.current && !log_out_loading) {
      dispatch(showAppLoader());
      if (log_out_success) {
        dispatch(empty());
        dispatch(hideAppLoader());
        navigation.navigate(Routes.Landing);
      } else {
        dispatch(showAppToast(true, log_out_error_msg));
        dispatch(hideAppLoader());
      }
    }
    LogoutLoadingRef.current = log_out_loading;
  }, [log_out_success, log_out_loading]);

  useEffect(() => {
    return navigation.addListener('focus', () => {});
  }, [navigation]);
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
  };
  const videoAvaible = () => {
    if (_.isEmpty(gallery_data?.doner_video_gallery)) {
      setVideoAviable(true);
    } else {
      setVideoAviable(false);
    }
  };

  const iosAlert = () => {
    Alert.alert(ValidationMessages.LOG_OUT, ValidationMessages.LOGOUT_TEXT, [
      {
        text: Strings.smSetting.Yes_Logout,
        onPress: () => {
          logoutScreen();
        },
      },
      {
        text: Strings.profile.ModalOption2,
        onPress: () => null,
      },
    ]);
    return true;
  };

  return (
    <>
      <View style={styles.flex}>
        <Header end={false}>{headerComp()}</Header>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.andMainContainer}>
            <View style={styles.imgView}>
              <ProfileImage
                Heading={Strings.smSetting.ptbProfile}
                onPressImg={() => {
                  Platform.OS === 'ios' ? openIosSheet() : openAndroidSheet();
                }}
                Name={`${
                  name?.first_name === undefined ? first_name : name?.first_name
                } ${
                  name?.middle_name === undefined || name?.middle_name === null
                    ? ''
                    : name?.middle_name
                }`}
                LastName={
                  name?.last_name === undefined ? last_name : name?.last_name
                }
                roleId={'Parent To Be'}
                source={{
                  uri: profileImg,
                }}
              />
            </View>
            <View>
              {typeof subscriptionStatus === 'object' &&
                typeof subscriptionStatus.data === 'object' &&
                Boolean(subscriptionStatus.data?.status) &&
                !subscriptionStatus.data?.is_trial && <Subscribed />}
              {typeof subscriptionStatus === 'object' &&
                typeof subscriptionStatus.data === 'object' &&
                (subscriptionStatus.data?.is_trial ||
                  !Boolean(subscriptionStatus.data?.status)) && (
                  <Subscribe
                    Icon={Images.STAR}
                    MainText={Strings.subscribe.Subscribe_Now}
                    InnerText={Strings.subscribe.Plans}
                  />
                )}
              <PtbAccount
                leftIcon={Images.preferences}
                title={Strings.smSetting.EditPreferences}
                onPress={() =>
                  navigation.navigate('SetPreference', {EditPreferences: true})
                }
              />
              <PtbAccount
                leftIcon={Images.video}
                title={Strings.smSetting.AddVideo}
                BlueDot={avaiableVideo === true ? true : false}
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
              <ToggleNotification />
              <PtbAccount
                leftIcon={Images.writing}
                title={Strings.smSetting.Inquiry}
                onPress={() => navigation.navigate('Support')}
              />
              <PtbAccount
                leftIcon={Images.information}
                title={Strings.smSetting.AboutUs}
                onPress={() => openWebView(ABOUT_URL)}
              />
              <PtbAccount
                leftIcon={Images.file}
                title={Strings.smSetting.Terms}
                onPress={() => openWebView(TERMS_OF_USE_URL)}
              />
              <PtbAccount
                leftIcon={Images.sheild}
                title={Strings.smSetting.Privacy}
                onPress={() => openWebView(PRIVACY_URL)}
              />
            </View>
            <View style={styles.buttoncontainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  Platform.OS === 'ios' ? iosAlert() : setShowModal(true);
                }}>
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
      <Modal
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <View style={[styles.centeredView]}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>{Strings.smSetting.Log_Out}</Text>
            <Text style={styles.modalSubHeader}>
              {Strings.smSetting.LogoutContent}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
                logoutScreen();
              }}>
              <Text style={styles.modalOption1}>
                {Strings.smSetting.Yes_Logout}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
              }}>
              <Text style={styles.modalOption2}>
                {Strings.sm_create_gallery.StayHera}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};
export default React.memo(PtbProfile);
