import {Text, Image, TouchableOpacity, ScrollView, View} from 'react-native';
import React from 'react';
import styles from './styles';
import {Images, Strings} from '../../constants';
import {Value} from '../../constants/FixedValues';

const AboutPayment = props => {
  const {onPress} = props;
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.mainContainer}>
        <Image source={Images.HERA_PAY_LOGO} style={styles.logo} />
        <Text style={[styles?.title, {paddingBottom: Value.CONSTANT_VALUE_0}]}>
          {Strings.About_Payment.HERA_Pay}
        </Text>
        <View style={styles.innerContainer}>
          <Text style={styles?.paraOne}>{Strings.About_Payment.para_one}</Text>
          <Text style={styles?.history}>
            {Strings.About_Payment.transaction_History}
          </Text>
          <Text style={styles?.paraTwo}>{Strings.About_Payment.para_Two}</Text>
          <View style={styles.rowContainer}>
            <Text style={styles.star}>*</Text>
            <Text style={styles?.paraTwo}>
              {Strings.About_Payment.star_para}
            </Text>
          </View>
          <Text style={styles?.history}>
            {Strings.About_Payment.make_payment}
          </Text>
          <Text style={styles?.paraTwo}>
            {Strings.About_Payment.para_Three}
          </Text>
        </View>
        <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
          <Text style={styles.btnText}>{Strings.Sensory.OKAY_GOT_IT}</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default React.memo(AboutPayment);
