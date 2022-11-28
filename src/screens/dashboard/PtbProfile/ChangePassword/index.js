import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import Header from '../../../../components/Header';
import styles from './style';
import {Colors, Images, Strings} from '../../../../constants';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Value} from '../../../../constants/FixedValues';
import {
  validatePassword,
  pwdErrMsg,
  Fonts,
} from '../../../../constants/Constants';
import {changePasswordSchema,forgetPasswordSchema} from '../../../../constants/schemas';
import {Button, FloatingLabelInput} from '../../../../components';
import User from '../../../../Api/User';

const ChangePassword = ({route}) => {
  const navigation = useNavigation();
  const {type,...restParams} = route.params;
  const {
    register_user_success_data,
  } = useSelector(state => state.Auth);
  const {changePassword, resetPassword} = User();
  const {
    control,
    formState: {errors},
    handleSubmit
  } = useForm({
    resolver: yupResolver(type===1?changePasswordSchema:forgetPasswordSchema),
  });
  const [show, setShow] = useState(false);
  const onSubmit = (data)=>{
    console.log(data);
    if(type===1){
      changePassword(data);
    }
    else{
      const reqData = {
        password: data.new_password,
        confirm_password: data.confirm_password,
        user_id: register_user_success_data.data.data.id
      }
      resetPassword(reqData);
    }
  }
  const headerComp = () => (
    <View>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.goBack()}>
        <Text style={styles.headerText}>{Strings.Subscription.Cancel}</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <>
      {type===1 && <Header end={true}>{headerComp()}</Header>}
      <ScrollView showVerticalIndicatot={false}>
        <View style={styles.mainContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.changePassword}>
              {type===1?Strings.ChangePassword.CHANGE_PASSWORD:Strings.forgotPassword.forgot}
            </Text>
          </View>
          <View style={styles.innerHeading}>
            <Text style={styles.setANew}>{Strings.ChangePassword.SET_A}</Text>
          </View>
          <View style={styles.flex}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.flex}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.innerView}>
                  <View style={styles.fullWidth}>
                    {type===1&&<Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <FloatingLabelInput
                          label={Strings.ChangePassword.Current_Password}
                          value={value}
                          containerStyle={{
                            marginTop: Value.CONSTANT_VALUE_35,
                          }}
                          onChangeText={v => onChange(v)}
                          required={true}
                          secureTextEntry={!show}
                          minLength={8}
                          error={errors && errors.password?.message}
                          endComponent={() => (
                            <TouchableOpacity
                              onPress={() => setShow(!show)}
                              style={styles.psswrdInput}>
                              <Image source={show ? Images.eye2 : Images.eye} />
                            </TouchableOpacity>
                          )}
                        />
                      )}
                      name="current_password"
                    />}
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <View>
                          <FloatingLabelInput
                            label={Strings.ChangePassword.Set_New_Password}
                            value={value}
                            onChangeText={v => onChange(v)}
                            required={true}
                            secureTextEntry={true}
                            containerStyle={{
                              marginBottom: Value.CONSTANT_VALUE_10,
                              marginTop: Value.CONSTANT_VALUE_30,
                            }}
                            error={errors && errors.new_password?.message}
                          />
                          {pwdErrMsg.map(msg => (
                            <View style={styles.passwordCheck} key={msg.type}>
                              <Text
                                style={{
                                  fontSize: Value.CONSTANT_VALUE_13,
                                  fontFamily: Fonts.OpenSansBold,
                                  color:
                                    validatePassword(value, msg.type) ||
                                    validatePassword(value, msg.type) === null
                                      ? Colors.GRAY2
                                      : Colors.RED,
                                }}>
                                {msg.msg}
                              </Text>
                              {validatePassword(value, msg.type) !== null && (
                                <Image
                                  style={[
                                    styles.ValidPwd,
                                    {
                                      tintColor: validatePassword(
                                        value,
                                        msg.type,
                                      )
                                        ? Colors.BLACK
                                        : Colors.RED,
                                    },
                                  ]}
                                  source={
                                    validatePassword(value, msg.type)
                                      ? Images.path
                                      : Images.warning
                                  }
                                />
                              )}
                            </View>
                          ))}
                        </View>
                      )}
                      name="new_password"
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <FloatingLabelInput
                          label={Strings.ChangePassword.Confirm_Password}
                          value={value}
                          required={true}
                          containerStyle={{
                            marginTop: Value.CONSTANT_VALUE_29,
                          }}
                          onChangeText={v => onChange(v)}
                          secureTextEntry={true}
                          minLength={8}
                          error={errors && errors.confirm_password?.message}
                        />
                      )}
                      name="confirm_password"
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              label={Strings.preference.Save}
              style={styles.Btn}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ChangePassword;
