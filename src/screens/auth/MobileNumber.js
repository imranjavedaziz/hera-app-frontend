// MobileNumber
import React, {useState, useEffect, useRef} from 'react';
import {View, Text, ScrollView, BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Button from '../../components/Button';
import Images from '../../constants/Images';
import Header, {CircleBtn} from '../../components/Header';
import Strings from '../../constants/Strings';
import {mobileSchema} from '../../constants/schemas';
import styles from '../../styles/auth/mobileNumberScreen';
import {mobileNumber} from '../../redux/actions/Auth';
import {useDispatch, useSelector} from 'react-redux';
import {ConstantsCode, Routes} from '../../constants/Constants';
import {InputLabel} from '../../components';
import {Value} from '../../constants/FixedValues';
import {Alignment, Colors} from '../../constants';
import {statusHide} from '../../utils/responsive';
import {empty} from '../../redux/actions/Chat';

const MobileNumber = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loadingRef = useRef(false);
  const [isRouteData, setIsRouteData] = useState();
  const {type} = route.params;

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
    register_user_success_data,
  } = useSelector(state => state.Auth);
  const handleBackButtonClick = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  // send otp res
  useEffect(() => {
    if (loadingRef.current && !mobile_number_loading) {
      if (mobile_number_success) {
        dispatch(empty());
        navigation.navigate(Routes.OTP, {
          isRouteData,
          type,
          register_user_success_data,
        });
      }
    }
    loadingRef.current = mobile_number_loading;
  }, [mobile_number_success, mobile_number_loading]);

  // send otp
  const onSubmit = data => {
    const payload = {
      country_code: ConstantsCode.Country_CODE,
      phone_no: data.phone,
      type,
    };
    setIsRouteData(payload);
    dispatch(mobileNumber(payload));
  };

  const headerComp = () => (
    <CircleBtn
      icon={Images.iconcross}
      Fixedstyle={{
        alignItems: Alignment.FLEXEND,
        marginRight: Value.CONSTANT_VALUE_20,
      }}
      onPress={navigation.goBack}
      accessibilityLabel="Cross Button, Go back"
    />
  );

  return (
    <View
      style={{
        flex: Value.CONSTANT_VALUE_1,
        backgroundColor: Colors.BACKGROUND,
      }}>
      <Header end={true}>{headerComp()}</Header>
      <ScrollView
        style={{flex: Value.CONSTANT_VALUE_1}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View
          style={{
            justifyContent: Alignment.FLEX_START,
          }}>
          <View
            style={{
              alignItems: Alignment.CENTER,
              justifyContent: Alignment.CENTER,
              marginTop: statusHide(Value.CONSTANT_VALUE_105),
            }}>
            <Text style={styles.screenTitle}>
              {type === 1
                ? Strings.mobile.AccountVerification
                : Strings.forgotPassword.forgot}
            </Text>
            <Text style={styles.mainTitle}>{Strings.forgotPassword.title}</Text>
          </View>
          <View style={styles.inputRow}>
            <InputLabel Code={true} label={Strings.mobile.Code} />
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <InputLabel
                  value={value}
                  number={true}
                  label={Strings.mobile.MobileNumber}
                  error={errors && errors.phone?.message}
                  onChangeText={v => {
                    onChange(v);
                  }}
                  maxLength={10}
                  keyboardType="number-pad"
                />
              )}
              name="phone"
            />
          </View>
        </View>
        <View
          style={{
            justifyContent: Alignment.FLEX_START,
            alignItems: Alignment.CENTER,
            marginTop: Value.CONSTANT_VALUE_48,
            marginBottom: Value.CONSTANT_VALUE_148,
          }}>
          <Button
            style={styles.Btn}
            label={Strings.mobile.SEND_VERIFY}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default MobileNumber;
