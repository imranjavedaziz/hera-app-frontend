import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import FirebaseDB from '../../utils/FirebaseDB';
import {Images, Strings, Colors} from '../../constants';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {showAppToast} from '../../redux/actions/loader';
import {chatFeedback, pushNotification} from '../../redux/actions/Chat';
import {Routes} from '../../constants/Constants/';
import EmptySmDonor from '../../components/Chat/EmptySmDonor';
import moment from 'moment';
let fireDB;
let onChildAdd;
const ChatDetail = props => {
  const navigation = useNavigation();
  const [showFeedback, setShowFeedback] = useState(true);
  const [textData, setTextData] = useState('');
  const [loading, setLoading] = useState(true);
  const [db, setDB] = useState({messages: [], loading: true});
  const {log_in_data} = useSelector(state => state.Auth);
  const loadingRef = useRef(false);
  const {feedback_data, feedback_success, feedback_loading} = useSelector(
    state => state.Chat,
  );

  const dispatch = useDispatch();
  const renderActions = message => {
    return (
      <View style={{flexDirection: 'row', paddingBottom: 10, paddingRight: 10}}>
        <TouchableOpacity style={styles.select} onPress={() => onSend(message)}>
          <Image source={Images.ICON_SEND} style={{width: 30, height: 30}} />
        </TouchableOpacity>
      </View>
    );
  };
  useEffect(async () => {
    if (props.route.params.item.senderSubscription === 0) {
      dispatch(showAppToast(true, Strings.Chat.YOUR_SUBSCRIPTION_EXPIRED));
    }

    const now = Date.now();
    const user = {
      user_id: props?.route?.params?.item?.senderId,
      name: props?.route?.params?.item?.senderName,
      image: props?.route?.params?.item?.senderImage,
    };
    const receiver = {
      user_id: props?.route?.params?.item?.recieverId,
      name: props?.route?.params?.item?.recieverName,
      image: props?.route?.params?.item?.recieverImage,
    };
    fireDB = new FirebaseDB(user, receiver);
    await fireDB.setTotalSize();
    await fireDB.initMessages();
    await fireDB.readAll();
    fireDB.lastIdInSnapshot = now;
    setDB(fireDB);
    onChildAdd = fireDB.reference.on(
      'child_added',
      async (snapshot, _previousChildKey) => {
        setLoading(true);
        const messageItem = fireDB.parseMessages(snapshot);
        if (messageItem.createdAt > now) {
          fireDB.lastKey = snapshot.key;
          fireDB.prependMessage(messageItem);
          await fireDB.readAll();
          fireDB.lastIdInSnapshot = snapshot.key;
          setLoading(false);
        }
      },
    );
  }, []);

  useEffect(async () => {
    const unsubscribe = () => {
      setDB({messages: [], loading: false});
      fireDB.reference.off('child_added', onChildAdd);
      db.reference.off('child_added', onChildAdd);
      fireDB = null;
    };
    return () => unsubscribe();
  }, []);

  const onSend = (messages = '') => {
    if (props.route.params.item.senderSubscription === 0) {
      dispatch(showAppToast(true, Strings.Chat.YOUR_SUBSCRIPTION_EXPIRED));
    } else {
      if (messages.text !== '') {
        db.sendMessage(messages.text)
          .then(() => {
            let data = {
              sender_id: props?.route?.params?.item?.senderId,
              title: `${props?.route?.params?.item?.senderName} sent you a message`,
              message: messages.text,
              receiver_id: props?.route?.params?.item?.recieverId,
            };
            console.log(data, 'data');
            dispatch(pushNotification(data));
            setTextData('');
            Keyboard.dismiss();
          })
          .catch(e => {
            console.log(e.message);
          });
      }
    }
  };

  const customSystemMessage = item => {
    return (
      <View style={{flex: 1, marginBottom: 4}}>
        <View>
          <View>
            <View
              style={[
                item.currentMessage.from ===
                props?.route?.params?.item?.senderId
                  ? styles.senderID
                  : styles.receiverID,
              ]}>
              {props.route.params.item.recieverSubscription === 0 &&
                db?.messages[0]._id === item.currentMessage._id && (
                  <View
                    style={{
                      position: 'absolute',
                      alignSelf: 'flex-end',
                      marginLeft: -30,
                    }}>
                    <Image
                      source={Images.warning}
                      style={{tintColor: '#ff4544'}}
                    />
                  </View>
                )}
              <View style={styles.chatContainer}>
                <Text style={styles.chatText}>{item.currentMessage.text}</Text>
              </View>
            </View>
          </View>

          <View
            style={
              item.currentMessage.from === props?.route?.params?.item?.senderId
                ? {alignSelf: 'flex-end', marginTop: 4, marginRight: 20}
                : {alignSelf: 'flex-start', marginTop: 4}
            }>
            <Text
              style={{
                fontFamily: 'OpenSans',
                fontSize: 13,
                color: '#ada99f',
              }}>
              {moment(item.currentMessage.createdAt).format('h:mm a')}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const setText = text => setTextData(text);

  const feedback = (like, isSkip) => {
    let data = {
      like: like,
      recipient_id: props.route.params.item.recieverId,
      is_skip: isSkip,
    };
    dispatch(chatFeedback(data));
  };
  useFocusEffect(
    useCallback(async () => {
      if (loadingRef.current && !feedback_loading) {
        if (feedback_success) {
          dispatch(showAppToast(false, feedback_data));
          setShowFeedback(false);
          const user = {
            user_id: props?.route?.params?.item?.senderId,
            name: props?.route?.params?.item?.senderName,
            image: props?.route?.params?.item?.senderImage,
          };
          const receiver = {
            user_id: props?.route?.params?.item?.recieverId,
            name: props?.route?.params?.item?.recieverName,
            image: props?.route?.params?.item?.recieverImage,
          };
          let fireDB = new FirebaseDB(user, receiver);
          await fireDB.updateFeedback();
        }
      }
      loadingRef.current = feedback_loading;
    }, [feedback_success, feedback_loading]),
  );
  const navigateDetailScreen = () => {
    if (props?.route?.params?.item?.match_request?.status === 1) {
      navigation.navigate(Routes.Chat_Request, {
        item: props.route.params.item,
      });
    } else if (log_in_data?.role_id === 2) {
      navigation.navigate(Routes.DashboardDetailScreen, {
        userId: props?.route?.params?.item?.recieverId,
      });
    } else {
      navigation.navigate(Routes.ProfileDetails, {
        userid: props?.route?.params?.item?.recieverId,
      });
    }
  };
  console.log(db?.messages.length, 'db?.messages.length');
  return (
    <>
      <View style={{flex: 1, backgroundColor: Colors.BACKGROUND}}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.BACKGROUND}
          animated={true}
          hidden={false}
        />
        <SafeAreaView />
        <View>
          <View style={styles.outerContainer}>
            <View style={{flex: 0.8, zIndex: 9999}}>
              <TouchableOpacity
                hitSlop={{top: 20, bottom: 20, left: 10, right: 10}}
                onPress={() => props.navigation.goBack()}>
                <Image
                  source={Images.BACK_PLAN_ARROW}
                  style={{width: 14.7, height: 12.6}}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.topContainer}
              disabled={
                props?.route?.params?.item?.currentRole === 1 ? true : false
              }
              onPress={() => navigateDetailScreen()}>
              <>
                <View style={styles.avatar}>
                  <Image
                    source={
                      props?.route?.params?.item?.currentRole === 1
                        ? Images.ADMIN_ICON
                        : {uri: props.route.params.item.recieverImage}
                    }
                    style={styles.avatar}
                  />
                </View>
                <View style={{marginLeft: 10}}>
                  {props.route.params.item.recieverSubscription === 0 ? (
                    <Text style={styles.titleText}>
                      {Strings.Chat.INACTIVE_USER}
                    </Text>
                  ) : (
                    <>
                      <Text style={styles.titleText}>
                        {props.route.params.item.recieverName}
                      </Text>
                      <Text style={styles.descText}>
                        {log_in_data?.role_id === 2 &&
                          `#${props?.route?.params?.item?.recieverUserName}`}
                      </Text>
                    </>
                  )}
                </View>
              </>
            </TouchableOpacity>
            <View />
          </View>
          <View style={styles.border} />
        </View>
        {showFeedback &&
          props?.route?.params?.item?.currentRole !== 1 &&
          props?.route?.params?.item?.feedback_status === 0 &&
          db?.messages.length >= 20 &&
          50 >= db?.messages.length && (
            <View
              style={{
                height: 117,
                width: '100%',
                backgroundColor: Colors.WHITE,
                zIndex: 9999,
              }}>
              <TouchableOpacity
                style={{
                  right: 8,
                  width: 30,
                  height: 30,
                  top: 8,
                  alignSelf: 'flex-end',
                }}
                onPress={() => feedback(0, 1)}>
                <Image source={Images.iconcross} style={styles.crossImage} />
              </TouchableOpacity>
              <Text style={styles.matchTxt}>{Strings.Chat.WHAT_DO_YO}</Text>
              <View style={styles.thumbInnerContain}>
                <TouchableOpacity
                  style={[styles.thumbContain(Colors.RED)]}
                  onPress={() => feedback(0, 0)}>
                  <Image source={Images.THUMB_DOWN} style={styles.thumbImg} />
                  <Text style={styles.thumbTxt}>{Strings.Chat.NOT_GOOD}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.thumbContain(Colors.GREEN)}
                  onPress={() => feedback(1, 0)}>
                  <Image source={Images.THUMB_UP} style={styles.thumbImg} />
                  <Text style={styles.thumbTxt}>{Strings.Chat.GOING_WELL}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        {log_in_data?.role_id === 2 && db?.messages.length === 0 && (
          <View style={styles.smDonorEmptyView}>
            <EmptySmDonor
              image={Images.conversation2}
              title={Strings.Chat.START_CONVERSATION}
              midTitle=""
            />
          </View>
        )}
        {log_in_data?.role_id !== 2 &&
          db?.messages.length === 0 &&
          props?.route?.params?.item?.currentRole !== 1 && (
            <EmptySmDonor
              image={Images.conversation2}
              title={Strings.Chat.YOU_MATCHED}
              midTitle={Strings.Chat.PARENT_TO_BE_CONVERSATION}
            />
          )}
        {log_in_data?.role_id === 2 && (
          <GiftedChat
            messages={db?.messages}
            onSend={messages => onSend(messages)}
            renderSend={message => renderActions(message)}
            renderBubble={customSystemMessage}
            scrollToBottom
            onInputTextChanged={() => setText()}
            text={textData}
            user={{
              _id: props?.route?.params?.item?.senderId,
              name: props?.route?.params?.item?.senderName,
              avatar: props?.route?.params?.item?.senderImage,
            }}
            containerStyle={styles.mainContainerDetail}
            renderAvatar={() => null}
            textInputProps={{
              autoCorrect: false,
            }}
            // loadEarlier={loadEarlier}
            // onLoadEarlier={()=>db.loadEarlier(setLoading)}
            // isLoadingEarlier={loading}
            // onLoadEarlier={()=>alert('hi')}
            //   listViewProps={{
            //     scrollEventThrottle: 400,
            //     onScroll: ({ nativeEvent }) => {
            //       db.loadEarlier(setLoading)
            //       // setLoadEarlier(false)
            //     }
            // }}
          />
        )}
        {props?.route?.params?.item?.currentRole === 1 && (
          <GiftedChat
            messages={db?.messages}
            onSend={messages => onSend(messages)}
            renderSend={message => renderActions(message)}
            renderBubble={customSystemMessage}
            scrollToBottom
            onInputTextChanged={() => setText()}
            text={textData}
            user={{
              _id: props?.route?.params?.item?.senderId,
              name: props?.route?.params?.item?.senderName,
              avatar: props?.route?.params?.item?.senderImage,
            }}
            containerStyle={styles.mainContainerDetail}
            renderAvatar={() => null}
            textInputProps={{
              autoCorrect: false,
            }}
            // isLoadingEarlier={loading}
            // loadEarlier={loadEarlier}
            // onLoadEarlier={()=>db.loadEarlier(setLoading)}
            // onLoadEarlier={()=>alert('hi')}
            //   listViewProps={{
            //     scrollEventThrottle: 400,
            //     onScroll: ({ nativeEvent }) => {
            //       db.loadEarlier(setLoading)
            //       setLoadEarlier(false)
            //     }
            // }}
          />
        )}
        {db?.messages.length > 0 &&
          log_in_data?.role_id !== 2 &&
          props?.route?.params?.item?.currentRole !== 1 && (
            <GiftedChat
              messages={db?.messages}
              onSend={messages => onSend(messages)}
              renderSend={message => renderActions(message)}
              renderBubble={customSystemMessage}
              scrollToBottom
              onInputTextChanged={() => setText()}
              text={textData}
              user={{
                _id: props?.route?.params?.item?.senderId,
                name: props?.route?.params?.item?.senderName,
                avatar: props?.route?.params?.item?.senderImage,
              }}
              containerStyle={styles.mainContainerDetail}
              renderAvatar={() => null}
              textInputProps={{
                autoCorrect: false,
              }}
              // loadEarlier={loadEarlier}
              // isLoadingEarlier={loading}
              // listViewProps={{
              //     scrollEventThrottle: 400,
              //     onScroll: ({ nativeEvent }) => {
              //       db.loadEarlier(setLoading,setLoadEarlier)
              //       setLoadEarlier(false)
              //     }
              // }}
            />
          )}
      </View>
    </>
  );
};

export default ChatDetail;
