// MobileNumber
import React, {useState, useEffect, useRef} from 'react';
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
import styles from '../../styles/auth/mobileNumberScreen';
import {mobileNumber} from '../../redux/actions/Auth';
import {useDispatch, useSelector} from 'react-redux';
import {hideAppLoader, showAppLoader} from '../../redux/actions/loader';
import {Routes} from '../../constants/Constants';

const MobileNumber = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loadingRef = useRef(false);
  const [isRouteData, setIsRouteData] = useState();
  const {
    handleSubmit,
    control,
    formState: {errors},
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
      country_code: '+91',
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
        <View style={{marginTop: 280}}>
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
