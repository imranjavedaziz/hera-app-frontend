// Login
import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch, useSelector} from 'react-redux';
import Images from '../../constants/Images';
import Header, {CircleBtn} from '../../components/Header';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import Button from '../../components/Button';
import styles from '../../styles/auth/loginScreen';
import Strings from '../../constants/Strings';
import {hideAppLoader, showAppLoader} from '../../redux/actions/loader';
import {loginSchema} from '../../constants/schemas';
import {deviceRegister, logIn} from '../../redux/actions/Auth';
import getRoute from '../../utils/getRoute';
import {deviceHandler} from '../../utils/commonFunction';
import {ConstantsCode, Routes} from '../../constants/Constants';
import {Alignment} from '../../constants';
import {NotificationContext} from '../../context/NotificationContextManager';
import normalizeInput from '../../utils/normalizeInput';
import {getSubscriptionStatus} from '../../redux/actions/Subsctiption';
import {InputLabel} from '../../components';

const type = 2;
const Login = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loadingRef = useRef(false);
  const [show, setShow] = useState(false);
  const [payloadData, setPayloadData] = useState('');
  const [phone, setPhone] = useState('');
  const {fcmToken, Device_ID} = useContext(NotificationContext);
  const {
    handleSubmit,
    control,
    setValue,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const {log_in_success, log_in_loading, log_in_error_msg, log_in_data} =
    useSelector(state => state.Auth);
  useEffect(() => {
    deviceHandler(props.navigation, 'exit');
  }, [props.navigation]);

  useEffect(() => {
    if (loadingRef.current && !log_in_loading) {
      dispatch(showAppLoader());
      if (log_in_success) {
        const _deviceInfo = {
          device_id: Device_ID,
          device_token: fcmToken,
          device_type: Platform.OS,
        };
        dispatch(deviceRegister(_deviceInfo));
        dispatch(hideAppLoader());
        dispatch(getSubscriptionStatus());
        navigation.reset({
          index: 0,
          routes: [
            {
              name: getRoute(
                log_in_data.access_token,
                log_in_data.role_id,
                log_in_data.registration_step,
              ),
              params: {payloadData},
            },
          ],
        });
      }
      if (log_in_error_msg) {
        dispatch(hideAppLoader());
      }
    }
    loadingRef.current = log_in_loading;
  }, [log_in_success, log_in_loading]);
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconcross}
      onPress={navigation.goBack}
      accessibilityLabel="Cross Button, Go back"
      style={styles.headerIcon}
    />
  );
  const onSubmit = data => {
    const payload = {
      country_code: ConstantsCode.Country_CODE,
      phone_no: data.phone,
      password: data.password,
    };
    dispatch(showAppLoader());
    setPayloadData(payload);
    dispatch(logIn(payload));
  };

  const handelChange = async value => {
    await setPhone(prevstate => normalizeInput(value, prevstate));
    let a = '';
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== ' ' && value[i] !== ')' && value[i] !== '(') {
        a = a + value[i];
      }
    }
    setValue('phone', a);
  };
  console.log('errors.password?.message', errors.password?.message);
  return (
    <View style={styles.flex}>
      <Header end={true}>{headerComp()}</Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <KeyboardAwareScrollView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.flex}
          keyboardShouldPersistTaps="handled">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.mainContainer}>
              <Image source={Images.LOGO} style={styles.logo} />
              <View style={styles.inputRow}>
                <InputLabel Code={true} label={Strings.mobile.Code} />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <InputLabel
                      value={phone}
                      number={true}
                      label={Strings.inqueryForm.MobileNumber}
                      onChangeText={v => {
                        handelChange(v);
                      }}
                      maxLength={14}
                      keyboardType="numeric"
                      error={errors && errors.phone?.message}
                      NumVal={value}
                    />
                  )}
                  name="phone"
                />
              </View>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <FloatingLabelInput
                    label={Strings.login.Password}
                    value={value}
                    onChangeText={v => onChange(v)}
                    secureTextEntry={!show}
                    minLength={8}
                    error={errors && errors.password?.message}
                    endComponent={() => (
                      <TouchableOpacity
                        onPress={() => setShow(!show)}
                        style={styles.psswrdInput}>
                        <Image
                          source={show ? Images.eye2 : Images.eye}
                          style={{
                            height: show ? 18 : 10,
                            width: show ? 18 : 15,
                          }}
                        />
                      </TouchableOpacity>
                    )}
                  />
                )}
                name="password"
              />
              <View style={{alignItems: Alignment.CENTER}}>
                <Button
                  label={Strings.login.LOG_IN}
                  style={styles.loginBtn}
                  onPress={handleSubmit(onSubmit)}
                />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(Routes.MobileNumber, {type})
                  }
                  style={styles.btnMargin}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={Strings.login.ForgotPassword}>
                  <Text style={styles.underlineBtn} accessible={false}>
                    {Strings.login.ForgotPassword}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </ScrollView>
    </View>
  );
};
export default Login;
