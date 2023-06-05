import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import Strings from '../../constants/Strings';
import styles from './styles';
import {SENSORY_ARR} from '../../constants/Constants';
import {Value} from '../../constants/FixedValues';
import {px} from '../../utils/responsive';

const SensoryCharacteristics = props => {
  const {onPress} = props;
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingVertical: px(Value.CONSTANT_VALUE_30)}}>
        <Text style={styles?.title}>{Strings.Sensory.ABOUT}</Text>
        {SENSORY_ARR.map((item, index) => {
          return (
            <View style={[styles.container]}>
              <Image
                source={item.img}
                style={{width: px(Value.CONSTANT_VALUE_112)}}
                resizeMode="contain"
              />
              <Text style={styles.text}>{item.caption}</Text>
            </View>
          );
        })}
        <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
          <Text style={styles.btnText}>{Strings.Sensory.OKAY_GOT_IT}</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default React.memo(SensoryCharacteristics);
