import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert,
  BackHandler,
} from 'react-native';
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from 'react';
import Header, {IconHeader} from '../../../../components/Header';
import Images from '../../../../constants/Images';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Strings, {ValidationMessages} from '../../../../constants/Strings';
import Styles from './Styles';
import {
  Routes,
  ABOUT_URL,
  TERMS_OF_USE_URL,
  PRIVACY_URL,
} from '../../../../constants/Constants';
import {
  updateProfileImg,
  logOut,
  updateName,
  signoutUser,
  RemoveStripIds,
} from '../../../../redux/actions/Auth';
import openCamera from '../../../../utils/openCamera';
import styleSheet from '../../../../styles/auth/smdonor/registerScreen';
import ActionSheet from 'react-native-actionsheet';
import {BottomSheetComp, ModalMiddle} from '../../../../components';
import ProfileImage from '../../../../components/dashboard/PtbProfile/ProfileImage';
import {Alignment} from '../../../../constants';
import {getEditProfile} from '../../../../redux/actions/Edit_profile';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
} from '../../../../redux/actions/loader';
import {getRoleType} from '../../../../utils/other';
import {getUserGallery} from '../../../../redux/actions/CreateGallery';
import _ from 'lodash';
import PtbAccount, {
  ToggleNotification,
} from '../../../../components/dashboard/PtbProfile/PtbAccount';
import {empty} from '../../../../redux/actions/Chat';
import {NotificationContext} from '../../../../context/NotificationContextManager';
import {getMessageID} from '../../../../redux/actions/MessageId';
import {
  GET_BANK_LIST,
  GET_CARD_LIST,
} from '../../../../redux/actions/stripe.action';
import {getPaymentRequestList} from '../../../../redux/actions/Payment';
import {ACCOUNT_STATUS_CLEAN} from '../../../../redux/Type';
const SmDonorSettings = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const profileImgNew = useSelector(state => state.Auth?.user?.profile_pic);
  const profileImg = useSelector(state => state.profileImg?.imgStore);
  const first_name = useSelector(state => state?.Auth?.user?.first_name);
  const middle_name = useSelector(state => state?.Auth?.user?.middle_name);
  const last_name = useSelector(state => state?.Auth?.user?.last_name);
  const role_id = useSelector(state => state?.Auth?.user?.role_id);
  const [isOpen, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [threeOption, setThreeOption] = useState([]);
  let actionSheet = useRef();
  const [avaiableVideo, setVideoAviable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [disable, setDisable] = useState(false);
  const GetLoadingRef = useRef(false);
  const loadingGalleryRef = useRef(false);
  const [openActionsheets, setOpenActionsheet] = useState(false);
  const {
    get_user_detail_res,
    get_user_detail_success,
    get_user_detail_loading,
    get_user_detail_error,
  } = useSelector(state => state.Edit_profile);
  const {Device_ID} = useContext(NotificationContext);
  console.log(Device_ID, 'Device_ID');
  const LogoutLoadingRef = useRef(false);
  const {log_out_success, log_out_loading, log_out_error_msg} = useSelector(
    state => state.Auth,
  );
  const [Notifications, setNotifications] = useState(0);
  const {get_payment_request_list_success, get_payment_request_list_res} =
    useSelector(state => state.Payment);
  const {gallery_data, gallery_success, gallery_loading} = useSelector(
    state => state.CreateGallery,
  );
  useFocusEffect(
    useCallback(() => {
      dispatch(getEditProfile());
      dispatch(getUserGallery());
      dispatch(getPaymentRequestList());
    }, [dispatch]),
  );
  const handleBackButtonClick = () => {
    navigation.navigate(Routes.SmDashboard);
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  useEffect(() => {
    if (get_payment_request_list_success) {
      if (!_.isEmpty(get_payment_request_list_res?.data)) {
        setNotifications(get_payment_request_list_res?.data?.length);
      } else {
        setNotifications(0);
      }
    }
  }, [
    get_payment_request_list_success,
    get_payment_request_list_res,
    dispatch,
  ]);
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
  const videoAvaible = () => {
    if (
      gallery_data?.doner_video_gallery === null ||
      gallery_data?.doner_video_gallery === undefined
    ) {
      setVideoAviable(true);
    }
    if (_.isEmpty(gallery_data?.doner_photo_gallery)) {
      setVideoAviable(true);
    } else {
      setVideoAviable(false);
    }
  };
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
  const clearFunction = async () => {
    await dispatch(empty());
    await dispatch(RemoveStripIds());
    await dispatch(signoutUser());
    await dispatch(hideAppLoader());
    await dispatch({type: GET_CARD_LIST.CLEAN});
    await dispatch({type: GET_BANK_LIST.CLEAN});
    await dispatch(hideAppLoader());
    await dispatch({type: ACCOUNT_STATUS_CLEAN});
    navigation.navigate(Routes.Landing);
    setTimeout(() => {
      setDisable(false);
    }, 3000);
  };
  //logout
  useEffect(() => {
    if (LogoutLoadingRef.current && !log_out_loading) {
      dispatch(showAppLoader());
      if (log_out_success) {
        clearFunction();
      } else {
        dispatch(showAppToast(true, log_out_error_msg));
        dispatch(hideAppLoader());
        setDisable(false);
      }
    }
    LogoutLoadingRef.current = log_out_loading;
  }, [log_out_success, log_out_loading]);

  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      style={Styles.androidHeaderIcon}
      leftPress={navigation.goBack}
    />
  );

  const handleThreeOption = option => {
    switch (option) {
      case Strings.sm_create_gallery.bottomSheetCamera:
        openCamera(0, cb);
        setOpenActionsheet(false);
        break;
      case Strings.sm_create_gallery.bottomSheetGallery:
        openCamera(1, cb);
        setOpenActionsheet(false);
        break;
      case Strings.Subscription.Cancel:
        console.log('Cancel');
        setOpenActionsheet(false);
        break;
    }
  };
  const openActionSheet = () => {
    setOpenActionsheet(true);
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
    if (openActionsheets === false) {
      openActionSheet();
    }
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
    if (_.isEmpty(Device_ID) || Device_ID === undefined) {
      dispatch(showAppToast(true, 'Please try to logout again.'));
    } else {
      dispatch(logOut(Device_ID));
    }
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getMessageID(''));
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, dispatch]);
  const iosAlert = () => {
    Alert.alert(ValidationMessages.LOG_OUT, ValidationMessages.LOGOUT_TEXT, [
      {
        text: Strings.smSetting.Yes_Logout,
        onPress: () => {
          setDisable(true);
          dispatch(empty());
          dispatch(showAppLoader());
          logoutScreen();
        },
        style: 'destructive',
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
      <View style={Styles.flex}>
        <Header end={false}>{headerComp()}</Header>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={Styles.androidHeaderContainer}>
            <View
              style={{
                alignItems: Alignment.CENTER,
              }}>
              <ProfileImage
                onPressImg={() => {
                  Platform.OS === 'ios' ? openIosSheet() : openAndroidSheet();
                }}
                Name={`${
                  name?.first_name === undefined ? first_name : name?.first_name
                }${
                  middle_name === null || middle_name === undefined
                    ? ''
                    : ` ${middle_name}`
                }`}
                LastName={
                  name?.last_name === undefined ? last_name : name?.last_name
                }
                roleId={getRoleType(role_id)}
                source={{
                  uri: profileImgNew === '' ? profileImg : profileImgNew,
                }}
              />
            </View>
            <PtbAccount
              leftIcon={Images.preferences}
              title={Strings.smSetting.EditAttribute}
              onPress={() =>
                navigation.navigate(Routes.SetAttributes, {
                  EditAttributes: true,
                })
              }
            />
            <PtbAccount
              leftIcon={Images.DOLLAR_LOGO}
              title={Strings.smSetting.Hera_Pay}
              onPress={() => navigation.navigate(Routes.HeraPay)}
              RedDot={Notifications > 0 ? true : false}
              Pending={Notifications > 0 && 'Notifications'}
            />
            <PtbAccount
              leftIcon={Images.galleryimage}
              title={Strings.smSetting.Gallery}
              onPress={() => {
                navigation.navigate(Routes.donorGallery);
              }}
              BlueDot={avaiableVideo === true ? true : false}
            />
            <PtbAccount
              leftIcon={Images.person}
              title={Strings.smSetting.EditProfile}
              onPress={() => {
                navigation.navigate(Routes.EditProfile, {smProfile: true});
              }}
              BlueDot={name?.email_verified === 0 ? true : false}
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
              onPress={() => {
                navigation.navigate(Routes.Support);
              }}
            />
            <PtbAccount
              leftIcon={Images.PLAY_BUTTON_VIDEO}
              title={Strings.smSetting.See_Help_Video}
              onPress={() => navigation.navigate(Routes.WalkThroughVedio)}
            />
            <PtbAccount
              leftIcon={Images.information}
              title={Strings.smSetting.AboutUs}
              onPress={() =>
                navigation.navigate(Routes.WebViewUrl, {
                  url: ABOUT_URL,
                  about: true,
                })
              }
            />
            <PtbAccount
              leftIcon={Images.file}
              title={Strings.Subscription.TermsServices}
              onPress={() =>
                navigation.navigate(Routes.WebViewUrl, {
                  url: TERMS_OF_USE_URL,
                  terms: true,
                })
              }
            />
            <PtbAccount
              leftIcon={Images.sheild}
              title={Strings.smSetting.Privacy}
              onPress={() =>
                navigation.navigate(Routes.WebViewUrl, {
                  url: PRIVACY_URL,
                  policy: true,
                })
              }
            />
            <View style={Styles.buttoncontainer}>
              <TouchableOpacity
                style={Styles.button}
                activeOpacity={disable ? 1 : 0.5}
                onPress={() => {
                  disable === false &&
                    (Platform.OS === 'ios' ? iosAlert() : setShowModal(true));
                }}>
                <Text style={Styles.buttonText}>{Strings.smSetting.Btn}</Text>
              </TouchableOpacity>
              <Text style={Styles.AppVersion}>
                {Strings.smSetting.AppVersion}
              </Text>
            </View>
          </View>
          {disable && <View style={Styles.disableing} />}
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
              setOpen(false);
            }}
            style={[styleSheet.pickerBtn, styleSheet.pickerBtnBorder]}>
            <Text style={styleSheet.pickerBtnLabel}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              openCamera(1, cb);
              setOpen(false);
            }}
            style={styleSheet.pickerBtn}>
            <Text style={styleSheet.pickerBtnLabel}>Open Gallery</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetComp>
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
          setDisable(true);
          dispatch(showAppLoader());
          logoutScreen();
        }}
        onPressOff={() => {
          setShowModal(false);
        }}
      />
    </>
  );
};

export default React.memo(SmDonorSettings);
