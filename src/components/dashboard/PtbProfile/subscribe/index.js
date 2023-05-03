import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {Colors, Images, Strings} from '../../../../constants';
import {Fonts} from '../../../../constants/Constants';
import { CancelSubscription } from '../../../../screens/dashboard/PtbProfile/Subscription';

const cancelURL = Platform.select({
  ios: 'https://apps.apple.com/account/subscriptions',
  android:
    'https://play.google.com/store/account/subscriptions?package=YOUR_PACKAGE_NAME&sku=YOUR_PRODUCT_ID',
  default: '',
});
const Subscribe = ({MainText, InnerText, Icon, is_trial}) => {
  console.log('LINE NUMBER 24', is_trial);
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
export const Subscribed = () => {
  const [changeModal, setChangeModal] = useState(false);
  const navigation = useNavigation();
  const {get_user_detail_res} = useSelector(state => state.Edit_profile);
  console.log('get_user_detail_res', JSON.stringify(get_user_detail_res));
  if (!get_user_detail_res || !get_user_detail_res.subscription) {
    return (
      <Subscribe
        Icon={Images.STAR}
        MainText={Strings.subscribe.Subscribe_Now}
        InnerText={Strings.subscribe.Plans}
      />
    );
  }
  console.log(
    moment(new Date(get_user_detail_res.subscription.current_period_end)),
    'get_user_detail_res.subscription.current_period_end',
  );
  return (
    <>
    <View
      style={[
        styles.container(),
        {height: 'auto', paddingVertical: 17, borderColor: Colors.COLOR_A3C6C4},
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
              Strings?.STATIC_ROLE.find(
                r => r.id === get_user_detail_res.subscription?.role_id_looking_for,
              ).name
            }
          </Text>
        <Text style={[styles.price, {marginTop: 3}]}>{`$${
          get_user_detail_res.subscription.price
        }/${
          get_user_detail_res.subscription.subscription_interval === 'month'
            ? 'mo'
            : 'yr'
        }`}</Text>
        <Text
          style={[
            styles.price,
            {marginTop: 10, fontSize: 13},
          ]}>
          Next Due On:{' '}
          {moment(get_user_detail_res.subscription.current_period_end).format(
            'MMM DD, YYYY',
          )}
        </Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.navigate('Subscription')}>
            <Text style={[styles.headerText, {color: Colors.BLACK}]}>
              Change Subscription
            </Text>
          </TouchableOpacity>
          <View
            style={styles.circle}
          />
          <TouchableOpacity onPress={() => setChangeModal(true)}>
            <Text style={styles.headerText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    <CancelSubscription setChangeModal={setChangeModal} changeModal={changeModal} handleCanncel={() => Linking.openURL(cancelURL)}/>
    </>
  );
};
export default Subscribe;
