import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import {Images, Strings} from '../../constants';

const PaymentCards = ({Number, Time, Icon, onPress}) => {
  return (
    <>
      <View style={styles.cardsContainer}>
        <Image source={Icon} />
        <View style={styles.cardsInner}>
          <Text style={styles.cardNo}>{Number}</Text>
          <Text style={styles.cardTime}>{Time}</Text>
        </View>
        <TouchableOpacity onPress={onPress}>
          <Image source={Images.iconDarkMore} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default React.memo(PaymentCards);
