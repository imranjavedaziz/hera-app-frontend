// Parent to Be Screen
import React, {useState, useRef} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Header, {CircleBtn} from '../../components/Header';
import Images from '../../constants/Images';
import globalStyle from '../../styles/global';
import {FormKey} from '../../constants/Constants';
import Strings from '../../constants/Strings';
import {Value} from '../../constants/FixedValues';
import {parentRegisterSchema} from '../../constants/schemas';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import Colors from '../../constants/Colors';
import styles from './StylesProfile';
import ActionSheet from 'react-native-actionsheet';
import Alignment from '../../constants/Alignment';
import {BottomSheetComp} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Profile = props => {
  const [check, setCheck] = useState(true);
  const [isOpen, setOpen] = useState(false);
  let actionSheet = useRef();
  const inputRef = useRef(null);
  const {
    control,
<<<<<<< HEAD
    reset,
    setValue,
    clearErrors,
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
        dispatch(empty());
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
=======
    formState: {errors},
  } = useForm({resolver: yupResolver(parentRegisterSchema)});

>>>>>>> e02f312e7c306daffa02950553263ffd05048da6
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconcross}
      Fixedstyle={{
        marginRight: Value.CONSTANT_VALUE_20,
      }}
      accessibilityLabel={Strings.PTB_Profile.Cross_Button}
    />
  );
<<<<<<< HEAD
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
=======
>>>>>>> e02f312e7c306daffa02950553263ffd05048da6
  return (
    <View style={styles.flex}>
      <Header end={true}>{headerComp()}</Header>
      <KeyboardAwareScrollView style={styles.flex}>
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
                </View>
                <Text style={styles.ImageText}>
                  {Strings.profile.uploadImage}
                  <Text style={[styles.label, {color: Colors.RED}]}>*</Text>
                </Text>
              </View>
              <View style={styles.fullWidth}>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <FloatingLabelInput
                      label={Strings.profile.FirstName}
                      value={value}
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
<<<<<<< HEAD
                      label={Strings.profile.DateOfBirth}
                      value={value}
                      onChangeText={v => {
                        onChange(v);
                        setPressed(false);
                        clearErrors('date_of_birth');
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
=======
>>>>>>> e02f312e7c306daffa02950553263ffd05048da6
                      label={Strings.profile.EmailAddress}
                      value={value}
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
                        required={true}
                        secureTextEntry={true}
                        inputRef={inputRef}
                        containerStyle={{
                          marginBottom: Value.CONSTANT_VALUE_10,
                        }}
                      />
<<<<<<< HEAD
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
                                  ? Colors.GRAY2
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
=======
>>>>>>> e02f312e7c306daffa02950553263ffd05048da6
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
                </View>
              </View>
              <ActionSheet
                ref={actionSheet}
                destructiveButtonIndex={2}
                cancelButtonIndex={2}
              />
              <BottomSheetComp isOpen={isOpen} setOpen={setOpen}>
                <View style={styles.imgPickerContainer}>
                  <TouchableOpacity
                    style={[styles.pickerBtn, styles.pickerBtnBorder]}>
                    <Text style={styles.pickerBtnLabel}>
                      {Strings.sm_create_gallery.bottomSheetCamera}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.pickerBtn}>
                    <Text style={styles.pickerBtnLabel}>
                      {Strings.sm_create_gallery.bottomSheetGallery}
                    </Text>
                  </TouchableOpacity>
                </View>
              </BottomSheetComp>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default React.memo(Profile);
