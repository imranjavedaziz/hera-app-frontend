// SmBasicDetails
import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  StatusBar,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {yupResolver} from '@hookform/resolvers/yup';
import Button from '../../../components/Button';
import Images from '../../../constants/Images';
import Header, {CircleBtn} from '../../../components/Header';
import globalStyle from '../../../styles/global';
import Strings from '../../../constants/Strings';
import {smBasicSchema} from '../../../constants/schemas';
import FloatingLabelInput from '../../../components/FloatingLabelInput';
import {Routes, ABOUT_URL} from '../../../constants/Constants';
import Dropdown from '../../../components/inputs/Dropdown';
import styles from '../../../styles/auth/smdonor/basicDetailsScreen';
import {Value} from '../../../constants/FixedValues';
import ActionSheet from 'react-native-actionsheet';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
} from '../../../redux/actions/loader';
import {
  getStates,
  getProfileSetterDetail,
  saveBasicDetail,
} from '../../../redux/actions/Register';
import {useNavigation} from '@react-navigation/native';
import {logOut, updateRegStep} from '../../../redux/actions/Auth';
import {BottomSheetComp, MultiTextInput} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Alignment, Colors} from '../../../constants';
import {dynamicSize} from '../../../utils/responsive';
import openWebView from '../../../utils/openWebView';

const SmBasicDetails = () => {
  const navigation = useNavigation();
  const [isOpen, setOpen] = useState(false);
  const [stateRes, setStateRes] = useState();
  const [profileRes, setProfileRes] = useState();
  const [payloadData, setPayloadData] = useState([]);
  const [threeOption, setThreeOption] = useState([]);

  const dispatch = useDispatch();
  let actionSheet = useRef();
  const loadingRef = useRef(false);
  const LoadingRef = useRef(false);
  const SubmitLoadingRef = useRef();
  useEffect(() => {
    dispatch(getStates());
    dispatch(getProfileSetterDetail());
  }, []);
  const {
    get_state_res,
    get_profile_setter_res,
    get_profile_setter_success,
    get_profile_setter_loading,
    get_profile_setter_error_msg,
    get_state_success,
    get_state_loading,
    get_state_error_msg,
    save_basic_detail_success,
    save_basic_detail_loading,
    save_basic_detail_error_msg,
  } = useSelector(state => state.Register);
  const LogoutLoadingRef = useRef(false);
  const user = useSelector(state => state.Auth.user);
  const {log_out_success, log_out_loading, log_out_error_msg} = useSelector(
    state => state.Auth,
  );
  const {
    handleSubmit,
    control,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(smBasicSchema),
  });

  //GET STATE
  useEffect(() => {
    if (loadingRef.current && !get_state_loading) {
      dispatch(showAppLoader());
      if (get_state_success) {
        dispatch(hideAppLoader());
        setStateRes(get_state_res);
      }
      if (get_state_error_msg) {
        dispatch(hideAppLoader());
      }
    }
    loadingRef.current = get_state_loading;
  }, [get_state_success, get_state_loading]);
  //GET PROFILE SETTER
  useEffect(() => {
    if (LoadingRef.current && !get_profile_setter_loading) {
      dispatch(showAppLoader());
      if (get_profile_setter_success) {
        dispatch(hideAppLoader());
        setProfileRes(get_profile_setter_res);
      }
      if (get_profile_setter_error_msg) {
        dispatch(hideAppLoader());
      }
    }
    LoadingRef.current = get_profile_setter_loading;
  }, [get_profile_setter_success, get_profile_setter_loading]);

  //SAVE BASIC DETAIL DATA
  useEffect(() => {
    if (SubmitLoadingRef.current && !save_basic_detail_loading) {
      dispatch(showAppLoader());
      if (save_basic_detail_success) {
        dispatch(hideAppLoader());
        dispatch(updateRegStep());
        navigation.navigate(
          user?.role_id === 2 ? Routes.SetPreference : Routes.SetAttributes,
          payloadData,
        );
      }
      if (save_basic_detail_error_msg) {
        dispatch(hideAppLoader());
      }
    }
    SubmitLoadingRef.current = save_basic_detail_loading;
  }, [save_basic_detail_success, save_basic_detail_loading]);
  //logout
  useEffect(() => {
    if (LogoutLoadingRef.current && !log_out_loading) {
      dispatch(showAppLoader());
      if (log_out_success) {
        dispatch(hideAppLoader());
        navigation.navigate(Routes.Landing);
      } else {
        dispatch(hideAppLoader());
        dispatch(showAppToast(true, log_out_error_msg));
      }
    }
    LogoutLoadingRef.current = log_out_loading;
  }, [log_out_success, log_out_loading]);
  useEffect(() => {
    if (!isValid) {
      const e = errors.gender_id;
      if (e) {
        dispatch(showAppToast(true, e.message));
      }
    }
  }, [dispatch, errors, isValid]);
  const onSubmit = data => {
    dispatch(showAppLoader());
    setPayloadData(data);
    dispatch(saveBasicDetail(data));
  };

  const headerComp = () => (
    <>
      <CircleBtn
        icon={Images.iconSettings}
        Fixedstyle={{marginRight: dynamicSize(20)}}
        onPress={() => {
          Platform.OS === 'ios' ? openActionSheet() : setOpen(true);
        }}
      />
      <ActionSheet
        ref={actionSheet}
        options={threeOption}
        destructiveButtonIndex={2}
        cancelButtonIndex={2}
        onPress={index => {
          handleThreeOption(threeOption[index]);
        }}
      />
    </>
  );

  const logOutScreen = () => {
    dispatch(showAppLoader());
    dispatch(logOut());
  };
  const navigateSupport = () => {
    navigation.navigate(Routes.Support);
  };
  const handleThreeOption = option => {
    switch (option) {
      case Strings.smSetting.Inquiry:
        navigateSupport();
        break;
      case Strings.preference.About:
        openWebView(ABOUT_URL);
        break;
      case Strings.preference.Logout:
        logOutScreen();
        break;
      case Strings.Subscription.Cancel:
        break;
    }
  };
  const openActionSheet = () => {
    setThreeOption([
      Strings.smSetting.Inquiry,
      Strings.preference.About,
      Strings.preference.Logout,
      Strings.Subscription.Cancel,
    ]);
    setTimeout(() => {
      actionSheet.current.show();
    }, 300);
  };
  const StyleIOS = {
    marginTop: 30,
  };
  const Style = Platform.OS === 'ios' && StyleIOS;
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.BACKGROUND}
        animated={true}
        hidden={false}
      />
      <View style={styles.flex_1}>
        <Header end={true}>{headerComp()}</Header>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            resetScrollToCoords={{x: 0, y: 10}}
            keyboardOpeningTime={0}
            scrollEnabled={true}
            extraHeight={180}
            showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.mainComp_1}>
                <View>
                  <Text style={globalStyle.screenTitle}>
                    {Strings.sm_basic.Title}
                  </Text>
                  <Text
                    style={[
                      globalStyle.screenSubTitle,
                      {marginBottom: Value.CONSTANT_VALUE_45},
                    ]}>
                    {Strings.sm_basic.Subtitle}
                  </Text>
                  <Text
                    style={styles.label}
                    accessible={true}
                    accessibilityLabel={'Gender'}>
                    Gender
                    <Text style={[{color: Colors.RED}]}>*</Text>
                  </Text>
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <View style={styles.radioContainer}>
                        {profileRes?.gender.map(gender => (
                          <TouchableOpacity
                            style={styles.radioBtn}
                            key={gender.id}
                            onPress={() => onChange(gender.id)}>
                            <Image
                              style={styles.radioImg}
                              source={
                                value === gender.id
                                  ? Images.iconRadiosel
                                  : Images.iconRadiounsel
                              }
                            />
                            <Text style={styles.radioLabel}>{gender.name}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                    name="gender_id"
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Dropdown
                        containerStyle={Style}
                        label={Strings.sm_basic.SexualOrientation}
                        data={profileRes?.sexual_orientation}
                        onSelect={selectedItem => {
                          onChange(selectedItem.id);
                        }}
                        required={true}
                        error={errors && errors.sexual_orientations_id?.message}
                      />
                    )}
                    name="sexual_orientations_id"
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Dropdown
                        containerStyle={Style}
                        label={Strings.sm_basic.RelationshipStatus}
                        data={profileRes?.relationship_status}
                        onSelect={selectedItem => {
                          onChange(selectedItem.id);
                        }}
                        required={true}
                        error={errors && errors.relationship_status_id?.message}
                      />
                    )}
                    name="relationship_status_id"
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Dropdown
                        containerStyle={Style}
                        label={Strings.sm_basic.State}
                        data={stateRes}
                        onSelect={selectedItem => {
                          onChange(selectedItem.id);
                        }}
                        required={true}
                        error={errors && errors.state_id?.message}
                      />
                    )}
                    name="state_id"
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <FloatingLabelInput
                        containerStyle={Style}
                        label={Strings.sm_basic.Zip}
                        value={value}
                        onChangeText={v => onChange(v)}
                        error={errors && errors.zipcode?.message}
                        required={true}
                        keyboardType="number-pad"
                        maxLength={5}
                      />
                    )}
                    name="zipcode"
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <FloatingLabelInput
                        containerStyle={Style}
                        label={Strings.sm_basic.Occupation}
                        value={value}
                        onChangeText={v => onChange(v)}
                        error={errors && errors.occupation?.message}
                      />
                    )}
                    name="occupation"
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <MultiTextInput
                        title={Strings.sm_basic.Bio}
                        required={true}
                        value={value}
                        maxLength={250}
                        onChangeText={v => {
                          onChange(v);
                        }}
                        error={errors && errors.bio?.message}
                      />
                    )}
                    name="bio"
                  />
                  <View
                    style={{
                      alignItems: Alignment.CENTER,
                      marginTop: Value.CONSTANT_VALUE_26,
                    }}>
                    <Button
                      style={styles.Btn}
                      label={Strings.sm_basic.Btn}
                      onPress={handleSubmit(onSubmit)}
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAwareScrollView>
        </ScrollView>
      </View>
      <BottomSheetComp
        wrapperStyle={globalStyle.wrapperStyle}
        lineStyle={globalStyle.lineStyle}
        isOpen={isOpen}
        setOpen={setOpen}>
        <View style={globalStyle.basicSheetContainer}>
          <TouchableOpacity
            style={globalStyle.formBtn}
            onPress={() => {
              navigation.navigate('Support');
              setOpen(false);
            }}>
            <Text style={globalStyle.formText}>
              {Strings.smSetting.Inquiry}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyle.heraBtn}
            onPress={() => {
              openWebView(ABOUT_URL);
            }}>
            <Text style={globalStyle.heraText}>
              {Strings.bottomSheet.About_HERA}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyle.logoutBtn}
            onPress={() => logOutScreen()}>
            <Text style={globalStyle.logoutText}>
              {Strings.bottomSheet.Log_Out}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetComp>
    </>
  );
};
export default React.memo(SmBasicDetails);
