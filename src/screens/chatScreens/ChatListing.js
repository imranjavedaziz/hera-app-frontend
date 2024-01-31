import React, {useEffect, useState, useCallback, useRef} from 'react';
import {View, Text, RefreshControl, BackHandler} from 'react-native';
import {Chat_listing_Comp, Container} from '../../components';
import {IconHeader} from '../../components/Header';
import {Colors, Images, Strings} from '../../constants';
import styles from './styles';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import chatHistory from '../../hooks/chatHistory';
import {FlatList} from 'react-native-gesture-handler';
import {Routes} from '../../constants/Constants/';
import ChatEmpty from '../../components/Chat/ChatEmpty';
import {chat} from '../../constants/Constants';
import database from '@react-native-firebase/database';
import moment from 'moment';
import {statusHide} from '../../utils/responsive';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
} from '../../redux/actions/loader';
import {getMessageID} from '../../redux/actions/MessageId';
import {getSubscriptionStatus} from '../../redux/actions/Subsctiption';
import {getMatchList} from '../../redux/actions/Payment';
import {getAccountStatus} from '../../redux/actions/AccountStatus';

const ChatListing = () => {
  const navigation = useNavigation();
  const chats = useSelector(state => state.Chat.chats);
  const [refreshing, setRefreshing] = useState(false);
  const chatData = chatHistory();
  const dispatch = useDispatch();
  const LoadingRef = useRef(null);
  const [BankData, setData] = useState('');
  const {account_status_success, account_status_res, account_status_fail} =
    useSelector(state => state.AccountStatus);
  const {
    get_match_list_success,
    get_match_list_fail,
    get_match_list_error_msg,
    get_match_list_loading,
    get_match_list_res,
  } = useSelector(state => state.Payment);
  const [disable, setDisable] = useState(false);
  const fetchData = useCallback(() => {
    chatData.update();
    setLoader(false);
    setRefreshing(false);
  }, []);
  const [loader, setLoader] = useState(true);
  const {log_in_data} = useSelector(state => state.Auth);
  useEffect(() => {
    return navigation.addListener('focus', fetchData);
  }, [navigation]);

  const handleBackButtonClick = () => {
    NavigateFunc();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getSubscriptionStatus());
      dispatch(getMessageID(''));
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, dispatch]);
  const NavigateFunc = () => {
    if (log_in_data?.role_id === 2) {
      navigation.navigate(Routes.PtbDashboard);
    } else {
      navigation.navigate(Routes.SmDashboard);
    }
  };
  useFocusEffect(
    useCallback(() => {
      if (log_in_data?.role_id === 2) {
        let payload = {
          keyword: '',
        };
        setDisable(true);
        dispatch(showAppLoader());
        dispatch(getMatchList(payload));
      } else {
        setDisable(true);
        dispatch(getAccountStatus());
      }
    }, [dispatch]),
  );
  useEffect(() => {
    if (account_status_success) {
      setDisable(false);
    }
    if (account_status_fail) {
      setDisable(false);
    }
  }, [account_status_success, account_status_res, account_status_fail]);

  useEffect(() => {
    if (LoadingRef.current && !get_match_list_loading) {
      if (get_match_list_success) {
        setDisable(false);
        dispatch(hideAppLoader());
        setData(get_match_list_res?.data?.data);
      }
      if (get_match_list_fail) {
        setDisable(false);
        dispatch(hideAppLoader());
        dispatch(showAppToast(true, get_match_list_error_msg));
      }
    }
    LoadingRef.current = get_match_list_loading;
  }, [
    get_match_list_success,
    get_match_list_loading,
    get_match_list_error_msg,
    get_match_list_res,
    get_match_list_fail,
  ]);
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
    let defaultDate = moment(date).format('MMMM D'); // Modified the format here

    switch (true) {
      case timeAgoArray[1] === 'few':
        day = 'Just Now';
        break;
      case formattedDate === todayDate:
        day = moment(unixTimeStamp).format('h:mm a');
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
    let month = date.getMonth() + 1; // Added +1 to get the correct month index
    let day = date.getDate();
    return year + '-' + month + '-' + day;
  }
  function navigateToScreen(item) {
    if (item?.status_id !== 1 || item?.recieverSubscription === 0) {
      dispatch(showAppToast(true, Strings.Chat.INACTIVE_ACCOUNT));
    } else if (item?.match_request?.status === 1) {
      navigation.navigate(Routes.Chat_Request, {
        user: item?.match_request,
        item: item,
      });
    } else {
      navigation.navigate(Routes.ChatDetail, {
        item: item,
        account_status_res: account_status_res || '',
      });
    }
  }
  const onNavigateDetail = item => {
    if (log_in_data?.role_id === 2) {
      const filteredItem =
        BankData &&
        BankData.find(bankdata => bankdata?.id === item?.recieverId);
      navigation.navigate(Routes.ChatDetail, {
        item,
        isComingFrom: false,
        filteredItem: filteredItem ? filteredItem : '',
      });
    } else {
      navigation.navigate(Routes.ChatDetail, {
        item,
        isComingFrom: false,
        account_status_res: account_status_res || '',
      });
    }
  };
  const renderChatList = ({item}) => {
    return (
      <>
        {item !== null && item?.match_request?.status === 2 && (
          <Chat_listing_Comp
            currentRole={item?.currentRole}
            status_id={item?.status_id}
            chatStart={item?.chat_start}
            recieverSubscription={item?.recieverSubscription}
            image={item?.recieverImage}
            name={
              log_in_data?.role_id === 2
                ? `${item?.recieverName.split(' ')[0]}`
                : item?.recieverName
            }
            onPress={() => {
              onNavigateDetail(item);
            }}
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
              recieverSubscription={item?.recieverSubscription}
              status_id={item?.status_id}
              currentRole={item?.currentRole}
              image={item?.recieverImage}
              name={
                log_in_data?.role_id === 2
                  ? `${item?.recieverName.split(' ')[0]}`
                  : item?.recieverName
              }
              onPress={() => navigateToScreen(item)}
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
      {disable && <View style={styles.disableing} />}
    </Container>
  );
};

export default ChatListing;
