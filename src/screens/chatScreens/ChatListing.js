import React, { useEffect, useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import { Chat_listing_Comp, Container } from '../../components';
import { IconHeader } from '../../components/Header';
import { Colors, Images, Strings } from '../../constants';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import chatHistory from '../../hooks/chatHistory';
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment';
import { Routes } from '../../constants/Constants/';
import ChatEmpty from '../../components/Chat/ChatEmpty';
const ChatListing = () => {
  const navigation = useNavigation();
  const chats = useSelector(state => state.Chat.chats);
  const [filterChat,setFilterChat] = useState([])
  const chatData = chatHistory();
  const fetchData = useCallback(() => {
    chatData.update();
    setLoader(false);
   let filterData= chats.filter((data)=>{
return data?.match_request?.status === 2
    })
    setFilterChat(filterData)
  }, []);
  const [loader, setLoader] = useState(true);
  const { log_in_data } = useSelector(state => state.Auth);
  useEffect(() => {
    return navigation.addListener('focus', fetchData);
  }, [navigation]);
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      leftPress={() => navigation.goBack()}
      style={{ marginTop: 10 }}
    />
  );

  const ROLL_ID_2 = log_in_data.role_id === 2
    ? Strings.All_Matches
    : Strings.Chat.All_Conversations
  const ROLL_ID_INBOX = log_in_data.role_id === 2
    ? Strings.INBOX
    : Strings.Chat.Chat
  const renderChatList = ({ item }) => {
    return (
      <>
        {
          item !== null && item?.match_request?.status === 2 &&
          <Chat_listing_Comp
            currentRole={item?.currentRole}
            image={item?.recieverImage}
            name={
              log_in_data?.role_id === 2
                ? `#${item?.recieverUserName}`
                : item?.recieverName
            }
            onPress={() => navigation.navigate(Routes.ChatDetail, { item: item })}
            message={item?.message}
            read={item?.read}
            time={moment.unix(item?.time, 'YYYYMMDD').fromNow()}
            latest={true}
            roleId={log_in_data?.role_id}
            match={item?.match_request?.status}
          />
        }
      </>
    );
  };
  return (
    <Container
      mainStyle={true}
      scroller={false}
      showHeader={true}
      headerComp={headerComp}
      safeAreViewStyle={{ backgroundColor: Colors.BACKGROUND }}>
      {loader === false && (
        <>
          {chats && chats?.length > 0  ? (
            <View style={{ flex: 1, marginTop: 25 }}>
              <View style={styles.mainContainer}>
                <Text style={styles.Inbox}> {ROLL_ID_INBOX}</Text>
                <Text style={styles.Match}>{ROLL_ID_2}</Text>
              </View>
              <FlatList
                data={filterChat}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderChatList}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          ) : (
            <ChatEmpty />
          )}
        </>
      )}
    </Container>
  );
};

export default ChatListing;