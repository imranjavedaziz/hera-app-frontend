import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import React from 'react';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Colors, Images, Strings } from '../../../../constants';
import { Fonts } from '../../../../constants/Constants';

const cancelURL = Platform.select({
  ios: 'https://apps.apple.com/account/subscriptions',
  android:
    'https://play.google.com/store/account/subscriptions?package=YOUR_PACKAGE_NAME&sku=YOUR_PRODUCT_ID',
  default: '',
});
const Subscribe = ({ MainText, InnerText, Icon, is_trial }) => {
  console.log("LINE NUMBER 24",is_trial);
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
  const { get_user_detail_res } = useSelector(state => state.Edit_profile);
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
    <View style={[styles.container(), { height: 'auto', paddingVertical: 17, borderColor: Colors.COLOR_A3C6C4, }]}>
      <View style={{ flex: 1, }}>
        <View style={[styles.row, { justifyContent: 'space-between' }]}>
          <Text
            style={[
              styles.mainText,
              { marginLeft: 0, fontSize: 20, fontWeight: '400', fontFamily: Fonts.OpenSansRegular, },
            ]}>
            You are Subscribed
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL(cancelURL)}>
            <Text style={styles.headerText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.price, { marginTop: 5 }]}>{`$${get_user_detail_res.subscription.price
          }/${get_user_detail_res.subscription.subscription_interval === 'month' ? 'mo' : 'yr'}`}</Text>
        <Text style={[styles.price, { fontWeight: '500', marginTop: 10, fontFamily: Fonts.OpenSansBold }]}>
          Next Due On:{' '}
          {moment(
            new Date(get_user_detail_res.subscription.current_period_end),
          ).format('MMM DD, YYYY')}
        </Text>
      </View>
    </View>
  );
};
export default Subscribe;
