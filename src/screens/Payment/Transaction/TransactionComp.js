import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {Images, Strings, Colors} from '../../../constants';
import {Routes, Fonts} from '../../../constants/Constants';
import {convertDateFormat, getCardImage} from '../../../utils/commonFunction';
import moment from 'moment';

export const TransactionItem = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{flex: 1}}
      onPress={() => navigation.navigate(Routes.TransactionDetails, item)}>
      <View style={[styles.transRow, {justifyContent: 'space-between'}]}>
        <Text style={styles.transId}>{`Transaction ID: ${item?.id}`}</Text>
        {item?.role === 2 && <TransactionStatus status={item?.payout_status} />}
      </View>
      <View style={styles.transRow}>
        <Image source={{uri: item?.profile_pic}} style={styles.transImg} />
        <View style={styles.transColumn}>
          {item?.role === 2 && (
            <Text
              style={
                styles.transName
              }>{`$${item?.amount} Sent to #${item?.username}`}</Text>
          )}
          {item?.role === 2 && (
            <View style={[styles.wrapRow, {marginTop: 5}]}>
              <Text style={styles.transDetail}>{`Paid by Card:`}</Text>
              <Image
                source={
                  item?.brand ? getCardImage(item?.brand) : Images.ICON_MASTER
                }
                style={{height: 20, resizeMode: 'contain'}}
              />
              <Text style={styles.transDetail}>{`●●●● ${item?.last4}`}</Text>
            </View>
          )}

          {item?.role !== 2 && (
            <Text
              style={
                styles.transName
              }>{`$${item?.amount} from ${item?.username}`}</Text>
          )}
          {item?.role !== 2 && (
            <Text style={[styles.transDetail, {marginTop: 5}]}>
              {`Sent to: ●●●● ${item?.bank_last4} (${item?.bank_name})`}
            </Text>
          )}
          <Text style={styles.transDate}>
            {moment(item?.created_at).calendar()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const ItemSeperator = React.memo(() => (
  <View style={styles.seperator} />
));

export const ListHeader = React.memo(({isShow = true}) => {
  if (isShow) {
    return <Text style={styles.title}>{Strings.Transaction.title}</Text>;
  }
  return null;
});

export const EmptyList = React.memo(() => (
  <View style={styles.EmptymainContainer}>
    <Text style={styles.emptyText}>{Strings.Transaction.emptyTitle}</Text>
    <Text style={styles.secondEmptyText}>{Strings.Transaction.emptyDesc}</Text>
  </View>
));

export const TransactionStatus = React.memo(({status = 0}) => {
  switch (status.toString()) {
    case '2':
      return (
        <View style={styles.wrapRow}>
          <Image
            source={Images.path}
            style={[styles.statusIcon, {tintColor: Colors.BLUE}]}
          />
          <Text style={[styles.transStatus, {color: Colors.BLUE}]}>Paid</Text>
        </View>
      );
    case '3':
      return (
        <View style={styles.wrapRow}>
          <Image source={Images.WARNING_RED} style={styles.statusIcon} />
          <Text style={[styles.transStatus, {color: Colors.RED}]}>Failed</Text>
        </View>
      );
    default:
      return (
        <View style={styles.wrapRow}>
          <Image source={Images.TIME} style={styles.statusIcon} />
          <Text style={[styles.transStatus, {color: Colors.COLOR_747474}]}>
            In Process
          </Text>
        </View>
      );
  }
});
