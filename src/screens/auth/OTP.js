// OTP
import React, {useState, useEffect, useRef} from 'react';
import {Text, TouchableOpacity, View, Keyboard, ScrollView} from 'react-native';
import {useNavigation, useRoute, StackActions} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Images from '../../constants/Images';
import Header, {CircleBtn} from '../../components/Header';
import globalStyle from '../../styles/global';
import Strings from '../../constants/Strings';
import OtpInputs from '../../components/OtpInputs';
import {otpSchema} from '../../constants/schemas';
import {height, statusHide} from '../../utils/responsive';
import styles from '../../styles/auth/otpScreen';
import {verifyOtp, mobileNumber, resetMobile} from '../../redux/actions/Auth';
import {
  verifyEmail,
  sendVerificationMail,
} from '../../redux/actions/VerificationMail';
import {useDispatch, useSelector} from 'react-redux';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
} from '../../redux/actions/loader';
import {Routes} from '../../constants/Constants';
import {Value} from '../../constants/FixedValues';
import {Alignment, Colors} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ExtraBottomView from '../../components/ExtraBottomView';

const OTP = ({route}) => {
  const dispatch = useDispatch();
  const loadingRef = useRef(false);
  const {
    params: {isRouteData},
  } = useRoute();
  const type = route.params.type;
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
  let scrollRef = React.createRef();

  const {verify_otp_success, verify_otp_loading, verify_otp_error_msg} =
    useSelector(state => state.Auth);
  const {verify_mail_success, verify_mail_loading, verify_mail_error_msg} =
    useSelector(state => state.VerificationMail);
  const {
    mobile_number_success,
    mobile_number_loading,
    register_user_success_data,
  } = useSelector(state => state.Auth);
  const {
    send_verification_success,
    send_verification_loading,
    send_verification_error_msg,
    send_verification_res,
  } = useSelector(state => state.VerificationMail);
  // send otp res
  useEffect(() => {
    if (loadingRef.current && !verify_otp_loading) {
      dispatch(showAppLoader());
      if (verify_otp_success) {
        dispatch(hideAppLoader());
        navigation.navigate(
          type === 1 ? Routes.Profile : Routes.ChangePassword,
          {isRouteData, type},
        );
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
  useEffect(() => {
    if (loadingRef.current && !verify_mail_loading) {
      dispatch(showAppLoader());
      if (verify_mail_success) {
        dispatch(hideAppLoader());
        const popAction = StackActions.pop(Value.CONSTANT_VALUE_1);
        navigation.dispatch(popAction);
        dispatch(showAppToast(false, 'Email verified sucessfully.'));
      }
      if (verify_mail_error_msg) {
        dispatch(showAppToast(true, verify_mail_error_msg));
        dispatch(hideAppLoader());
      }
    }
    loadingRef.current = verify_mail_loading;
  }, [verify_mail_success, verify_mail_loading, verify_mail_error_msg]);
  useEffect(() => {
    if (loadingRef.current && !mobile_number_loading) {
      if (mobile_number_success) {
        dispatch(
          showAppToast(
            false,
            'Verification code has been sent successfully on your mobile number.',
          ),
        );
      }
    }
    loadingRef.current = mobile_number_loading;
  }, [
    mobile_number_success,
    mobile_number_loading,
    register_user_success_data,
  ]);
  useEffect(() => {
    if (loadingRef.current && !send_verification_loading) {
      dispatch(showAppLoader());
      if (send_verification_success) {
        dispatch(hideAppLoader());
        dispatch(showAppToast(false, send_verification_res.message));
      }
      if (send_verification_error_msg) {
        dispatch(hideAppLoader());
      }
    }
    loadingRef.current = send_verification_loading;
  }, [
    send_verification_success,
    send_verification_loading,
    send_verification_res,
    send_verification_error_msg,
  ]);
  const onSubmit = data => {
    if (data.otp.length < 6) {
      dispatch(
        showAppToast(
          true,
          'You have entered invalid verification code. Please enter a valid verification code & try again.',
        ),
      );
      return;
    }
    if (type === 1 || type === 2) {
      const payload = {
        country_code: isRouteData.country_code,
        phone_no: isRouteData.phone_no,
        otp: data.otp,
      };
      dispatch(showAppLoader());
      dispatch(verifyOtp(payload));
    } else {
      const payload = {code: data.otp};
      dispatch(showAppLoader());
      dispatch(verifyEmail(payload));
    }
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
  const BackHandler = () => {
    if (route?.params?.type === 3) {
      navigation.goBack();
    } else {
      dispatch(resetMobile());
      navigation.goBack();
    }
  };
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconBack}
      Fixedstyle={styles.leftIcon}
      onPress={() => BackHandler()}
      accessibilityLabel="Left arrow Button, Press to go back"
    />
  );
  const resendOTP = () => {
    if (type === 1 || type === 2) {
      const payload = {
        country_code: isRouteData.country_code,
        phone_no: isRouteData.phone_no,
        type,
      };
      dispatch(mobileNumber(payload));
    } else {
      dispatch(sendVerificationMail());
    }
  };
  const getScreenTitle = () => {
    if (type === 1) {
      return Strings.otp.title;
    } else if (type === 2) {
      return Strings.forgotPassword.forgot;
    }
    return Strings.otp.titleEmail;
  };
  return (
    <View
      style={{
        flex: Value.CONSTANT_VALUE_1,
        backgroundColor: Colors.BACKGROUND,
      }}>
      <Header end={false}>{headerComp()}</Header>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={20}
        enableAutoAutomaticScroll={true}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}>
        <View
          style={[
            globalStyle.mainContainer,
            {
              minHeight: height * 0.9,
              marginTop: statusHide(Value.CONSTANT_VALUE_105),
            },
          ]}>
          <Text style={globalStyle.screenTitle}>{getScreenTitle()}</Text>
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
              {type === 1 || type === 2
                ? Strings.otp.subtitle2
                : Strings.otp.subtitle3}
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
          </View>
          <View
            style={{
              flex: Value.CONSTANT_VALUE_1,
              alignItems: Alignment.CENTER,
              marginBottom: Value.CONSTANT_VALUE_40,
            }}>
            <View
              style={{
                position: isKeyboardVisible
                  ? Alignment.RELATIVE
                  : Alignment.ABSOLUTE,
                bottom: Value.CONSTANT_VALUE_0,
                marginTop: Value.CONSTANT_VALUE_35,
                justifyContent: Alignment.CENTER,
                alignItems: Alignment.CENTER,
              }}>
              <TouchableOpacity
                style={styles.btnTouch}
                onPress={handleSubmit(onSubmit)}>
                <Text style={styles.btn}>
                  {type === 3 ? Strings.otp.Btn3 : Strings.otp.Btn}
                </Text>
              </TouchableOpacity>
              <View
                style={
                  isKeyboardVisible ? styles.troubleRow : styles.troubleRowKey
                }>
                <Text style={styles.trouble}>{Strings.otp.Trouble}</Text>
                <TouchableOpacity onPress={resendOTP}>
                  <Text style={styles.resend}>{Strings.otp.SendAgain}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <ExtraBottomView />
      </KeyboardAwareScrollView>
    </View>
  );
};
export default React.memo(OTP);
