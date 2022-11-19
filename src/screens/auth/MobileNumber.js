// MobileNumber
import React, {useState, useEffect, useRef} from 'react';
import {View, Text, ScrollView, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Container from '../../components/Container';
import Button from '../../components/Button';
import Images from '../../constants/Images';
import {CircleBtn} from '../../components/Header';
import FloatingLabelInput from '../../components/inputs/FloatingLabelInput';

import Strings from '../../constants/Strings';
import {mobileSchema} from '../../constants/schemas';
import styles from '../../styles/auth/mobileNumberScreen';
import {mobileNumber} from '../../redux/actions/Auth';
import {useDispatch, useSelector} from 'react-redux';
import {hideAppLoader, showAppLoader} from '../../redux/actions/loader';
import {ConstantsCode, Routes} from '../../constants/Constants';
import {InputLabel} from '../../components';

const MobileNumber = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loadingRef = useRef(false);
  const [isRouteData, setIsRouteData] = useState();
  const [phone, setPhone] = useState('');
  const {
    handleSubmit,
    control,
    formState: {errors},
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(mobileSchema),
  });
  const {
    mobile_number_success,
    mobile_number_loading,
    mobile_number_error_msg,
  } = useSelector(state => state.Auth);

  // send otp res
  useEffect(() => {
    if (loadingRef.current && !mobile_number_loading) {
      dispatch(showAppLoader());
      if (mobile_number_success) {
        dispatch(hideAppLoader());
        navigation.navigate(Routes.OTP, {isRouteData});
      }
      if (mobile_number_error_msg) {
        dispatch(hideAppLoader());
      }
    }
    loadingRef.current = mobile_number_loading;
  }, [mobile_number_success, mobile_number_loading]);

  // send otp
  const onSubmit = data => {
    const payload = {
      country_code: ConstantsCode.Country_CODE,
      phone_no: data.phone,
    };
    setIsRouteData(payload);
    dispatch(showAppLoader());
    dispatch(mobileNumber(payload));
  };

  const headerComp = () => (
    <CircleBtn
      icon={Images.iconcross}
      onPress={navigation.goBack}
      accessibilityLabel="Cross Button, Go back"
    />
  );
  const normalizeInput = (value, previousValue) => {
    console.log(value, previousValue);
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
    reset({phone: ''});

    await setPhone(prevstate => normalizeInput(value, prevstate));
    let a = '';
    for (var i = 0; i < value.length; i++) {
      if (value[i] !== ' ' && value[i] !== ')' && value[i] !== '(') {
        a = a + value[i];
      }
    }
    setValue('phone', a);
  };
  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <View
        style={{
          justifyContent: 'flex-start',
        }}>
        <CircleBtn
          icon={Images.iconcross}
          Fixedstyle={{marginTop: 54, alignItems: 'flex-end', marginRight: 20}}
          onPress={navigation.goBack}
          accessibilityLabel="Cross Button, Go back"
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 16,
          }}>
          <Text style={styles.screenTitle}>
            {Strings.mobile.AccountVerification}
          </Text>
          <Text style={styles.mainTitle}>{Strings.mobile.mainTitle}</Text>
        </View>
        <View style={styles.inputRow}>
          <InputLabel Code={true} label={Strings.mobile.Code} />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <InputLabel
                value={phone}
                number={true}
                label={Strings.mobile.MobileNumber}
                error={errors && errors.phone?.message}
                onChangeText={v => {
                  handelChange(v);
                }}
                maxLength={14}
                keyboardType="number-pad"
              />
            )}
            name="phone"
          />
        </View>
      </View>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: 48,
          marginBottom: 148,
        }}>
        <Button
          style={styles.Btn}
          label={Strings.mobile.VERIFY}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </ScrollView>
  );
};
export default MobileNumber;
