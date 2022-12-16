import {Text, View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {useSelector} from 'react-redux';
import Images from '../../../../constants/Images';
import {useNavigation} from '@react-navigation/native';
import Header, {IconHeader} from '../../../../components/Header';
import globalStyle from '../../../../styles/global';
import Strings from '../../../../constants/Strings';
import Searchbar from '../../../../components/Searchbar';
import {Routes} from '../../../../constants/Constants';
import styles from './Styles';
import {deviceHandler} from '../../../../utils/commonFunction';
import {NotificationContext} from '../../../../context/NotificationContextManager';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import _ from 'lodash';

const SmDashboard = ({route}) => {
  const navigation = useNavigation();

  const profileImgNew = useSelector(state => state.Auth?.user?.profile_pic);
  const profileImg = useSelector(state => state.profileImg?.imgStore);

  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);
  const {fcmToken} = useContext(NotificationContext);
  const [msgRead, setMsgRead] = useState(false);
  const chats = useSelector(state => state.Chat.chats);
  const [isFocused, setFocused] = useState(false);
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  useEffect(() => {
    if (route?.name === 'SmDashboard') {
      deviceHandler(navigation, 'exit');
    }
    if (_.isEmpty(chats)) {
      setMsgRead(false);
    } else {
      setMsgRead(chats.some(x => x?.read === 0));
    }
  }, [navigation, route?.name, chats]);
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
        }
      }
    });
  }, [fcmToken, navigation]);
  const onSearch = value => {
    if (value === '' && value.length < 3) {
      setSearch('');
      setSearching(false);
      return;
    }
    setSearch(value);
    setSearching(true);
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
  return (
    <View style={styles.upperContainer}>
      {!searching && isFocused === false && (
        <Header end={false}>{headerComp()}</Header>
      )}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={globalStyle.mainContainer}>
          <View>
            {search === '' && isFocused === false ? (
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
                  editing={true}
                  croxxIcon={search === ''}
                  clearVisible={false}
                  selectedStates={route?.params?.informationDetail}
                  handleFocus={handleFocus}
                  handleBlur={handleBlur}
                  isFocused={false}
                  sm={true}
                  selectedStateList={route?.params?.informationDetail}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
export default React.memo(SmDashboard);
