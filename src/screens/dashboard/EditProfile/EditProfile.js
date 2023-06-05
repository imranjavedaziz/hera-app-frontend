import {
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
  TouchableOpacity,
  Keyboard,
  Image,
  ImageBackground,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Button,
  FloatingLabelInput,
  Header,
  ModalMiddle,
  MultiTextInput,
} from '../../../components';
import styles from './styles';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {FormKey, Routes} from '../../../constants/Constants';
import {Alignment, Colors, Images, Strings} from '../../../constants';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {editProfileSchema} from '../../../constants/schemas';
import {useDispatch, useSelector} from 'react-redux';
import {
  getProfileSetterDetail,
  getStates,
} from '../../../redux/actions/Register';
import {
  showEditAppLoader,
  showAppLoader,
  showAppToast,
  hideEditLoader,
  hideAppLoader,
} from '../../../redux/actions/loader';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Dropdown from '../../../components/inputs/Dropdown';
import {
  getEditProfile,
  updateEditProfile,
} from '../../../redux/actions/Edit_profile';
import {sendVerificationMail} from '../../../redux/actions/VerificationMail';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {px} from '../../../utils/responsive';

const EditProfile = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [profileRes, setProfileRes] = useState();
  const [stateRes, setStateRes] = useState();
  const [date, setDate] = useState();
  const [show, setShow] = useState(false);
  const loadingRef = useRef(false);
  const LoadingRef = useRef(false);
  const GetLoadingRef = useRef(false);
  const UpdateLoadingRef = useRef(false);
  const [showModal, setShowModal] = useState(false);
  const [datePicked, onDateChange] = useState();
  const [clipdrop, setClickDrop] = useState(false);
  const {
    handleSubmit,
    control,
    clearErrors,
    setValue,
    formState: {errors, isDirty},
  } = useForm({
    resolver: yupResolver(editProfileSchema),
  });
  useFocusEffect(
    useCallback(() => {
      dispatch(showEditAppLoader());
      dispatch(getStates());
      dispatch(getProfileSetterDetail());
      dispatch(getEditProfile());
    }, [dispatch]),
  );
  const handleBackButtonClick = () => {
    if (isDirty === true) {
      platform();
    } else {
      navCondition();
    }
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
  }, [isDirty]);
  const {
    get_state_res,
    get_profile_setter_res,
    get_profile_setter_success,
    get_profile_setter_loading,
    get_profile_setter_error_msg,
    get_state_success,
    get_state_loading,
    get_state_error_msg,
  } = useSelector(state => state.Register);
  const user = useSelector(state => state.Auth.user);
  const {
    get_user_detail_res,
    get_user_detail_success,
    get_user_detail_loading,
    get_user_detail_error,
    update_user_detail_success,
    update_user_detail_loading,
    update_user_detail__error_msg,
    update_user_detail_res,
  } = useSelector(state => state.Edit_profile);
  const {
    send_verification_success,
    send_verification_loading,
    send_verification_error_msg,
    send_verification_res,
  } = useSelector(state => state.VerificationMail);

  useEffect(() => {
    if (loadingRef.current && !send_verification_loading) {
      dispatch(showAppLoader());
      if (send_verification_success) {
        dispatch(hideAppLoader());
        dispatch(showAppToast(false, send_verification_res.message));
        navigation.navigate(Routes.OTP, {type: 3});
      }
      if (send_verification_error_msg) {
        dispatch(showAppToast(true, send_verification_error_msg));
        dispatch(hideAppLoader());
      }
    }
    loadingRef.current = send_verification_loading;
  }, [
    send_verification_success,
    send_verification_loading,
    send_verification_res,
    send_verification_error_msg,
  ]);
  // UPDATE DETAIL
  useEffect(() => {
    if (UpdateLoadingRef.current && !update_user_detail_loading) {
      dispatch(showAppLoader());
      if (update_user_detail_success) {
        dispatch(showAppToast(false, update_user_detail_res));
        setTimeout(() => {
          props.route?.params?.smProfile
            ? navigation.navigate(Routes.SmSetting)
            : navigation.navigate(Routes.PtbProfile);
        }, 1000);
      } else {
        dispatch(hideAppLoader());
        dispatch(showAppToast(true, update_user_detail__error_msg));
      }
    }
    UpdateLoadingRef.current = update_user_detail_loading;
  }, [update_user_detail_success, update_user_detail_loading]);

  //GET STATE
  useEffect(() => {
    if (loadingRef.current && !get_state_loading) {
      dispatch(showEditAppLoader());
      if (get_state_success) {
        dispatch(hideEditLoader());

        setStateRes(get_state_res);
      }
      if (get_state_error_msg) {
        dispatch(hideEditLoader());
      }
    }
    loadingRef.current = get_state_loading;
  }, [get_state_loading, get_state_success]);
  //GET PROFILE SETTER
  useEffect(() => {
    if (LoadingRef.current && !get_profile_setter_loading) {
      dispatch(showEditAppLoader());
      if (get_profile_setter_success) {
        handelChange();
        setProfileRes(get_profile_setter_res);
        dispatch(hideEditLoader());
      }
      if (get_profile_setter_error_msg) {
        dispatch(hideEditLoader());
      }
    }
    LoadingRef.current = get_profile_setter_loading;
  }, [
    get_profile_setter_loading,
    get_profile_setter_success,
    get_profile_setter_res,
  ]);

  //GET USER DETAIL
  useEffect(() => {
    if (GetLoadingRef.current && !get_user_detail_loading) {
      dispatch(showAppLoader());
      if (get_user_detail_success) {
        handelChange();
        dispatch(hideAppLoader());
      }
      if (get_user_detail_error) {
        dispatch(hideAppLoader());
      }
    }
    GetLoadingRef.current = get_user_detail_loading;
  }, [get_user_detail_success, get_user_detail_loading]);
  useEffect(() => {
    handelChange();
  }, [get_user_detail_res]);
  const getDate = selectedDate => {
    let tempDate = selectedDate.toString().split(' ');
    return date !== '' ? `${tempDate[1]} ${tempDate[2]}, ${tempDate[3]}` : '';
  };

  const backAction = () => {
    Alert.alert(
      Strings.EDITPROFILE.DiscardEdit,
      Strings.EDITPROFILE.DiscardEditDisc,
      [
        {
          text: Strings.profile.ModalOption1,
          onPress: () => {
            navCondition();
          },
          style: 'destructive',
        },
        {
          text: Strings.profile.ModalOption2,
          onPress: () => null,
        },
      ],
    );
    return true;
  };
  const androidModal = () => {
    setTimeout(() => {
      setShowModal(true);
    }, 250);
    Keyboard.dismiss();
  };
  const platform = () => {
    Platform.OS === 'ios' ? backAction() : androidModal();
  };
  const navCondition = () => {
    props.route?.params?.smProfile
      ? navigation.navigate(Routes.SmSetting)
      : navigation.navigate(Routes.PtbProfile);
  };
  const headerComp = () => (
    <View style={styles.cancelAndroidsbtn}>
      <ImageBackground source={Images.CANCEL_BG} style={styles.cancelBg}>
        <TouchableOpacity
          onPress={() => {
            isDirty === true ? platform() : navCondition();
          }}
          style={styles.clearView}>
          <Text style={styles.clearText}>{Strings.Subscription.Cancel}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
  const handelChange = async value => {
    const sexual_orientations_id =
      get_profile_setter_res?.sexual_orientation.find(obj => {
        return (
          obj.id === get_user_detail_res?.userProfile?.sexual_orientations_id
        );
      });
    const relationship_status_id =
      get_profile_setter_res?.relationship_status.find(obj => {
        return (
          obj.id === get_user_detail_res?.userProfile?.relationship_status_id
        );
      });

    const state_id = get_state_res?.find(obj => {
      return obj.id === get_user_detail_res?.location?.state_id;
    });
    setValue('phone', get_user_detail_res?.phone_no);
    setValue('first_name', get_user_detail_res?.first_name);
    setValue('middle_name', get_user_detail_res?.middle_name);
    setValue('last_name', get_user_detail_res?.last_name);
    setValue('email', get_user_detail_res?.email);
    setValue('gender_id', get_user_detail_res?.userProfile?.gender_id);
    setValue('dob', moment(get_user_detail_res?.dob).format('MMM DD, YYYY'));
    setValue('state_id', state_id);
    setValue('zipcode', get_user_detail_res?.location?.zipcode);
    setValue(
      'occupation',
      get_user_detail_res?.userProfile?.occupation === null
        ? ''
        : get_user_detail_res?.userProfile?.occupation,
    );
    setValue('bio', get_user_detail_res?.userProfile.bio);
    setValue('sexual_orientations_id', sexual_orientations_id);
    setValue('relationship_status_id', relationship_status_id);
  };
  const onSubmit = data => {
    dispatch(showAppLoader());
    const payload = {
      bio: data?.bio,
      dob: data?.dob,
      email: data?.email,
      first_name: data.first_name,
      gender_id: data.gender_id,
      last_name: data?.last_name,
      middle_name: data?.middle_name,
      occupation: data?.occupation,
      phone: data?.phone,
      relationship_status_id: data?.relationship_status_id?.id
        ? data?.relationship_status_id?.id
        : data?.relationship_status_id,
      sexual_orientations_id: data?.sexual_orientations_id?.id
        ? data?.sexual_orientations_id?.id
        : data?.sexual_orientations_id,
      state_id: data?.state_id?.id ? data?.state_id?.id : data?.state_id,
      zipcode: data?.zipcode,
    };
    dispatch(updateEditProfile(payload));
  };
  const onPressVerify = () => {
    dispatch(sendVerificationMail());
  };
  const StyleIOS = {
    marginTop: px(20),
  };
  const Style = Platform.OS === 'ios' && StyleIOS;
  const StyleIOSFIELDS = {
    marginTop: px(25),
  };
  const StyleFields = Platform.OS === 'ios' && StyleIOSFIELDS;
  const StyleIOSZip = {
    marginTop: px(40),
  };
  const StyleIOSZipCode = Platform.OS === 'ios' && StyleIOSZip;
  return (
    <View style={styles.flex}>
      <Header end={true}>{headerComp()}</Header>
      <KeyboardAwareScrollView
        keyboardOpeningTime={0}
        scrollEnabled={true}
        extraHeight={180}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View style={styles.mainAndroidContainer}>
              <View style={styles.headingStyle}>
                <Text style={styles.MainheadingStyle}>
                  {Strings.EDITPROFILE.EDIT_PROFILE}
                </Text>
                <Text style={styles.InnerheadingStyle}>
                  {Strings.EDITPROFILE.Profile_Title}
                </Text>
              </View>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <FloatingLabelInput
                    label={Strings.profile.FirstName}
                    value={value}
                    onChangeText={v => onChange(v.trim())}
                    required={true}
                    maxLength={30}
                    error={errors && errors.first_name?.message}
                  />
                )}
                name="first_name"
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <FloatingLabelInput
                    containerStyle={StyleFields}
                    label={Strings.profile.MiddleName}
                    value={value}
                    maxLength={30}
                    onChangeText={v => onChange(v.trim())}
                    fontWeight={Alignment.BOLD}
                    error={errors && errors.middle_name?.message}
                  />
                )}
                name="middle_name"
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <FloatingLabelInput
                    clipdrop={clipdrop}
                    containerStyle={StyleFields}
                    label={Strings.profile.LastName}
                    value={value}
                    maxLength={30}
                    onChangeText={v => onChange(v.trim())}
                    fontWeight={Alignment.BOLD}
                    required={true}
                    error={errors && errors.last_name?.message}
                  />
                )}
                name="last_name"
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <FloatingLabelInput
                    verifyEmail={
                      get_user_detail_res?.email_verified === 0 ? true : false
                    }
                    label={Strings.profile.EmailAddress}
                    value={value}
                    onChangeText={v => onChange(v)}
                    fontWeight={Alignment.BOLD}
                    required={true}
                    editable={false}
                    edited={false}
                    error={errors && errors.email?.message}
                    onPressVerify={onPressVerify}
                  />
                )}
                name="email"
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <FloatingLabelInput
                    label={Strings.profile.phone_no}
                    value={`+1 ${value}`}
                    onChangeText={v => onChange(v)}
                    fontWeight={Alignment.BOLD}
                    required={true}
                    editable={false}
                    edited={false}
                    error={errors && errors.phone?.message}
                  />
                )}
                name="phone"
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <FloatingLabelInput
                    label={Strings.profile.DateOfBirth}
                    value={value}
                    onChangeText={v => onChange(v)}
                    endComponentPress={() => setShow(true)}
                    error={errors && errors.dob?.message}
                    required={true}
                    endComponent={() => (
                      <TouchableOpacity onPress={() => setShow(true)}>
                        <Image
                          source={Images.calendar}
                          style={styles.calender}
                        />
                      </TouchableOpacity>
                    )}
                    editable={false}
                    onPressIn={() => setShow(true)}
                  />
                )}
                name="dob"
              />
              <Text style={styles.label}>
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
                render={({field: {onChange, value}}) => (
                  <Dropdown
                    containerStyleDrop={
                      Platform.OS === 'ios' && {marginTop: 10}
                    }
                    defaultValue={value}
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
                    containerStyleDrop={Style}
                    defaultValue={value}
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
                render={({field: {onChange, value}}) => (
                  <Dropdown
                    containerStyleDrop={
                      Platform.OS === 'ios' && {marginTop: 10, marginBottom: 10}
                    }
                    defaultValue={value}
                    label={Strings.sm_basic.State}
                    data={stateRes}
                    onSelect={selectedItem => {
                      onChange(selectedItem.id);
                      setClickDrop(true);
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
                    label={Strings.sm_basic.Zip}
                    value={value}
                    onChangeText={v => onChange(v)}
                    error={errors && errors.zipcode?.message}
                    required={true}
                    containerStyle={StyleIOSZipCode}
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
                    containerStyle={StyleFields}
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
                    maxLength={251}
                    onChangeText={v => {
                      onChange(v);
                    }}
                    error={
                      (value?.length > 250 &&
                        'You have reached 250 characters limit.') ||
                      (errors && errors.bio?.message)
                    }
                  />
                )}
                name="bio"
              />
              <View style={styles.btnView}>
                <Button
                  style={styles.Btn}
                  label={Strings.sm_basic.SAVE_PROFILE}
                  onPress={handleSubmit(onSubmit)}
                />
              </View>
            </View>
            {user?.role_id === 2 ? (
              <DateTimePickerModal
                value={date}
                isVisible={show}
                mode={'date'}
                onConfirm={selectedDate => {
                  clearErrors(FormKey.date_of_birth);
                  setShow(false);
                  setValue('dob', getDate(selectedDate));
                  setDate(getDate(selectedDate));
                  onDateChange(selectedDate);
                }}
                date={datePicked ?? moment().subtract(18, 'years')._d}
                maximumDate={moment().subtract(18, 'years')._d}
                onCancel={() => {
                  setShow(false);
                }}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                positiveButtonLabel="DONE"
              />
            ) : (
              <DateTimePickerModal
                value={date}
                isVisible={show}
                mode={'date'}
                onConfirm={selectedDate => {
                  setShow(false);
                  clearErrors('dob');
                  setValue('dob', moment(selectedDate).format('MMM DD, YYYY'));
                  setDate(selectedDate);
                  onDateChange(selectedDate);
                }}
                date={
                  datePicked ?? user?.role_id === 3
                    ? moment().subtract(21, 'years')._d
                    : moment().subtract(18, 'years')._d
                }
                maximumDate={
                  user?.role_id === 3
                    ? moment().subtract(21, 'years')._d
                    : moment().subtract(18, 'years')._d
                }
                minimumDate={
                  user?.role_id === 3
                    ? moment().subtract(45, 'years')._d
                    : moment().subtract(40, 'years')._d
                }
                onCancel={() => {
                  setShow(false);
                }}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                positiveButtonLabel="DONE"
              />
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      <ModalMiddle
        showModal={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
        String_1={Strings.EDITPROFILE.DiscardEdit}
        String_2={Strings.EDITPROFILE.DiscardEditDisc}
        String_3={Strings.profile.ModalOption1}
        String_4={Strings.profile.ModalOption2}
        onPressNav={() => {
          setShowModal(false);
          props.route?.params?.smProfile
            ? navigation.navigate(Routes.SmSetting)
            : navigation.navigate(Routes.PtbProfile);
        }}
        onPressOff={() => {
          setShowModal(false);
        }}
      />
    </View>
  );
};

export default EditProfile;
