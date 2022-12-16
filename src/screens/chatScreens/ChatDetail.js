import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Images, Strings} from '../../constants';
import styles from './styles';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import {getMessageID} from '../../redux/actions/MessageId';
import {GiftedChat} from 'react-native-gifted-chat';

const ChatDetail = props => {
  const dispatch = useDispatch();
  useEffect(() => {
<<<<<<< HEAD
    console.log('CHAT DETAILS', loading);
    const paramItem = props?.route?.params?.item;
    dispatch(getMessageID(parseInt(props?.route?.params?.item?.recieverId)));
    console.log(user.role_id, 'user.role_id3');
    console.log(paramItem.currentRole, 'paramItem.currentRole2');
    if (
      parseInt(paramItem?.recieverSubscription) === 0 &&
      user?.role_id !== 2 &&
      parseInt(paramItem?.currentRole) !== 1
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

=======
    dispatch(getMessageID(props?.route?.params?.item?.recieverId));
  });
>>>>>>> e02f312e7c306daffa02950553263ffd05048da6
  const customSystemMessage = item => {
    return (
      <View>
        <View>
          <View>
            <View>
              <View style={styles.chatContainer}>
                <Text style={styles.chatText}>{item.currentMessage.text}</Text>
              </View>
            </View>
          </View>
          <View>
            <Text>
              {moment(item.currentMessage.createdAt).format('h:mm a')}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      <View>
        <View style={styles.outerContainer}>
<<<<<<< HEAD
          <View style={{zIndex: 9999}}>
            <TouchableOpacity
              hitSlop={{top: 20, bottom: 20, left: 10, right: 10}}
              onPress={() => {
                props.route.params.isComingFrom === true ||
                props.route.params.chatPush === true
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
            (parseInt(props?.route?.params?.item?.currentRole) !== 1 &&
              props?.route?.params?.item?.status_id === 1 && (
                <TouchableOpacity onPress={() => navReport()}>
                  <Image source={Images.iconDarkMore} />
                </TouchableOpacity>
              ))}
=======
          <TouchableOpacity>
            <Image source={Images.iconDarkMore} />
          </TouchableOpacity>
>>>>>>> e02f312e7c306daffa02950553263ffd05048da6
          <View />
        </View>
        <View style={styles.border} />
      </View>
      <View>
        <GiftedChat
          renderBubble={customSystemMessage}
          scrollToBottom
          infiniteScroll
          disableComposer={
            props.route.params.item.status_id !== 1 ? true : false
          }
          user={{
            _id: props?.route?.params?.item?.senderId,
            name: props?.route?.params?.item?.senderName,
            avatar: props?.route?.params?.item?.senderImage,
          }}
          containerStyle={styles.mainContainerDetail}
          renderAvatar={null}
          textInputProps={styles.textInput}
          maxInputLength={1024}
        />
      </View>
      {props?.route?.params?.item?.currentRole === 1 && (
        <View>
          <GiftedChat
            renderBubble={customSystemMessage}
            scrollToBottom
            user={{
              _id: props?.route?.params?.item?.senderId,
              name: props?.route?.params?.item?.senderName,
              avatar: props?.route?.params?.item?.senderImage,
            }}
            containerStyle={styles.mainContainerDetail}
            renderAvatar={null}
            textInputProps={styles.textInput}
            maxInputLength={1024}
            placeholder={Strings.search_Bar.write_message}
          />
        </View>
      )}
<<<<<<< HEAD
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
                parseInt(props.route.params.item.status_id) !== 1
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
=======
      <View>
        <GiftedChat
          scrollToBottom={true}
          renderBubble={customSystemMessage}
          user={{
            _id: props?.route?.params?.item?.senderId,
            name: props?.route?.params?.item?.senderName,
            avatar: props?.route?.params?.item?.senderImage,
          }}
          containerStyle={styles.mainContainerDetail}
          renderAvatar={null}
          textInputProps={styles.textInput}
          disableComposer={
            props.route.params.item.status_id !== 1 ? true : false
          }
          listViewProps={{
            scrollEventThrottle: 400,
            marginBottom: 10,
          }}
          maxInputLength={1024}
          placeholder={
            props.route.params.item.status_id !== 1
              ? Strings.search_Bar.Inactive
              : Strings.search_Bar.write_message
          }
        />
      </View>
>>>>>>> e02f312e7c306daffa02950553263ffd05048da6
    </View>
  );
};

export default React.memo(ChatDetail);
