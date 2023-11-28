import React from 'react';
import {Image, Linking, TouchableOpacity, View} from 'react-native';
import {Images} from '../../constants';
import styles from './styles';

export function BannerAd({spaceAbove}) {
  const onPressAd = () => {
    Linking.openURL('https://joyoflife.com/').catch(err => {
      console.error(err);
    });
  };

  return (
    <View style={{marginTop: spaceAbove ? 30 : 0}}>
      <TouchableOpacity onPress={() => onPressAd()}>
        <Image
          source={Images.joyOfLifeAd}
          style={styles.joyOfLifeAd}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}
