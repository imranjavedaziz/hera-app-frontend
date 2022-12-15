import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header, {CircleBtn} from '../../components/Header';
import Images from '../../constants/Images';
import Styles from '../../styles/auth/smdonor/Support';
import {useNavigation} from '@react-navigation/native';
import Strings, {ValidationMessages} from '../../constants/Strings';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {inqueryFormSchema} from '../../constants/schemas';
import styles from '../../styles/auth/smdonor/basicDetailsScreen';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import Dropdown from '../../components/inputs/Dropdown';
import Button from '../../components/Button';
import {ConstantsCode, FormKey} from '../../constants/Constants';
import {SupportForm, UserType} from '../../redux/actions/support';
import {useDispatch, useSelector} from 'react-redux';
import {
  showAppLoader,
  hideAppLoader,
  showAppToast,
} from '../../redux/actions/loader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {InputLabel, ModalMiddle, MultiTextInput} from '../../components';
import {Alignment} from '../../constants';
import {Value} from '../../constants/FixedValues';
import moment from 'moment-timezone';
import normalizeInput from '../../utils/normalizeInput';

export default function Support() {
  const [userTypeData, setUserTypeData] = useState();
  const {
    handleSubmit,
    control,
    setValue,
    formState: {errors, isValid, isDirty},
  } = useForm({
    resolver: yupResolver(inqueryFormSchema),
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('');
  const [showModal, setShowModal] = useState(false);
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
  // SUPPORT FORM

  useEffect(() => {
    if (SubmitLoadingRef.current && !get_support_form_loading) {
      dispatch(showAppLoader());
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
  const VAL_CHECK = () =>
    Platform.OS === 'ios' ? backAction() : setShowModal(true);

  const headerComp = () => (
    <CircleBtn
      Fixedstyle={styles.andoridFixedheaderStyle}
      icon={Images.iconcross}
      onPress={() => {
        isDirty === true ? VAL_CHECK() : navigation.goBack();
      }}
      accessibilityLabel={Strings.inqueryForm.LEFT_ARROW_BUTTON}
    />
  );

  useEffect(() => {
    dispatch(UserType());
    if (!isValid) {
      const e = errors;
      const messages = [];
      Object.keys(errors).forEach(k => messages.push(e[k].message || ''));
    }
  }, [errors, isValid]);

  const backAction = () => {
    Alert.alert(
      ValidationMessages.DISCARD_INQUIRY,
      ValidationMessages.REJECT_DISCARD,
      [
        {
          text: Strings.profile.ModalOption1,
          onPress: () => {
            navigation.goBack();
          },
        },
        {
          text: Strings.profile.ModalOption2,
          onPress: () => null,
        },
      ],
    );
    return true;
  };
  const timezone = moment.tz.guess(true);
  console.log(timezone);
  const onSubmit = data => {
    const payload = {
      name: data.name,
      email: data.email,
      country_code: ConstantsCode.Country_CODE,
      phone_no: data.phone_no,
      enquiring_as: data.user_type.id,
      message: data.message,
      user_timezone: timezone,
    };
    dispatch(showAppLoader());
    dispatch(SupportForm(payload));
  };
  const handelChange = async value => {
    await setPhone(prevstate => normalizeInput(value, prevstate));
    let a = '';
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== ' ' && value[i] !== ')' && value[i] !== '(') {
        a = a + value[i];
      }
    }
    setValue('phone_no', a);
  };

  return (
    <>
      <View style={Styles.flex}>
        <Header end={true}>{headerComp()}</Header>
        <KeyboardAwareScrollView
          keyboardOpeningTime={0}
          scrollEnabled={true}
          extraHeight={180}
          showsVerticalScrollIndicator={false}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              <View style={Styles.androidMainContainer}>
                <Text style={Styles.title}>{Strings.inqueryForm.Title}</Text>
                <Text style={Styles.title1}>
                  {Strings.inqueryForm.Subtitle}
                </Text>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <FloatingLabelInput
                      label={Strings.inqueryForm.Name}
                      value={value}
                      maxLength={30}
                      autoCorrect={false}
                      onChangeText={v => onChange(v.trim())}
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
                      required={true}
                      error={errors && errors.email?.message}
                    />
                  )}
                  name={FormKey.email}
                />
                <View style={styles.inputRow}>
                  <InputLabel Code={true} label={Strings.mobile.Code} />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <InputLabel
                        value={phone}
                        number={true}
                        label={Strings.inqueryForm.MobileNumber}
                        onChangeText={v => {
                          handelChange(v);
                        }}
                        maxLength={14}
                        keyboardType="numeric"
                        error={errors && errors.phone_no?.message}
                      />
                    )}
                    name={FormKey.phone_no}
                  />
                </View>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <MultiTextInput
                      title={Strings.inqueryForm.Message}
                      required={true}
                      value={value}
                      maxLength={200}
                      onChangeText={v => {
                        onChange(v);
                      }}
                      error={errors && errors.message?.message}
                    />
                  )}
                  name={FormKey.message}
                />
                <View
                  style={{
                    alignItems: Alignment.CENTER,
                    marginBottom: Value.CONSTANT_VALUE_75,
                    marginTop: 46,
                  }}>
                  <Button
                    label={Strings.inqueryForm.SendInquiry}
                    onPress={handleSubmit(onSubmit)}
                    style={styles.Btn}
                  />
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </View>
      <ModalMiddle
        showModal={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
        String_1={ValidationMessages.DISCARD_INQUIRY}
        String_2={ValidationMessages.REJECT_DISCARD}
        String_3={Strings.sm_create_gallery.modalText}
        String_4={Strings.sm_create_gallery.modalText_2}
        onPressNav={() => {
          setShowModal(false);
          navigation.goBack();
        }}
        onPressOff={() => {
          setShowModal(false);
        }}
      />
    </>
  );
}
