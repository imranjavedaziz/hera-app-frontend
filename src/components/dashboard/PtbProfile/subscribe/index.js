import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import {Colors, Images, Strings} from '../../../../constants';
import {Fonts} from '../../../../constants/Constants';
import {CancelSubscription} from '../../../../screens/dashboard/PtbProfile/Subscription';
import {capitalizeStr} from '../../../../utils/commonFunction';
import {canncelSubscription} from '../../../../redux/actions/Subsctiption';
import {showAppLoader, hideAppLoader} from '../../../../redux/actions/loader';

const cancelURL = Platform.select({
  ios: 'https://apps.apple.com/account/subscriptions',
  android:
    'https://play.google.com/store/account/subscriptions?package=YOUR_PACKAGE_NAME&sku=YOUR_PRODUCT_ID',
  default: '',
});
const Subscribe = ({MainText, InnerText, Icon, is_trial}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container(is_trial)}>
      <TouchableOpacity onPress={() => navigation.navigate('Subscription')}>
        <View style={styles.row}>
          <Image style={styles.icon} source={Icon} />
          <Text style={styles.mainText}>{MainText}</Text>
        </View>
        <Text style={styles.innerText}>{InnerText}</Text>
      </TouchableOpacity>
    </View>
  );
};
const nextPlanStr = 'Your plan will be updated on {DATE}';
export const Subscribed = () => {
  const dispatch = useDispatch();
  const [apiCall, setApiCall] = useState(false);
  const [cancelSuccess, setCancelSucceess] = useState(false);
  const [changeModal, setChangeModal] = useState(false);
  const [hasUpgraded, setUpgraded] = useState(false);
  const navigation = useNavigation();
  const {get_user_detail_res} = useSelector(state => state.Edit_profile);
  const {
    cancel_subscription_success,
    cancel_subscription_loading,
    subscription_status_res,
  } = useSelector(state => state.Subscription);
  useEffect(() => {
    setUpgraded(get_user_detail_res?.upcomingSubscription != null);
  }, [get_user_detail_res]);
  useEffect(() => {
    if (
      (cancel_subscription_success || !cancel_subscription_loading) &&
      apiCall
    ) {
      dispatch(hideAppLoader());
      setChangeModal(false);
      setApiCall(false);
      setCancelSucceess(true);
    }
  }, [cancel_subscription_success, cancel_subscription_loading]);
  const handleCancelPress = () => {
    if (Platform.OS === 'ios') {
      Alert.alert(
        Strings.Subscription.CancelSub,
        Strings.Subscription.CancelSubParaIos,
        [
          {
            text: capitalizeStr(Strings.Subscription.YesCancel),
            onPress: () => {
              Linking.openURL(cancelURL);
            },
            style: 'destructive',
          },
          {
            text: Strings.Subscription.NotNow,
            onPress: () => null,
          },
        ],
      );
    } else {
      setChangeModal(true);
    }
  };
  useEffect(() => {
    if (cancelSuccess) {
      setChangeModal(true);
    }
  }, [cancelSuccess]);
  const cancelApiCall = () => {
    dispatch(showAppLoader());
    dispatch(canncelSubscription());
    setApiCall(true);
  };
  const cancelApiSuccessCall = () => {
    setCancelSucceess(false);
  };
  if (!get_user_detail_res || !get_user_detail_res.subscription) {
    return (
      <Subscribe
        Icon={Images.STAR}
        MainText={Strings.subscribe.Subscribe_Now}
        InnerText={Strings.subscribe.Plans}
      />
    );
  }
  return (
    <>
      <View
        style={[
          styles.container(),
          {
            height: 'auto',
            paddingVertical: 17,
            borderColor: Colors.COLOR_A3C6C4,
          },
        ]}>
        <View style={{flex: 1}}>
          <View style={[styles.row]}>
            <Text
              style={[
                styles.mainText,
                {
                  marginLeft: 0,
                  fontFamily: Fonts.OpenSansRegular,
                },
              ]}>
              {Strings.subscribe.URSubscribed}
            </Text>
          </View>
          <Text
            style={[
              styles.mainText,
              {
                marginLeft: 25,
              },
            ]}>
            {
              (
                Strings?.STATIC_ROLE.find(
                  r =>
                    r.id ===
                    get_user_detail_res.subscription?.role_id_looking_for,
                ) || {name: ''}
              ).name
            }
          </Text>
          <Text
            style={[
              styles.price,
              {marginTop: 3},
            ]}>{`$${get_user_detail_res.subscription.price} / ${get_user_detail_res.subscription.subscription_interval}`}</Text>
          {subscription_status_res?.data?.subscription_cancel !== 1 &&
            !hasUpgraded && (
              <Text style={[styles.price, {marginTop: 10, fontSize: 13}]}>
                Next Due On:{' '}
                {moment(
                  get_user_detail_res.subscription.current_period_end,
                ).format('MMM DD, YYYY')}
              </Text>
            )}
          {subscription_status_res?.data?.subscription_cancel !== 1 &&
            hasUpgraded && (
              <Text style={[styles.price, {marginTop: 10, fontSize: 12}]}>
                <Text style={{color: Colors.RED}}>*</Text>
                {nextPlanStr.replace(
                  '{DATE}',
                  moment(
                    get_user_detail_res.subscription.current_period_end,
                  ).format('LL'),
                )}
              </Text>
            )}
          {subscription_status_res?.data?.subscription_cancel === 1 && (
            <Text
              style={[
                styles.price,
                {marginTop: 10, fontSize: 13, color: Colors.RED},
              ]}>
              This plan was canceled.
            </Text>
          )}
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Subscription')}>
              <Text style={[styles.headerText, {color: Colors.BLACK}]}>
                Change Subscription
              </Text>
            </TouchableOpacity>
            {subscription_status_res?.data?.subscription_cancel !== 1 && (
              <>
                <View style={styles.circle} />
                <TouchableOpacity onPress={() => handleCancelPress()}>
                  <Text style={styles.headerText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
      <CancelSubscription
        setChangeModal={setChangeModal}
        changeModal={changeModal}
        handleCanncel={cancelSuccess ? cancelApiSuccessCall : cancelApiCall}
        title={
          cancelSuccess
            ? Strings.Subscription.SubRemoved
            : Strings.Subscription.CancelSub
        }
        para={
          cancelSuccess
            ? Strings.Subscription.SubRemovedPara
            : Strings.Subscription.CancelSubParaAndroid
        }
        showSingleButton={cancelSuccess}
        btnTxt={
          cancelSuccess
            ? Strings.Subscription.GotIt
            : capitalizeStr(Strings.Subscription.YesCancel)
        }
      />
    </>
  );
};
export default Subscribe;
