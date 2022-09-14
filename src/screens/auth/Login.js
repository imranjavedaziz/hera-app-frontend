// Login
import React, {useState, useEffect} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import Container from '../../components/Container';
import Images from '../../constants/Images';
import {CircleBtn} from '../../components/Header';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import Button from '../../components/Button';
import styles from '../../styles/auth/loginScreen';
import globalStyle from '../../styles/global';
import Strings from '../../constants/Strings';
import { showAppToast } from '../../redux/actions/loader';
import { loginSchema } from '../../constants/schemas';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const {
    handleSubmit,
    control,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  useEffect(() => {
    if (!isValid) {
      const e = errors;
      const messages = [];
      Object.keys(errors).forEach(k => messages.push(e[k].message || ''));
      const msg = messages.join('\n').trim();
      if(msg)dispatch(showAppToast(true,msg));
    }
  }, [errors, isValid]);
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconcross}
      onPress={navigation.goBack}
      accessibilityLabel="Cross Button, Go back"
    />
  );
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Container
      scroller={true}
      showHeader={true}
      headerComp={headerComp}
      headerEnd={true}>
      <View style={globalStyle.mainContainer}>
        <Image source={Images.LOGO} style={styles.logo} />
        <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.login.MobileNumber}
                value={value}
                onChangeText={(v) => onChange(v)}
                keyboardType="number-pad"
                maxLength={10}
              />
            )}
            name="phone"
        />
        <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.login.Password}
                value={value}
                onChangeText={(v) => onChange(v)}
                secureTextEntry={true}
                minLength={8}
              />
            )}
            name="password"
        />
        <Button label={Strings.login.LOG_IN} style={styles.loginBtn} onPress={handleSubmit(onSubmit)}/>
        <TouchableOpacity
          style={styles.btnMargin}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={Strings.login.ForgotPassword}>
          <Text style={styles.underlineBtn} accessible={false}>
            {Strings.login.ForgotPassword}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnMargin}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={Strings.login.NewUser}>
          <Text
            style={styles.underlineBtn}
            accessible={false}
            onPress={() => navigation.navigate('MobileNumber')}>
            {Strings.login.NewUser}
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};
export default Login;
