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
import FloatingLabelInput from '../../components/FloatingLabelInput';
import globalStyle from '../../styles/global';
import Strings from '../../constants/Strings';
import {mobileSchema} from '../../constants/schemas';

const MobileNumber = () => {
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(mobileSchema),
  });
  const onSubmit = data => {
    console.log(data);
    navigation.navigate("OTP");
  };
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
            containerStyle={{
              width: 60,
              marginRight: 20,
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
