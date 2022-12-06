import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './style';
import Images from '../../../../../constants/Images';
import FastImage from 'react-native-fast-image';

const DetailComp = ({Place, Code, DonerType, image}) => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <View style={styles.row}>
          <Image source={Images.iconmapblue} />
          <Text style={styles.locationText}>{Place}</Text>
        </View>
        <Text style={styles.codeText}>#{Code}</Text>
        <Text style={styles.typeText}>{DonerType}</Text>
      </View>
      <FastImage style={styles.Image} source={image} />
    </View>
  );
};

export default DetailComp;
