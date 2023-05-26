import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import {Value} from '../../../../constants/FixedValues';
import {Colors} from '../../../../constants';

const AccountSetting = ({
  Heading,
  Content,
  Icon,
  red = false,
  line,
  onPress,
  map,
  DATA,
}) => {
  return (
    <>
      <TouchableOpacity style={styles.mainContainer} onPress={onPress}>
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
            <Text style={red ? styles.Deactivate : styles.heading}>
              {Heading}
            </Text>
          </View>
          {map &&
            DATA.map(item => {
              console.log(item, 'item');
              return (
                <View key={item.id} style={styles.ContextRow}>
                  <View style={styles.dot} />
                  <Text style={styles.desTexts}>{item.name}</Text>
                </View>
              );
            })}
        </View>
      </TouchableOpacity>
    </>
  );
};

export default AccountSetting;
