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
import React, {useState, useEffect, useRef} from 'react';
import Header from '../../../../components/Header';
import {Images, Strings} from '../../../../constants';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Value} from '../../../../constants/FixedValues';
import {FloatingLabelInput} from '../../../../components';
import styles from './style';
import {Routes} from '../../../../constants/Constants';
import {deleteAccount} from '../../../../redux/actions/DeleteAccount';
import {
  showAppLoader,
  hideAppLoader,
  showAppToast,
} from '../../../../redux/actions/loader';
import {useSelector, useDispatch} from 'react-redux';
import {deleteAccountPassword} from '../../../../constants/schemas';

const DeleteAccount = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loadingRef = useRef(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(deleteAccountPassword),
  });
  const {
    delete_account_success,
    delete_account_loading,
    delete_account__error_msg,
    delete_account_res,
  } = useSelector(state => state?.DeleteAccount);
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState('');
  const headerComp = () => (
    <View>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.goBack()}>
        <Text style={styles.headerText}>{Strings.Subscription.Cancel}</Text>
      </TouchableOpacity>
    </View>
  );
  useEffect(() => {
    if (loadingRef.current && !delete_account_loading) {
      dispatch(showAppLoader());
      if (delete_account_success) {
        dispatch(hideAppLoader());
        dispatch(showAppToast(false, delete_account_res));
        navigation.navigate(Routes.Landing);
      }
      if (delete_account__error_msg) {
        dispatch(hideAppLoader());
      }
    }
    loadingRef.current = delete_account_loading;
  }, [delete_account_loading, delete_account_success]);

  const onSubmit = () => {
    console.log('Hiiii');
    dispatch(showAppLoader());
    dispatch(deleteAccount(password));
  };

  return (
    <View style={styles.upperContainer}>
      <Header end={true}>{headerComp()}</Header>
      <ScrollView showVerticalIndicatot={false}>
        <View style={styles.mainContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.AccountVerify}>
              {Strings.Settings.Account_Verify}
            </Text>
          </View>
          <View style={styles.innerHeading}>
            <Text style={styles.setANew}>{Strings.Settings.Enter_delete}</Text>
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
                          onChangeText={v => {
                            setPassword(v);
                            onChange(v);
                          }}
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
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={Value.CONSTANT_VALUE_FRAC80}
              style={styles.dashboardBtn}
              onPress={handleSubmit(onSubmit)}>
              <Text
                style={styles.buttonText}
                accessible={false}
                numberOfLines={Value.CONSTANT_VALUE_1}>
                {Strings.Settings.DELETE_MY_ACCOUNT}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DeleteAccount;
