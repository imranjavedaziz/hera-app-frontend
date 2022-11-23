import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, RefreshControl} from 'react-native';
import {Chat_listing_Comp, Container} from '../../components';
import {IconHeader} from '../../components/Header';
import {Colors, Images, Strings} from '../../constants';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import chatHistory from '../../hooks/chatHistory';
import {FlatList} from 'react-native-gesture-handler';
import moment from 'moment';
import {Routes} from '../../constants/Constants/';
import ChatEmpty from '../../components/Chat/ChatEmpty';
import {chat} from '../../constants/Constants';
import database from '@react-native-firebase/database';
const ChatListing = props => {
  const navigation = useNavigation();
  const chats = useSelector(state => state.Chat.chats);
  const [refreshing, setRefreshing] = useState(false);
  const chatData = chatHistory();
  const fetchData = useCallback(() => {
    chatData.update();
    setLoader(false);
    setRefreshing(false);
  }, []);

  const [loader, setLoader] = useState(true);
  const [notRead, setNotRead] = useState(false);
  const {log_in_data} = useSelector(state => state.Auth);
  useEffect(() => {
    return navigation.addListener('focus', fetchData);
  }, [navigation]);
  useEffect(() => {
    let obj = chats.find(o => {
      o.read === 0 ? setNotRead(false) : setNotRead(true);
    });
    return obj;
  }, []);
  const NavigateFunc = () => {
    if (log_in_data?.role_id === 2) {
      navigation.navigate(Routes.PtbDashboard, {
        msgRead: notRead,
      });
    } else {
      navigation.navigate(Routes.SmDashboard, {
        msgRead: notRead,
      });
    }
  };
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      leftPress={() => NavigateFunc()}
      style={{marginTop: 10}}
    />
  );
  useEffect(() => {
    database()
      .ref(`${chat}/Users/${log_in_data?.id}`)
      .on('value', async (snapshot, _previousChildKey) => {
        fetchData();
      });
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);
  const ROLL_ID_2 =
    log_in_data.role_id === 2
      ? Strings.All_Matches
      : Strings.Chat.All_Conversations;
  const ROLL_ID_INBOX =
    log_in_data.role_id === 2 ? Strings.INBOX : Strings.Chat.Chat;
  const renderChatList = ({item}) => {
    let time = new Date(item?.time);

    return (
      <>
        {item !== null && item?.match_request?.status === 2 && (
          <Chat_listing_Comp
            currentRole={item?.currentRole}
            chatStart={item?.chat_start}
            image={item?.recieverImage}
            name={
              log_in_data?.role_id === 2
                ? `#${item?.recieverUserName}`
                : item?.recieverName
            }
            onPress={() =>
              navigation.navigate(Routes.ChatDetail, {
                item: item,
                isComingFrom: false,
              })
            }
            message={item?.message}
            read={item?.read}
            time={
              item?.time !== undefined && moment(time, 'YYYYMMDD').fromNow()
            }
            latest={true}
            roleId={log_in_data?.role_id}
            match={item?.match_request?.status}
          />
        )}
        {item !== null &&
          item?.match_request?.status === 1 &&
          log_in_data.role_id !== 2 && (
            <Chat_listing_Comp
              currentRole={item?.currentRole}
              image={item?.recieverImage}
              name={
                log_in_data?.role_id === 2
                  ? `#${item?.recieverUserName}`
                  : item?.recieverName
              }
              onPress={() =>
                item?.match_request?.status === 1
                  ? navigation.navigate(Routes.Chat_Request, {
                      user: item?.match_request,
                      item: item,
                    })
                  : navigation.navigate(Routes.ChatDetail, {item: item})
              }
              message={item?.message}
              read={item?.read}
              time={
                item?.time !== undefined && moment(time, 'YYYYMMDD').fromNow()
              }
              latest={true}
              roleId={log_in_data?.role_id}
              match={item?.match_request?.status}
              chatStart={item?.chat_start}
            />
          )}
      </>
    );
  };

  return (
    <Container
      mainStyle={true}
      scroller={false}
      showHeader={true}
      headerComp={headerComp}
      safeAreViewStyle={{backgroundColor: Colors.BACKGROUND}}>
      {loader === false && (
        <>
          {chats && chats?.length > 0 ? (
            <View style={{flex: 1, marginTop: 60}}>
              <View style={styles.mainContainer}>
                <Text style={styles.Inbox}> {ROLL_ID_INBOX}</Text>
                <Text style={styles.Match}>{ROLL_ID_2}</Text>
              </View>
              <FlatList
                data={chats}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderChatList}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
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
