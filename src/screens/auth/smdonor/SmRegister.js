// SmRegister
import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
  ImageBackground,
  Pressable,
  ScrollView,
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
import {smRegisterSchema, Regx} from '../../../constants/schemas';
import Colors from '../../../constants/Colors';
import FloatingLabelInput from '../../../components/FloatingLabelInput';
import {
  smRoles,
  Routes,
  PRIVACY_URL,
  TERMS_OF_USE_URL,
} from '../../../constants/Constants';
import openCamera from '../../../utils/openCamera';
import {askCameraPermission} from '../../../utils/permissionManager';
import styles from '../../../styles/auth/smdonor/registerScreen';
import {Value} from '../../../constants/FixedValues';
import updateRegStep, {updateLocalImg} from '../../../redux/actions/Auth';
import ActionSheet from 'react-native-actionsheet';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
} from '../../../redux/actions/loader';
import {ptbRegister} from '../../../redux/actions/Register';
import {BottomSheetComp} from '../../../components';
import openWebView from '../../../utils/openWebView';

const validationType = {
  LEN: 'LEN',
  ALPHA_NUM: 'ALPHA_NUM',
  SPECIAL: 'SPECIAL',
};
const pwdErrMsg = [
  {
    type: validationType.LEN,
    msg: ValidationMessages.PASSWORD_MIN,
  },
  {
    type: validationType.ALPHA_NUM,
    msg: ValidationMessages.ALPHA_NUM,
  },
  {
    type: validationType.SPECIAL,
    msg: ValidationMessages.SPECIAL_CHAR,
  },
  {type: validationType.CAPSLOCK, msg: ValidationMessages.CAPSLOCK},
];
const validatePassword = (value, type) => {
  if (value) {
    switch (type) {
      case validationType.LEN:
        return value.length >= 8 ? Colors.BLACK : Colors.RED;
      case validationType.ALPHA_NUM:
        return Regx.ALPHA_LOWER.test(value) &&
          Regx.ALPHA_CAP.test(value) &&
          Regx.NUM.test(value)
          ? Colors.BLACK
          : 'red';
      case validationType.SPECIAL:
        return Regx.SPECIAL_CHAR.test(value) ? Colors.BLACK : 'red';
      case validationType.CAPSLOCK:
        return Regx.ALPHA_CAP.test(value) ? Colors.BLACK : 'red';
      default:
        return Colors.BORDER_LINE;
    }
  }
  return Colors.BORDER_LINE;
};
const SmRegister = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loadingRef = useRef(false);
  const [show, setShow] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [userImage, setUserImage] = useState('');
  const [file, setFile] = useState(null);
  const [check, setCheck] = useState(true);
  const [threeOption, setThreeOption] = useState([]);
  const [datePicked, onDateChange] = useState();
  let actionSheet = useRef();
  const {
    handleSubmit,
    control,
    formState: {errors, isValid},
    setValue,
  } = useForm({
    resolver: yupResolver(smRegisterSchema),
  });
  const {
    params: {isRouteData},
  } = useRoute();
  const cb = image => {
    setOpen(false);
    setUserImage(image.path);
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
        dispatch(hideAppLoader());
        dispatch(updateRegStep());
        dispatch(updateLocalImg(file.path));
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
      dispatch(showAppToast(true, ValidationMessages.PICTURE_REQUIRE));
      return;
    }
    if (check) {
      dispatch(showAppToast(true, ValidationMessages.TERMS_OF_USE));
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
    dispatch(updateLocalImg(file.path));
  };
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconcross}
      onPress={() => navigation.navigate(Routes.Profile, {isRouteData})}
      accessibilityLabel="Left arrow Button, Press to go back"
      style={styles.headerIcon}
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

  return (
    <>
      <View
        style={{
          flex: Value.CONSTANT_VALUE_1,
          backgroundColor: Colors.BACKGROUND,
        }}>
        <Header end={true}>{headerComp()}</Header>
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
                  Platform.OS === 'ios' ? openIosSheet() : openAndroidSheet();
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
                  onChangeText={v => onChange(v)}
                  error={errors && errors.first_name?.message}
                  required={true}
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
                  onChangeText={v => onChange(v)}
                  error={errors && errors.middle_name?.message}
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
                  onChangeText={v => onChange(v)}
                  error={errors && errors.last_name?.message}
                  required={true}
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
                  onChangeText={v => onChange(v)}
                  error={errors && errors.dob?.message}
                  // error={(value || !isValid) && validateDateofBirth()}
                  required={true}
                  endComponentPress={() => setShow(true)}
                  endComponent={() => (
                    <TouchableOpacity onPress={() => setShow(true)}>
                      <Image source={Images.calendar} />
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
                <FloatingLabelInput
                  label={Strings.profile.EmailAddress}
                  value={value}
                  onChangeText={v => onChange(v)}
                  required={true}
                  error={errors && errors.email?.message}
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
                    onChangeText={v => onChange(v)}
                    required={true}
                    containerStyle={styles.pwdInputContainer}
                    secureTextEntry={true}
                  />
                  {pwdErrMsg.map(msg => (
                    <View style={styles.pwdErrContainer} key={msg.type}>
                      <Text
                        style={[
                          styles.pwdErrText,
                          {
                            color: validatePassword(value, msg.type),
                          },
                        ]}>
                        {msg.msg}
                      </Text>
                      {value && (
                        <Image
                          style={[
                            styles.pwdErrIcon,
                            {
                              tintColor: validatePassword(value, msg.type),
                            },
                          ]}
                          source={
                            validatePassword(value, msg.type) === Colors.BLACK
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
                  onChangeText={v => onChange(v)}
                  error={errors && errors.confirm_password?.message}
                  required={true}
                  secureTextEntry={true}
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
                    onPress={() => openWebView(TERMS_OF_USE_URL)}>
                    {Strings.profile.tmc2}
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
            <View style={styles.starContainer}>
              <Text style={styles.starColor}>*</Text>
              <Text style={styles.descText}>{Strings.profile.desc}</Text>
            </View>
            <View style={styles.align}>
              <Button
                label={Strings.sm_register.Btn}
                onPress={handleSubmit(onSubmit)}
                style={styles.Btn}
              />
            </View>
            <Pressable
              onPress={() => {
                navigation.navigate(Routes.Profile, {isRouteData});
              }}>
              <Text style={styles.parentBtn}>Register as Parent To Be</Text>
            </Pressable>
          </View>
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
        <View style={styles.imgPickerContainer}>
          <TouchableOpacity
            onPress={() => {
              openCamera(0, cb);
            }}
            style={[styles.pickerBtn, styles.pickerBtnBorder]}>
            <Text style={styles.pickerBtnLabel}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              openCamera(1, cb);
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
          setValue('dob', moment(selectedDate).format('MMM DD, YYYY'));
          setDate(selectedDate);
          onDateChange(selectedDate);
        }}
        date={datePicked ?? new Date()}
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
