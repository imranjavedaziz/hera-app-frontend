import {View, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Container from '../../components/Container';
import {CircleBtn} from '../../components/Header';
import Images from '../../constants/Images';
import Styles from '../../styles/auth/smdonor/Support';
import {useNavigation} from '@react-navigation/native';
import Strings from '../../constants/Strings';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {inqueryFormSchema} from '../../constants/schemas';
import styles from '../../styles/auth/smdonor/basicDetailsScreen';
import FloatingLabelInput from '../../components/inputs/FloatingLabelInput';
import Dropdown from '../../components/inputs/Dropdown';
import Button from '../../components/Button';
import {FormKey} from '../../constants/Constants';
import {SupportForm, UserType} from '../../redux/actions/support';
import {useDispatch, useSelector} from 'react-redux';
import {
  showAppLoader,
  hideAppLoader,
  showAppToast,
} from '../../redux/actions/loader';

export default function Support() {
  const [userTypeData, setUserTypeData] = useState();
  const {
    handleSubmit,
    control,
    setValue,
    // reset,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(inqueryFormSchema),
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('');
  const SubmitLoadingRef = useRef(false);
  const {
    get_support_form_error_msg,
    get_support_form_loading,
    get_support_form_success,
    get_support_form_res,
    get_user_type_success,
    get_user_type_loading,
    get_user_type_error_msg,
    get_user_type_res,
  } = useSelector(state => state.Support);

  const loadingRef = useRef(false);

  // USER TYPE
  useEffect(() => {
    if (loadingRef.current && !get_user_type_loading) {
      dispatch(showAppLoader());
      if (get_user_type_success) {
        dispatch(hideAppLoader());
        setUserTypeData(get_user_type_res);
      }
      if (get_user_type_error_msg) {
        dispatch(hideAppLoader());
      }
    }
    loadingRef.current = get_user_type_loading;
  }, [get_user_type_success, get_user_type_loading]);
  console.log('userTypeData', userTypeData);
  // SUPPORT FORM

  useEffect(() => {
    if (SubmitLoadingRef.current && !get_support_form_loading) {
      dispatch(showAppLoader());
      console.log(get_support_form_success, 'get_support_form_success');
      if (get_support_form_success) {
        dispatch(hideAppLoader());
        dispatch(showAppToast(false, get_support_form_res));
        navigation.goBack();
      }
      if (get_support_form_error_msg) {
        dispatch(hideAppLoader());
        dispatch(showAppToast(true, get_support_form_error_msg));
      }
    }
    SubmitLoadingRef.current = get_support_form_loading;
  }, [get_support_form_loading, get_support_form_success]);

  const headerComp = () => (
    <CircleBtn
      icon={Images.iconcross}
      onPress={() => navigation.goBack()}
      accessibilityLabel={Strings.inqueryForm.LEFT_ARROW_BUTTON}
    />
  );

  useEffect(() => {
    dispatch(UserType());
    if (!isValid) {
      const e = errors;
      const messages = [];
      Object.keys(errors).forEach(k => messages.push(e[k].message || ''));
      const msg = messages.join('\n').trim();
      if (msg) {
        dispatch(showAppToast(true, msg));
      }
    }
  }, [errors, isValid]);


  const onSubmit = data => {
    const payload = {
      name: data.name,
      email: data.email,
      country_code: '+91',
      phone_no: data.phone_no,
      enquiring_as: data.user_type.id,
      message: data.message,
    };
    dispatch(showAppLoader());
    dispatch(SupportForm(payload));
  };
  const normalizeInput = (value, previousValue) => {
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
    await setPhone(prevstate => normalizeInput(value, prevstate));
    let a = '';
    for (var i = 0; i < value.length; i++) {
      if (value[i] !== ' ' && value[i] !== ')' && value[i] !== '(') {
        a = a + value[i];
      }
    }
    setValue('phone_no', a);
  };
  return (
    <Container
      scroller={true}
      showHeader={true}
      headerEnd={true}
      headerComp={headerComp}>
      <View style={Styles.mainContainer}>
        <Text style={Styles.title}>{Strings.inqueryForm.Title}</Text>
        <Text style={Styles.title1}>{Strings.inqueryForm.Subtitle}</Text>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <FloatingLabelInput
              label={Strings.inqueryForm.Name}
              value={value}
              autoCorrect={false}
              onChangeText={v => onChange(v)}
              error={errors && errors.name?.message}
              required={true}
            />
          )}
          name={FormKey.name}
        />
        <Controller
          control={control}
          render={({field: {onChange}}) => (
            <Dropdown
              label={Strings.inqueryForm.USER_TYPE}
              data={userTypeData?.data}
              onSelect={selectedItem => {
                onChange(selectedItem);
              }}
              required={true}
              error={errors && errors.user_type?.message}
            />
          )}
          name={FormKey.user_type}
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <FloatingLabelInput
              label={Strings.profile.EmailAddress}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={v => onChange(v)}
              error={errors && errors.email?.message}
              required={true}
            />
          )}
          name={FormKey.email}
        />
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <FloatingLabelInput
              label={Strings.inqueryForm.MobileNumber}
              value={phone}
              keyboardType="numeric"
              onChangeText={v => {
                handelChange(v);
              }}
              error={errors && errors.phone_no?.message}
              required={true}
              maxLength={14}
            />
          )}
          name={FormKey.phone_no}
        />
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <FloatingLabelInput
              messageStyle={true}
              label={Strings.inqueryForm.Message}
              value={value}
              onChangeText={v => onChange(v)}
              error={errors && errors.message?.message}
              required={true}
              fixed={true}
              multiline={true}
              numberOfLines={5}
              maxLength={200}
              inputStyle={Styles.textArea}
            />
          )}
          name={FormKey.message}
        />
        <Button
          label={Strings.inqueryForm.SendInquiry}
          onPress={handleSubmit(onSubmit)}
          style={styles.Btn}
        />
      </View>
    </Container>
  );
}
