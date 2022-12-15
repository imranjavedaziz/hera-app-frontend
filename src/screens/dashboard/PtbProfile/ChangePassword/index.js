import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Header, {CircleBtn} from '../../../../components/Header';
import styles from './style';
import {Colors, Images, Strings, Alignment} from '../../../../constants';
import {useNavigation, StackActions} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Value} from '../../../../constants/FixedValues';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  validatePassword,
  pwdErrMsg,
  Fonts,
  ConstantsCode,
} from '../../../../constants/Constants';
import {
  changePasswordSchema,
  forgetPasswordSchema,
} from '../../../../constants/schemas';
import {Button, FloatingLabelInput} from '../../../../components';
import User from '../../../../Api/User';
import {logIn} from '../../../../redux/actions/Auth';

const HeaderComp = ({type}) => {
  const navigation = useNavigation();
  if (type === 2) {
    return (
      <CircleBtn
        icon={Images.iconcross}
        Fixedstyle={{
          alignItems: Alignment.FLEXEND,
          marginRight: Value.CONSTANT_VALUE_20,
        }}
        onPress={() => {
          const popAction = StackActions.pop(Value.CONSTANT_VALUE_3);
          navigation.dispatch(popAction);
        }}
        accessibilityLabel="Cross Button, Go back"
      />
    );
  }
  return (
    <View>
      <TouchableOpacity onPress={navigation.goBack}>
        <Text style={styles.headerText}>{Strings.Subscription.Cancel}</Text>
      </TouchableOpacity>
    </View>
  );
};
const ChangePassword = ({route}) => {
  const navigation = useNavigation();
  const {type} = route.params;
  const dispatch = useDispatch();
  const [isLogin, setLogin] = useState(false);
  const [isPressed,setPressed] = useState(false);
  const {register_user_success_data, user, log_in_success, log_in_loading} =
    useSelector(state => state.Auth);
  const {changePassword, resetPassword} = User();
  const {
    control,
    handleSubmit,
    formState: {errors},
    clearErrors,
  } = useForm({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(
      type === 1 ? changePasswordSchema : forgetPasswordSchema,
    ),
  });
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (log_in_success && !log_in_loading && isLogin) {
      setLogin(false);
      navigation.goBack();
    }
  }, [log_in_success, log_in_loading, isLogin]);
  const onSubmit = data => {
    if (type === 1) {
      const login = () => {
        const payload = {
          country_code: ConstantsCode.Country_CODE,
          phone_no: user.phone_no,
          password: data.new_password,
        };
        dispatch(logIn(payload));
        setLogin(true);
      };
      changePassword(data, login);
    } else {
      const reqData = {
        password: data.new_password,
        confirm_password: data.confirm_password,
        user_id: register_user_success_data.data.data.id,
      };
      resetPassword(reqData);
    }
  };
  const onPressSubmit = ()=>{
    setPressed(true);
    handleSubmit(onSubmit)();
  }
  return (
    <View
      style={{
        flex: Value.CONSTANT_VALUE_1,
        backgroundColor: Colors.BACKGROUND,
      }}>
      <Header end={true}>
        <HeaderComp type={type} />
      </Header>
      <ScrollView
        showVerticalIndicatot={false}
        keyboardShouldPersistTaps="handled">
        <KeyboardAwareScrollView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.flex}
          keyboardShouldPersistTaps="handled">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.mainContainer}>
              <View style={styles.headingContainer}>
                <Text style={styles.changePassword}>
                  {type === 1
                    ? Strings.ChangePassword.CHANGE_PASSWORD
                    : Strings.forgotPassword.forgot}
                </Text>
              </View>
              <View style={styles.innerHeading}>
                <Text style={styles.setANew}>
                  {type === 1
                    ? Strings.ChangePassword.SET_A
                    : Strings.ChangePassword.SET_B}
                </Text>
              </View>
              <View style={styles.flex}>
                <View style={styles.innerView}>
                  <View style={styles.fullWidth}>
                    {type === 1 && (
                      <Controller
                        control={control}
                        render={({field: {onChange, value}}) => (
                          <FloatingLabelInput
                            label={Strings.ChangePassword.Current_Password}
                            value={value}
                            containerStyle={{
                              marginTop: Value.CONSTANT_VALUE_35,
                            }}
                            onChangeText={v => {
                              setPressed(false);
                              onChange(v);
                              clearErrors('current_password');
                            }}
                            required={true}
                            secureTextEntry={!show}
                            minLength={8}
                            error={errors && errors.current_password?.message}
                            endComponent={() => (
                              <TouchableOpacity
                                onPress={() => setShow(!show)}
                                style={styles.psswrdInput}>
                                <Image
                                  source={show ? Images.eye2 : Images.eye}
                                />
                              </TouchableOpacity>
                            )}
                          />
                        )}
                        name="current_password"
                      />
                    )}
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <View>
                          <FloatingLabelInput
                            label={Strings.ChangePassword.Set_New_Password}
                            value={value}
                            onChangeText={v => {
                              setPressed(false);
                              onChange(v);
                              clearErrors('new_password');
                            }}
                            required={true}
                            secureTextEntry={true}
                            containerStyle={{
                              marginBottom: Value.CONSTANT_VALUE_10,
                              marginTop: Value.CONSTANT_VALUE_30,
                            }}
                            error={errors && errors.new_password?.message}
                            hideErrorText={
                              errors?.new_password?.message === 'noError'
                            }
                          />
                          {pwdErrMsg.map(msg => (
                            <View style={styles.passwordCheck} key={msg.type}>
                              <Text
                                style={{
                                  fontSize: Value.CONSTANT_VALUE_13,
                                  fontFamily: Fonts.OpenSansBold,
                                  textAlignVertical: 'top',
                                  color:
                                    validatePassword(value, msg.type,isPressed) ||
                                    validatePassword(value, msg.type,isPressed) === null
                                      ? Colors.GRAY2
                                      : Colors.RED,
                                }}>
                                {msg.msg}
                              </Text>
                              {validatePassword(value, msg.type,isPressed) !== null && (
                                <Image
                                  style={[
                                    styles.ValidPwd,
                                    {
                                      tintColor: validatePassword(
                                        value,
                                        msg.type,
                                        isPressed
                                      )
                                        ? Colors.BLACK
                                        : Colors.RED,
                                    },
                                  ]}
                                  source={
                                    validatePassword(value, msg.type,isPressed)
                                      ? Images.path
                                      : Images.warning
                                  }
                                />
                              )}
                            </View>
                          ))}
                        </View>
                      )}
                      name="new_password"
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <FloatingLabelInput
                          label={Strings.ChangePassword.Confirm_Password}
                          value={value}
                          required={true}
                          containerStyle={{
                            marginTop: Value.CONSTANT_VALUE_29,
                          }}
                          onChangeText={v => {
                            setPressed(false);
                            onChange(v);
                            clearErrors('confirm_password');
                          }}
                          secureTextEntry={true}
                          minLength={8}
                          error={errors && errors.confirm_password?.message}
                        />
                      )}
                      name="confirm_password"
                    />
                  </View>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  label={Strings.preference.SaveNewPassword}
                  style={styles.Btn}
                  onPress={onPressSubmit}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </ScrollView>
    </View>
  );
};
export default React.memo(ChangePassword);
