import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  Platform,
  Alert,
  Modal,
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
import globalStyle from '../../styles/global';
let fireDB;
let onChildAdd;
const ChatDetail = props => {
  const navigation = useNavigation();
  const [showFeedback, setShowFeedback] = useState(true);
  const [textData, setTextData] = useState('');
  const [_loading, setLoading] = useState(true);
  const [db, setDB] = useState({messages: [], loading: true});
  const {log_in_data, user} = useSelector(state => state.Auth);
  const subscriptionStatus = useSelector(
    state => state.Subscription.subscription_status_res,
  );
  const [showModal, setShowModal] = useState(false);
  const loadingRef = useRef(false);
  const [sendFeedback, setSendFeedback] = useState('');
  const {feedback_data, feedback_success, feedback_loading} = useSelector(
    state => state.Chat,
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (
      parseInt(props?.route?.params?.item?.recieverSubscription) === 0 &&
      user.role_id !== 2
    ) {
      dispatch(showAppToast(true, Strings.Chat.INACTIVE_ACCOUNT));
    }
  }, [props.route.params]);
  const renderActions = message => {
    return (
      <View style={{flexDirection: 'row', paddingBottom: 10, paddingRight: 10}}>
        <TouchableOpacity style={styles.select} onPress={() => onSend(message)}>
          <Image source={Images.ICON_SEND} style={{width: 30, height: 30}} />
        </TouchableOpacity>
      </View>
    );
  };
  useEffect(() => {
    if (subscriptionStatus && subscriptionStatus.data) {
      if (!subscriptionStatus?.data.status) {
        dispatch(
          showAppToast(
            true,
            subscriptionStatus.data.is_trial
              ? Strings.Subscription.TrailOver
              : Strings.Subscription.SubscriptionExpired,
          ),
        );
      }
    }
  }, [subscriptionStatus]);
  useEffect(async () => {
    if (parseInt(props.route.params.item.senderSubscription) === 0) {
      dispatch(showAppToast(true, Strings.Chat.YOUR_SUBSCRIPTION_EXPIRED));
    }

    const now = Date.now();
    const user = {
      user_id: parseInt(props?.route?.params?.item?.senderId),
      name: props?.route?.params?.item?.senderName,
      image: props?.route?.params?.item?.senderImage,
    };
    const receiver = {
      user_id: parseInt(props?.route?.params?.item?.recieverId),
      name: props?.route?.params?.item?.recieverName,
      image: props?.route?.params?.item?.recieverImage,
    };
    fireDB = new FirebaseDB(user, receiver);
    await fireDB.setTotalSize();
    await fireDB.initMessages();
    if (fireDB.messages.length > 1) {
      await fireDB.readMessage();
    }

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
    if (
      parseInt(props.route.params.item.senderSubscription) === 0 ||
      (!subscriptionStatus?.data?.status && user.role_id === 2)
    ) {
      dispatch(showAppToast(true, Strings.Chat.YOUR_SUBSCRIPTION_EXPIRED));
      navigation.navigate(Routes.Subscription);
    } else {
      setTextData('');
      if (messages.text !== '') {
        db.sendMessage(messages.text)
          .then(() => {
            let data = {
              title:
                parseInt(props?.route?.params?.item?.currentRole) === 2
                  ? `${props?.route?.params?.item?.senderUserName} sent you a message`
                  : `${props?.route?.params?.item?.senderName} sent you a message`,
              message: messages.text,
              receiver_id: parseInt(props?.route?.params?.item?.recieverId),
            };
            dispatch(pushNotification(data));
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
                parseInt(props?.route?.params?.item?.senderId)
                  ? styles.senderID
                  : styles.receiverID,
              ]}>
              {parseInt(props.route.params.item.recieverSubscription) === 0 &&
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
              item.currentMessage.from ===
              parseInt(props?.route?.params?.item?.senderId)
                ? {alignSelf: 'flex-end', marginTop: 4, marginRight: 20}
                : {alignSelf: 'flex-start', marginTop: 4, marginLeft: 10}
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

  const feedback = (like, isSkip) => {
    let data = {
      like: like,
      recipient_id: parseInt(props.route.params.item.recieverId),
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
            user_id: parseInt(props?.route?.params?.item?.senderId),
            name: props?.route?.params?.item?.senderName,
            image: props?.route?.params?.item?.senderImage,
          };
          const receiver = {
            user_id: parseInt(props?.route?.params?.item?.recieverId),
            name: props?.route?.params?.item?.recieverName,
            image: props?.route?.params?.item?.recieverImage,
          };
          let fireDB = new FirebaseDB(user, receiver);
          await fireDB.updateFeedback(sendFeedback);
        }
      }
      loadingRef.current = feedback_loading;
    }, [feedback_success, feedback_loading]),
  );
  const navigateDetailScreen = () => {
    if (parseInt(props?.route?.params?.item?.match_request?.status) === 1) {
      navigation.navigate(Routes.Chat_Request, {
        item: props.route.params.item,
      });
    } else if (log_in_data?.role_id === 2) {
      navigation.navigate(Routes.DashboardDetailScreen, {
        userId: parseInt(props?.route?.params?.item?.recieverId),
      });
    } else {
      navigation.navigate(Routes.ProfileDetails, {
        userid: parseInt(props?.route?.params?.item?.recieverId),
      });
    }
  };
  const toastFunc = () => {
    dispatch(showAppToast(false, 'User has been reported to HERA.'));
  };
  const backAction = () => {
    Alert.alert(
      Strings.ReportUser.Report_this_User,
      Strings.ReportUser.ReportConfirm,
      [
        {
          text: Strings.ReportUser.Yes_Report,
          onPress: () => {
            toastFunc();
          },
        },
        {
          text: Strings.ReportUser.Not_Now,
          onPress: () => null,
        },
      ],
    );
    return true;
  };
  const navReport = () => {
    Platform.OS === 'ios' ? backAction() : setShowModal(true);
  };
  function getRoleData(roleId, role) {
    switch (true) {
      case roleId === 2:
        role = 'Parent-To-Be';
        break;
      case roleId === 3:
        role = 'Surrogate Mother';
        break;
      case roleId === 4:
        role = 'Egg Donor';
        break;
      case roleId === 5:
        role = 'Sperm Donor';
        break;
      default:
        role = 'Parent-To-Be';
        break;
    }
    return role;
  }
  console.log(db?.messages.length, 'db?.messages.length');
  console.log(
    props?.route?.params?.item?.feedback_status,
    'props?.route?.params?.item?.feedback_status',
  );
  return (
    <View style={{flex: 1, backgroundColor: Colors.BACKGROUND}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.BACKGROUND}
        animated={true}
        hidden={false}
      />
      <SafeAreaView />
      <View
        style={{
          position: 'absolute',
          flex: 1,
          right: 0,
          left: 0,
          marginTop: 30,
          zIndex: 1,
          backgroundColor: Colors.BACKGROUND,
        }}>
        <View style={styles.outerContainer}>
          <View style={{flex: 1, zIndex: 9999}}>
            <TouchableOpacity
              hitSlop={{top: 20, bottom: 20, left: 10, right: 10}}
              onPress={() => {
                props.route.params.isComingFrom === true
                  ? props.navigation.navigate(Routes.Chat_Listing)
                  : props.navigation.goBack();
              }}>
              <Image
                source={Images.BACK_PLAN_ARROW}
                style={{width: 14.7, height: 12.6}}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.topContainer}
            disabled={
              parseInt(props?.route?.params?.item?.currentRole) === 1
                ? true
                : false
            }
            onPress={() => navigateDetailScreen()}>
            <View
              style={[
                styles.topContainer,
                parseInt(props?.route?.params?.item?.recieverSubscription) === 0
                  ? {alignItems: 'center'}
                  : null,
              ]}>
              <View style={styles.avatar}>
                <Image
                  source={
                    parseInt(props?.route?.params?.item?.currentRole) === 1
                      ? Images.ADMIN_ICON
                      : parseInt(
                          props?.route?.params?.item?.recieverSubscription,
                        ) === 0
                      ? Images.defaultProfile
                      : {uri: props.route.params.item.recieverImage}
                  }
                  style={styles.avatar}
                />
              </View>
              <View style={{marginLeft: 10}}>
                {parseInt(props?.route?.params?.item?.recieverSubscription) ===
                0 ? (
                  <Text style={styles.titleText}>
                    {Strings.Chat.INACTIVE_USER}
                  </Text>
                ) : (
                  <>
                    {parseInt(props?.route?.params?.item?.currentRole) ===
                      1 && (
                      <Text style={styles.titleText}>
                        {props.route.params.item.recieverName}
                      </Text>
                    )}
                    {parseInt(props?.route?.params?.item?.currentRole) !==
                      1 && (
                      <>
                        <Text numberOfLines={1} style={styles.titleText}>
                          {parseInt(props?.route?.params?.item?.currentRole) ===
                          2
                            ? props?.route?.params?.item?.recieverName
                            : getRoleData(
                                props?.route?.params?.item?.currentRole,
                              )}
                        </Text>
                        <Text numberOfLines={1} style={styles.descText}>
                          {parseInt(props?.route?.params?.item?.currentRole) ===
                          2
                            ? getRoleData(
                                parseInt(
                                  props?.route?.params?.item?.currentRole,
                                ),
                              )
                            : `#${props?.route?.params?.item?.recieverUserName}`}
                        </Text>
                      </>
                    )}
                  </>
                )}
              </View>
            </View>
            <TouchableOpacity onPress={() => navReport()}>
              <Image source={Images.iconDarkMore} />
            </TouchableOpacity>
          </TouchableOpacity>
          <View />
        </View>
        <View style={styles.border} />
      </View>
      {showFeedback &&
        parseInt(props?.route?.params?.item?.currentRole) !== 1 &&
        parseInt(props?.route?.params?.item?.feedback_status) !== 1 &&
        (db?.messages?.length === 20 || db?.messages?.length >= 30) &&
        log_in_data?.role_id === 2 && (
          <View
            style={{
              height: 117,
              width: '100%',
              backgroundColor: Colors.WHITE,
              zIndex: 1,
              top: 150,
              position: 'absolute',
            }}>
            <TouchableOpacity
              style={{
                right: 8,
                width: 30,
                height: 30,
                top: 8,
                alignSelf: 'flex-end',
              }}
              disabled={db?.messages.length >= 50 && true}
              onPress={() => {
                setSendFeedback(2);
                feedback(0, 1);
              }}>
              <Image source={Images.iconcross} style={styles.crossImage} />
            </TouchableOpacity>
            <Text style={styles.matchTxt}>{Strings.Chat.WHAT_DO_YO}</Text>
            <View style={styles.thumbInnerContain}>
              <TouchableOpacity
                style={[styles.thumbContain(Colors.RED)]}
                onPress={() => {
                  setSendFeedback(1);
                  feedback(0, 0);
                }}>
                <Image source={Images.THUMB_DOWN} style={styles.thumbImg} />
                <Text style={styles.thumbTxt}>{Strings.Chat.NOT_GOOD}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.thumbContain(Colors.GREEN)}
                onPress={() => {
                  setSendFeedback(1);
                  feedback(1, 0);
                }}>
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

      {parseInt(props?.route?.params?.item?.currentRole) === 1 &&
        db?.messages.length === 0 && (
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
        parseInt(props?.route?.params?.item?.currentRole) !== 1 && (
          <EmptySmDonor
            image={Images.conversation2}
            title={Strings.Chat.YOU_MATCHED}
            midTitle={Strings.Chat.PARENT_TO_BE_CONVERSATION}
          />
        )}
      {log_in_data?.role_id === 2 && (
        <View style={{flex: 1, marginBottom: 30, marginTop: 30}}>
          <GiftedChat
            messages={db?.messages}
            onSend={messages => onSend(messages)}
            renderSend={message => renderActions(message)}
            renderBubble={customSystemMessage}
            scrollToBottom
            onInputTextChanged={text => setTextData(text)}
            text={textData}
            user={{
              _id: parseInt(props?.route?.params?.item?.senderId),
              name: props?.route?.params?.item?.senderName,
              avatar: props?.route?.params?.item?.senderImage,
            }}
            containerStyle={styles.mainContainerDetail}
            renderAvatar={null}
            textInputProps={{
              autoCorrect: false,
            }}
            minComposerHeight={textData?.length > 75 ? 112 : 34}
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
        </View>
      )}
      {parseInt(props?.route?.params?.item?.currentRole) === 1 && (
        <View style={{flex: 1, marginBottom: 30, marginTop: 30}}>
          <GiftedChat
            messages={db?.messages}
            onSend={messages => onSend(messages)}
            renderSend={message => renderActions(message)}
            renderBubble={customSystemMessage}
            scrollToBottom
            onInputTextChanged={text => setTextData(text)}
            text={textData}
            user={{
              _id: parseInt(props?.route?.params?.item?.senderId),
              name: props?.route?.params?.item?.senderName,
              avatar: props?.route?.params?.item?.senderImage,
            }}
            containerStyle={styles.mainContainerDetail}
            renderAvatar={null}
            minComposerHeight={textData?.length > 75 ? 112 : 34}
            //   listViewProps={{
            //     scrollEventThrottle: 400,
            //     onScroll: ({ nativeEvent }) => {
            //       db.loadEarlier(setLoading)
            //       // setLoadEarlier(false)
            //     }
            // }}
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
        </View>
      )}
      {db?.messages.length > 0 &&
        log_in_data?.role_id !== 2 &&
        parseInt(props?.route?.params?.item?.currentRole) !== 1 && (
          <View style={{flex: 1, marginBottom: 30, marginTop: 30}}>
            <GiftedChat
              messages={db?.messages}
              onSend={messages => onSend(messages)}
              renderSend={message => renderActions(message)}
              renderBubble={customSystemMessage}
              scrollToBottom
              onInputTextChanged={text => setTextData(text)}
              text={textData}
              user={{
                _id: parseInt(props?.route?.params?.item?.senderId),
                name: props?.route?.params?.item?.senderName,
                avatar: props?.route?.params?.item?.senderImage,
              }}
              containerStyle={styles.mainContainerDetail}
              renderAvatar={null}
              minComposerHeight={textData?.length > 75 ? 112 : 34}
              textInputProps={{
                autoCorrect: false,
              }}

              // loadEarlier={loadEarlier}
              // isLoadingEarlier={loading}
              // listViewProps={{
              //     scrollEventThrottle: 400,
              //     onScroll: ({ nativeEvent }) => {
              //       db.loadEarlier(setLoading)
              //       // setLoadEarlier(false)
              //     }
              // }}
            />
          </View>
        )}
      <Modal
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <View style={[globalStyle.centeredView]}>
          <View style={globalStyle.modalView}>
            <Text style={globalStyle.modalHeader}>
              {Strings.ReportUser.Report_this_User}
            </Text>
            <Text style={globalStyle.modalSubHeader}>
              {Strings.ReportUser.ReportConfirm}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
                toastFunc();
              }}>
              <Text style={globalStyle.modalOption1}>
                {Strings.ReportUser.Yes_Report}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
              }}>
              <Text style={globalStyle.modalOption2}>
                {Strings.ReportUser.Not_Now}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ChatDetail;
