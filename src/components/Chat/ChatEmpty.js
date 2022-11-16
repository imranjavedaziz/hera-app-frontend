import React from 'react';
import {View, Text, Image} from 'react-native';
import {Images, Strings} from '../../constants';
import styles from './styles';

const ChatEmpty = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image source={Images.BIG_HEART_GREEN} style={styles.heartImage} />
      <Text style={styles.seemsLikeYouHave}>
        {Strings.Chat.NOT_FOUND_MATCH_YET}
      </Text>
    </View>
  );
};

export default ChatEmpty;
