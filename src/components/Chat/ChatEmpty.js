import React from 'react';
import {View, Text,Image} from 'react-native';
import {Container} from '..';

import {Colors, Images, Strings} from '../../constants';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';


const ChatEmpty = () => {
    const navigation = useNavigation();
    const headerComp = () => (
        <IconHeader
          leftIcon={Images.circleIconBack}
          leftPress={() => navigation.goBack()}
          style={styles.header}
        />
      );
  return (
   
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Image source={Images.BIG_HEART_GREEN} style={styles.heartImage} />
      <Text style={styles.seemsLikeYouHave}>{Strings.Chat.NOT_FOUND_MATCH_YET}</Text>
      </View>
   
  );
};

export default ChatEmpty;
