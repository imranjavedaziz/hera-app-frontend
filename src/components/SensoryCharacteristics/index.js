import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import Strings from '../../constants/Strings';
import styles from './styles';
import { SENSORY_ARR } from '../../constants/Constants';
import Images from '../../constants/Images';

const SensoryCharacteristics = props => {
  const { onPress } = props;
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <Image source={Images.CROSS_ICON} style={styles.crossIcon} />
      </TouchableOpacity>
      <Text style={styles?.title}>{Strings.Sensory.ABOUT}</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {SENSORY_ARR.map((item, index) => <View style={styles.container}>
          <Image
            source={item.img}
            resizeMode="contain"
          />
          <Text style={styles.text}>{item.caption}</Text>
        </View>)}
        <TouchableOpacity
          style={styles.btnContainer}>
          <Text style={styles.btnText}>{Strings.Sensory.OKAY_GOT_IT}</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default React.memo(SensoryCharacteristics);
