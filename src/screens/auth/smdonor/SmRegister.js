// SmRegister
import React, {useRef, useState} from 'react';
import {Text, TouchableOpacity, View, Image, ScrollView} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {yupResolver} from '@hookform/resolvers/yup';
import Button from '../../../components/Button';
import Images from '../../../constants/Images';
import Header, {CircleBtn} from '../../../components/Header';
import globalStyle from '../../../styles/global';
import Strings, {ValidationMessages} from '../../../constants/Strings';
import {smRegisterSchema} from '../../../constants/schemas';
import Colors from '../../../constants/Colors';
import FloatingLabelInput from '../../../components/FloatingLabelInput';
import styles from '../../../styles/auth/smdonor/registerScreen';
import {Value} from '../../../constants/FixedValues';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
} from '../../../redux/actions/loader';
import debounce from '../../../utils/debounce';

const SmRegister = () => {
  const dispatch = useDispatch();
  const [check, setCheck] = useState(true);
  const inputRef = useRef(null);
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(smRegisterSchema),
  });
  const {register_user_success, register_user_loading} = useSelector(
    state => state.Register,
  );
  const onSubmit = data => {
    if (check) {
      dispatch(hideAppLoader());
      dispatch(showAppToast(true, ValidationMessages.TERMS_CONDITIONS));
      return;
    }
    dispatch(showAppLoader());
  };
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconcross}
      accessibilityLabel="Left arrow Button, Press to go back"
      style={styles.headerIcon}
    />
  );
  const onPressSubmit = () => {
    debounce(handleSubmit(onSubmit), 1000)();
  };
  return (
    <>
      <View
        style={{
          flex: Value.CONSTANT_VALUE_1,
          backgroundColor: Colors.BACKGROUND,
        }}>
        <Header end={true}>{headerComp()}</Header>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.main}>
            <Text style={[globalStyle.screenTitle, styles.title]}>
              {Strings.sm_register.Title}
            </Text>
            <View style={styles.imgContainer}>
              <View style={{marginTop: Value.CONSTANT_VALUE_10}}>
                <Text style={styles.ImageText}>
                  {Strings.sm_register.uploadImage}
                  <Text style={{color: Colors.RED}}>*</Text>
                </Text>
              </View>
            </View>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <FloatingLabelInput
                  label={Strings.sm_register.LastName}
                  value={value}
                  onChangeText={v => {
                    onChange(v.trim());
                  }}
                  error={errors && errors.last_name?.message}
                  required={true}
                  maxLength={30}
                  inputRef={inputRef}
                />
              )}
              name="last_name"
            />
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <FloatingLabelInput
                  label={Strings.profile.EmailAddress}
                  value={value}
                  required={true}
                  error={errors && errors.email?.message}
                  inputRef={inputRef}
                />
              )}
              name="email"
            />
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <FloatingLabelInput
                  containerStyle={{marginTop: Value.CONSTANT_VALUE_10}}
                  label={Strings.sm_register.Confirm}
                  value={value}
                  onChangeText={v => {
                    onChange(v);
                  }}
                  error={errors && errors.confirm_password?.message}
                  required={true}
                  secureTextEntry={true}
                  inputRef={inputRef}
                />
              )}
              name="confirm_password"
            />
            <View style={styles.checkboxContainer}>
              {check ? (
                <TouchableOpacity
                  onPress={() => {
                    setCheck(cur => !cur);
                  }}>
                  <Image source={Images.rectangleCopy} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setCheck(cur => !cur);
                  }}>
                  <Image source={Images.iconCheck} />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.starContainer}>
              <Text style={styles.starColor}>*</Text>
              <Text style={styles.descText}>{Strings.profile.desc}</Text>
            </View>
            <View style={styles.align}>
              <Button
                disabled={register_user_loading || register_user_success}
                label={Strings.sm_register.Btn}
                onPress={onPressSubmit}
                style={styles.Btn}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default React.memo(SmRegister);
