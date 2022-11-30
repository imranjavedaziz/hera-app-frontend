import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Header from '../../../../components/Header';
import {Images, Strings} from '../../../../constants';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import {Value} from '../../../../constants/FixedValues';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useSelector, useDispatch} from 'react-redux';
import {
  getDeactivateReason,
  deactivateAccount,
} from '../../../../redux/actions/DeactivateAccount';
import {logOut} from '../../../../redux/actions/Auth';
import {hideAppLoader, showAppLoader} from '../../../../redux/actions/loader';
import {Routes} from '../../../../constants/Constants';
import {MaterialIndicator} from 'react-native-indicators';

const DeactivateAccount = () => {
  const [deactivateReasonList, setDeactivateReasonList] = React.useState('');
  const dispatch = useDispatch();
  const loadingRef = React.useRef(false);
  const navigation = useNavigation();
  const [reason, setReason] = React.useState(1);
  const {
    control,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(),
  });
  const {
    deactivate_account_success,
    deactivate_account_loading,
    get_reason_list_success,
    get_reason_list_loading,
    get_reason_list_res,
  } = useSelector(state => state.DeactivateAccount);

  const headerComp = () => (
    <View>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.goBack()}>
        <Text style={styles.headerText}>{Strings.Subscription.Cancel}</Text>
      </TouchableOpacity>
    </View>
  );
  React.useEffect(() => {
    dispatch(getDeactivateReason());
  }, []);

  React.useEffect(() => {
    if (loadingRef.current && !get_reason_list_loading) {
      if (get_reason_list_success) {
        dispatch(hideAppLoader());
        setDeactivateReasonList(get_reason_list_res);
      }
      dispatch(hideAppLoader());
    }
    loadingRef.current = get_reason_list_loading;
    dispatch(hideAppLoader());
  }, [get_reason_list_success, get_reason_list_loading]);

  React.useEffect(() => {
    if (loadingRef.current && !deactivate_account_loading) {
      dispatch(showAppLoader());
      if (deactivate_account_success) {
        console.log('deactivate_account_success', deactivate_account_success);
        dispatch(hideAppLoader());
        dispatch(logOut());
        navigation.reset({
          index: 0,
          routes: [{name: Routes.Landing}],
        });
      }
      dispatch(hideAppLoader());
    }
    loadingRef.current = deactivate_account_loading;
  }, [deactivate_account_success, deactivate_account_loading]);

  const deactivateAccountHandlar = item => {
    let payload = {
      status_id: 2,
      reason_id: reason,
    };
    console.log('LINE NO 144 PAYLOAD', payload);
    dispatch(deactivateAccount(payload));
  };
  const loaderFunc = () => {
    dispatch(showAppLoader());
  };
  return (
    <View style={styles.upperContainer}>
      <Header end={true}>{headerComp()}</Header>
      <ScrollView showVerticalIndicatot={false}>
        <View style={styles.mainContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.AccountVerify}>
              {Strings.Settings.Deactivate_Account}
            </Text>
          </View>
          <View style={styles.innerHeading}>
            <Text style={styles.setANew}>{Strings.Settings.Select_Reason}</Text>
          </View>
          {deactivateReasonList?.data ? (
            <View style={styles.flex}>
              <View style={styles.fullWidth}>
                <Controller
                  control={control}
                  render={({field: {onChange, value = 1}}) => (
                    <View style={styles.radioContainer}>
                      {deactivateReasonList?.data?.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            onChange(item.id);
                            setReason(item.id);
                          }}
                          style={styles.radioBtn}>
                          <Image
                            style={styles.radioImg}
                            source={
                              value === item.id
                                ? Images.iconRadiosel
                                : Images.iconRadiounsel
                            }
                          />
                          <Text style={styles.radioLabel}>{item.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                  name="reasons"
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  activeOpacity={Value.CONSTANT_VALUE_FRAC80}
                  style={styles.dashboardBtn}
                  onPress={deactivateAccountHandlar}>
                  <Text
                    style={styles.buttonText}
                    accessible={false}
                    numberOfLines={Value.CONSTANT_VALUE_1}>
                    {Strings.Settings.DEACTIVATE_MY_ACCOUNT}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            loaderFunc()
          )}
        </View>
      </ScrollView>
    </View>
  );
};
export default React.memo(DeactivateAccount);
