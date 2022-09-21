// SmRegister
import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
  ImageBackground,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch} from 'react-redux';
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
import {smRoles,Routes} from '../../../constants/Constants';
import openCamera from '../../../utils/openCamera';
import {askCameraPermission} from '../../../utils/permissionManager';
import BottomSheetComp from '../../../components/BottomSheet';
import {showAppToast} from '../../../redux/actions/loader';
import styles from '../../../styles/auth/smdonor/registerScreen';

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
];
const validatePassword = (value, type) => {
  if (value) {
    switch (type) {
      case validationType.LEN:
        return value.length >= 8 ? Colors.BLACK : 'red';
      case validationType.ALPHA_NUM:
        return Regx.ALPHA.test(value) && Regx.NUM.test(value)
          ? Colors.BLACK
          : 'red';
      case validationType.SPECIAL:
        return Regx.SPECIAL_CHAR.test(value) ? Colors.BLACK : 'red';
      default:
        return Colors.BORDER_LINE;
    }
  }
  return Colors.BORDER_LINE;
};
const SmRegister = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [userImage, setUserImage] = useState('');
  const [check, setCheck] = useState(true);
  const {
    handleSubmit,
    control,
    formState: {errors, isValid},
    setValue,
  } = useForm({
    resolver: yupResolver(smRegisterSchema),
  });
  const cb = image => {
    setOpen(false);
    setUserImage(image.path);
  };
  useEffect(askCameraPermission, []);
  const onSubmit = data => {
    if (!userImage) {
      dispatch(showAppToast(true, ValidationMessages.PICTURE_REQUIRE));
      return;
    }
    if (check) {
      dispatch(showAppToast(true, ValidationMessages.TERMS_OF_USE));
      return;
    }
    navigation.navigate(Routes.SmBasicDetails, {...data, userImage});
  };
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconcross}
      onPress={navigation.goBack}
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
                onChangeText={v => onChange(v)}
                error={errors && errors.email?.message}
                required={true}
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
                  error={errors && errors.password?.message}
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
          />
          <Pressable
            onPress={() => {
              navigation.navigate(Routes.Profile);
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
