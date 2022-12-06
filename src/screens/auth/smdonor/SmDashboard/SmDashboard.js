import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
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
import Strings from '../../../../constants/Strings';
import Searchbar from '../../../../components/Searchbar';
import {Routes} from '../../../../constants/Constants';
import {Value} from '../../../../constants/FixedValues';
import Alignment from '../../../../constants/Alignment';
import styles from './Styles';
import LinearGradient from 'react-native-linear-gradient';
import {getDonorDashboard} from '../../../../redux/actions/DonorDashboard';
import {hideAppLoader, showAppLoader} from '../../../../redux/actions/loader';
import {deviceRegister} from '../../../../redux/actions/Auth';
import Styles from '../smSettings/Styles';
import {deviceHandler} from '../../../../utils/commonFunction';
import FastImage from 'react-native-fast-image';
import DeviceInfo from 'react-native-device-info';
import {NotificationContext} from '../../../../context/NotificationContextManager';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {MaterialIndicator} from 'react-native-indicators';
import {Colors} from '../../../../constants';
import {dynamicSize} from '../../../../utils/responsive';
import chatHistory from '../../../../hooks/chatHistory';
import _ from 'lodash';
const SmDashboard = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const LoadingRef = useRef(false);
  const profileImg = useSelector(state => state?.Auth?.user?.profile_pic);
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
  const loaderState = useSelector(state => state.loader);
  const [loadMore, setLoadMore] = useState(false);
  const {fcmToken} = useContext(NotificationContext);
  const [msgRead, setMsgRead] = useState(false);
  const chats = useSelector(state => state.Chat.chats);
  const chatData = chatHistory();
  const fetchData = useCallback(() => {
    chatData.update();
  }, []);

  useEffect(() => {
    fetchData();
    if (route?.name === 'SmDashboard') {
      deviceHandler(navigation, 'exit');
    }
    if (_.isEmpty(chats)) {
      setMsgRead(false);
    } else {
      return chats.find(o => {
        o?.read === 0 ? setMsgRead(true) : setMsgRead(false);
      });
    }
  }, [navigation, route?.name]);

  useFocusEffect(
    useCallback(() => {
      dispatch(showAppLoader());
      let payload = {
        keyword: search ? search : '',
        state_ids:
          route?.params?.informationDetail?.join() !== undefined
            ? route?.params?.informationDetail?.join()
            : '',
        page: page,
        limit: 10,
      };
      console.log('Hellooo');
      dispatch(getDonorDashboard(payload));
    }, [search, page, route?.params?.informationDetail]),
  );

  //Get device Info
  useEffect(() => {
    async function fetchDeviceInfo() {
      const deviceName = await DeviceInfo.getDeviceName();
      const _deviceInfo = {
        device_id: DeviceInfo.getDeviceId(),
        device_token: fcmToken,
        device_type: Platform.OS,
      };
      console.log(deviceName, 'deviceName');
      dispatch(deviceRegister(_deviceInfo));
    }
    fetchDeviceInfo();
  }, [dispatch, fcmToken]);

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
            setMsgRead(false);
          }
        }
        if (notification.userInteraction === false) {
          if (notification.data.notify_type === 'chat') {
            setMsgRead(true);
          }
          if (notification.data.notify_type === 'profile') {
            setMsgRead(true);
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
        if (notification.data.notify_type === 'chat') {
          navigation.navigate(Routes.ChatDetail, {
            item: notification?.data,
            isComingFrom: false,
            chatPush: true,
          });
          setMsgRead(false);
        }
      }
      if (notification.userInteraction === false) {
        if (notification.data.notify_type === 'chat') {
          setMsgRead(true);
        }
        if (notification.data.notify_type === 'profile') {
          setMsgRead(true);
        }
      }
    });
  }, [fcmToken, navigation]);

  //  DONOR DASHBOARD CARD
  useFocusEffect(
    useCallback(() => {
      if (LoadingRef.current && !get_donor_dashboard_loading) {
        dispatch(showAppLoader());
        if (get_donor_dashboard_success) {
          dispatch(hideAppLoader());
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
      dispatch(showAppLoader());
      setSearch('');
      setSearching(false);
      return;
    }
    dispatch(showAppLoader());
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
    setSearching(false);
    setSearch('');
    dispatch(showAppLoader());
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
  const renderProfile = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(Routes.ProfileDetails, {userid: item.id})
        }
        style={styles.mainContainer}>
        <View style={styles.conatiner}>
          <FastImage
            style={[
              styles.profileImgView,
              {borderRadius: Value.CONSTANT_VALUE_18},
            ]}
            source={{
              uri: item.profile_pic,
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}>
            <LinearGradient
              start={{x: 0.0, y: 0.28}}
              end={{x: 0.011, y: 1.15}}
              colors={['rgba(0, 0, 0, 0)', 'rgb(0, 0, 0)']}
              style={styles.gradient}
            />
          </FastImage>
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
      leftIcon={{uri: profileImg}}
      leftPress={() => navigation.navigate(Routes.SmSetting)}
      rightIcon={Images.iconChat}
      chat={msgRead === true ? true : false}
      rightPress={() =>
        navigation.navigate(Routes.Chat_Listing, {smChat: true})
      }
      style={styles.headerIcon}
      ApiImage={true}
    />
  );

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
  };

  const renderEmptyCell = () => {
    if (!loaderState.loading) {
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
  return (
    <View style={styles.upperContainer}>
      {!searching && <Header end={false}>{headerComp()}</Header>}
      <View style={globalStyle.mainContainer}>
        <View
          style={{
            marginBottom: Value.CONSTANT_VALUE_150,
            paddingTop: searching
              ? Value.CONSTANT_VALUE_1
              : Value.CONSTANT_VALUE_55,
          }}>
          {search === '' ? (
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
          ) : null}
          <View>
            <View style={styles.search}>
              <Searchbar
                value={search}
                onChangeText={onSearch}
                editing={search === ''}
                onClear={onClear}
                selectedStates={route?.params?.informationDetail}
              />
            </View>
            <View>
              <FlatList
                contentContainerStyle={Styles.flatlist}
                columnWrapperStyle={{justifyContent: Alignment.SPACE_BETWEEN}}
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
        </View>
      </View>
    </View>
  );
};
export default SmDashboard;
