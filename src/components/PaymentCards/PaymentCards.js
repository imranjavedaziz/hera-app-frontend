import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import {Images} from '../../constants';
import {dynamicSize} from '../../utils/responsive';
import { Value } from '../../constants/FixedValues';

const PaymentCards = ({Number, Time, Icon, onPress}) => {
  return (
    <>
      <View style={styles.cardsContainer}>
        <Image source={Icon} style={styles.cardImg}/>
        <View style={styles.cardsInner}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={[
                styles.reddot,
                {marginRight: dynamicSize(Value.CONSTANT_VALUE_2)},
              ]}
            />
            <View
              style={[
                styles.reddot,
                {marginRight: dynamicSize(Value.CONSTANT_VALUE_2)},
              ]}
            />
            <View
              style={[
                styles.reddot,
                {marginRight: dynamicSize(Value.CONSTANT_VALUE_2)},
              ]}
            />
            <View
              style={[
                styles.reddot,
                {marginRight: dynamicSize(Value.CONSTANT_VALUE_5)},
              ]}
            />
            <Text style={styles.cardNo}>{Number}</Text>
          </View>
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
