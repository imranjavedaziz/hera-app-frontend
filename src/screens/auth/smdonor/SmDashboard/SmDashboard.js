import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  BackHandler,
  Alert,
} from 'react-native';
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Images from '../../../../constants/Images';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Header, {IconHeader} from '../../../../components/Header';
import globalStyle from '../../../../styles/global';
import Strings, {ValidationMessages} from '../../../../constants/Strings';
import Searchbar from '../../../../components/Searchbar';
import {Routes} from '../../../../constants/Constants';
import {Prencentage, Value} from '../../../../constants/FixedValues';
import Alignment from '../../../../constants/Alignment';
import styles from './Styles';
import LinearGradient from 'react-native-linear-gradient';
import {getDonorDashboard} from '../../../../redux/actions/DonorDashboard';
import {
  hideAppLoader,
  showAppLoader,
  showMessageAppToast,
} from '../../../../redux/actions/loader';
import Styles from '../smSettings/Styles';
import FastImage from 'react-native-fast-image';
import {NotificationContext} from '../../../../context/NotificationContextManager';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {MaterialIndicator} from 'react-native-indicators';
import {Colors} from '../../../../constants';
import {dynamicSize, statusHide} from '../../../../utils/responsive';
import chatHistory from '../../../../hooks/chatHistory';
import _ from 'lodash';
import ImageLoading from '../../../../components/ImageLoading';
import {getMessageID} from '../../../../redux/actions/MessageId';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from '../../../../components/NoInternet/NoInternet';
import {useToast} from 'react-native-toast-notifications';
const SmDashboard = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const LoadingRef = useRef(false);
  const profileImgNew = useSelector(state => state.Auth?.user?.profile_pic);
  const profileImg = useSelector(state => state.profileImg?.imgStore);
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const {
    get_donor_dashboard_success,
    get_donor_dashboard_loading,
    get_donor_dashboard_error_msg,
    get_donor_dashboard_res,
  } = useSelector(state => state.DonorDashBoard);
  const [loadMore, setLoadMore] = useState(false);
  const {fcmToken} = useContext(NotificationContext);
  const [msgRead, setMsgRead] = useState(false);
  const chats = useSelector(state => state.Chat.chats);
  const chatData = chatHistory();
  const [isFocused, setFocused] = useState(false);
  const [statusRes, setStatusRes] = useState([]);
  const [networkError, setNetworkError] = useState(false);
  const messageIdRx = useSelector(state => state.MessageId);
  const [currUser, setCurrUser] = useState(messageIdRx);
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  const toast = useToast();
  const fetchData = useCallback(() => {
    chatData.update();
  }, []);
  useFocusEffect(
    useCallback(async () => {
      if ((await NetInfo.isConnected.fetch()) !== true) {
        setNetworkError(true);
      } else {
        setNetworkError(false);
      }
    }, []),
  );
  const searchBarAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (search === '' && isFocused === false) {
      Animated.timing(searchBarAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(searchBarAnim, {
        toValue: -170,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
  }, [search, isFocused, searchBarAnim]);
  useEffect(() => {
    if (_.isEmpty(chats)) {
      setMsgRead(false);
    } else {
      setMsgRead(chats.some(x => x?.read === 0));
    }
  }, [navigation, route?.name, chats]);
  const handleBackButtonClick = () => {
    Alert.alert(ValidationMessages.HOLD_ON, ValidationMessages.ALERT, [
      {
        text: ValidationMessages.CANCEL,
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: ValidationMessages.YES,
        onPress: () => {
          BackHandler.exitApp();
        },
      },
    ]);
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
  useFocusEffect(
    useCallback(() => {
      fetchData();
      let payload = {
        keyword: search ? search : '',
        state_ids:
          route?.params?.informationDetail?.join() !== undefined
            ? route?.params?.informationDetail?.join()
            : '',
        page: page,
        limit: 10,
      };
      dispatch(getDonorDashboard(payload));
    }, [search, page, route?.params?.informationDetail]),
  );

  useEffect(() => {
    setCurrUser(messageIdRx);
  }, [messageIdRx]);
  //Push Notification
  useEffect(() => {
    //For foreground
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        const {recieverId} = notification?.data;
        const showNotification = currUser?.messageIdRx === parseInt(recieverId);
        if (notification.userInteraction === true) {
          if (notification.data.notify_type === 'profile') {
            const {status} = JSON.parse(notification.data?.match_request);
            if (status === 2) {
              navigation.navigate(Routes.ChatDetail, {
                item: notification?.data,
                isComingFrom: false,
                chatPush: true,
              });
            } else {
              navigation.navigate(Routes.Chat_Request, {
                item: notification?.data,
                user: JSON.parse(notification.data?.match_request),
                chatPush: true,
              });
            }
          }
          if (notification.data.notify_type === 'chat') {
            navigation.navigate(Routes.ChatDetail, {
              item: notification?.data,
              isComingFrom: false,
              chatPush: true,
            });
          }
          if (
            notification.data.notify_type === 'payment_request' ||
            notification.data.notify_type === 'payment_declined'
          ) {
            navigation.navigate(Routes.PaymentRequest);
          }
          if (notification.data.notify_type === 'payment_transfer') {
            navigation.navigate(Routes.Transaction);
          }
        }
        if (notification.userInteraction === false) {
          if (
            showNotification === true &&
            notification.data.notify_type === 'chat'
          ) {
            return null;
          } else if (
            notification.data.notify_typ === 'payment_request' ||
            notification.data.notify_type === 'payment_declined'
          ) {
            toast?.current?.show(notification.body, {
              type: 'custom',
              placement: 'top',
              duration: 2000,
              offset: 30,
              animationType: 'slide-in',
            });
            dispatch(
              showMessageAppToast(
                true,
                notification.body,
                true,
                notification.data,
                navigation,
              ),
            );
          } else {
            toast.show(notification.title, {
              type: 'custom',
              placement: 'top',
              duration: 2000,
              offset: 30,
              animationType: 'slide-in',
            });
            dispatch(
              showMessageAppToast(
                true,
                notification.title,
                true,
                notification.data,
                navigation,
              ),
            );
          }
        }
        console.log('NOTIFICATION2nd:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION3rd:', notification);
      },
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      const {notification} = remoteMessage;
      if (notification.userInteraction === true) {
        if (notification.data.notify_type === 'profile') {
          const {status} = JSON.parse(notification.data?.match_request);
          if (status === 2) {
            navigation.navigate(Routes.ChatDetail, {
              item: notification?.data,
              isComingFrom: false,
              chatPush: true,
            });
          } else {
            navigation.navigate(Routes.Chat_Request, {
              item: notification?.data,
              user: JSON.parse(notification.data?.match_request),
            });
          }
        }
        if (
          notification.data.notify_type === 'payment_request' ||
          notification.data.notify_type === 'payment_declined'
        ) {
          navigation.navigate(Routes.PaymentRequest);
        }
        if (notification.data.notify_type === 'payment_transfer') {
          navigation.navigate(Routes.Transaction);
        }
        if (notification.data.notify_type === 'chat') {
          navigation.navigate(Routes.ChatDetail, {
            item: notification?.data,
            isComingFrom: false,
            chatPush: true,
          });
        }
      }
    });
  }, [fcmToken, navigation, messageIdRx, currUser]);
  // expected output: true
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getMessageID(''));
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, dispatch]);
  //  DONOR DASHBOARD CARD
  useFocusEffect(
    useCallback(() => {
      if (LoadingRef.current && !get_donor_dashboard_loading) {
        dispatch(showAppLoader());
        if (get_donor_dashboard_success) {
          dispatch(hideAppLoader());
          setStatusRes(get_donor_dashboard_res?.status);
          const {current_page, last_page, data} = get_donor_dashboard_res.data;
          if (current_page > 1) {
            data.length > 0 && setLoadMore(false);
            setCards([...cards, ...data]);
          } else {
            setCards(data);
          }
          setPage(current_page);
          setLastPage(last_page);
          setRefreshing(false);
        }
        if (get_donor_dashboard_error_msg) {
          dispatch(hideAppLoader());
        }
      }
      LoadingRef.current = get_donor_dashboard_loading;
    }, [
      get_donor_dashboard_success,
      get_donor_dashboard_loading,
      get_donor_dashboard_res,
      get_donor_dashboard_error_msg,
    ]),
  );
  const onSearch = value => {
    if (value === '' && value.length < 3) {
      setSearch('');
      setSearching(false);
      return;
    }
    setSearch(value);
    setSearching(true);
  };
  const onEndReached = () => {
    if (lastPage > page) {
      setLoadMore(true);
      setPage(page + 1);
    } else {
      setLoadMore(false);
    }
  };
  const onClear = () => {
    Keyboard.dismiss();
    setSearching(false);
    setSearch('');
    setFocused(false);
    let payload = {
      keyword: '',
      state_ids:
        route?.params?.informationDetail !== undefined
          ? route?.params?.informationDetail.join()
          : '',
      page: page,
      limit: 10,
    };
    dispatch(getDonorDashboard(payload));
  };
  const renderProfile = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(Routes.ProfileDetails, {userid: item.id})
        }
        style={styles.mainContainer}>
        <View style={styles.conatiner}>
          <ImageLoading
            isFastImg={true}
            style={[
              styles.profileImgView,
              {
                borderRadius: Value.CONSTANT_VALUE_18,
                width: Prencentage.PRECENTAGE_100,
              },
            ]}
            source={{
              uri: item.profile_pic,
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}>
            <LinearGradient
              start={{x: 0.0, y: 0.55}}
              end={{x: 0.011, y: 1.15}}
              colors={['rgba(0, 0, 0, 0)', 'rgb(0, 0, 0)']}
              style={styles.gradient}
            />
          </ImageLoading>
          <View style={styles.locationContainer}>
            <Text style={styles.profileName}>{item.first_name}</Text>
            <View style={styles.profileFooter}>
              <Image source={Images.mapgraypin} />
              <Text numberOfLines={1} style={styles.locationText}>
                {item.location?.name.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const headerComp = () => (
    <IconHeader
      leftIcon={{uri: profileImgNew === '' ? profileImg : profileImgNew}}
      leftPress={() => navigation.navigate(Routes.SmSetting)}
      rightIcon={Images.iconChat}
      chat={msgRead === true ? true : false}
      rightPress={() =>
        navigation.navigate(Routes.Chat_Listing, {smChat: true})
      }
      style={styles.androidIconHeader}
      ApiImage={true}
    />
  );

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    let payload = {
      keyword: search,
      state_ids:
        route?.params?.informationDetail !== undefined
          ? route?.params?.informationDetail.join()
          : '',
      page: 1,
      limit: 10,
    };
    dispatch(getDonorDashboard(payload));
  };
  const renderEmptyCell = () => {
    if (statusRes === 3) {
      return (
        <TouchableOpacity style={styles.emptyCardContainer} activeOpacity={1}>
          <Text style={styles.sryText}>{Strings.dashboard.Sorry}</Text>
          <Text style={styles.innerText}>{Strings.dashboard.SecondPara1}</Text>
          <Text style={styles.innerText2}>{Strings.dashboard.secondPara2}</Text>
        </TouchableOpacity>
      );
    }
    if (statusRes === 2) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{Strings.dashboard.noResult}</Text>
          <Text style={styles.content}>{Strings.dashboard.emptyDashboard}</Text>
        </View>
      );
    }
    return null;
  };
  const renderFooterCell = () => {
    if (loadMore && cards.length > 0) {
      return (
        <View style={styles.loaderContainer}>
          <MaterialIndicator
            color={Colors.COLOR_A3C6C4}
            size={dynamicSize(25)}
          />
        </View>
      );
    }
    return null;
  };
  async function retryData() {
    if ((await NetInfo.isConnected.fetch()) !== true) {
      setNetworkError(true);
    } else {
      setNetworkError(false);
    }
    onRefresh();
  }

  return (
    <View style={styles.upperContainer}>
      <Animated.View
        style={[
          [{transform: [{translateY: searchBarAnim}]}],
          {width: '100%', height: 50},
        ]}>
        <Header end={false}>{headerComp()}</Header>
      </Animated.View>
      <>
        {networkError === true ? (
          <NoInternet onPress={retryData} />
        ) : (
          <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={globalStyle.mainContainer}>
                <View
                  style={{
                    marginBottom: Value.CONSTANT_VALUE_150,
                    paddingTop:
                      !searching && isFocused === false
                        ? statusHide(Value.CONSTANT_VALUE_54)
                        : statusHide(Value.CONSTANT_VALUE_54),
                  }}>
                  <Animated.View
                    style={{transform: [{translateY: searchBarAnim}]}}>
                    <>
                      <Text style={[globalStyle.screenTitle]}>
                        {Strings.landing.Like_Match_Connect}
                      </Text>
                      <View
                        style={styles.subTitle}
                        accessible={true}
                        accessibilityLabel={`${Strings.sm_dashboard.Subtitle1} ${Strings.sm_dashboard.Subtitle2}`}>
                        <Text
                          style={globalStyle.screenSubTitle}
                          numberOfLines={2}
                          accessible={false}>
                          {Strings.sm_dashboard.Subtitle1}
                        </Text>
                        <Text
                          style={globalStyle.screenSubTitle}
                          accessible={false}
                          numberOfLines={1}>
                          {Strings.sm_dashboard.Subtitle2}
                        </Text>
                      </View>
                    </>
                    {/* </Animated.View>
                  <Animated.View
                    style={{transform: [{translateY: CancelAnim}]}}> */}
                    {search === '' && isFocused === false ? null : (
                      <View style={styles.cancelbtn}>
                        <TouchableOpacity
                          onPress={onClear}
                          style={styles.clearView}>
                          <Text style={styles.clearText}>Cancel</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    <View>
                      <View style={styles.search}>
                        <Searchbar
                          value={search}
                          onChangeText={onSearch}
                          editing={true}
                          croxxIcon={search === ''}
                          clearVisible={false}
                          onClear={onClear}
                          selectedStates={route?.params?.informationDetail}
                          handleFocus={handleFocus}
                          handleBlur={handleBlur}
                          isFocused={false}
                          sm={true}
                          selectedStateList={route?.params?.informationDetail}
                        />
                      </View>
                      <View>
                        <FlatList
                          keyboardShouldPersistTaps="handled"
                          contentContainerStyle={Styles.flatlist}
                          columnWrapperStyle={{
                            justifyContent: Alignment.SPACE_BETWEEN,
                            paddingHorizontal: Value.CONSTANT_VALUE_5,
                          }}
                          data={cards}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={renderProfile}
                          numColumns={2}
                          showsVerticalScrollIndicator={false}
                          onEndReached={() => {
                            route.params?.informationDetail !== undefined &&
                              onEndReached();
                            searching && onEndReached();
                          }}
                          ListEmptyComponent={renderEmptyCell}
                          ListFooterComponent={renderFooterCell}
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                          testID="flat-list"
                        />
                      </View>
                    </View>
                  </Animated.View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </>
        )}
      </>
    </View>
  );
};
export default React.memo(SmDashboard);
