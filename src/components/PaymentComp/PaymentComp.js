import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import {Value} from '../../constants/FixedValues';
import {Colors} from '../../constants';
import {dynamicSize} from '../../utils/responsive';

const PaymentComp = ({Heading,payment, Content, Icon, line, onPress, Pending}) => {
  return (
    <>
      <TouchableOpacity activeOpacity={payment && 1} style={styles.mainContainer} onPress={onPress}>
        <View
          style={[
            styles.innerContainer,
            line && {
              borderBottomWidth: Value.CONSTANT_VALUE_2,
              borderColor: Colors.INPUT_BORDER,
            },
          ]}>
          <View style={styles.innerView}>
            <Image style={styles.Icon} source={Icon} />
            <Text style={styles.heading}>{Heading}</Text>
          </View>
          <Text
            style={[
              styles.toggle,
              {
                marginLeft: dynamicSize(Value.CONSTANT_VALUE_33),
                marginTop: dynamicSize(Value.CONSTANT_VALUE_5),
              },
            ]}>
            {Content}
          </Text>
          {Pending && (
            <View
              style={[
                styles.innerView,
                {
                  marginLeft: dynamicSize(Value.CONSTANT_VALUE_33),
                  marginTop: dynamicSize(Value.CONSTANT_VALUE_5),
                },
              ]}>
              <View style={styles.dot}/>
              <Text style={styles.pending}>{Pending}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

export default React.memo(PaymentComp);
