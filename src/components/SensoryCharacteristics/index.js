import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import Strings from '../../constants/Strings';
import Images from '../../constants/Images';
import styles from './style';
import {px, scaleHeight, scaleWidth} from '../../utils/responsive';
import Colors from '../../constants/Colors';

const SensoryCharacteristics = props => {
  const ARR = [
    {id: 1, img: Images.BABY_MOTHER, caption: Strings.Sensory.AS_PER_SEARCH},
    {id: 2, img: Images.HEART, caption: Strings.Sensory.SELECT_HEART_TO},
    {id: 2, img: Images.CROSS, caption: Strings.Sensory.SELECT_CROSS},
  ];
  return (
    <>
      <Text style={styles?.title}>{Strings.Sensory.ABOUT}</Text>
      <FlatList
        data={ARR}
        renderItem={({item}) => {
          return (
            <View style={styles.container}>
              <Image
                source={item.img}
                // style={{backgroundColor: 'red'}}
                resizeMode="contain"
              />
              <Text style={styles.text}>{item.caption}</Text>
            </View>
          );
        }}
      />
      <TouchableOpacity
        style={{
          width: px(236),
          backgroundColor: Colors.GREEN,
          borderRadius: scaleWidth(40),
          height: scaleHeight(80),
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>{Strings.Sensory.OKAY_GOT_IT}</Text>
      </TouchableOpacity>
    </>
  );
};

export default React.memo(SensoryCharacteristics);
