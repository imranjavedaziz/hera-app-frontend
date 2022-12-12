import {
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
  TouchableOpacity,
  Keyboard,
  Image,
  Modal,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Button,
  FloatingLabelInput,
  Header,
  MultiTextInput,
} from '../../../components';
import styles from './styles';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Routes} from '../../../constants/Constants';
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
  hideAppLoader,
  showAppLoader,
  showAppToast,
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
import normalizeInput from '../../../utils/normalizeInput';

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
  const [phone, setPhone] = useState('');
  const [datePicked, onDateChange] = useState();
  useFocusEffect(
    useCallback(() => {
      dispatch(getStates());
      dispatch(getProfileSetterDetail());
      dispatch(getEditProfile());
    }, [dispatch]),
  );
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
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: {errors, isDirty},
  } = useForm({
    resolver: yupResolver(editProfileSchema),
  });
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
        dispatch(hideAppLoader());
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
      dispatch(showAppLoader());
      if (get_state_success) {
        dispatch(hideAppLoader());

        setStateRes(get_state_res);
        dispatch(hideAppLoader());
      }
      if (get_state_error_msg) {
        dispatch(hideAppLoader());
      }
    }
    loadingRef.current = get_state_loading;
  }, [get_state_loading, get_state_success]);
  console.log(control, 'controller');
  //GET PROFILE SETTER
  useEffect(() => {
    if (LoadingRef.current && !get_profile_setter_loading) {
      dispatch(showAppLoader());
      if (get_profile_setter_success) {
        handelChange();
        setProfileRes(get_profile_setter_res);
        dispatch(hideAppLoader());
      }
      if (get_profile_setter_error_msg) {
        dispatch(hideAppLoader());
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
            props.route?.params?.smProfile
              ? navigation.navigate(Routes.SmSetting)
              : navigation.navigate(Routes.PtbProfile);
          },
        },
        {
          text: Strings.profile.ModalOption2,
          onPress: () => null,
        },
      ],
    );
    return true;
  };
  const platform = () => {
    Platform.OS === 'ios' ? backAction() : setShowModal(true);
  };
  const navCondition = () => {
    props.route?.params?.smProfile
      ? navigation.navigate(Routes.SmSetting)
      : navigation.navigate(Routes.PtbProfile);
  };
  const headerComp = () => (
    <View style={styles.cancelAndroidsbtn}>
      <TouchableOpacity
        onPress={() => {
          isDirty === true ? platform() : navCondition();
        }}
        style={styles.clearView}>
        <Text style={styles.clearText}>{Strings.Subscription.Cancel}</Text>
      </TouchableOpacity>
    </View>
  );
  const handelChange = async value => {
    reset({phone: ''});

    setPhone(prevstate =>
      normalizeInput(get_user_detail_res?.phone_no, prevstate),
    );
    let a = '';
    for (let i = 0; i < get_user_detail_res?.phone_no?.length; i++) {
      if (
        get_user_detail_res.phone_no[i] !== ' ' &&
        get_user_detail_res.phone_no[i] !== ')' &&
        get_user_detail_res.phone_no[i] !== '('
      ) {
        a = a + get_user_detail_res.phone_no[i];
      }
    }
    const sexual_orientations_id =
      get_profile_setter_res?.sexual_orientation.find(obj => {
        return (
          obj.id === get_user_detail_res?.user_profile?.sexual_orientations_id
        );
      });
    const relationship_status_id =
      get_profile_setter_res?.relationship_status.find(obj => {
        return (
          obj.id === get_user_detail_res?.user_profile?.relationship_status_id
        );
      });
    const state_id = get_state_res?.find(obj => {
      return obj.id === get_user_detail_res?.location?.state_id;
    });
    setValue('phone', a);
    setValue('first_name', get_user_detail_res?.first_name);
    setValue('middle_name', get_user_detail_res?.middle_name);
    setValue('last_name', get_user_detail_res?.last_name);
    setValue('email', get_user_detail_res?.email);
    setValue('gender_id', get_user_detail_res?.user_profile?.gender_id);
    setValue('dob', moment(get_user_detail_res?.dob).format('MMM DD, YYYY'));
    setValue('state_id', state_id);
    setValue('zipcode', get_user_detail_res?.location?.zipcode);
    setValue(
      'occupation',
      get_user_detail_res?.user_profile?.occupation === null
        ? ''
        : get_user_detail_res?.user_profile?.occupation,
    );
    setValue('bio', get_user_detail_res?.user_profile.bio);
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
  return (
    <View style={styles.flex}>
      <Header end={true}>{headerComp()}</Header>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        resetScrollToCoords={{x: 0, y: 10}}
        keyboardOpeningTime={0}
        scrollEnabled={true}
        extraHeight={180}
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
                    value={`+1 ${phone}`}
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
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <Dropdown
                    defaultValue={value}
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
                  <Dropdown
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
            <DateTimePickerModal
              value={date}
              isVisible={show}
              mode={'date'}
              date={datePicked ?? new Date()}
              onConfirm={selectedDate => {
                setShow(false);
                setValue('dob', getDate(selectedDate));
                setDate(getDate(selectedDate));
                onDateChange(selectedDate);
              }}
              onCancel={() => {
                setShow(false);
              }}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              positiveButtonLabel="DONE"
            />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      <Modal
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <View style={[styles.centeredView]}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>
              {Strings.EDITPROFILE.DiscardEdit}
            </Text>
            <Text style={styles.modalSubHeader}>
              {Strings.EDITPROFILE.DiscardEditDisc}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
                props.route?.params?.smProfile
                  ? navigation.navigate(Routes.SmSetting)
                  : navigation.navigate(Routes.PtbProfile);
              }}>
              <Text style={styles.modalOption1}>
                {Strings.profile.ModalOption1}
              </Text>
              <View
                style={{borderBottomWidth: 1, borderBottomColor: '#f2f2f2'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
              }}>
              <Text style={styles.modalOption2}>
                {Strings.profile.ModalOption2}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EditProfile;
