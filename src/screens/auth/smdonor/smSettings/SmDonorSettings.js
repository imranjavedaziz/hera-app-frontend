import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import Header, {IconHeader} from '../../../../components/Header';
import Images from '../../../../constants/Images';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Strings from '../../../../constants/Strings';
import Styles from './Styles';
import {
  Routes,
  ABOUT_URL,
  TERMS_OF_USE_URL,
  PRIVACY_URL,
} from '../../../../constants/Constants';
import {updateProfileImg, logOut} from '../../../../redux/actions/Auth';
import openCamera from '../../../../utils/openCamera';
import styleSheet from '../../../../styles/auth/smdonor/registerScreen';
import ActionSheet from 'react-native-actionsheet';
import {BottomSheetComp} from '../../../../components';
import ProfileImage from '../../../../components/dashboard/PtbProfile/ProfileImage';
import {Alignment} from '../../../../constants';
import {getEditProfile} from '../../../../redux/actions/Edit_profile';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
} from '../../../../redux/actions/loader';
import openWebView from '../../../../utils/openWebView';
import {getRoleType} from '../../../../utils/other';
import {getUserGallery} from '../../../../redux/actions/CreateGallery';
import _ from 'lodash';
import PtbAccount, {
  ToggleNotification,
} from '../../../../components/dashboard/PtbProfile/PtbAccount';
import {empty} from '../../../../redux/actions/Chat';
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
  const [avaiableVideo, setVideoAviable] = useState(false);
  const GetLoadingRef = useRef(false);
  const loadingGalleryRef = useRef(false);
  const {
    get_user_detail_res,
    get_user_detail_success,
    get_user_detail_loading,
    get_user_detail_error,
  } = useSelector(state => state.Edit_profile);
  const LogoutLoadingRef = useRef(false);
  const {log_out_success, log_out_loading, log_out_error_msg} = useSelector(
    state => state.Auth,
  );
  const {gallery_data, gallery_success, gallery_loading} = useSelector(
    state => state.CreateGallery,
  );
  useFocusEffect(
    useCallback(() => {
      dispatch(getEditProfile());
      dispatch(getUserGallery());
    }, [dispatch]),
  );
  useEffect(() => {
    if (loadingGalleryRef.current && !gallery_loading) {
      dispatch(showAppLoader());
      if (gallery_success) {
        if (gallery_data?.doner_video_gallery === null) {
          setVideoAviable(false);
        }
        if (_.isEmpty(gallery_data?.doner_photo_gallery)) {
          setVideoAviable(true);
        } else {
          setVideoAviable(false);
        }
        dispatch(hideAppLoader());
      } else {
        dispatch(hideAppLoader());
      }
    }
    loadingGalleryRef.current = gallery_loading;
  }, [gallery_success, gallery_loading]);

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
  };
  return (
    <>
      <SafeAreaView style={Styles.flex}>
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
                } ${
                  name?.middle_name === undefined || name?.middle_name === null
                    ? ''
                    : name?.middle_name
                }`}
                LastName={
                  name?.last_name === undefined ? last_name : name?.last_name
                }
                roleId={getRoleType(name?.role_id)}
                source={{
                  uri: profileImg,
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

            <View style={Styles.buttoncontainer}>
              <TouchableOpacity
                style={Styles.button}
                onPress={() => logoutScreen()}>
                <Text style={Styles.buttonText}>{Strings.smSetting.Btn}</Text>
              </TouchableOpacity>
              <Text style={Styles.AppVersion}>
                {Strings.smSetting.AppVersion}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
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

export default React.memo(SmDonorSettings);
