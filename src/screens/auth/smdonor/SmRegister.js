// SmRegister
import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
  ImageBackground,
  Pressable,
  ScrollView,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  BackHandler,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {yupResolver} from '@hookform/resolvers/yup';
import Button from '../../../components/Button';
import Images from '../../../constants/Images';
import Header, {CircleBtn} from '../../../components/Header';
import globalStyle from '../../../styles/global';
import Strings, {ValidationMessages} from '../../../constants/Strings';
import {smRegisterSchema} from '../../../constants/schemas';
import Colors from '../../../constants/Colors';
import FloatingLabelInput from '../../../components/FloatingLabelInput';
import {
  smRoles,
  Routes,
  PRIVACY_URL,
  TERMS_OF_USE_URL,
  validatePassword,
  pwdErrMsg,
} from '../../../constants/Constants';
import openCamera from '../../../utils/openCamera';
import {askCameraPermission} from '../../../utils/permissionManager';
import styles from '../../../styles/auth/smdonor/registerScreen';
import {Value} from '../../../constants/FixedValues';
import {deviceRegister, ptbRegister} from '../../../redux/actions/Auth';
import ActionSheet from 'react-native-actionsheet';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
} from '../../../redux/actions/loader';
import {BottomSheetComp, ModalMiddle} from '../../../components';
import {NotificationContext} from '../../../context/NotificationContextManager';
import debounce from '../../../utils/debounce';
import {saveLocalImg} from '../../../redux/actions/profileImg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const SmRegister = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isPressed, setPressed] = useState(false);
  const loadingRef = useRef(false);
  const [show, setShow] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [userImage, setUserImage] = useState('');
  const [file, setFile] = useState(null);
  const [check, setCheck] = useState(true);
  const [threeOption, setThreeOption] = useState([]);
  const [datePicked, onDateChange] = useState();
  const [showModal, setShowModal] = useState(false);

  const {fcmToken, Device_ID} = useContext(NotificationContext);
  const inputRef = useRef(null);
  const [roleId, setRole] = useState('');
  let actionSheet = useRef();
  const {
    handleSubmit,
    control,
    formState: {errors, isValid},
    setValue,
    clearErrors,
  } = useForm({
    resolver: yupResolver(smRegisterSchema),
  });
  const {
    params: {isRouteData},
  } = useRoute();
  const cb = image => {
    setOpen(false);
    setUserImage(image.path);
    dispatch(saveLocalImg(image.path));
    setFile(image);
  };
  const {
    register_user_success,
    register_user_loading,
    register_user_error_msg,
  } = useSelector(state => state.Register);
  useEffect(() => {
    if (loadingRef.current && !register_user_loading) {
      dispatch(showAppLoader());
      if (register_user_success) {
        const _deviceInfo = {
          device_id: Device_ID,
          device_token: fcmToken,
          device_type: Platform.OS,
        };
        dispatch(deviceRegister(_deviceInfo));
        dispatch(hideAppLoader());
        dispatch(saveLocalImg(userImage));
        navigation.navigate(Routes.SmBasicDetails);
      }
      if (register_user_error_msg) {
        dispatch(hideAppLoader());
      }
    }
    loadingRef.current = register_user_loading;
  }, [
    register_user_success,
    register_user_loading,
    register_user_error_msg,
    dispatch,
    navigation,
  ]);

  useEffect(() => {
    if (!isValid) {
      const e = errors.role;
      if (e) {
        dispatch(showAppToast(true, e.message));
      }
    }
  }, [dispatch, errors, isValid]);
  const onSubmit = data => {
    if (!userImage) {
      dispatch(hideAppLoader());
      dispatch(showAppToast(true, ValidationMessages.PICTURE_REQUIRE));
      return;
    }
    if (check) {
      dispatch(hideAppLoader());
      dispatch(showAppToast(true, ValidationMessages.TERMS_CONDITIONS));
      return;
    }
    const reqData = new FormData();
    reqData.append('role_id', data.role);
    reqData.append('first_name', data.first_name);
    reqData.append(
      'middle_name',
      data.middle_name !== undefined ? data.middle_name : '',
    );
    reqData.append('last_name', data.last_name);
    reqData.append('dob', moment(date).format('DD-MM-YYYY'));
    reqData.append('email', data.email);
    reqData.append('password', data.password);
    reqData.append('country_code', isRouteData.country_code);
    reqData.append('phone_no', isRouteData.phone_no);
    reqData.append('file', {
      name: 'name',
      type: file.mime,
      uri: file.path,
    });
    dispatch(showAppLoader());
    dispatch(ptbRegister(reqData));
    dispatch(saveLocalImg(userImage));
  };
  const handleBackButtonClick = () => {
    Alert.alert(ValidationMessages.HOLD_ON, ValidationMessages.ALERT, [
      {
        text: ValidationMessages.CANCEL,
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: ValidationMessages.YES,
        onPress: () => {
          BackHandler.exitApp();
        },
      },
    ]);
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
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconcross}
      onPress={() =>
        Platform.OS === 'ios' ? backAction() : setShowModal(true)
      }
      accessibilityLabel="Left arrow Button, Press to go back"
      style={styles.headerIcon}
    />
  );
  const backAction = () => {
    Alert.alert(Strings.profile.ModalHeader, Strings.profile.ModalSubheader, [
      {
        text: Strings.profile.ModalOption1,
        onPress: () => {
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
  const logoutScreen = () => {
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
  const onPressSubmit = () => {
    setPressed(true);
    handleSubmit(onSubmit)();
  };
  const CalenderOn = () => {
    inputRef.current.blur();
    setShow(true);
  };
  return (
    <>
      <View
        style={{
          flex: Value.CONSTANT_VALUE_1,
          backgroundColor: Colors.BACKGROUND,
        }}>
        <Header end={true}>{headerComp()}</Header>
        <KeyboardAwareScrollView
          animated={true}
          keyboardShouldPersistTaps="handled"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.flex}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.main}>
                <Text style={[globalStyle.screenTitle, styles.title]}>
                  {Strings.sm_register.Title}
                </Text>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <>
                      {smRoles.map(role => (
                        <TouchableOpacity
                          style={styles.radioContainer}
                          key={role.id}
                          onPress={() => {
                            onChange(role.id);
                            setPressed(false);
                            setRole(role.id);
                          }}>
                          <Image
                            style={styles.radio}
                            source={
                              value === role.id
                                ? Images.iconRadiosel
                                : Images.iconRadiounsel
                            }
                          />
                          <Text style={styles.radioLabel}>{role.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </>
                  )}
                  name="role"
                />
                <View style={styles.imgContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      Platform.OS === 'ios'
                        ? openIosSheet()
                        : openAndroidSheet();
                    }}>
                    <ImageBackground
                      source={userImage ? {uri: userImage} : null}
                      style={styles.imgView}
                      imageStyle={styles.img}>
                      <TouchableOpacity
                        style={[
                          styles.camBtn,
                          userImage ? styles.camSelectedBtn : null,
                        ]}
                        onPress={() => {
                          Platform.OS === 'ios'
                            ? openIosSheet()
                            : openAndroidSheet();
                        }}>
                        <Image source={Images.camera} style={styles.camImg} />
                      </TouchableOpacity>
                    </ImageBackground>
                  </TouchableOpacity>
                  <View style={{marginTop: Value.CONSTANT_VALUE_10}}>
                    <Text style={styles.ImageText}>
                      {Strings.sm_register.uploadImage}
                      <Text style={{color: Colors.RED}}>*</Text>
                    </Text>
                  </View>
                </View>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <FloatingLabelInput
                      label={Strings.sm_register.FirstName}
                      value={value}
                      onChangeText={v => {
                        onChange(v.trim());
                        setPressed(false);
                      }}
                      error={errors && errors.first_name?.message}
                      required={true}
                      maxLength={30}
                      inputRef={inputRef}
                    />
                  )}
                  name="first_name"
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <FloatingLabelInput
                      label={Strings.sm_register.MiddleName}
                      value={value}
                      maxLength={30}
                      onChangeText={v => {
                        onChange(v.trim());
                        setPressed(false);
                      }}
                      error={errors && errors.middle_name?.message}
                      inputRef={inputRef}
                    />
                  )}
                  name="middle_name"
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <FloatingLabelInput
                      label={Strings.sm_register.LastName}
                      value={value}
                      onChangeText={v => {
                        onChange(v.trim());
                        setPressed(false);
                      }}
                      error={errors && errors.last_name?.message}
                      required={true}
                      maxLength={30}
                      inputRef={inputRef}
                    />
                  )}
                  name="last_name"
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <FloatingLabelInput
                      label={Strings.sm_register.DOB}
                      value={value}
                      onChangeText={v => {
                        onChange(v);
                        setPressed(false);
                      }}
                      error={errors && errors.dob?.message}
                      required={true}
                      endComponentPress={() => CalenderOn()}
                      endComponent={() => (
                        <TouchableOpacity onPress={() => CalenderOn()}>
                          <Image source={Images.calendar} />
                        </TouchableOpacity>
                      )}
                      editable={false}
                      onPressIn={() => CalenderOn()}
                    />
                  )}
                  name="dob"
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <FloatingLabelInput
                      label={Strings.profile.EmailAddress}
                      value={value}
                      onChangeText={v => {
                        onChange(v.trim());
                        setPressed(false);
                      }}
                      required={true}
                      error={errors && errors.email?.message}
                      inputRef={inputRef}
                    />
                  )}
                  name="email"
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <View style={styles.error}>
                      <FloatingLabelInput
                        label={Strings.sm_register.Password}
                        value={value}
                        onChangeText={v => {
                          onChange(v);
                          setPressed(false);
                        }}
                        required={true}
                        error={errors && errors.password?.message}
                        containerStyle={styles.pwdInputContainer}
                        secureTextEntry={true}
                        inputRef={inputRef}
                      />
                      {pwdErrMsg.map(msg => (
                        <View style={styles.pwdErrContainer} key={msg.type}>
                          <Text
                            style={[
                              styles.pwdErrText,
                              {
                                color: validatePassword(
                                  value,
                                  msg.type,
                                  isPressed,
                                )
                                  ? Colors.BLACK
                                  : validatePassword(
                                      value,
                                      msg.type,
                                      isPressed,
                                    ) === null
                                  ? Colors.GRAY2
                                  : Colors.RED,
                              },
                            ]}>
                            {msg.msg}
                          </Text>
                          {validatePassword(value, msg.type, isPressed) !==
                            null && (
                            <Image
                              style={[
                                styles.ValidPwd,
                                {
                                  tintColor: validatePassword(
                                    value,
                                    msg.type,
                                    isPressed,
                                  )
                                    ? Colors.BLACK
                                    : Colors.RED,
                                },
                              ]}
                              source={
                                validatePassword(value, msg.type, isPressed)
                                  ? Images.path
                                  : Images.warning
                              }
                            />
                          )}
                        </View>
                      ))}
                    </View>
                  )}
                  name="password"
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <FloatingLabelInput
                      containerStyle={{marginTop: Value.CONSTANT_VALUE_10}}
                      label={Strings.sm_register.Confirm}
                      value={value}
                      onChangeText={v => {
                        onChange(v);
                        setPressed(false);
                      }}
                      error={errors && errors.confirm_password?.message}
                      required={true}
                      secureTextEntry={true}
                      inputRef={inputRef}
                    />
                  )}
                  name="confirm_password"
                />
                <View style={styles.checkboxContainer}>
                  {check ? (
                    <TouchableOpacity
                      onPress={() => {
                        setCheck(cur => !cur);
                      }}>
                      <Image source={Images.rectangleCopy} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setCheck(cur => !cur);
                      }}>
                      <Image source={Images.iconCheck} />
                    </TouchableOpacity>
                  )}
                  <View>
                    <Text style={styles.tmc1}>
                      {Strings.profile.tmc1}
                      <Text
                        style={styles.tmcLink1}
                        onPress={() =>
                          navigation.navigate(Routes.WebViewUrl, {
                            url: TERMS_OF_USE_URL,
                            terms: true,
                          })
                        }>
                        {Strings.Subscription.TermsServices}
                      </Text>{' '}
                      and{' '}
                      <Text
                        style={styles.tmcLink1}
                        onPress={() =>
                          navigation.navigate(Routes.WebViewUrl, {
                            url: PRIVACY_URL,
                            policy: true,
                          })
                        }>
                        {Strings.profile.tmc3}
                      </Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.starContainer}>
                  <Text style={styles.starColor}>*</Text>
                  <Text style={styles.descText}>{Strings.profile.desc}</Text>
                </View>
                <View style={styles.align}>
                  <Button
                    disabled={register_user_loading || register_user_success}
                    label={Strings.sm_register.Btn}
                    onPress={debounce(onPressSubmit, 1000)}
                    style={styles.Btn}
                  />
                </View>
                <Pressable
                  onPress={() => {
                    navigation.navigate(Routes.Profile, {isRouteData});
                  }}>
                  <Text style={styles.parentBtn}>
                    Register as Future Parent (Intended Parent)
                  </Text>
                </Pressable>
              </View>
              <ModalMiddle
                showModal={showModal}
                onRequestClose={() => {
                  setShowModal(!showModal);
                }}
                String_1={Strings.profile.ModalHeader}
                String_2={Strings.profile.ModalSubheader}
                String_3={Strings.profile.ModalOption1}
                String_4={Strings.profile.ModalOption2}
                onPressNav={() => {
                  setShowModal(false);
                  logoutScreen();
                }}
                onPressOff={() => {
                  setShowModal(false);
                }}
              />
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
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
              setOpen(false);
            }}
            style={[styles.pickerBtn, styles.pickerBtnBorder]}>
            <Text style={styles.pickerBtnLabel}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              openCamera(1, cb);
              setOpen(false);
            }}
            style={styles.pickerBtn}>
            <Text style={styles.pickerBtnLabel}>Open Gallery</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetComp>
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
          datePicked ?? roleId === 3
            ? moment().subtract(21, 'years')._d
            : moment().subtract(18, 'years')._d
        }
        maximumDate={
          roleId === 3
            ? moment().subtract(21, 'years')._d
            : moment().subtract(18, 'years')._d
        }
        minimumDate={
          roleId === 3
            ? moment().subtract(45, 'years')._d
            : moment().subtract(40, 'years')._d
        }
        onCancel={() => {
          setShow(false);
        }}
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        positiveButtonLabel="DONE"
      />
    </>
  );
};
export default React.memo(SmRegister);
