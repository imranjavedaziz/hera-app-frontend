// VIDEO UPLOADING COMPONENT
import React from 'react';
import {
  View
} from 'react-native';
import Strings from '../../constants/Strings';
import style from './style';


const ChatList = props => {
  return (
<View>
    <Text style={style.chatText}>
        {Strings.Chat.Chat}
    </Text>
    <Text style={style.ChatConversation}>
    {Strings.Chat.All_Conversations}
    
    </Text>
</View>
  );
};

export default ChatList;
