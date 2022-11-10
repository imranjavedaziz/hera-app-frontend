// VIDEO UPLOADING COMPONENT
import React from 'react';
import {View} from 'react-native';
import Strings from '../../constants/Strings';
import style from './style';

const ChatList = props => {
  return (
    <View>
      <Text style={style.chatText}>{Strings.Chat.Chat}</Text>
      <Text style={style.ChatConversation}>
        {Strings.Chat.All_Conversations}
      </Text>
      <View>
        <View style={style.profileImageOverlay}>
          <View style={style.profileImage} />
          <Text style={style.ChatConversation}>#SM5890</Text>
          <Text>
            I have a good exposure to different cultures of the world.
          </Text>
          <Text>JUST NOW</Text>
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: '#98c8c2',
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: '#ffffff',
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ChatList;
