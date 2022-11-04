import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './style';

const TitleComp = ({Title, Subtitle, Icon,isCenter,Midtitle}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.screenTitle}>{Title}</Text>
      <Text style={styles.screenSubTitle}>{Subtitle}</Text>
      {
        isCenter===true&&
        <Text style={styles.midTitle}>{Midtitle}</Text>
      }
      <Image style={styles.Icon} source={Icon} />
    </View>
  );
};

export default TitleComp;




