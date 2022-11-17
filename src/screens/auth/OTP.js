// OTP
import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Container from '../../components/Container';
import Button from '../../components/Button';
import Images from '../../constants/Images';
import {CircleBtn} from '../../components/Header';
import globalStyle from '../../styles/global';
import Strings from '../../constants/Strings';
import OtpInputs from '../../components/OtpInputs';
import {otpSchema} from '../../constants/schemas';
import {height} from '../../utils/responsive';
import styles from '../../styles/auth/otpScreen';
import {verifyOtp} from '../../redux/actions/Auth';
import {useDispatch, useSelector} from 'react-redux';

import {hideAppLoader, showAppLoader} from '../../redux/actions/loader';
import {Routes} from '../../constants/Constants';

const OTP = ({route}) => {
  const dispatch = useDispatch();
  const loadingRef = useRef(false);
  const {
    params: {isRouteData},
  } = useRoute();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    formState: {errors, isValid},
    clearErrors,
  } = useForm({
    resolver: yupResolver(otpSchema),
  });

  const {verify_otp_success, verify_otp_loading, verify_otp_error_msg} =
    useSelector(state => state.Auth);
  // send otp res
  useEffect(() => {
    if (loadingRef.current && !verify_otp_loading) {
      dispatch(showAppLoader());
      if (verify_otp_success) {
        dispatch(hideAppLoader());
        navigation.navigate(Routes.Profile, {isRouteData});
      }
      if (verify_otp_error_msg) {
        dispatch(hideAppLoader());
      }
    }
    loadingRef.current = verify_otp_loading;
  }, [
    verify_otp_success,
    verify_otp_loading,
    dispatch,
    isRouteData,
    navigation,
    verify_otp_error_msg,
  ]);
  const onSubmit = data => {
    const payload = {
      country_code: isRouteData.country_code,
      phone_no: isRouteData.phone_no,
      otp: data.otp,
    };
    dispatch(showAppLoader());
    dispatch(verifyOtp(payload));
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconBack}
      Fixedstyle={styles.leftIcon}
      onPress={navigation.goBack}
      accessibilityLabel="Left arrow Button, Press to go back"
    />
  );
  return (
    <Container
      scroller={true}
      showHeader={true}
      headerComp={headerComp}
      style={styles.marginStyle}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[globalStyle.mainContainer, {minHeight: height * 0.8}]}>
            <Text style={globalStyle.screenTitle}>{Strings.otp.title}</Text>
            <View
              style={{}}
              accessible={true}
              accessibilityLabel={`${Strings.mobile.BeforProceed} ${Strings.mobile.VerifyNumber}`}>
              <Text
                style={globalStyle.screenSubTitle}
                numberOfLines={2}
                accessible={false}>
                {Strings.otp.subtitle1}
              </Text>
              <Text
                style={globalStyle.screenSubTitle}
                accessible={false}
                numberOfLines={1}>
                {Strings.otp.subtitle2}
              </Text>
            </View>
            <View style={styles.errMsg}>
              {!isValid && errors.otp?.message && (
                <Text style={styles.redColor}>{errors.otp?.message}</Text>
              )}
              <Controller
                control={control}
                render={({field: {onChange, value, onBlur}}) => (
                  <OtpInputs
                    onBlur={() => clearErrors()}
                    value={value}
                    onChange={onChange}
                    isValid={errors.otp === undefined}
                  />
                )}
                name="otp"
              />
              <View
                style={{
                  position: isKeyboardVisible ? 'relative' : 'absolute',
                  bottom: 0,
                  marginTop: 20,
                }}>
                <Button
                  label={Strings.otp.Btn}
                  onPress={handleSubmit(onSubmit)}
                />
                <View
                  style={
                    isKeyboardVisible ? styles.troubleKeyRow : styles.troubleRow
                  }>
                  <Text style={styles.trouble}>{Strings.otp.Trouble}</Text>
                  <TouchableOpacity>
                    <Text style={styles.resend}>{Strings.otp.SendAgain}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Container>
  );
};
export default OTP;
