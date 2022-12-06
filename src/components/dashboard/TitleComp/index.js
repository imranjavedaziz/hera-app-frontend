import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './style';

const TitleComp = props => {
  const {Title, Subtitle, Icon, isCenter, Midtitle, onPress, containerStyle} =
    props;
  return (
    <View style={[styles.mainContainer, containerStyle]}>
      <Text style={styles.screenTitle}>{Title}</Text>
      <Text style={styles.screenSubTitle} onPress={onPress}>
        {Subtitle}
      </Text>
      {isCenter === true && <Text style={styles.midTitle}>{Midtitle}</Text>}
      <Image style={styles.Icon} source={Icon} />
    </View>
  );
};

export default TitleComp;
