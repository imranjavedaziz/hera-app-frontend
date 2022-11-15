// Login
import React, {useState, useEffect, useRef} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
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
import Strings from '../../constants/Strings';
import {hideAppLoader, showAppLoader} from '../../redux/actions/loader';
import {loginSchema} from '../../constants/schemas';
import {logIn} from '../../redux/actions/Auth';
import getRoute from '../../utils/getRoute';
import {deviceHandler} from '../../utils/commonFunction';

const Login = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loadingRef = useRef(false);
  const [show, setShow] = useState(false);
  const [payloadData, setPayloadData] = useState('');
  const [phone, setPhone] = useState('');
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const {log_in_success, log_in_loading, log_in_error_msg, log_in_data} =
    useSelector(state => state.Auth);
  useEffect(() => {
    deviceHandler(props.navigation, 'goBack');
  }, [props.navigation]);

  useEffect(() => {
    if (loadingRef.current && !log_in_loading) {
      dispatch(showAppLoader());
      if (log_in_success) {
        dispatch(hideAppLoader());
        navigation.navigate(
          getRoute(
            log_in_data.access_token,
            log_in_data.role_id,
            log_in_data.registration_step,
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
      style={styles.headerIcon}
    />
  );
  const onSubmit = data => {
    const payload = {
      country_code: '+91',
      phone_no: data.phone,
      password: data.password,
    };
    dispatch(showAppLoader());
    setPayloadData(payload);
    dispatch(logIn(payload));
  };

  const normalizeInput = (value, previousValue) => {
    const deleting = previousValue && previousValue.length > value.length;
    if (deleting) {
      return value;
    }
    if (!value) {
      return value;
    }
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;
    if (!previousValue || value.length > previousValue.length) {
      if (cvLength < 4) {
        return currentValue;
      }
      if (cvLength < 7) {
        return `${currentValue.slice(0, 3)} ${currentValue.slice(3)}`;
      }
      return `${currentValue.slice(0, 3)} ${currentValue.slice(
        3,
        6,
      )} (${currentValue.slice(6, 10)})`;
    }
  };
  const handelChange = async value => {
    reset({phone: '', password: getValues('password')});
    await setPhone(prevstate => normalizeInput(value, prevstate));
    let a = '';
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== ' ' && value[i] !== ')' && value[i] !== '(') {
        a = a + value[i];
      }
    }
    setValue('phone', a);
  };
  return (
    <Container
      scroller={false}
      showHeader={true}
      fixedHeader={true}
      profileLoad={true}
      headerComp={headerComp}
      headerEnd={true}
      style={styles.margin}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <Image source={Images.LOGO} style={styles.logo} />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.login.MobileNumber}
                value={phone}
                onChangeText={v => {
                  handelChange(v);
                }}
                keyboardType="number-pad"
                maxLength={14}
                error={errors && errors.phone?.message}
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
                  <TouchableOpacity
                    onPress={() => setShow(!show)}
                    style={styles.psswrdInput}>
                    <Image
                      source={show ? Images.eye2 : Images.eye}
                      style={{height: show ? 18 : 9, width: show ? 18 : 15}}
                    />
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
      </ScrollView>
    </Container>
  );
};
export default Login;
