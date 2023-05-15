import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {Alignment, Images, Colors} from '../../../constants';
import {dynamicSize} from '../../../utils/responsive';
import {Value} from '../../../constants/FixedValues';
import {Fonts} from '../../../constants/Constants';

const ConfirmCardComp = ({number, Time, Icon, index, onPress, value, Data}) => {
  function getCardImage(cardType) {
    const cardTypeLowercase = cardType.toLowerCase();
    const cardTypeToImageMap = {
      visa: Images.iconVisacardbig,
      mastercard: Images.iconMasterbig,
      'american express': Images.iconAmexbig,
      unionpay: Images.iconUnionPaybig,
      jcb: Images.iconJcbbig,
      discover: Images.iconDiscoverbig,
      amex: Images.iconAmexbig,
    };
    return cardTypeToImageMap[cardTypeLowercase] || Images.defaultCardbig;
  }
  return (
    <>
      {Data.length > 1 ? (
        <TouchableOpacity
          key={index}
          activeOpacity={1}
          onPress={onPress}
          style={styles.mainView}>
          <Image
            style={{resizeMode: 'contain'}}
            source={
              value === index ? Images.iconRadiosel : Images.iconRadiounsel
            }
          />
          <View style={styles.cardsContainer}>
            <Image source={getCardImage(Icon)} style={styles.cardImg} />
            <View style={{marginLeft: dynamicSize(Value.CONSTANT_VALUE_11)}}>
              <Text style={styles.cardNo}>{number}</Text>
              <Text style={styles.cardTime}>{Time}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.mainView}>
          <View style={styles.cardsContainer}>
            <Image
              source={getCardImage(Icon)}
              style={Data.length > 1 ? styles.cardImg : styles.cardImgSingle}
            />
            <View style={{marginLeft: dynamicSize(Value.CONSTANT_VALUE_11)}}>
              <Text style={styles.cardNo}>{number}</Text>
              <Text style={styles.cardTime}>{Time}</Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.FLEX_START,
  },
  mainView: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    paddingVertical: 22,
  },

  cardImg: {
    marginLeft: dynamicSize(Value.CONSTANT_VALUE_14),
  },
  cardImgSingle: {
    height: Value.CONSTANT_VALUE_32,
    width: Value.CONSTANT_VALUE_51,
  },
  cardNo: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_16,
    color: Colors.BLACK,
  },
  cardTime: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_13,
    color: Colors.BLACK,
  },
});
export default React.memo(ConfirmCardComp);
