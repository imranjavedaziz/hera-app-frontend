import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from 'react';
import Header, { IconHeader } from '../../../components/Header';
import Images from '../../../constants/Images';
import styles from './style';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ProfileImage from '../../../components/dashboard/PtbProfile/ProfileImage';
import Strings, { ValidationMessages } from '../../../constants/Strings';
import Subscribe, {
  Subscribed,
} from '../../../components/dashboard/PtbProfile/subscribe';
import PtbAccount, {
  ToggleNotification,
} from '../../../components/dashboard/PtbProfile/PtbAccount';
import { useDispatch, useSelector } from 'react-redux';
import {
  logOut,
  updateName,
  updateProfileImg,
} from '../../../redux/actions/Auth';
import {
  Routes,
  ABOUT_URL,
  TERMS_OF_USE_URL,
  PRIVACY_URL,
} from '../../../constants/Constants';
import openCamera from '../../../utils/openCamera';
import { askCameraPermission } from '../../../utils/permissionManager';
import ActionSheet from 'react-native-actionsheet';
import { BottomSheetComp, ModalMiddle } from '../../../components';
import { getEditProfile } from '../../../redux/actions/Edit_profile';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
} from '../../../redux/actions/loader';
import { getUserGallery } from '../../../redux/actions/CreateGallery';
import openWebView from '../../../utils/openWebView';
import { empty } from '../../../redux/actions/Chat';
import { NotificationContext } from '../../../context/NotificationContextManager';
import moment from 'moment';
import { getSubscriptionStatus } from '../../../redux/actions/Subsctiption';

const PtbProfile = () => {
  const navigation = useNavigation();
  const [isOpen, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [threeOption, setThreeOption] = useState([]);
  let actionSheet = useRef();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const loadingGalleryRef = useRef(false);
  const [avaiableVideo, setVideoAviable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const GetLoadingRef = useRef(false);
  const first_name = useSelector(state => state?.Auth?.user?.first_name);
  const last_name = useSelector(state => state?.Auth?.user?.last_name);
  const middle_name = useSelector(state => state?.Auth?.user?.middle_name);
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
  const { gallery_success, gallery_loading, gallery_data } = useSelector(
    state => state.CreateGallery,
  );
  const { Device_ID } = useContext(NotificationContext);
  useFocusEffect(
    useCallback(() => {
      dispatch(getEditProfile());
      dispatch(getSubscriptionStatus());
      dispatch(getUserGallery());
    }, [dispatch]),
  );
  const LogoutLoadingRef = useRef(false);
  const { log_out_success, log_out_loading, log_out_error_msg } = useSelector(
    state => state.Auth,
  );
  useFocusEffect(
    useCallback(() => {
      if (loadingGalleryRef.current && !gallery_loading) {
        dispatch(showAppLoader());
        if (gallery_success) {
          videoAvaible();
          dispatch(hideAppLoader());
        } else {
          dispatch(hideAppLoader());
        }
      }
      loadingGalleryRef.current = gallery_loading;
    }, [gallery_success, gallery_loading]),
  );
  //GET USER DETAIL
  useFocusEffect(
    useCallback(() => {
      if (GetLoadingRef.current && !get_user_detail_loading) {
        dispatch(showAppLoader());
        if (get_user_detail_success) {
          const data = {
            first_name: get_user_detail_res.first_name,
            last_name: get_user_detail_res.last_name,
            middle_name: get_user_detail_res.middle_name,
          };
          dispatch(updateName(data));
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
    return navigation.addListener('focus', () => { });
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
    dispatch(empty());
    dispatch(logOut(Device_ID));
  };
  const videoAvaible = () => {
    if (
      gallery_data?.doner_video_gallery === null ||
      gallery_data?.doner_video_gallery === undefined
    ) {
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
          dispatch(empty());
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
  const formatedDate = moment(subscriptionStatus?.data?.trial_end).format('MMM DD, YYYY')
  const trialVar = subscriptionStatus?.data?.is_trial;
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
                Name={`${name?.first_name === undefined ? first_name : name?.first_name
                  } ${middle_name === null || middle_name === undefined
                    ? ''
                    : middle_name
                  }`}
                LastName={
                  name?.last_name === undefined ? last_name : name?.last_name
                }
                roleId={'Intended Parent'}
                source={{
                  uri: profileImg,
                }}
              />
            </View>
            <View>
              {typeof subscriptionStatus === 'object' &&
                typeof subscriptionStatus.data === 'object' &&
                Boolean(subscriptionStatus.data?.status) &&
                !subscriptionStatus.data?.is_trial ? <Subscribed /> : (
                <Subscribe
                  Icon={trialVar && subscriptionStatus.data?.status  ? Images.starGreen : Images.STAR}
                  MainText={trialVar  && subscriptionStatus.data?.status ? Strings?.subscribe.Free : Strings.subscribe.Subscribe_Now}
                  InnerText={trialVar  && subscriptionStatus.data?.status ? `${formatedDate}${Strings.subscribe.Subscribe_Trial}` : Strings.subscribe.Plans}
                  is_trial={trialVar && subscriptionStatus.data?.status} 
                />
              )}
              <PtbAccount
                leftIcon={Images.preferences}
                title={Strings.smSetting.EditPreferences}
                onPress={() =>
                  navigation.navigate('SetPreference', { EditPreferences: true })
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
                title={Strings.Subscription.TermsServices}
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
      <ModalMiddle
        showModal={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
        String_1={Strings.smSetting.Log_Out}
        String_2={Strings.smSetting.LogoutContent}
        String_3={Strings.smSetting.Yes_Logout}
        String_4={Strings.sm_create_gallery.StayHera}
        onPressNav={() => {
          setShowModal(false);
          logoutScreen();
        }}
        onPressOff={() => {
          setShowModal(false);
        }}
      />
    </>
  );
};
export default React.memo(PtbProfile);
