// SmBasicDetails
import React, {useEffect, useRef} from 'react';
import {Text, ScrollView, StatusBar, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {yupResolver} from '@hookform/resolvers/yup';
import Button from '../../../components/Button';
import Images from '../../../constants/Images';
import Header, {CircleBtn} from '../../../components/Header';
import globalStyle from '../../../styles/global';
import Strings from '../../../constants/Strings';
import {smBasicSchema} from '../../../constants/schemas';
import FloatingLabelInput from '../../../components/FloatingLabelInput';
import Dropdown from '../../../components/inputs/Dropdown';
import styles from '../../../styles/auth/smdonor/basicDetailsScreen';
import {Value} from '../../../constants/FixedValues';
import ActionSheet from 'react-native-actionsheet';
import {showAppLoader, showAppToast} from '../../../redux/actions/loader';
import {saveBasicDetail} from '../../../redux/actions/Register';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SmBasicDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  let actionSheet = useRef();
  const {
    handleSubmit,
    control,
    reset,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(smBasicSchema),
  });
  useEffect(() => {
    return navigation.addListener('focus', () => {
      reset();
    });
  }, [navigation, reset]);
  useEffect(() => {
    if (!isValid) {
      const e = errors.gender_id;
      if (e) {
        dispatch(showAppToast(true, e.message));
      }
    }
  }, [dispatch, errors, isValid]);
  const onSubmit = data => {
    dispatch(showAppLoader());
    dispatch(saveBasicDetail(data));
  };

  const headerComp = () => (
    <>
      <CircleBtn icon={Images.iconSettings} />
      <ActionSheet
        ref={actionSheet}
        destructiveButtonIndex={2}
        cancelButtonIndex={2}
      />
    </>
  );
<<<<<<< HEAD

  const logOutScreen = () => {
    dispatch(logOut(Device_ID));
  };
  const navigateSupport = () => {
    navigation.navigate(Routes.Support);
  };
  const handleThreeOption = option => {
    switch (option) {
      case Strings.smSetting.Inquiry:
        navigateSupport();
        break;
      case Strings.preference.About:
        openWebView(ABOUT_URL);
        break;
      case Strings.preference.Logout:
        logOutScreen();
        break;
      case Strings.Subscription.Cancel:
        break;
    }
  };
  const openActionSheet = () => {
    setThreeOption([
      Strings.smSetting.Inquiry,
      Strings.preference.About,
      Strings.preference.Logout,
      Strings.Subscription.Cancel,
    ]);
    setTimeout(() => {
      actionSheet.current.show();
    }, 300);
  };
  const StyleIOS = {
    marginTop: 30,
  };
  const Style = Platform.OS === 'ios' && StyleIOS;
=======
>>>>>>> e02f312e7c306daffa02950553263ffd05048da6
  return (
    <>
      <StatusBar barStyle="dark-content" animated={true} hidden={false} />
      <View>
        <Header end={true}>{headerComp()}</Header>
        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.mainComp_1}>
              <View>
                <Text style={globalStyle.screenTitle}>
                  {Strings.sm_basic.Title}
                </Text>
                <Text
                  style={[
                    globalStyle.screenSubTitle,
                    {marginBottom: Value.CONSTANT_VALUE_45},
                  ]}>
                  {Strings.sm_basic.Subtitle}
                </Text>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Dropdown
                      label={Strings.sm_basic.RelationshipStatus}
                      onSelect={selectedItem => {
                        onChange(selectedItem.id);
                      }}
                      required={true}
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Dropdown
                      label={Strings.sm_basic.State}
                      onSelect={selectedItem => {
                        onChange(selectedItem.id);
                      }}
                      required={true}
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <FloatingLabelInput
                      label={Strings.sm_basic.Zip}
                      value={value}
                      onChangeText={v => onChange(v)}
                      error={errors && errors.zipcode?.message}
                      required={true}
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <FloatingLabelInput
                      label={Strings.sm_basic.Occupation}
                      value={value}
                      onChangeText={v => onChange(v)}
                      error={errors && errors.occupation?.message}
                    />
                  )}
                  name="occupation"
                />
                <View>
                  <Button
                    style={styles.Btn}
                    label={Strings.sm_basic.Btn}
                    onPress={handleSubmit(onSubmit)}
                  />
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
      </View>
    </>
  );
};
export default React.memo(SmBasicDetails);
