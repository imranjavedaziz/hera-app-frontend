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
import Container from '../../components/Container';
import {CircleBtn} from '../../components/Header';
import Images from '../../constants/Images';
import globalStyle from '../../styles/global';
import {
  Fonts,
  FormKey,
  pwdErrMsg,
  Routes,
  validatePassword,
} from '../../constants/Constants';
import Strings, {ValidationMessages} from '../../constants/Strings';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import Colors from '../../constants/Colors';
import {Value} from '../../constants/FixedValues';
import Button from '../../components/Button';
import {parentRegisterSchema} from '../../constants/schemas';
import styles from './StylesProfile';
import Alignment from '../../constants/Alignment';
import BottomSheetComp from '../../components/BottomSheet';
import {askCameraPermission} from '../../utils/permissionManager';
import {ptbRegister} from '../../redux/actions/Register';
import {logOut} from '../../redux/actions/Auth';

const Profile = ({route}) => {
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
    return date !== '' ? ` ${tempDate[1]} ${tempDate[2]}, ${tempDate[3]}` : '';
  };
  // Header Component
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconcross}
      onPress={() => setShowModal(true)}
      accessibilityLabel={Strings.PTB_Profile.Cross_Button}
    />
  );

  const logoutScreen = () => {
    dispatch(logOut());
    navigation.navigate(Routes.Landing);
  };
  const cb = image => {
    setOpen(false);
    setUserImage(image.path);
    setFile(image);
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
    reqData.append(FormKey.middle_name, data.middle_name);
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
    askCameraPermission();
    return navigation.addListener('focus', () => {
      reset();
    });
  }, [navigation, reset]);
  return (
    <>
      <Container
        scroller={true}
        showHeader={true}
        headerComp={headerComp}
        headerEnd={true}
        style={{paddingBottom: Value.CONSTANT_VALUE_70}}>
        <View style={styles.imgContainer}>
          <Text style={globalStyle.screenTitle}>
            {Strings.profile.makeAccountFor}
          </Text>
          <View
            style={styles.subTitle}
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
              <TouchableOpacity onPress={() => setOpen(true)}>
                <ImageBackground
                  source={userImage ? {uri: userImage} : null}
                  style={styles.background}
                  imageStyle={styles.imgBack}>
                  <TouchableOpacity
                    style={[
                      styles.uploadBackground,
                      userImage ? styles.userImg : null,
                    ]}
                    onPress={() => setOpen(true)}>
                    <Image source={Images.camera} style={styles.profileImg} />
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
                onChangeText={v => onChange(v.toLowerCase())}
                fontWeight={Alignment.BOLD}
                required={true}
                autoCapitalize="none"
                spellCheck={false}
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
                error={errors && errors.date_of_birth?.message}
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
            name={FormKey.date_of_birth}
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <View style={styles.fullWidth}>
                <FloatingLabelInput
                  label={Strings.profile.setPassword}
                  value={value}
                  onChangeText={v => onChange(v)}
                  required={true}
                  secureTextEntry={true}
                  containerStyle={{
                    marginBottom: Value.CONSTANT_VALUE_5,
                  }}
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
                error={errors && errors.confirm_password?.message}
                containerStyle={{
                  flex: 1,
                }}
              />
            )}
            name={FormKey.confirm_password}
          />
          <View style={styles.tmc}>
            <View style={{alignSelf: Alignment.CENTER}}>
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
            <View style={{marginLeft: Value.CONSTANT_VALUE_5}}>
              <Text style={styles.tmc1}>
                {Strings.profile.tmc1}
                <Text style={styles.tmcLink}>{Strings.profile.tmc2}</Text>
                {'\n'}and{' '}
                <Text style={styles.tmcLink}>{Strings.profile.tmc3}</Text>
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
          <Text style={styles.smRegister}>{Strings.profile.RegisterAs}</Text>
        </Pressable>
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
      </Container>
    </>
  );
};

export default Profile;
