import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  ImageBackground,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import openCamera from '../../utils/openCamera';
import {useDispatch} from 'react-redux';
import {showAppToast} from '../../redux/actions/loader';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Container from '../../components/Container';
import {CircleBtn} from '../../components/Header';
import Images from '../../constants/Images';
import globalStyle from '../../styles/global';
import {Fonts, Routes} from '../../constants/Constants';
import Strings, {ValidationMessages} from '../../constants/Strings';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import Colors from '../../constants/Colors';
import {Value} from '../../constants/FixedValues';
import Button from '../../components/Button';
import {parentRegisterSchema, Regx} from '../../constants/schemas';
// import {askCameraPermission} from '../../utils/permissionManager';
import styles from './StylesProfile';
import Auth from '../../services/Auth';

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
        return value.length >= 8;
      case validationType.ALPHA_NUM:
        return Regx.ALPHA.test(value) && Regx.NUM.test(value);
      case validationType.SPECIAL:
        return Regx.SPECIAL_CHAR.test(value);
      default:
        break;
    }
  }
  return null;
};

const Profile = ({navigation,route}) => {
  const authService = Auth();
  const [show, setShow] = useState(false);
  const [eyeshow, setEyeShow] = useState(false);
  const [date, setDate] = useState();
  const [file,setFile] = useState(null);
  const [userImage, setUserImage] = useState('');
  const [check, setCheck] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    setValue,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(parentRegisterSchema),
  });

  const getDate = selectedDate => {
    let tempDate = selectedDate.toString().split(' ');
    return date !== '' ? ` ${tempDate[1]} ${tempDate[2]}, ${tempDate[3]}` : '';
  };

  // useEffect(askCameraPermission, []);

  useEffect(() => {
    if (!isValid) {
      const e = errors;
      const messages = [];
      Object.keys(errors).forEach(k => messages.push(e[k].message || ''));
      const msg = messages.join('\n').trim();
      if (msg) dispatch(showAppToast(true, msg));
    }
  }, [errors, isValid]);
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconcross}
      onPress={() => setShowModal(true)}
      accessibilityLabel="Cross Button, Go back"
    />
  );
  const cb = image => {
    console.log('image', image);
    setUserImage(image.path);
    setFile(image);
  };
  const onSubmit = data => {
    if (!userImage) {
      dispatch(showAppToast(true, ValidationMessages.PICTURE_REQUIRE));
      return;
    }
    if (check) {
      dispatch(showAppToast(true, ValidationMessages.TERMS_OF_USE));
      return;
    }
    const reqData = new FormData;
    reqData.append('role_id',2);
    reqData.append('first_name',data.first_name);
    reqData.append('middle_name',data.middle_name);
    reqData.append('last_name',data.last_name);
    reqData.append('dob',moment(date).format('DD-MM-YYYY'));
    reqData.append('email',data.email);
    reqData.append('password',data.password);
    reqData.append('country_code',route.params.country_code);
    reqData.append('phone_no',route.params.phone_no);
    reqData.append('file',{
      name: file.filename,
      type: file.mime,
      uri: file.path,
    });
    authService.registerUser(reqData);
    // navigation.navigate('SetPreference');
  };

  return (
    <Container
      scroller={true}
      showHeader={true}
      headerComp={headerComp}
      headerEnd={true}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <Text style={globalStyle.screenTitle}>
          {Strings.profile.makeAccountFor}
        </Text>
        <View
          style={{marginVertical: 15}}
          accessible={true}
          accessibilityLabel={`${Strings.profile.parentToBe}`}>
          <Text
            style={globalStyle.screenSubTitle}
            numberOfLines={2}
            accessible={false}>
            {Strings.profile.parentToBe}
          </Text>

          {/* IMage Upload */}

          <View
            style={{alignItems: 'flex-start', width: '100%', marginTop: 20}}>
            <ImageBackground
              source={userImage ? {uri: userImage} : null}
              style={styles.background}
              imageStyle={{
                borderRadius: 70,
                overflow: 'hidden',
                resizeMode: 'cover',
              }}>
              <TouchableOpacity
                style={[
                  styles.uploadBackground,
                  userImage
                    ? {
                        position: 'absolute',
                        bottom: 0,
                        right: 20,
                      }
                    : null,
                ]}
                onPress={() => openCamera(1, cb)}>
                <Image
                  source={Images.camera}
                  style={{width: 20, height: 20, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
        <Text style={styles.ImageText}>
          Upload Display Picture{' '}
          <Text style={[styles.label, {color: 'red'}]}>*</Text>
        </Text>

        {/* Image Upload End  */}

        <View
          style={{
            flex: 0,
            width: '100%',
          }}>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.profile.FirstName}
                value={value}
                onChangeText={v => onChange(v)}
                fontWeight={'bold'}
                required={true}
                error={errors && errors.first_name?.message}
                containerStyle={{
                  flex: 1,
                }}
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
                onChangeText={v => onChange(v)}
                fontWeight={'bold'}
                containerStyle={{
                  flex: 1,
                }}
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
                onChangeText={v => onChange(v)}
                fontWeight={'bold'}
                required={true}
                containerStyle={{
                  flex: 1,
                }}
                error={errors && errors.last_name?.message}
              />
            )}
            name="last_name"
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.profile.EmailAddress}
                value={value}
                onChangeText={v => onChange(v)}
                fontWeight={'bold'}
                required={true}
                error={errors && errors.email?.message}
                containerStyle={{
                  flex: 1,
                }}
              />
            )}
            name="email"
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
            name="date_of_birth"
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
                  label={Strings.profile.setPassword}
                  value={value}
                  onChangeText={v => onChange(v)}
                  required={true}
                  secureTextEntry={!eyeshow}
                  containerStyle={{
                    marginVertical: 0,
                    marginBottom: 5,
                  }}
                  error={errors && errors.set_password?.message}
                  endComponent={() => (
                    <TouchableOpacity onPress={() => setEyeShow(!eyeshow)}>
                      <Image source={eyeshow ? Images.eye : Images.eye2} />
                    </TouchableOpacity>
                  )}
                />
                {pwdErrMsg.map(msg => (
                  <View
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    key={msg.type}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: Fonts.OpenSansBold,
                        color:
                          validatePassword(value, msg.type) ||
                          validatePassword(value, msg.type) === null
                            ? Colors.BLACK
                            : 'red',
                      }}>
                      {msg.msg}
                    </Text>
                    {validatePassword(value, msg.type) !== null && (
                      <Image
                        style={{
                          tintColor: validatePassword(value, msg.type)
                            ? Colors.BLACK
                            : 'red',
                          marginLeft: 5,
                          maxWidth: 13,
                          resizeMode: 'contain',
                        }}
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
            name="set_password"
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
            name="confirm_password"
          />
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={{alignSelf: 'center'}}>
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

            <Text style={{fontSize: 13, marginLeft: 10}}>
              By continuing, you agree to HERA's{' '}
              <Text
                style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>
                Terms of use{'\n'}
              </Text>
              and{' '}
              <Text
                style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>
                Privacy Policy
              </Text>
            </Text>
          </View>
        </View>
<View style={{paddingTop:31,}}>
<Button 
          label={Strings.profile.Register}
          onPress={handleSubmit(onSubmit)}
        />
</View>
        
        <Pressable onPress={() => {navigation.navigate('SmRegister',route.params)}}>
          <Text
            style={{
              fontWeight: 'bold',
              alignSelf: 'center',
              textDecorationLine: 'underline',
              fontSize: 15,
              marginTop: 25,
            }}>
            Register as Surrogate Mother or a Donor
          </Text>
        </Pressable>
      </View>
      <DateTimePickerModal
        value={date}
        isVisible={show}
        mode={'date'}
        onConfirm={selectedDate => {
          setShow(false);
          setValue('date_of_birth', getDate(selectedDate));
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
        <View
          style={[styles.centeredView, {backgroundColor: 'rgba(0,0,0,0.3)'}]}>
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
    </Container>
  );
};

export default Profile;