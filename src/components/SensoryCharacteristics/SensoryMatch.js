import {Text, Image, TouchableOpacity, ScrollView, View} from 'react-native';
import React from 'react';
import Strings from '../../constants/Strings';
import styles from './styles';
import Images from '../../constants/Images';
import {Value} from '../../constants/FixedValues';

const SensoryMatch = props => {
  const {onPress} = props;
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.scrollContainer}>
        <Image
          source={Images.SERCHING}
          style={[styles.logo, {marginLeft: 20}]}
        />
        <Text style={[styles?.title, {paddingBottom: Value.CONSTANT_VALUE_13}]}>
          {Strings.Sensory.FIND_THE_PERFECT}
        </Text>
        <Text style={styles?.paragraph1}>{Strings.Sensory.PARA1}</Text>
        <Text style={styles?.h2}>{Strings.Sensory.heading1}</Text>
        <Text style={styles?.paragraph1}>{Strings.Sensory.PARA2}</Text>
        <Text style={styles?.h2}>{Strings.Sensory.heading2}</Text>
        <Text style={styles?.paragraph}>{Strings.Sensory.PARA3}</Text>
        <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
          <Text style={styles.btnText}>{Strings.Sensory.OKAY_GOT_IT}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default React.memo(SensoryMatch);
