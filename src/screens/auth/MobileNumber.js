// MobileNumber
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Container from '../../components/Container';
import Button from '../../components/Button';
import Images from '../../constants/Images';
import {CircleBtn} from '../../components/Header';
import FloatingLabelInput from '../../components/inputs/FloatingLabelInput';
import globalStyle from '../../styles/global';
import Strings from '../../constants/Strings';
import {mobileSchema} from '../../constants/schemas';
import Colors from '../../constants/Colors';
import { sendSmsVerification } from "../../hooks/verifyOTP";
import debounce from 'lodash.debounce';
import login from '../../services/login';

const MobileNumber = () => {
  const navigation = useNavigation();
  const {
    handleSubmit,
    getValues,
    control,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(mobileSchema),
  });
  const onSubmit = data => {
    // console.log(data);
    const ph = getValues('phone')
  // const co = +91
    sendSmsVerification(ph).then((sent) => {
      navigation.navigate("OTP",{
        phone_num: data

      // }).catch((error)=>{

      });
    });
  };
  const text = getValues('phone');

  // const signup = React.useCallback(
    
  //   debounce(async ()=>{
  //     // console.log(text);
  //     login(
  //       route.params.type,
  //       text,
  //       selectedCountry,
  //       setLoading,
  //       setMobileValidation
  //     ).then((data)=>{
  //       navigation.navigate(OTP,{
  //         phone_number:text,
  //         country_code: selectedCountry.county_code,
  //         type: route.params.type,
  //         otp:data.otp
  //       });
  //     });
  //   },500),[text]
  // );





  const headerComp = () => (
    <CircleBtn
      icon={Images.iconcross}
      onPress={navigation.goBack}
      accessibilityLabel="Cross Button, Go back"
    />
  );
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
          {Strings.mobile.AccountVerification}
        </Text>
        <View
          style={{marginVertical: 20}}
          accessible={true}
          accessibilityLabel={`${Strings.mobile.BeforProceed} ${Strings.mobile.VerifyNumber}`}>
          <Text
            style={globalStyle.screenSubTitle}
            numberOfLines={2}
            accessible={false}>
            {Strings.mobile.BeforProceed}
          </Text>
          <Text
            style={globalStyle.screenSubTitle}
            accessible={false}
            numberOfLines={1}>
            {Strings.mobile.VerifyNumber}
          </Text>
        </View>
        <View
          style={{
            flex: 0,
            width: '100%',
            flexDirection: 'row',
          }}>
          <FloatingLabelInput
            label={Strings.mobile.Code}
            value="+1"
            disabled={true}
            editable={false}
            containerStyle={{
              width: 50,
              marginRight: 20,
            }}
            inputStyle={{
              color: Colors.BORDER_LINE,
            }}
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.mobile.MobileNumber}
                value={value}
                onChangeText={v => onChange(v)}
                keyboardType="number-pad"
                maxLength={10}
                error={errors && errors.phone?.message}
                containerStyle={{
                  flex: 1,
                }}
                fixed={true}
              />
            )}
            name="phone"
          />
        </View>
        <Button
          label={Strings.mobile.VERIFY}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </Container>
  );
};
export default MobileNumber;
