// SmRegister
import React, {useRef, useState} from 'react';
import {Text, TouchableOpacity, View, Image, ScrollView} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Images from '../../../constants/Images';
import Header, {CircleBtn} from '../../../components/Header';
import globalStyle from '../../../styles/global';
import Strings from '../../../constants/Strings';
import {smRegisterSchema} from '../../../constants/schemas';
import Colors from '../../../constants/Colors';
import FloatingLabelInput from '../../../components/FloatingLabelInput';
import styles from '../../../styles/auth/smdonor/registerScreen';
import {Value} from '../../../constants/FixedValues';

const SmRegister = () => {
  const [check, setCheck] = useState(true);
  const inputRef = useRef(null);
  const {
    control,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(smRegisterSchema),
  });

  const headerComp = () => (
    <CircleBtn
      icon={Images.iconcross}
      accessibilityLabel="Left arrow Button, Press to go back"
      style={styles.headerIcon}
    />
  );
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
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default React.memo(SmRegister);
