// Parent to Be Screen
import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  ImageBackground,
  Platform,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  showAppToast,
  hideAppLoader,
  showAppLoader,
} from '../../redux/actions/loader';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Header, {CircleBtn} from '../../components/Header';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import openCamera from '../../utils/openCamera';
import Images from '../../constants/Images';
import globalStyle from '../../styles/global';
import moment from 'moment';
import {
  Fonts,
  FormKey,
  pwdErrMsg,
  Routes,
  validatePassword,
  PRIVACY_URL,
  TERMS_OF_USE_URL,
} from '../../constants/Constants';
import Strings, {ValidationMessages} from '../../constants/Strings';
import {Value} from '../../constants/FixedValues';
import {parentRegisterSchema} from '../../constants/schemas';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import Colors from '../../constants/Colors';
import Button from '../../components/Button';
import styles from './StylesProfile';
import ActionSheet from 'react-native-actionsheet';
import Alignment from '../../constants/Alignment';
import openWebView from '../../utils/openWebView';
import {askCameraPermission} from '../../utils/permissionManager';
import {ptbRegister} from '../../redux/actions/Register';
import {deviceHandler} from '../../utils/commonFunction';
import {BottomSheetComp, ModalMiddle} from '../../components';
import {
  deviceRegister,
  updateLocalImg,
  updateRegStep,
} from '../../redux/actions/Auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NotificationContext} from '../../context/NotificationContextManager';
import debounce from '../../utils/debounce';
import {getSubscriptionStatus} from '../../redux/actions/Subsctiption';
import {empty} from '../../redux/actions/Chat';

const Profile = props => {
  const navigation = useNavigation();
  const loadingRef = useRef(false);
  const {
    params: {isRouteData},
  } = useRoute();
  const [isPressed, setPressed] = useState(false);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState();
  const [file, setFile] = useState(null);
  const [userImage, setUserImage] = useState('');
  const [check, setCheck] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const [threeOption, setThreeOption] = useState([]);
  let actionSheet = useRef();
  const [datePicked, onDateChange] = useState();
  const {fcmToken, Device_ID} = useContext(NotificationContext);
  const inputRef = useRef(null);
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: {errors},
  } = useForm({resolver: yupResolver(parentRegisterSchema)});

  const {
    register_user_success,
    register_user_loading,
    register_user_error_msg,
  } = useSelector(state => state.Auth);
  useEffect(() => {
    deviceHandler(props.navigation, Routes.Landing);
  }, [props.navigation]);
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
        dispatch(updateRegStep());
        dispatch(updateLocalImg(userImage));
        dispatch(getSubscriptionStatus());
        navigation.navigate(Routes.SmBasicDetails);
      } else {
        dispatch(showAppToast(true, register_user_error_msg));
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
  const getDate = selectedDate => {
    let tempDate = selectedDate.toString().split(' ');
    return date !== '' ? `${tempDate[1]} ${tempDate[2]}, ${tempDate[3]}` : '';
  };
  // Header Component
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconcross}
      onPress={() => {
        Platform.OS === 'ios' ? backAction() : setShowModal(true);
      }}
      Fixedstyle={{
        marginRight: Value.CONSTANT_VALUE_20,
      }}
      accessibilityLabel={Strings.PTB_Profile.Cross_Button}
    />
  );
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
      'Cancel',
    ]);
    setTimeout(() => {
      actionSheet.current.show();
    }, 300);
    askCameraPermission();
  };

  const cb = image => {
    setOpen(false);
    setUserImage(image.path);
    setFile(image);
  };
  const backAction = () => {
    Alert.alert(Strings.profile.ModalHeader, Strings.profile.ModalSubheader, [
      {
        text: Strings.profile.ModalOption1,
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
  // Submit form
  const onSubmit = data => {
    dispatch(showAppLoader());
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
    reqData.append(FormKey.role_id, FormKey.parent_to_be_role_id);
    reqData.append(FormKey.first_name, data.first_name);
    reqData.append(
      FormKey.middle_name,
      data.middle_name !== undefined ? data.middle_name : '',
    );
    reqData.append(FormKey.last_name, data.last_name);
    reqData.append(FormKey.dob, moment(date).format('DD-MM-YYYY'));
    reqData.append(FormKey.email, data.email);
    reqData.append(FormKey.password, data.confirm_password);
    reqData.append(FormKey.country_code, isRouteData.country_code);
    reqData.append(FormKey.phone_no, isRouteData.phone_no);
    reqData.append(FormKey.file, {
      name: FormKey.name,
      type: file.mime,
      uri: file.path,
    });
    dispatch(ptbRegister(reqData));
    dispatch(updateLocalImg(userImage));
  };
  useEffect(() => {
    return navigation.addListener('focus', () => {
      reset();
    });
  }, [navigation, reset]);
  const openIosSheet = () => {
    openActionSheet();
  };
  const openAndroidSheet = () => {
    setOpen(true);
    askCameraPermission();
  };
  const onPressSubmit = () => {
    setPressed(true);
    debounce(handleSubmit(onSubmit), 1000)();
  };
  const CalenderOn = () => {
    inputRef.current.blur();
    setShow(true);
  };
  return (
    <View style={styles.flex}>
      <Header end={true}>{headerComp()}</Header>
      <KeyboardAwareScrollView
        animated={true}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View style={styles.innerView}>
              <View style={styles.imgContainer}>
                <Text style={globalStyle.screenTitle}>
                  {Strings.profile.makeAccountFor}
                </Text>
                <View
                  accessible={true}
                  accessibilityLabel={`${Strings.profile.parentToBe}`}>
                  <Text
                    style={globalStyle.screenSubTitle}
                    numberOfLines={2}
                    accessible={false}>
                    {Strings.profile.parentToBe}
                  </Text>
                  {/* IMage Upload */}
                  <View style={styles.profileContainer}>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {
                        Platform.OS === 'ios'
                          ? openIosSheet()
                          : openAndroidSheet();
                      }}>
                      <ImageBackground
                        source={userImage ? {uri: userImage} : null}
                        style={styles.background}
                        imageStyle={styles.imgBack}>
                        <TouchableOpacity
                          activeOpacity={1}
                          style={[
                            styles.uploadBackground,
                            userImage ? styles.userImg : null,
                          ]}
                          onPress={() => {
                            Platform.OS === 'ios'
                              ? openIosSheet()
                              : openAndroidSheet();
                          }}>
                          <Image
                            source={Images.camera}
                            style={
                              userImage
                                ? styles.profileUploadedStyle
                                : styles.profileImg
                            }
                          />
                        </TouchableOpacity>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.ImageText}>
                  {Strings.profile.uploadImage}
                  <Text style={[styles.label, {color: Colors.RED}]}>*</Text>
                </Text>
                {/* Image Upload End  */}
              </View>
              <View style={styles.fullWidth}>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <FloatingLabelInput
                      label={Strings.profile.FirstName}
                      value={value}
                      onChangeText={v => {
                        onChange(v.trim());
                        setPressed(false);
                      }}
                      required={true}
                      maxLength={30}
                      inputRef={inputRef}
                      error={errors && errors.first_name?.message}
                    />
                  )}
                  name={FormKey.first_name}
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <FloatingLabelInput
                      label={Strings.profile.MiddleName}
                      value={value}
                      onChangeText={v => {
                        onChange(v.trim());
                        setPressed(false);
                      }}
                      fontWeight={Alignment.BOLD}
                      error={errors && errors.middle_name?.message}
                      maxLength={30}
                      inputRef={inputRef}
                    />
                  )}
                  name={FormKey.middle_name}
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <FloatingLabelInput
                      label={Strings.profile.LastName}
                      value={value}
                      onChangeText={v => {
                        onChange(v.trim());
                        setPressed(false);
                      }}
                      fontWeight={Alignment.BOLD}
                      required={true}
                      maxLength={30}
                      error={errors && errors.last_name?.message}
                      inputRef={inputRef}
                    />
                  )}
                  name={FormKey.last_name}
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <FloatingLabelInput
                      label={Strings.profile.DateOfBirth}
                      value={value}
                      onChangeText={v => {
                        onChange(v);
                        setPressed(false);
                      }}
                      endComponentPress={() => CalenderOn()}
                      error={errors && errors.date_of_birth?.message}
                      required={true}
                      endComponent={() => (
                        <TouchableOpacity onPress={() => CalenderOn()}>
                          <Image source={Images.calendar} />
                        </TouchableOpacity>
                      )}
                      editable={false}
                      onPressIn={() => CalenderOn()}
                    />
                  )}
                  name={FormKey.date_of_birth}
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
                      fontWeight={Alignment.BOLD}
                      required={true}
                      inputRef={inputRef}
                      error={errors && errors.email?.message}
                    />
                  )}
                  name={FormKey.email}
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <View>
                      <FloatingLabelInput
                        label={Strings.profile.setPassword}
                        value={value}
                        onChangeText={v => {
                          onChange(v.trim());
                          setPressed(false);
                        }}
                        required={true}
                        secureTextEntry={true}
                        inputRef={inputRef}
                        containerStyle={{marginBottom: Value.CONSTANT_VALUE_10}}
                      />
                      {pwdErrMsg.map(msg => (
                        <View style={styles.passwordCheck} key={msg.type}>
                          <Text
                            style={{
                              fontSize: Value.CONSTANT_VALUE_13,
                              fontFamily: Fonts.OpenSansBold,
                              color:
                                validatePassword(value, msg.type, isPressed) ||
                                validatePassword(value, msg.type, isPressed) ===
                                  null
                                  ? Colors.BLACK
                                  : Colors.RED,
                            }}>
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
                  name={FormKey.set_password}
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <FloatingLabelInput
                      label={Strings.profile.confirmPassword}
                      value={value}
                      onChangeText={v => {
                        onChange(v.trim());
                        setPressed(false);
                      }}
                      required={true}
                      secureTextEntry={true}
                      inputRef={inputRef}
                      containerStyle={{marginBottom: Value.CONSTANT_VALUE_40}}
                      error={errors && errors.confirm_password?.message}
                    />
                  )}
                  name={FormKey.confirm_password}
                />
                <View style={[styles.tmc]}>
                  <View style={styles.rowContainer}>
                    {check ? (
                      <Pressable
                        onPress={() => {
                          setCheck(cur => !cur);
                        }}>
                        <Image source={Images.rectangleCopy} />
                      </Pressable>
                    ) : (
                      <Pressable
                        onPress={() => {
                          setCheck(cur => !cur);
                        }}>
                        <Image source={Images.iconCheck} />
                      </Pressable>
                    )}
                  </View>
                  <View>
                    <Text style={styles.tmc1}>
                      {Strings.profile.tmc1}
                      <Text
                        style={styles.tmcLink1}
                        onPress={() => openWebView(TERMS_OF_USE_URL)}>
                        {Strings.Subscription.TermsServices}
                      </Text>{' '}
                      and{' '}
                      <Text
                        style={styles.tmcLink1}
                        onPress={() => openWebView(PRIVACY_URL)}>
                        {Strings.profile.tmc3}
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.BtnContainer}>
                <Button
                  disabled={register_user_loading || register_user_success}
                  label={Strings.profile.Register}
                  style={styles.Btn}
                  onPress={onPressSubmit}
                />
              </View>
              <Pressable
                onPress={() => {
                  navigation.navigate(Routes.SmRegister, {isRouteData});
                }}>
                <Text style={styles.smRegister}>
                  {Strings.profile.RegisterAs}
                </Text>
              </Pressable>
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
              <DateTimePickerModal
                value={date}
                isVisible={show}
                mode={'date'}
                date={datePicked ?? new Date()}
                onConfirm={selectedDate => {
                  setShow(false);
                  setValue(FormKey.date_of_birth, getDate(selectedDate));
                  setDate(getDate(selectedDate));
                  onDateChange(selectedDate);
                }}
                onCancel={() => {
                  setShow(false);
                }}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                positiveButtonLabel="DONE"
              />
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
                  navigation.navigate(Routes.Landing);
                }}
                onPressOff={() => {
                  setShowModal(false);
                }}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default React.memo(Profile);
