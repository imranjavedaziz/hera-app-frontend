// Login
import React, {useState, useEffect, useRef} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch, useSelector} from 'react-redux';
import Container from '../../components/Container';
import Images from '../../constants/Images';
import {CircleBtn} from '../../components/Header';
import FloatingLabelInput from '../../components/inputs/FloatingLabelInput';
import Button from '../../components/Button';
import styles from '../../styles/auth/loginScreen';
import globalStyle from '../../styles/global';
import Strings from '../../constants/Strings';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
} from '../../redux/actions/loader';
import {loginSchema} from '../../constants/schemas';
import {logIn, setUser} from '../../redux/actions/Auth';
import getRoute from '../../utils/getRoute';
const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loadingRef = useRef(false);
  const [show, setShow] = useState(false);
  const [payloadData, setPayloadData] = useState('');
  const {
    handleSubmit,
    control,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const {log_in_success, log_in_loading, log_in_error_msg, log_in_data} =
    useSelector(state => state.Auth);
  useEffect(() => {
    if (!isValid) {
      const e = errors;
      const messages = [];
      Object.keys(errors).forEach(k => messages.push(e[k].message || ''));
      const msg = messages.join('\n').trim();
      if (msg) {
        dispatch(showAppToast(false, msg));
      }
    }
  }, [errors, isValid]);
  useEffect(() => {
    if (loadingRef.current && !log_in_loading) {
      dispatch(showAppLoader());
      if (log_in_success) {
        dispatch(hideAppLoader());
        navigation.navigate(
          getRoute(
            log_in_data.data.data.access_token,
            log_in_data.data.data.role_id,
            log_in_data.data.data.registration_step,
          ),
          payloadData,
        );
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
    />
  );
  const onSubmit = data => {
    const payload = {
      country_code: '+91',
      phone_no: data.phone,
      password: data.password,
    };
    setPayloadData(payload);
    dispatch(logIn(payload));
  };
  return (
    <Container
      scroller={true}
      showHeader={true}
      headerComp={headerComp}
      headerEnd={true}>
      <View style={globalStyle.mainContainer}>
        <Image source={Images.LOGO} style={styles.logo} />
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <FloatingLabelInput
              label={Strings.login.MobileNumber}
              value={value}
              onChangeText={v => onChange(v)}
              keyboardType="number-pad"
              maxLength={10}
              error={errors && errors.phone?.message}
              // required={true}
            />
          )}
          name="phone"
        />
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
                <TouchableOpacity onPress={() => setShow(!show)}>
                  <Image source={show ? Images.eye2 : Images.eye} />
                </TouchableOpacity>
              )}
            />
          )}
          name="password"
        />
        <Button
          label={Strings.login.LOG_IN}
          style={styles.loginBtn}
          onPress={handleSubmit(onSubmit)}
        />
        <TouchableOpacity
          style={styles.btnMargin}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={Strings.login.ForgotPassword}>
          <Text style={styles.underlineBtn} accessible={false}>
            {Strings.login.ForgotPassword}
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};
export default Login;
