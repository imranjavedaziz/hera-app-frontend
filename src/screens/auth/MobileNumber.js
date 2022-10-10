// MobileNumber
import React, {useState, useEffect} from 'react';
import {View, Text, Keyboard} from 'react-native';
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
import styles from '../../styles/auth/mobileNumberScreen';
import Auth from '../../services/Auth';
import {Fonts} from '../../constants/Constants';

const MobileNumber = () => {
  const navigation = useNavigation();
  const authService = Auth();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const {
    handleSubmit,
    control,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(mobileSchema),
  });
  const onSubmit = data => {
    console.log('register', data);
    authService.sendOtp({
      country_code: '+91',
      phone_no: data.phone,
    });
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
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
          style={{marginVertical: 8, flex: 1}}
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
        <View style={styles.inputRow}>
          <FloatingLabelInput
            label={Strings.mobile.Code}
            value="+1"
            disabled={true}
            editable={false}
            containerStyle={styles.contryCodeContainer}
            inputStyle={styles.countryCodeInput}
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
        <View
          style={
            isKeyboardVisible === true ? {marginTop: 44} : {marginTop: 280}
          }>
          <Button
            style={styles.Btn}
            label={Strings.mobile.VERIFY}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </Container>
  );
};
export default MobileNumber;
