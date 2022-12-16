// SmRegister
import React, {useRef, useState} from 'react';
import {Text, TouchableOpacity, View, Image, ScrollView} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Images from '../../../constants/Images';
import Header, {CircleBtn} from '../../../components/Header';
import globalStyle from '../../../styles/global';
import Strings from '../../../constants/Strings';
import {smRegisterSchema} from '../../../constants/schemas';
import Colors from '../../../constants/Colors';
import FloatingLabelInput from '../../../components/FloatingLabelInput';
<<<<<<< HEAD
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
=======
>>>>>>> e02f312e7c306daffa02950553263ffd05048da6
import styles from '../../../styles/auth/smdonor/registerScreen';
import {Value} from '../../../constants/FixedValues';

const SmRegister = () => {
<<<<<<< HEAD
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isPressed, setPressed] = useState(false);
  const loadingRef = useRef(false);
  const [show, setShow] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [userImage, setUserImage] = useState('');
  const [file, setFile] = useState(null);
=======
>>>>>>> e02f312e7c306daffa02950553263ffd05048da6
  const [check, setCheck] = useState(true);
  const inputRef = useRef(null);
  const {
    control,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(smRegisterSchema),
  });

  const headerComp = () => (
    <CircleBtn
      icon={Images.iconcross}
      accessibilityLabel="Left arrow Button, Press to go back"
      style={styles.headerIcon}
    />
  );
<<<<<<< HEAD
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
    debounce(handleSubmit(onSubmit), 1000)();
  };
  const CalenderOn = () => {
    inputRef.current.blur();
    setShow(true);
  };
=======
>>>>>>> e02f312e7c306daffa02950553263ffd05048da6
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
            <View style={styles.imgContainer}>
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
                  label={Strings.sm_register.LastName}
                  value={value}
                  onChangeText={v => {
                    onChange(v.trim());
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
<<<<<<< HEAD
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
=======
>>>>>>> e02f312e7c306daffa02950553263ffd05048da6
                  label={Strings.profile.EmailAddress}
                  value={value}
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
<<<<<<< HEAD
                <View style={styles.error}>
                  <FloatingLabelInput
                    label={Strings.sm_register.Password}
                    value={value}
                    onChangeText={v => {
                      onChange(v);
                      setPressed(false);
                    }}
                    required={true}
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
                            color:
                              validatePassword(value, msg.type, isPressed) ||
                              validatePassword(value, msg.type, isPressed) ===
                                null
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
=======
>>>>>>> e02f312e7c306daffa02950553263ffd05048da6
                <FloatingLabelInput
                  containerStyle={{marginTop: Value.CONSTANT_VALUE_10}}
                  label={Strings.sm_register.Confirm}
                  value={value}
                  onChangeText={v => {
                    onChange(v);
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
            </View>
            <View style={styles.starContainer}>
              <Text style={styles.starColor}>*</Text>
              <Text style={styles.descText}>{Strings.profile.desc}</Text>
            </View>
<<<<<<< HEAD
            <View style={styles.align}>
              <Button
                disabled={register_user_loading || register_user_success}
                label={Strings.sm_register.Btn}
                onPress={onPressSubmit}
                style={styles.Btn}
              />
            </View>
            <Pressable
              onPress={() => {
                navigation.navigate(Routes.Profile, {isRouteData});
              }}>
              <Text style={styles.parentBtn}>Register as Intended Parent</Text>
            </Pressable>
=======
>>>>>>> e02f312e7c306daffa02950553263ffd05048da6
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default React.memo(SmRegister);
