import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../../components/Header';
import styles from './style';
import {Images, Strings} from '../../../../constants';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {FloatingLabelInput} from '../../../../components';
import {changePasswordSchema} from '../../../../constants/schemas';
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
    <View style={styles.mainContainer}>
      <Header end={true}>{headerComp()}</Header>
      <View style={styles.headingContainer}>
        <Text style={styles.changePassword}>
          {Strings.ChangePassword.CHANGE_PASSWORD}
        </Text>
      </View>
      <View style={styles.innerHeading}>
        <Text style={styles.setANew}>{Strings.ChangePassword.SET_A}</Text>
      </View>
      <View style={{paddingHorizontal: 40, marginTop: 50}}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <FloatingLabelInput
              label={Strings.ChangePassword.Current_Password}
              value={value}
              containerStyle={{marginTop: 0}}
              onChangeText={v => onChange(v)}
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
          name="password"
        />
      </View>
    </View>
  );
};

export default ChangePassword;
