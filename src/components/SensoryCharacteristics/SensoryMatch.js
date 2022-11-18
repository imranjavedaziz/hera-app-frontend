import { Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import Strings from '../../constants/Strings';
import styles from './styles';
import Images from '../../constants/Images';
import { Value } from '../../constants/FixedValues';

const SensoryMatch = props => {
  const { onPress } = props;
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={Images.SERCHING} style={[styles.logo, { marginLeft: 20 }]} />
        <Text style={[styles?.title, { paddingBottom: Value.CONSTANT_VALUE_0 }]}>{Strings.Sensory.FIND_THE_PERFECT}</Text>
        <Text style={styles?.hasTwo}>{Strings.Sensory.FIND_YOUR_MATCH}</Text>
        <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
          <Text style={styles.btnText}>{Strings.Sensory.OKAY_GOT_IT}</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default React.memo(SensoryMatch);
