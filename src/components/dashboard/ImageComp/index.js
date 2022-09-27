import {View, Text, ImageBackground, Image} from 'react-native';
import React from 'react';
import Images from '../../../constants/Images';
import styles from './style';

const ImageComp = ({locationText, code, donerAge, mapIcon, has_happen,image}) => {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={image} style={styles.bgImage} resizeMode='contain'>
        <View style={styles.iconContainer}>
          <Image
            style={styles.iconImage}
            source={
              (has_happen === 'liked' && Images.iconbigheart) ||
              (has_happen === 'disliked' && Images.iconbigcross)
            }
          />
          <View style={styles.textInnerContainer}>
            <View style={styles.innerContainer}>
              <Image source={mapIcon} />
              <Text style={styles.locationText}>{locationText}</Text>
            </View>
            <Text style={styles.codeText}>{code}</Text>
            <Text style={styles.donerAge}>{donerAge}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ImageComp;
