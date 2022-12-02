// Parent to Be Screen
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  ImageBackground,
  Modal,
  Platform,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import moment from 'moment';
import openCamera from '../../utils/openCamera';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  showAppToast,
  hideAppLoader,
  showAppLoader,
} from '../../redux/actions/loader';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Header, {CircleBtn} from '../../components/Header';
import Images from '../../constants/Images';
import globalStyle from '../../styles/global';
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
import FloatingLabelInput from '../../components/FloatingLabelInput';
import Colors from '../../constants/Colors';
import {Value} from '../../constants/FixedValues';
import Button from '../../components/Button';
import {parentRegisterSchema} from '../../constants/schemas';
import styles from './StylesProfile';
import Alignment from '../../constants/Alignment';
import {askCameraPermission} from '../../utils/permissionManager';
import {ptbRegister} from '../../redux/actions/Register';
import {deviceHandler} from '../../utils/commonFunction';
import ActionSheet from 'react-native-actionsheet';
import {BottomSheetComp} from '../../components';
import openWebView from '../../utils/openWebView';

const Profile = props => {
  const navigation = useNavigation();
  const loadingRef = useRef(false);
  const {
    params: {isRouteData},
  } = useRoute();
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
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(parentRegisterSchema),
  });

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
        dispatch(hideAppLoader());
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
        marginTop: Value.CONSTANT_VALUE_44,
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
          logoutScreen();
          navigation.navigate(Routes.Landing);
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
    if (!userImage) {
      dispatch(showAppToast(true, ValidationMessages.PICTURE_REQUIRE));
      return;
    }
    if (check) {
      dispatch(showAppToast(true, ValidationMessages.TERMS_OF_USE));
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
    dispatch(showAppLoader());
    dispatch(ptbRegister(reqData));
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
  return (
    <View style={styles.flex}>
      <Header end={true}>{headerComp()}</Header>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false}>
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
                      onChangeText={v => onChange(v)}
                      required={true}
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
                      onChangeText={v => onChange(v)}
                      fontWeight={Alignment.BOLD}
                      error={errors && errors.middle_name?.message}
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
                      onChangeText={v => onChange(v)}
                      fontWeight={Alignment.BOLD}
                      required={true}
                      error={errors && errors.last_name?.message}
                    />
                  )}
                  name={FormKey.last_name}
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <FloatingLabelInput
                      label={Strings.profile.EmailAddress}
                      value={value}
                      onChangeText={v => onChange(v)}
                      fontWeight={Alignment.BOLD}
                      required={true}
                      error={errors && errors.email?.message}
                    />
                  )}
                  name={FormKey.email}
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <FloatingLabelInput
                      label={Strings.profile.DateOfBirth}
                      value={value}
                      onChangeText={v => onChange(v)}
                      endComponentPress={() => setShow(true)}
                      error={errors && errors.date_of_birth?.message}
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
                  name={FormKey.date_of_birth}
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <View>
                      <FloatingLabelInput
                        label={Strings.profile.setPassword}
                        value={value}
                        onChangeText={v => onChange(v)}
                        required={true}
                        secureTextEntry={true}
                        containerStyle={{marginBottom: Value.CONSTANT_VALUE_10}}
                      />
                      {pwdErrMsg.map(msg => (
                        <View style={styles.passwordCheck} key={msg.type}>
                          <Text
                            style={{
                              fontSize: Value.CONSTANT_VALUE_13,
                              fontFamily: Fonts.OpenSansBold,
                              color:
                                validatePassword(value, msg.type) ||
                                validatePassword(value, msg.type) === null
                                  ? Colors.BLACK
                                  : Colors.RED,
                            }}>
                            {msg.msg}
                          </Text>
                          {validatePassword(value, msg.type) !== null && (
                            <Image
                              style={[
                                styles.ValidPwd,
                                {
                                  tintColor: validatePassword(value, msg.type)
                                    ? Colors.BLACK
                                    : Colors.RED,
                                },
                              ]}
                              source={
                                validatePassword(value, msg.type)
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
                      onChangeText={v => onChange(v)}
                      required={true}
                      secureTextEntry={true}
                      containerStyle={{marginBottom: Value.CONSTANT_VALUE_40}}
                      error={errors && errors.confirm_password?.message}
                    />
                  )}
                  name={FormKey.confirm_password}
                />
                <View style={styles.tmc}>
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
                      <TouchableOpacity
                        onPress={() => openWebView(TERMS_OF_USE_URL)}>
                        <Text style={styles.tmcLink1}>
                          {Strings.profile.tmc2}
                        </Text>
                      </TouchableOpacity>
                      {'\n'} and{' '}
                      <TouchableOpacity
                        onPress={() => openWebView(PRIVACY_URL)}>
                        <Text style={styles.tmcLink2}>
                          {Strings.profile.tmc3}
                        </Text>
                      </TouchableOpacity>
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.BtnContainer}>
                <Button
                  label={Strings.profile.Register}
                  style={styles.Btn}
                  onPress={handleSubmit(onSubmit)}
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
                onConfirm={selectedDate => {
                  setShow(false);
                  setValue(FormKey.date_of_birth, getDate(selectedDate));
                  setDate(getDate(selectedDate));
                }}
                onCancel={() => {
                  setShow(false);
                }}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                positiveButtonLabel="DONE"
              />
              <Modal
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                  setShowModal(!showModal);
                }}>
                <View style={[styles.centeredView]}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalHeader}>
                      {Strings.profile.ModalHeader}
                    </Text>
                    <Text style={styles.modalSubHeader}>
                      {Strings.profile.ModalSubheader}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setShowModal(false);
                        logoutScreen();
                        navigation.navigate(Routes.Landing);
                      }}>
                      <Text style={styles.modalOption1}>
                        {Strings.profile.ModalOption1}
                      </Text>
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
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Profile;
