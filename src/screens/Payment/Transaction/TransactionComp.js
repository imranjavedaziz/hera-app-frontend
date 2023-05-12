import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {Images, Strings, Colors} from '../../../constants';
import {Fonts, Routes} from '../../../constants/Constants';

export const TransactionItem = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={{flex: 1}} onPress={()=>navigation.navigate(Routes.TransactionDetails,item)}>
      <View style={[styles.transRow, {justifyContent: 'space-between'}]}>
        <Text style={styles.transId}>{`Transaction ID: ${item?.id}`}</Text>
        <TransactionStatus status={item?.status} />
      </View>
      <View style={styles.transRow}>
        <Image source={Images.BABY_MOTHER} style={styles.transImg} />
        <View style={styles.transColumn}>
          {item?.role === 2 && (
            <Text
              style={
                styles.transName
              }>{`$${item?.amount} Sent to #${item?.name}`}</Text>
          )}
          {item?.role === 2 && (
            <View style={[styles.wrapRow,{marginTop: 5}]}>
                <Text style={styles.transDetail}>
                {`Paid by Card:`}
                </Text>
                <Image source={Images.ICON_MASTER} style={{height: 20,resizeMode: 'contain'}}/>
                <Text style={styles.transDetail}>
                {`●●●● ${item?.card}`}
                </Text>
            </View>
          )}

          {item?.role !== 2 && (
            <Text
              style={
                styles.transName
              }>{`$${item?.amount} from ${item?.name}`}</Text>
          )}
          {item?.role !== 2 && (
            <Text style={[styles.transDetail,{marginTop: 5}]}>
              {`Sent to: ●●●● ${item?.card} (${item?.bank})`}
            </Text>
          )}
          <Text style={styles.transDate}>{item?.date}</Text>
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
  <View style={styles.mainContainer}>
    <Text style={styles.emptyText}>{Strings.Transaction.emptyTitle}</Text>
    <Text style={styles.secondEmptyText}>{Strings.Transaction.emptyDesc}</Text>
  </View>
));

export const TransactionStatus = React.memo(({status = 0}) => {
  switch (status.toString()) {
    case '1':
      return (
        <View style={styles.wrapRow}>
          <Image
            source={Images.path}
            style={[styles.statusIcon, {tintColor: Colors.BLUE}]}
          />
          <Text style={[styles.transStatus, {color: Colors.BLUE}]}>Paid</Text>
        </View>
      );
    case '2':
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
            Pending
          </Text>
        </View>
      );
  }
});
