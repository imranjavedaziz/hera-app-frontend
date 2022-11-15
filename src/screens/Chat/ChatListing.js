import React, {useEffect, useRef, useState, useCallback} from 'react';
import {View, Text} from 'react-native';
import {Chat_listing_Comp, Container} from '../../components';
import {IconHeader} from '../../components/Header';
import {Images, Strings} from '../../constants';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import { useSelector } from "react-redux";
import chatHistory from '../../hooks/chatHistory'
import { FlatList } from 'react-native-gesture-handler';
import { isTabletMode } from 'react-native-device-info';
import moment from 'moment';
import {Routes} from '../../constants/Constants/'
const ChatListing = () => {
  const navigation = useNavigation();
    // const auth = useSelector((state) => state.auth.user);
    const chats = useSelector((state) => state.Chat.chats);
    // const matchedUsers = useSelector((state) => state.chat.matchedUsers);
    const [matches, setMatches] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    // const chatData = chatHistory(auth.user);
    const chatData = chatHistory();
    const [searched, setSearched] = useState('');
    const fetchData = useCallback(() => {
      chatData.update();
      // matchedList(setRefreshing, setMatches);
    }, []);

    const {log_in_data} = useSelector(state => state.Auth);

    console.log(log_in_data.id,'log_in_data::::::')
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      fetchData();
    }, []);
    useEffect(() => {
      return navigation.addListener('focus', fetchData);
    }, [navigation]);
    console.log(chats,'chats::::::::::::')
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      leftPress={() => navigation.goBack()}
      style={styles.header}
    />
  );
  const renderChatList = ({item, index}) => {
    return (
      <Chat_listing_Comp
          image={item.recieverImage}
          name={item.recieverName}
          onPress={()=>navigation.navigate(Routes.ChatDetail,{item:item})}
          message={item.message}
          time={moment.unix(item.time, "YYYYMMDD").fromNow()}
          latest={true}
        />
    );
  };
  return (
    <Container
      mainStyle={true}
      scroller={false}
      showHeader={true}
      headerComp={headerComp}>
        <View style={{flex:1,marginTop:25}}>
      <View style={styles.mainContainer}>
        <Text style={styles.Inbox}>{Strings.INBOX}</Text>
        <Text style={styles.Match}>{Strings.All_Matches}</Text>
        </View>
    
         <FlatList
              data={chats}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderChatList}
             
            />
   
      </View>
    </Container>
  );
};

export default ChatListing;
