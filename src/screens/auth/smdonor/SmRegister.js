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
} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {yupResolver} from '@hookform/resolvers/yup';
import Container from '../../../components/Container';
import Button from '../../../components/Button';
import Images from '../../../constants/Images';
import {CircleBtn} from '../../../components/Header';
import globalStyle from '../../../styles/global';
import Strings, {ValidationMessages} from '../../../constants/Strings';
import {smRegisterSchema, Regx} from '../../../constants/schemas';
import Colors from '../../../constants/Colors';
import FloatingLabelInput from '../../../components/inputs/FloatingLabelInput';
import {smRoles, Routes} from '../../../constants/Constants';
import openCamera from '../../../utils/openCamera';
import {askCameraPermission} from '../../../utils/permissionManager';
import BottomSheetComp from '../../../components/BottomSheet';
import {showAppToast} from '../../../redux/actions/loader';
import styles from '../../../styles/auth/smdonor/registerScreen';
import Auth from '../../../services/Auth';
import {Value} from '../../../constants/FixedValues';
import {hideAppLoader, showAppLoader} from '../../../redux/actions/loader';
import {ptbRegister} from '../../../redux/actions/Register';

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
        return value.length >= 8 ? Colors.BLACK : 'red';
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
  const authService = Auth();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loadingRef = useRef(false);
  const [show, setShow] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [userImage, setUserImage] = useState('');
  const [file, setFile] = useState(null);
  const [check, setCheck] = useState(true);
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
  console.log('isRoute', isRouteData);
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
        navigation.navigate(Routes.SmBasicDetails);
      }
      if (register_user_error_msg) {
        dispatch(hideAppLoader());
      }
    }
    loadingRef.current = register_user_loading;
  }, [register_user_success, register_user_loading]);

  useEffect(() => {
    askCameraPermission;
    if (!isValid) {
      const e = errors.role;
      if (e) dispatch(showAppToast(true, e.message));
    }
  }, [errors, isValid]);
  const onSubmit = data => {
    console.log(data);
    console.log('FILE', file);
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
    reqData.append('middle_name', data.middle_name);
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
    console.log('reqData---->', reqData);
    dispatch(showAppLoader());
    dispatch(ptbRegister(reqData));
    // authService.registerUser(reqData);
  };
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconcross}
      onPress={() => navigation.navigate(Routes.Profile)}
      accessibilityLabel="Left arrow Button, Press to go back"
    />
  );

  return (
    <>
      <Container
        scroller={true}
        showHeader={true}
        headerEnd={true}
        headerComp={headerComp}>
        <View style={globalStyle.mainContainer}>
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
                    onPress={() => onChange(role.id)}>
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
            <TouchableOpacity onPress={() => setOpen(true)}>
              <ImageBackground
                source={userImage ? {uri: userImage} : null}
                style={styles.imgView}
                imageStyle={styles.img}>
                <TouchableOpacity
                  style={[
                    styles.camBtn,
                    userImage ? styles.camSelectedBtn : null,
                  ]}
                  onPress={() => setOpen(true)}>
                  <Image source={Images.camera} style={styles.camImg} />
                </TouchableOpacity>
              </ImageBackground>
            </TouchableOpacity>
            <View style={{marginVertical: Value.CONSTANT_VALUE_10}}>
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
                required={true}
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
                label={Strings.sm_register.email}
                value={value}
                onChangeText={v => onChange(v.toLowerCase())}
                error={errors && errors.email?.message}
                required={true}
                spellCheck={false}
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <View
                style={{
                  width: '100%',
                  marginVertical: 20,
                }}>
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
            <Text style={styles.checkboxLabel}>
              By continuing, you agree to HERA's{' '}
              <Text style={styles.checkboxTitle}>Terms of use </Text>
              and <Text style={styles.checkboxTitle}>Privacy Policy</Text>
            </Text>
          </View>
          <Button
            label={Strings.sm_register.Btn}
            onPress={handleSubmit(onSubmit)}
            style={styles.Btn}
          />
          <Pressable
            onPress={() => {
              navigation.navigate(Routes.Profile, route.params);
            }}>
            <Text style={styles.parentBtn}>Register as Parent To Be</Text>
          </Pressable>
        </View>
      </Container>
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
        }}
        onCancel={() => {
          setShow(false);
        }}
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        positiveButtonLabel="DONE"
      />
    </>
  );
};
export default SmRegister;
