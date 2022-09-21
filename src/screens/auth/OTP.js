// OTP
import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View, Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
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
import { Routes } from '../../constants/Constants';
import {useDispatch} from 'react-redux';

const OTP = ({route}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const navigation = useNavigation();
  
  // const phoneNumber = route.params.phone_num.phone;
  const {
    handleSubmit,
    control,
    getValues,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(otpSchema),
  });

  const dispatch = useDispatch();


  const onSubmit = data => {
    // const code = getValues('otp')
    // console.log(phoneNumber);
    // console.log("my code ",code);

    // checkVerification(phoneNumber, code).then((json) => {
    //   console.log(json.message)
    //   if(json.message === "OTP verified sucessfully."){
    //     dispatch(showAppToast(false,"OTP verified sucessfully." ));
    //     navigation.navigate('Profile');
    //   }else{
    //     dispatch(showAppToast(true,json.message ));
    //   }
    // })
    
    navigation.navigate(Routes.Profile);
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
      onPress={navigation.goBack}
      accessibilityLabel="Left arrow Button, Press to go back"
    />
  );
  return (
    <Container
      scroller={true}
      showHeader={true}
      headerComp={headerComp}
      style={{marginHorizontal: 10}}>
      <View style={[globalStyle.mainContainer, {minHeight: height * 0.8}]}>
        <Text style={globalStyle.screenTitle}>{Strings.otp.title}</Text>
        <View
          style={{marginVertical: 20}}
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
            <Text style={{color: 'red'}}>{errors.otp?.message}</Text>
          )}
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <OtpInputs
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
            <Button label={Strings.otp.Btn} onPress={handleSubmit(onSubmit)} />
            <View style={styles.troubleRow}>
              <Text style={styles.trouble}>{Strings.otp.Trouble}</Text>
              <TouchableOpacity>
                <Text style={styles.resend}>{Strings.otp.SendAgain}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};
export default OTP;
