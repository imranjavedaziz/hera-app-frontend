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
import {Routes} from '../../constants/Constants/';
import ChatEmpty from '../../components/Chat/ChatEmpty';
import {chat} from '../../constants/Constants';
import database from '@react-native-firebase/database';
import {deviceHandler} from '../../utils/commonFunction';
import moment from 'moment';
import {statusHide} from '../../utils/responsive';

const ChatListing = () => {
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
  const {log_in_data} = useSelector(state => state.Auth);
  useEffect(() => {
    deviceHandler(navigation, 'deviceGoBack');
  }, []);
  useEffect(() => {
    return navigation.addListener('focus', fetchData);
  }, [navigation]);
  const NavigateFunc = () => {
    if (log_in_data?.role_id === 2) {
      navigation.navigate(Routes.PtbDashboard);
    } else {
      navigation.navigate(Routes.SmDashboard);
    }
  };
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      leftPress={() => NavigateFunc()}
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
  function getChatDate(unixTimeStamp) {
    const timeAgo = moment(unixTimeStamp).local().startOf('seconds').fromNow();
    const timeAgoArray = timeAgo.split(' ');
    let date = new Date(unixTimeStamp);
    let today = new Date();
    let formattedDate = dateFormate(date);
    let todayDate = dateFormate(today);
    let yesterdayDate = new Date(new Date().getTime());
    yesterdayDate.setDate(new Date().getDate() - 1);
    let yesterday = dateFormate(yesterdayDate);
    let day;
    let defaultDate = moment(date).format('MMM Do');

    switch (true) {
      case timeAgoArray[1] === 'few':
        day = 'Just Now';
        break;
      case formattedDate === todayDate:
        day = 'Today';
        break;
      case formattedDate === yesterday:
        day = 'Yesterday';
        break;

      default:
        day = defaultDate;
    }
    return day;
  }
  function dateFormate(date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    return year + '-' + month + '-' + day;
  }

  const renderChatList = ({item}) => {
    return (
      <>
        {item !== null && item?.match_request?.status === 2 && (
          <Chat_listing_Comp
            currentRole={item?.currentRole}
            status_id={item?.status_id}
            chatStart={item?.chat_start}
            image={item?.recieverImage}
            name={
              log_in_data?.role_id === 2
                ? `#${item?.recieverUserName}`
                : item?.recieverName
            }
            onPress={() =>
              navigation.navigate(Routes.ChatDetail, {
                item,
                isComingFrom: false,
              })
            }
            message={item?.message}
            read={item?.read}
            time={item?.time !== undefined && getChatDate(item?.time)}
            latest={true}
            roleId={log_in_data?.role_id}
            match={item?.match_request?.status}
          />
        )}
        {item !== null &&
          item?.match_request?.status === 1 &&
          log_in_data.role_id !== 2 && (
            <Chat_listing_Comp
              status_id={item?.status_id}
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
              time={item?.time !== undefined && getChatDate(item?.time)}
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
            <View style={{flex: 1, marginTop: statusHide(105)}}>
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
