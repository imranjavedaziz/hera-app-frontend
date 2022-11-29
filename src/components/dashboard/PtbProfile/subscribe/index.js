import {View, Text, Image, TouchableOpacity, Linking, Platform} from 'react-native';
import React from 'react';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';
import moment from 'moment';

const cancelURL = Platform.select({
  ios: 'https://apps.apple.com/account/subscriptions',
  android: 'https://play.google.com/store/account/subscriptions?package=YOUR_PACKAGE_NAME&sku=YOUR_PRODUCT_ID',
  default: '',
})
const Subscribe = ({MainText, InnerText, Icon}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
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
export const Subscribed = ()=>{
  const {get_user_detail_res} = useSelector(state => state.Edit_profile);
  React.useEffect(()=>{
    console.log('get_user_detail_res',get_user_detail_res.length);
  },[get_user_detail_res])
  if(!get_user_detail_res || !get_user_detail_res.subscription){
    return null;
  }
  return (
    <View style={[styles.container,{height: 'auto',paddingBottom: 20}]}>
      <View style={{flex: 1}}>
        <View style={[styles.row,{justifyContent: 'space-between'}]}>
          <Text style={[styles.mainText,{marginLeft: 0,fontSize: 22,fontWeight: '400'}]}>You are Subscribed</Text>
          <TouchableOpacity onPress={()=>Linking.openURL(cancelURL)}><Text style={styles.headerText}>Cancel</Text></TouchableOpacity>
        </View>
        <Text style={[styles.price,{marginTop: 5}]}>{`$${get_user_detail_res.subscription.price}/${get_user_detail_res.subscription.subscription_interval.substring(0, 2)}`}</Text>
        <Text style={[styles.price,{fontWeight: '500',marginTop: 15}]}>Next Due On: {moment(new Date(get_user_detail_res.subscription.current_period_end)).format("MMM Do, YYYY")}</Text>
      </View>
    </View>
  );
}
export default Subscribe;
