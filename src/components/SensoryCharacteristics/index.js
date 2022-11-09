import {Text, View, Image, FlatList} from 'react-native';
import React from 'react';
import Strings from '../../constants/Strings';
import Images from '../../constants/Images';
import styles from './style';

const SensoryCharacteristics = props => {
  const ARR = [
    {id: 1, img: Images.BABY_MOTHER, caption: Strings.Sensory.AS_PER_SEARCH},
    {id: 2, img: Images.HEART, caption: Strings.Sensory.SELECT_HEART_TO},
    {id: 2, img: Images.CROSS, caption: Strings.Sensory.SELECT_CROSS},
  ];
  return (
    <FlatList
      data={ARR}
      renderItem={({item}) => {
        return (
          <View style={styles.container}>
            <Image source={item.img} />
            <Text style={styles.text}>{item.caption}</Text>
          </View>
        );
      }}
    />
  );
};

export default React.memo(SensoryCharacteristics);
