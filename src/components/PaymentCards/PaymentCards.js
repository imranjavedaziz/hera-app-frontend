import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import {Alignment, Images} from '../../constants';
import {dynamicSize} from '../../utils/responsive';
import {Value} from '../../constants/FixedValues';
const PaymentCards = ({number, Time, Icon, onPress}) => {
  function getCardImage(cardType) {
    switch (cardType) {
      case 'Visa':
        return Images.iconVisacardbig;
      case 'MasterCard':
        return Images.iconMasterbig;

      case 'American Express':
        return Images.iconAmexbig;

      case 'UnionPay':
        return Images.iconUnionPaybig;

      case 'JCB':
        return Images.iconJcbbig;

      case 'Discover':
        return Images.iconDiscoverbig;
      default:
        return Images.defaultCardbig;
    }
  }
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
