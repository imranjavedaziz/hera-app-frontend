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
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(inqueryFormSchema),
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
  console.log('get_support_form_res', get_support_form_res);
  const onSubmit = data => {
    console.log('userTypeData', data);
    const reqData = new FormData();
    reqData.append('name', data.name);
    reqData.append('email', data.email);
    reqData.append('country_code', '+91');
    reqData.append('phone_no', data.phone_no);
    reqData.append('enquiring_as', data.user_type.id);
    reqData.append('message', data.message);
    console.log(reqData, 'reqData');
    dispatch(showAppLoader());
    dispatch(SupportForm(reqData));
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
              onChangeText={v => onChange(v)}
              error={errors && errors.emailAddress?.message}
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
              value={value}
              onChangeText={v => onChange(v)}
              error={errors && errors.emailAddress?.message}
              required={true}
              maxLength={10}
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
