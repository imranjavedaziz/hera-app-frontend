import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import {Alignment, Images} from '../../constants';
import {dynamicSize} from '../../utils/responsive';
import {Value} from '../../constants/FixedValues';
import {getCardImage} from '../../utils/commonFunction';
const PaymentCards = ({number, Time, Icon, onPress}) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.cardsContainer}>
        <Image source={getCardImage(Icon)} style={styles.cardImg} />
        <View style={{marginLeft: dynamicSize(Value.CONSTANT_VALUE_11)}}>
          <Text style={styles.cardNo}>{number}</Text>
          <Text style={styles.cardTime}>{Time}</Text>
        </View>
      </View>
      <View>
        <View style={{justifyContent: Alignment.FLEXEND}}>
          <TouchableOpacity onPress={onPress}>
            <Image source={Images.iconDarkMore} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default React.memo(PaymentCards);
