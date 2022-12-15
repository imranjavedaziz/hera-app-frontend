import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import FirebaseDB from '../../utils/FirebaseDB';
import {Images, Strings, Colors} from '../../constants';
import {ValidationMessages} from '../../constants/Strings';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
} from '../../redux/actions/loader';
import {chatFeedback, pushNotification} from '../../redux/actions/Chat';
import {Routes} from '../../constants/Constants/';
import EmptySmDonor from '../../components/Chat/EmptySmDonor';
import moment from 'moment';
import {ReportUser} from '../../redux/actions/ReportUser';
import NetInfo from '@react-native-community/netinfo';
import {getMessageID} from '../../redux/actions/MessageId';
import {deviceHandler} from '../../utils/commonFunction';
import {ModalMiddle} from '../../components';

let fireDB;
let onChildAdd;
const ChatDetail = props => {
  const navigation = useNavigation();
  const [showFeedback, setShowFeedback] = useState(true);
  const [textData, setTextData] = useState('');
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [db, setDB] = useState({messages: [], loading: true});
  const {log_in_data, user} = useSelector(state => state.Auth);
  const subscriptionStatus = useSelector(
    state => state.Subscription.subscription_status_res,
  );
  const [showModal, setShowModal] = useState(false);
  const loadingRef = useRef(false);
  const LoadingRef = useRef(false);
  const [sendFeedback, setSendFeedback] = useState('');
  const {feedback_data, feedback_success, feedback_loading} = useSelector(
    state => state.Chat,
  );
  const giftedref = useRef(null);
  useEffect(() => {
    deviceHandler(navigation, 'deviceGoBack');
  }, [navigation]);
  const {report_user_success, report_user_loading, report_user_error} =
    useSelector(state => state.ReportUser);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('CHAT DETAILS', loading);
    const paramItem = props?.route?.params?.item;
    dispatch(getMessageID(parseInt(props?.route?.params?.item?.recieverId)));
    console.log(user.role_id, 'user.role_id3');
    console.log(paramItem.currentRole, 'paramItem.currentRole2');
    if (
      parseInt(paramItem?.recieverSubscription) === 0 &&
      user?.role_id !== 2 &&
      paramItem?.currentRole !== 1
    ) {
      dispatch(showAppToast(true, Strings.Chat.INACTIVE_ACCOUNT));
    }
  }, [props.route.params]);

  const renderActions = message => {
    return (
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 5 : 10,
          right: -30,
        }}>
        <TouchableOpacity style={styles.select} onPress={() => onSend(message)}>
          <Image source={Images.ICON_SEND} style={{width: 30, height: 30}} />
        </TouchableOpacity>
      </View>
    );
  };
  useEffect(() => {
    if (subscriptionStatus && subscriptionStatus.data) {
      console.log(subscriptionStatus?.data, 'subscriptionStatus?.data');
      if (!subscriptionStatus?.data.status && parseInt(user?.role_id) === 2) {
        dispatch(
          showAppToast(
            true,
            subscriptionStatus.data.is_trial
              ? Strings.Subscription.ChatTrailOver
              : Strings.Subscription.ChatSubscriptionExpired,
          ),
        );
      }
    }
  }, [subscriptionStatus]);
  useEffect(async () => {
    setLoader(true);
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
    console.log(user, receiver, 'user, receiver');
    fireDB = new FirebaseDB(user, receiver);
    await fireDB.setTotalSize();
    dispatch(showAppLoader());
    await fireDB.initMessages();
    await fireDB.readMessage();
    fireDB.lastIdInSnapshot = now;
    setDB(fireDB);
    dispatch(hideAppLoader());
    setLoader(false);
    onChildAdd = fireDB.reference.on(
      'child_added',
      async (snapshot, _previousChildKey) => {
        setLoading(true);
        const messageItem = fireDB.parseMessages(snapshot);
        if (messageItem._id > now) {
          fireDB.lastKey = snapshot.key;
          await fireDB.messageLength();
          fireDB.prependMessage(messageItem);
          await fireDB.readAll();
          fireDB.lastIdInSnapshot = snapshot.key;
          setLoading(false);
        }
       
      },
    );
  }, []);
  console.log(db.totalSize, 'fireDB.totalSize');
  useEffect(async () => {
    const unsubscribe = () => {
      setDB({messages: [], loading: false});
      fireDB.reference.off('child_added', onChildAdd);
      db.reference.off('child_added', onChildAdd);
      fireDB = null;
    };
    return () => unsubscribe();
  }, []);
  //Report User
  useEffect(() => {
    if (LoadingRef.current && !report_user_loading) {
      dispatch(showAppLoader());
      if (report_user_success) {
        dispatch(hideAppLoader());
        dispatch(showAppToast(false, report_user_error));
      } else {
        dispatch(hideAppLoader());
      }
    }
    LoadingRef.current = report_user_loading;
  }, [report_user_success, report_user_loading]);
  const onSend = async (messages = '') => {
    if ((await NetInfo.isConnected.fetch()) !== true) {
      dispatch(showAppToast(true, ValidationMessages.NO_INTERNET_CONNECTION));
    } else if (
      !subscriptionStatus?.data?.status &&
      parseInt(user?.role_id) === 2
    ) {
      navigation.navigate(Routes.Subscription);
    } else if (
      parseInt(props.route.params.item.status_id) !== 1 ||
      (parseInt(user?.role_id) !== 2 &&
        parseInt(props.route.params.item.recieverSubscription) === 0)
    ) {
      dispatch(showAppToast(true, Strings.Chat.INACTIVE_ACCOUNT));
    } else if (messages.text.trim().length === 0) {
      dispatch(showAppToast(true, Strings.Chat.PLEASE_ENTER_MESSAGE));
    } else {
      setTextData('');
      if (messages.text !== '') {
        db.sendMessage(messages.text)
          .then(() => {
            setTextData('');
            giftedref?.current?._messageContainerRef?.current?._listRef?._scrollRef.scrollTo();
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
    console.log(log_in_data?.role_id, 'log_in_data?.role_id ');
    if (parseInt(props?.route?.params?.item?.match_request?.status) === 1) {
      navigation.navigate(Routes.Chat_Request, {
        item: props.route.params.item,
      });
    } else if (log_in_data?.role_id === 2) {
      navigation.navigate(Routes.DashboardDetailScreen, {
        userId: parseInt(props?.route?.params?.item?.recieverId),
        coming: true,
      });
    } else {
      navigation.navigate(Routes.ProfileDetails, {
        userid: parseInt(props?.route?.params?.item?.recieverId),
        coming: true,
      });
    }
  };
  const toastFunc = () => {
    const payload = {
      to_user_id: parseInt(props?.route?.params?.item?.recieverId),
    };
    dispatch(ReportUser(payload));
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
        role = 'Intended Parent';
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
        role = 'Intended Parent';
        break;
    }
    return role;
  }
  console.log(
    giftedref?.current?._messageContainerRef?.current?._listRef?._scrollRef
      .scrollToEnd,
    'giftedref',
  );
  return (
    <View style={{flex: 1, backgroundColor: Colors.BACKGROUND}}>
      <View
        style={{
          backgroundColor: Colors.BACKGROUND,
        }}>
        <View style={styles.outerContainer}>
          <View style={{zIndex: 9999}}>
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
              (parseInt(props?.route?.params?.item?.recieverSubscription) ===
                0 &&
                parseInt(props?.route?.params?.item?.currentRole) !== 1) ||
              parseInt(props?.route?.params?.item?.status_id) !== 1
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
                        ) === 0 ||
                        parseInt(props.route.params.item.status_id) !== 1
                      ? Images.defaultProfile
                      : {uri: props.route.params.item.recieverImage}
                  }
                  style={styles.avatar}
                />
              </View>
              <View style={{marginLeft: 10}}>
                {(parseInt(props?.route?.params?.item?.recieverSubscription) ===
                  0 &&
                  parseInt(props?.route?.params?.item?.currentRole) !== 1) ||
                parseInt(props?.route?.params?.item?.status_id) !== 1 ? (
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
                                parseInt(
                                  props?.route?.params?.item?.currentRole,
                                ),
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
          </TouchableOpacity>

          {parseInt(props?.route?.params?.item?.recieverSubscription) === 0 ||
            (props?.route?.params?.item?.currentRole !== 1 &&
              props?.route?.params?.item?.status_id === 1 && (
                <TouchableOpacity onPress={() => navReport()}>
                  <Image source={Images.iconDarkMore} />
                </TouchableOpacity>
              ))}
          <View />
        </View>
        <View style={styles.border} />
      </View>
      {showFeedback &&
        parseInt(props?.route?.params?.item?.currentRole) !== 1 &&
        parseInt(props?.route?.params?.item?.feedback_status) !== 1 &&
        ((db?.totalSize >= 20 &&
          parseInt(props?.route?.params?.item?.feedback_status) !== 2) ||
          db?.totalSize >= 50) &&
        log_in_data?.role_id === 2 && (
          <View
            style={[
              {
                height: db?.totalSize < 50 ? 130 : 117,
                width: '100%',
                backgroundColor: Colors.WHITE,
                zIndex: 1,
                top: 80,
                position: 'absolute',
              },
              db?.totalSize > 50 && {justifyContent: 'center'},
            ]}>
            {db?.totalSize < 50 && (
              <TouchableOpacity
                style={{
                  right: 8,
                  top: 8,
                  alignSelf: 'flex-end',
                }}
                onPress={() => {
                  setSendFeedback(2);
                  feedback(0, 1);
                }}>
                <Image source={Images.iconcross} style={styles.crossImage} />
              </TouchableOpacity>
            )}
            <View style={{justifyContent: 'center'}}>
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
          </View>
        )}
      {log_in_data?.role_id === 2 &&
        db?.messages.length === 0 &&
        loader !== true && (
          <View style={styles.smDonorEmptyView}>
            <EmptySmDonor
              image={Images.conversation2}
              title={Strings.Chat.START_CONVERSATION}
              midTitle=""
            />
          </View>
        )}

      {parseInt(props?.route?.params?.item?.currentRole) === 1 &&
        db?.messages.length === 0 &&
        loader !== true && (
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
        parseInt(props?.route?.params?.item?.currentRole) !== 1 &&
        loader !== true && (
          <EmptySmDonor
            image={Images.conversation2}
            title={Strings.Chat.YOU_MATCHED}
            midTitle={Strings.Chat.PARENT_TO_BE_CONVERSATION}
          />
        )}
      {log_in_data?.role_id === 2 && (
        <View style={{flex: 1, marginBottom: 10}}>
          <GiftedChat
            ref={giftedref}
            messages={db?.messages}
            onSend={messages => onSend(messages)}
            renderSend={message =>
              parseInt(props.route.params.item.status_id) !== 1
                ? null
                : renderActions(message)
            }
            renderBubble={customSystemMessage}
            scrollToBottom
            infiniteScroll
            onInputTextChanged={text => setTextData(text)}
            text={textData}
            disableComposer={
              parseInt(props.route.params.item.status_id) !== 1 ? true : false
            }
            user={{
              _id: parseInt(props?.route?.params?.item?.senderId),
              name: props?.route?.params?.item?.senderName,
              avatar: props?.route?.params?.item?.senderImage,
            }}
            containerStyle={styles.mainContainerDetail}
            renderAvatar={null}
            textInputProps={styles.textInput}
            minComposerHeight={
              textData?.length > 75 ? 75 : Platform.OS === 'ios' ? 30 : 44
            }
            listViewProps={{
              scrollEventThrottle: 400,
              marginBottom: 10,
              onScroll: () => {
                db.loadEarlier(setLoading);
              },
            }}
            maxInputLength={1024}
            placeholder={
              parseInt(props.route.params.item.status_id) !== 1
                ? Strings.search_Bar.Inactive
                : Strings.search_Bar.write_message
            }
            bottomOffset={textData?.length > 75 ? -50 : 20}
          />
        </View>
      )}
      {parseInt(props?.route?.params?.item?.currentRole) === 1 && (
        <View style={{flex: 1, marginBottom: 10}}>
          <GiftedChat
            ref={giftedref}
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
            textInputProps={styles.textInput}
            minComposerHeight={
              textData?.length > 75 ? 75 : Platform.OS === 'ios' ? 30 : 44
            }
            listViewProps={{
              scrollEventThrottle: 400,
              marginBottom: 10,
              onScroll: () => {
                db.loadEarlier(setLoading);
              },
            }}
            bottomOffset={textData?.length > 75 ? -50 : 20}
            maxInputLength={1024}
            placeholder={Strings.search_Bar.write_message}
          />
        </View>
      )}
      {db?.messages.length > 0 &&
        log_in_data?.role_id !== 2 &&
        parseInt(props?.route?.params?.item?.currentRole) !== 1 && (
          <View style={{flex: 1, marginBottom: 10}}>
            <GiftedChat
              ref={giftedref}
              scrollToBottom={true}
              bottomOffset={textData?.length > 75 ? -50 : 20}
              messages={db?.messages}
              onSend={messages => onSend(messages)}
              renderSend={message =>
                parseInt(props.route.params.item.status_id) !== 1
                  ? null
                  : renderActions(message)
              }
              renderBubble={customSystemMessage}
              onInputTextChanged={text => setTextData(text)}
              text={textData}
              user={{
                _id: parseInt(props?.route?.params?.item?.senderId),
                name: props?.route?.params?.item?.senderName,
                avatar: props?.route?.params?.item?.senderImage,
              }}
              containerStyle={styles.mainContainerDetail}
              renderAvatar={null}
              minComposerHeight={
                textData?.length > 75 ? 75 : Platform.OS === 'ios' ? 30 : 44
              }
              textInputProps={styles.textInput}
              disableComposer={
                parseInt(props.route.params.item.status_id) !== 1 ? true : false
              }
              listViewProps={{
                scrollEventThrottle: 400,
                marginBottom: 10,
                onScroll: () => {
                  db.loadEarlier(setLoading);
                },
              }}
              maxInputLength={1024}
              placeholder={
                props.route.params.item.status_id !== 1
                  ? Strings.search_Bar.Inactive
                  : Strings.search_Bar.write_message
              }
            />
          </View>
        )}
      <ModalMiddle
        showModal={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
        String_1={Strings.ReportUser.Report_this_User}
        String_2={Strings.ReportUser.ReportConfirm}
        String_3={Strings.ReportUser.Yes_Report}
        String_4={Strings.ReportUser.Not_Now}
        onPressNav={() => {
          setShowModal(false);
          toastFunc();
        }}
        onPressOff={() => {
          setShowModal(false);
        }}
      />
    </View>
  );
};

export default React.memo(ChatDetail);
