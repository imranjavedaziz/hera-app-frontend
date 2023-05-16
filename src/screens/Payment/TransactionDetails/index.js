// TransactionDetails
import {View, Text, Image, TouchableOpacity, Clipboard} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {Images, Strings, Colors} from '../../../constants';
import {Container} from '../../../components';
import {Fonts, Routes} from '../../../constants/Constants';
import {TransactionStatusCircle, Seperator} from './TransactionDetailsComp';

import {TransactionStatus} from '../Transaction/TransactionComp';

import moment from 'moment';
import {ToastAndroid} from 'react-native';
const TransactionDetails = ({route}) => {
  const navigation = useNavigation();
  const redirectTo = route?.params?.redirectTo || '';
  const OnDone = () => {
    if (route?.params?.role === 2) {
      if (redirectTo !== '' && redirectTo === Routes.ChatDetail) {
        navigation.navigate(Routes.ChatDetail, {
          ...route?.params?.ChatItem,
        });
      } else if (
        redirectTo !== '' &&
        redirectTo === Routes.DashboardDetailScreen
      ) {
        navigation.navigate(Routes.DashboardDetailScreen, {
          ...route?.params,
        });
      } else if (route?.params?.payment) {
        navigation.navigate(Routes.HeraPay);
      } else {
        navigation.goBack();
      }
    } else {
      navigation.goBack();
    }
    console.log(route?.params, 'ihhii');
  };
  const headerComp = () => (
    <TouchableOpacity
      onPress={() => {
        OnDone();
      }}>
      <Text style={[styles.doneText]}>Done</Text>
    </TouchableOpacity>
  );
  const handleCopyPaymentIntent = () => {
    const paymentIntent = route?.params?.payment_intent;
    if (paymentIntent) {
      Clipboard.setString(paymentIntent);
    }
  };
  return (
    <Container
      mainStyle={false}
      scroller={true}
      showHeader={true}
      fixedHeader={true}
      headerEnd={true}
      headerComp={headerComp}
      safeAreViewStyle={{backgroundColor: Colors.BACKGROUND}}>
      <View style={styles.flex}>
        <View style={styles.mainContainer}>
          <View style={{marginVertical: 30}}>
            <Image
              source={{uri: route?.params?.profile_pic}}
              style={styles.userImg}
            />
            <TransactionStatusCircle status={route?.params?.payout_status} />
          </View>
          {route?.params?.role === 2 && (
            <Text style={styles.heading}>
              {Strings.TransDetail.paymentTo.replace(
                '{DONOR_ID}',
                `#${route?.params?.username}`,
              )}
            </Text>
          )}
          {route?.params?.role !== 2 && (
            <Text style={styles.heading}>
              {Strings.TransDetail.paymentFrom
                .replace('{AMOUNT}', route?.params?.amount)
                .replace('{USER_NAME}', route?.params?.username)}
            </Text>
          )}
          {route?.params?.role !== 2 && <Seperator />}
          <Text
            style={[
              styles.title,
              {textAlign: route?.params?.role !== 2 ? 'left' : 'center'},
            ]}>
            {Strings.TransDetail.title}
          </Text>
          {route?.params?.role === 2 && (
            <>
              <View style={[styles.bottomRow, styles.spaceBetween]}>
                <Text style={styles.transDetail}>
                  {Strings.TransDetail.paidAmount}
                </Text>
                <Text
                  style={[
                    styles.transDetail,
                    {fontFamily: Fonts.OpenSansBold},
                  ]}>
                  {Number.isInteger(route?.params?.amount)
                    ? `$${route?.params?.amount}.00`
                    : `$${route?.params?.amount}`}
                </Text>
              </View>
              <View style={[styles.bottomRow, styles.spaceBetween]}>
                <Text style={styles.transDetail}>
                  {Strings.TransDetail.transFee}
                </Text>
                <Text
                  style={[
                    styles.transDetail,
                    {fontFamily: Fonts.OpenSansBold},
                  ]}>
                  {`$${(
                    route?.params?.net_amount - route?.params?.amount
                  ).toFixed(2)}`}
                </Text>
              </View>
              <Seperator />
              <View
                style={[
                  styles.bottomRow,
                  styles.spaceBetween,
                  {marginBottom: 0},
                ]}>
                <Text style={styles.transDetail}>
                  {Strings.TransDetail.totalAmount}
                </Text>
                <Text
                  style={[
                    styles.transDetail,
                    {fontFamily: Fonts.OpenSansBold},
                  ]}>
                  {`$${route?.params?.net_amount}`}
                </Text>
              </View>
              <Seperator />
            </>
          )}
          <View style={{flex: 1, width: '100%'}}>
            <View style={styles.bottomRow}>
              <Text style={[styles.transDetail, {alignSelf: 'baseline'}]}>
                {Strings.TransDetail.transId}
              </Text>
              <Text
                numberOfLines={2}
                style={[
                  styles.transDetail,
                  {width: '70%', fontFamily: Fonts.OpenSansBold},
                ]}
                onPress={() => handleCopyPaymentIntent()}>
                {route?.params?.payment_intent}
              </Text>
            </View>
            <View style={styles.bottomRow}>
              <Text style={styles.transDetail}>
                {Strings.TransDetail.trans}
              </Text>
              <TransactionStatus status={route?.params?.status} />
            </View>
            {route?.params?.role === 2 && (
              <View style={styles.bottomRow}>
                <Text style={styles.transDetail}>
                  {Strings.TransDetail.paidByCard}
                </Text>
                <Image
                  source={Images.ICON_MASTER}
                  style={{height: 20, resizeMode: 'contain'}}
                />
                <Text
                  style={[
                    styles.transDetail,
                    {fontFamily: Fonts.OpenSansBold, fontSize: 16},
                  ]}>{`●●●● ${route?.params.last4}`}</Text>
              </View>
            )}
            {route?.params?.role !== 2 && (
              <View style={styles.bottomRow}>
                <Text style={styles.transDetail}>
                  {Strings.TransDetail.sentTo}
                </Text>
                <Image
                  source={Images.BANK_LOGO}
                  style={{height: 20, resizeMode: 'contain'}}
                />
                <Text
                  style={[
                    styles.transDetail,
                    {fontFamily: Fonts.OpenSansBold, fontSize: 16},
                  ]}>{`●●●● ${route?.params.bank_last4} (${route?.params.bank_name})`}</Text>
              </View>
            )}
            <View style={styles.bottomRow}>
              <Text style={styles.transDetail}>
                {Strings.TransDetail.paidOn}
              </Text>
              <Text
                style={[
                  styles.transDetail,
                  {fontFamily: Fonts.OpenSansBold, fontSize: 16},
                ]}>
                {moment(route?.params.created_at).calendar()}
              </Text>
            </View>
            {route?.params?.role !== 2 && (
              <Text style={styles.smDonorPara}>
                <Text style={{color: Colors.RED}}>*</Text> A processing fee is
                applied for every payment that you receive. An amount $
                {(route?.params?.net_amount - route?.params?.amount).toFixed(2)}{' '}
                has been charged for this transaction.
              </Text>
            )}
          </View>
        </View>
      </View>
    </Container>
  );
};
export default TransactionDetails;
