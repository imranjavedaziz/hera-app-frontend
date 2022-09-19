// OTP
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
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
import Colors from '../../constants/Colors';

const OTP = () => {
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(otpSchema),
  });
  const onSubmit = data => {
    console.log(data);
    navigation.navigate('Profile');
  };
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconBack}
      onPress={navigation.goBack}
      accessibilityLabel="Left arrow Button, Press to go back"
    />
  );
  return (
    <Container scroller={true} showHeader={true} headerComp={headerComp}>
      <View style={globalStyle.mainContainer}>
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
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginVertical: 20,
          }}>
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
        </View>
        <Button
          label={Strings.mobile.VERIFY}
          onPress={handleSubmit(onSubmit)}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 25,
              textAlignVertical: 'center',
              marginRight: 5,
              color: Colors.BLACK,
            }}>
            Trouble recieving code?
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 25,
                fontWeight: 'bold',
                textDecorationLine: 'underline',
                textAlignVertical: 'center',
                color: Colors.BLACK,
              }}>
              Send Again
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};
export default OTP;
