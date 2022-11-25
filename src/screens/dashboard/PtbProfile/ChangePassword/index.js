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
import {changePasswordSchema} from '../../../../constants/schemas';
import {Button, FloatingLabelInput} from '../../../../components';
const ChangePassword = () => {
  const navigation = useNavigation();
  const {
    control,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });
  const [show, setShow] = useState(false);
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
      <Header end={true}>{headerComp()}</Header>
      <ScrollView showVerticalIndicatot={false}>
        <View style={styles.mainContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.changePassword}>
              {Strings.ChangePassword.CHANGE_PASSWORD}
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
                    <Controller
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
                      name="current password"
                    />
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
                            error={errors && errors.confirm_password?.message}
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
                      name="Set New Password"
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
                          secureTextEntry={!show}
                          minLength={8}
                          error={errors && errors.password?.message}
                        />
                      )}
                      name="confirm password"
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
              // onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ChangePassword;
