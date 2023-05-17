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
import {Images, Strings, Colors, Alignment} from '../../constants';
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
import {BottomSheetComp, ModalMiddle} from '../../components';
import DocumentPicker from 'react-native-document-picker';
import ActionSheet from 'react-native-actionsheet';
import styleSheet from '../../styles/auth/smdonor/registerScreen';
import openCamera from '../../utils/openCamera';
import ImageView from 'react-native-image-viewing';
import {DocumentUpload} from '../../redux/actions/DocumentUpload';
import {NextStep} from '../../redux/actions/NextStep';
let fireDB;
let onChildAdd;
let images = [];
const ChatDetail = props => {
  const routeData = props?.route?.params?.item;
  const [nextStep, setNextStep] = useState(false);
  const navigation = useNavigation();
  const [showFeedback, setShowFeedback] = useState(true);
  const [textData, setTextData] = useState('');
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selection, setSelection] = useState(null);
  const [db, setDB] = useState({messages: [], loading: true});
  const {log_in_data, user} = useSelector(state => state.Auth);
  const subscriptionStatus = useSelector(
    state => state.Subscription.subscription_status_res,
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  let actionSheet = useRef();
  const [isOpen, setOpen] = useState(false);
  const [threeOption, setThreeOption] = useState([]);
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const loadingRef = useRef(false);
  const LoadingRef = useRef(false);
  const loadingNextRef = useRef(false);
  const [visible, setIsVisible] = useState(false);
  const [DocumentFile, setDocumentFile] = useState(null);
  const [sendFeedback, setSendFeedback] = useState('');
  const {feedback_data, feedback_success, feedback_loading} = useSelector(
    state => state.Chat,
  );
  const {
    document_upload_success,
    document_upload_res,
    document_upload_fail,
    document_upload_error_msg,
    document_upload_loading,
  } = useSelector(state => state.DocumentUpload);
  const {
    next_step_success,
    next_step_res,
    next_step_fail,
    next_step_error_msg,
    next_step_loading,
  } = useSelector(state => state.NextStep);
  const giftedref = useRef(null);
  const loadingUploadRef = useRef(null);
  useEffect(() => {
    setNextStep(
      routeData.hasOwnProperty('next_step')
        ? Boolean(routeData.next_step)
        : false,
    );
  }, [routeData]);
  useEffect(() => {
    deviceHandler(navigation, 'deviceGoBack');
  }, [navigation]);
  const {report_user_success, report_user_loading, report_user_error} =
    useSelector(state => state.ReportUser);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('CHAT DETAILS', loading);
    const paramItem = props?.route?.params?.item;

    if (
      parseInt(paramItem?.recieverSubscription) === 0 &&
      user?.role_id !== 2 &&
      parseInt(paramItem?.currentRole) !== 1
    ) {
      dispatch(showAppToast(true, Strings.Chat.INACTIVE_ACCOUNT));
    }
  }, [props?.route?.params]);
  useEffect(() => {
    dispatch(getMessageID(parseInt(props?.route?.params?.item?.recieverId)));
  }, [dispatch, props?.route?.params?.item?.recieverId]);
  useEffect(() => {
    const reqData = new FormData();
    file !== null &&
      reqData.append('file', {
        name: 'name',
        type: file.mime,
        uri: file.path,
      });
    reqData.append('to_user_id', props?.route?.params?.item?.recieverId);
    file !== null && dispatch(DocumentUpload(reqData));
  }, [file, dispatch]);
  useEffect(() => {
    if (loadingNextRef.current && !next_step_loading) {
      dispatch(showAppLoader());
      if (next_step_success) {
        dispatch(hideAppLoader());
        dispatch(showAppToast(false, 'Profile confirmed!'));
        setNextStep(true);
      }
      if (next_step_fail) {
        dispatch(hideAppLoader());
        dispatch(showAppToast(true, next_step_error_msg));
      }
    }
    loadingNextRef.current = next_step_loading;
  }, [next_step_success, next_step_loading, next_step_res]);
  useEffect(() => {
    if (loadingUploadRef.current && !document_upload_loading) {
      if (document_upload_success) {
        setTextData('');
        db.sendMessage(
          null,
          document_upload_res,
          document_upload_res?.mime,
          DocumentFile !== null ? DocumentFile?.name : file.name,
        )
          .then(() => {
            setTextData('');
            setFile(null);
            giftedref?.current?._messageContainerRef?.current?._listRef?._scrollRef.scrollTo();
            let data = {
              title:
                parseInt(props?.route?.params?.item?.currentRole) === 2
                  ? `${props?.route?.params?.item?.senderUserName} sent an Attachment`
                  : `${props?.route?.params?.item?.senderName} sent you a Attachment`,
              message: 'Shared an Attachment',
              receiver_id: parseInt(props?.route?.params?.item?.recieverId),
            };
            dispatch(pushNotification(data));
          })
          .catch(e => {
            console.log(e.message);
          });
      }
      if (document_upload_fail) {
        dispatch(showAppToast(true, document_upload_error_msg));
      }
    }
    loadingUploadRef.current = document_upload_loading;
  }, [document_upload_success, document_upload_loading, document_upload_res]);
  const renderActions = message => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: Platform.OS === 'ios' ? 5 : 10,
            right: -30,
          }}>
          <TouchableOpacity
            style={styles.select}
            onPress={() => onSend(message)}>
            <Image source={Images.ICON_SEND} style={{width: 30, height: 30}} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            position: 'absolute',
            bottom: Platform.OS === 'ios' ? -3 : 0,
            backgrroundColor: 'red',
            right: -95,
          }}>
          <TouchableOpacity
            onPress={() => {
              onSendDoc();
            }}>
            <Image source={Images.LINK} />
          </TouchableOpacity>
        </View>
      </>
    );
  };
  const renderActionAdmin = message => {
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
          console.log(messageItem, 'messageItemmessageItem');
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
  const handleDocumentUpload = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setDocumentFile(result[0]);
      // Create a new FormData object
      const formData = new FormData();
      // Append the selected PDF document to the FormData object
      formData.append('file', {
        uri: result[0].uri,
        type: result[0].type,
        name: result[0].name,
      });
      formData.append('to_user_id', props?.route?.params?.item?.recieverId);
      // Dispatch the DocumentUpload action with the FormData object
      dispatch(DocumentUpload(formData));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        console.error(err);
      }
    }
  };
  const handleThreeOption = option => {
    switch (option) {
      case Strings.sm_create_gallery.bottomSheetCamera:
        openCamera(0, cb);
        break;
      case Strings.sm_create_gallery.bottomSheetGallery:
        openCamera(1, cb);
        break;
      case Strings.sm_create_gallery.shareADoc:
        handleDocumentUpload();
        break;
      case Strings.Subscription.Cancel:
        console.log('Cancel');
        break;
      case Strings.chats.reqPayment:
        onClickSend();
        break;
      case Strings.chats.confirmProfile:
        const payload = {
          to_user_id: props?.route?.params?.item?.recieverId,
        };
        dispatch(NextStep(payload));
        console.log(Strings.chats.confirmProfile);
        break;
      case Strings.chats.sendPayment:
        onClickSend();
        break;
      case Strings.chats.seeProfile:
        navigateDetailScreen();
        break;
      case Strings.chats.shareUser:
        navigation.navigate(Routes.AllMedia, {
          item: props?.route?.params?.item,
        });
        break;
      case Strings.chats.reportUser:
        Platform.OS === 'ios' ? backAction() : setShowModal(true);
        break;
    }
  };
  const onClickSend = () => {
    if (log_in_data?.role_id === 2) {
      if (props?.route?.params?.filteredItem) {
        if (props?.route?.params?.filteredItem?.connected_acc_status) {
          navigation.navigate(Routes.PaymentSent, {
            id: props?.route?.params?.item?.recieverId,
            profile_pic: props?.route?.params?.item?.recieverImage,
            username: props?.route?.params?.item?.recieverUserName,
            role_id: props?.route?.params?.item?.currentRole,
            redirectTo: Routes.ChatDetail,
            ChatItem: {...props?.route?.params},
          });
        } else {
          dispatch(
            showAppToast(
              true,
              `Bank not added by ${getRoleData(
                props?.route?.params?.item?.currentRole,
              )} !`,
            ),
          );
        }
      }
    } else {
      if (
        props?.route?.params?.account_status_res?.status ||
        (props?.route?.params?.account_status_res?.bank_account &&
          props?.route?.params?.account_status_res?.kyc_status === 'verified')
      ) {
        const nameArr = props?.route?.params?.item?.recieverName.split(' ');
        navigation.navigate(Routes.SendRequest, {
          id: props?.route?.params?.item?.recieverId,
          profile_pic: props?.route?.params?.item?.recieverImage,
          first_name: nameArr[0],
          last_name: nameArr[1] || '',
        });
      } else if (
        props?.route?.params?.account_status_res?.bank_account === null ||
        props?.route?.params?.account_status_res?.bank_account === ''
      ) {
        dispatch(
          showAppToast(
            true,
            'Please add your bank details to request for a payment.',
          ),
        );
      } else if (
        props?.route?.params?.account_status_res?.kyc_status === 'incomplete'
      ) {
        dispatch(
          showAppToast(
            true,
            'You can request for a payment, once your bank KYC has been submitted.',
          ),
        );
      } else if (
        props?.route?.params?.account_status_res?.kyc_status === 'pending' ||
        props?.route?.params?.account_status_res?.kyc_status === 'rejected'
      ) {
        dispatch(
          showAppToast(
            true,
            'You can request for a payment, once your bank KYC has been verified.',
          ),
        );
      }
    }
  };
  const cb = image => {
    setOpen(false);
    setFile(image);
  };
  const openActionSheet = ({three}) => {
    setSelection(three);
    if (!three) {
      setThreeOption([
        Strings.sm_create_gallery.bottomSheetCamera,
        Strings.sm_create_gallery.bottomSheetGallery,
        Strings.sm_create_gallery.shareADoc,
        Strings.Subscription.Cancel,
      ]);
    } else if (log_in_data?.role_id === 2) {
      if (nextStep) {
        setThreeOption([
          Strings.chats.sendPayment,
          Strings.chats.seeProfile,
          Strings.chats.shareUser,
          Strings.chats.reportUser,
          Strings.Subscription.Cancel,
        ]);
      } else {
        setThreeOption([
          Strings.chats.confirmProfile,
          Strings.chats.sendPayment,
          Strings.chats.seeProfile,
          Strings.chats.shareUser,
          Strings.chats.reportUser,
          Strings.Subscription.Cancel,
        ]);
      }
    } else {
      setThreeOption([
        Strings.chats.reqPayment,
        Strings.chats.seeProfile,
        Strings.chats.shareUser,
        Strings.chats.reportUser,
        Strings.Subscription.Cancel,
      ]);
    }
    setTimeout(() => {
      actionSheet.current.show();
    }, 300);
  };
  const openIosSheet = three => {
    openActionSheet(three);
  };
  const openAndroidSheet = ({three}) => {
    setSelection(three);
    setOpen(true);
  };
  const onSendDoc = async () => {
    if (!subscriptionStatus?.data?.status && parseInt(user?.role_id) === 2) {
      navigation.navigate(Routes.Subscription);
      dispatch(
        showAppToast(
          true,
          subscriptionStatus.data.is_trial
            ? Strings.Subscription.TrailOver
            : Strings.Subscription.SubscriptionExpired,
        ),
      );
    } else if (
      parseInt(props?.route?.params?.item?.status_id) !== 1 ||
      (parseInt(user?.role_id) !== 2 &&
        parseInt(props?.route?.params?.item?.recieverSubscription) === 0)
    ) {
      dispatch(showAppToast(true, Strings.Chat.INACTIVE_ACCOUNT));
    } else {
      if (Platform.OS === 'ios') {
        openIosSheet({three: false});
      } else {
        openAndroidSheet({three: false});
      }
    }
  };
  const onSend = async (messages = '') => {
    if ((await NetInfo.isConnected.fetch()) !== true) {
      dispatch(showAppToast(true, ValidationMessages.NO_INTERNET_CONNECTION));
    } else if (
      !subscriptionStatus?.data?.status &&
      parseInt(user?.role_id) === 2
    ) {
      navigation.navigate(Routes.Subscription);
    } else if (
      parseInt(props?.route?.params?.item?.status_id) !== 1 ||
      (parseInt(user?.role_id) !== 2 &&
        parseInt(props?.route?.params?.item?.recieverSubscription) === 0)
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
  const onPressDoc = item => {
    const imageUri = item?.currentMessage.media?.file_url;
    const imageIndex = images.findIndex(image => image.uri === imageUri);
    if (imageIndex >= 0) {
      setCurrentImageIndex(imageIndex);
    } else {
      setCurrentImageIndex(images.length);
      images.push({uri: imageUri});
    }
    ImageClick(item);
  };
  const ImageClick = item => {
    setIsVisible(true);
  };

  const customSystemMessage = (item, index) => {
    return (
      <View style={{flex: 1, marginBottom: 4}}>
        <View>
          <View>
            <View
              style={[
                item.currentMessage.from ===
                parseInt(props?.route?.params?.item?.senderId)
                  ? item?.currentMessage.type === 'image/jpeg'
                    ? styles.senderImgID
                    : styles.senderID
                  : item?.currentMessage.type === 'image/jpeg'
                  ? styles.receiverImgID
                  : item?.currentMessage.type === 'application/pdf'
                  ? styles.receiverPdf
                  : styles.receiverID,
              ]}>
              <View
                style={
                  item?.currentMessage.type === 'image/jpeg'
                    ? styles.imagechatContainerImg
                    : styles.chatContainer
                }>
                {item?.currentMessage.type === 'image/jpeg' && (
                  <TouchableOpacity
                    onPress={() => {
                      onPressDoc(item);
                    }}>
                    <Image
                      resizeMode={Alignment.COVER}
                      style={
                        item.currentMessage.from ===
                        parseInt(props?.route?.params?.item?.senderId)
                          ? styles.msgImg
                          : styles.msgImgRx
                      }
                      source={{uri: item?.currentMessage.media?.file_url}}
                    />
                  </TouchableOpacity>
                )}
                {item?.currentMessage.type === 'application/pdf' && (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate(Routes.PdfView, {
                          url: item?.currentMessage.media?.file_url,
                        });
                      }}>
                      <View style={styles.pdfMainView}>
                        <Image style={styles.pdfImg} source={Images.PDF} />
                        <View>
                          <Text numberOfLines={1} style={styles.pdfText}>
                            {item?.currentMessage?.namePdf}
                          </Text>
                          <Text style={styles.pdfSize}>
                            {item?.currentMessage.media?.file_size}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
                <Text style={styles.chatText}>{item.currentMessage.text}</Text>
              </View>
            </View>
          </View>
          <View
            style={
              item.currentMessage.from ===
              parseInt(props?.route?.params?.item?.senderId)
                ? item?.currentMessage.type === 'image/jpeg'
                  ? styles.timeImgSender
                  : styles.timeSender
                : item?.currentMessage.type === 'image/jpeg'
                ? styles.timeImgRx
                : styles.timeRx
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
      recipient_id: parseInt(props?.route?.params?.item?.recieverId),
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
    if (log_in_data?.role_id === 2) {
      navigation.navigate(Routes.DashboardDetailScreen, {
        userId: parseInt(props?.route?.params?.item?.recieverId),
        coming: true,
        filteredItem: props?.route?.params?.filteredItem?.connected_acc_status
          ? props?.route?.params?.filteredItem?.connected_acc_status
          : '',
      });
    } else {
      navigation.navigate(Routes.ProfileDetails, {
        userid: parseInt(props?.route?.params?.item?.recieverId),
        coming: true,
        account_status_res: props?.route?.params?.account_status_res
          ? props?.route?.params?.account_status_res
          : '',
      });
    }
    setOpen(false);
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
          style: 'destructive',
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
    Platform.OS === 'ios'
      ? openIosSheet({three: true})
      : openAndroidSheet({three: true});
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

  async function arrowFunction() {
    if (
      props?.route?.params?.isComingFrom === true ||
      props?.route?.params?.chatPush === true
    ) {
      props.navigation.navigate(Routes.Chat_Listing);
    } else {
      await fireDB.readMessage();
      props.navigation.navigate(Routes.Chat_Listing);
    }
  }
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
              onPress={() => arrowFunction()}>
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
                        parseInt(props?.route?.params?.item?.status_id) !== 1
                      ? Images.defaultProfile
                      : {uri: props?.route?.params?.item?.recieverImage}
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
                        {props?.route?.params?.item?.recieverName}
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
        <View
          style={{
            flex: 1,
            marginBottom: Platform.OS === 'ios' ? 0 : 20,
          }}>
          <GiftedChat
            ref={giftedref}
            messages={db?.messages}
            onSend={messages => onSend(messages)}
            renderSend={message =>
              parseInt(props?.route?.params?.item?.status_id) !== 1
                ? null
                : renderActions(message)
            }
            renderBubble={customSystemMessage}
            scrollToBottom
            infiniteScroll
            onInputTextChanged={text => setTextData(text)}
            text={textData}
            disableComposer={
              parseInt(props?.route?.params?.item.status_id) !== 1
                ? true
                : false
            }
            user={{
              _id: parseInt(props?.route?.params?.item?.senderId),
              name: props?.route?.params?.item?.senderName,
              avatar: props?.route?.params?.item?.senderImage,
            }}
            containerStyle={styles.mainContainerDetail}
            renderAvatar={null}
            textInputProps={styles.textInput}
            minComposerHeight={Platform.OS === 'ios' ? 30 : 44}
            multiline={true}
            listViewProps={{
              scrollEventThrottle: 400,
              marginBottom: 10,
              onScroll: () => {
                db.loadEarlier(setLoading);
              },
            }}
            maxInputLength={1024}
            placeholder={
              parseInt(props?.route?.params?.item?.status_id) !== 1
                ? Strings.search_Bar.Inactive
                : Strings.search_Bar.write_message
            }
          />
        </View>
      )}
      {parseInt(props?.route?.params?.item?.currentRole) === 1 && (
        <View style={{flex: 1, marginBottom: Platform.OS === 'ios' ? 0 : 20}}>
          <GiftedChat
            ref={giftedref}
            messages={db?.messages}
            onSend={messages => onSend(messages)}
            renderSend={message => renderActionAdmin(message)}
            renderBubble={customSystemMessage}
            scrollToBottom
            onInputTextChanged={text => setTextData(text)}
            text={textData}
            user={{
              _id: parseInt(props?.route?.params?.item?.senderId),
              name: props?.route?.params?.item?.senderName,
              avatar: props?.route?.params?.item?.senderImage,
            }}
            containerStyle={styles.mainContainerDetailAdmin}
            renderAvatar={null}
            textInputProps={styles.textInput}
            minComposerHeight={Platform.OS === 'ios' ? 30 : 44}
            multiline={true}
            listViewProps={{
              scrollEventThrottle: 400,
              marginBottom: 10,
              onScroll: () => {
                db.loadEarlier(setLoading);
              },
            }}
            maxInputLength={1024}
            placeholder={Strings.search_Bar.write_message}
          />
        </View>
      )}
      {db?.messages.length > 0 &&
        log_in_data?.role_id !== 2 &&
        parseInt(props?.route?.params?.item?.currentRole) !== 1 && (
          <View
            style={{
              flex: 1,
              marginBottom: Platform.OS === 'ios' ? 0 : 20,
            }}>
            <GiftedChat
              ref={giftedref}
              scrollToBottom={true}
              messages={db?.messages}
              onSend={messages => onSend(messages)}
              renderSend={message =>
                parseInt(props?.route?.params?.item?.status_id) !== 1
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
              textInputProps={styles.textInput}
              disableComposer={
                parseInt(props?.route?.params?.item?.status_id) !== 1
                  ? true
                  : false
              }
              listViewProps={{
                scrollEventThrottle: 400,
                marginBottom: 10,
                onScroll: () => {
                  db.loadEarlier(setLoading);
                },
              }}
              minComposerHeight={Platform.OS === 'ios' ? 30 : 44}
              multiline={true}
              maxInputLength={1024}
              placeholder={
                parseInt(props?.route?.params?.item?.status_id) !== 1
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
      <ActionSheet
        ref={actionSheet}
        options={threeOption}
        destructiveButtonIndex={
          log_in_data?.role_id !== 2 ? 3 : selection ? (nextStep ? 3 : 4) : 3
        }
        cancelButtonIndex={selection ? 4 : 3}
        onPress={index => {
          handleThreeOption(threeOption[index]);
        }}
      />
      <BottomSheetComp isOpen={isOpen} setOpen={setOpen}>
        {!selection ? (
          <View style={styleSheet.imgPickerContainer}>
            <TouchableOpacity
              onPress={() => {
                openCamera(0, cb);
                setOpen(false);
              }}
              style={[styleSheet.pickerBtnCam, styleSheet.pickerBtnBorder]}>
              <Text style={styleSheet.pickerBtnLabel}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                openCamera(1, cb);
                setOpen(false);
              }}
              style={[styleSheet.pickerBtn, styleSheet.pickerBtnBorder]}>
              <Text style={styleSheet.pickerBtnLabel}>Open Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleDocumentUpload();
                setOpen(false);
              }}
              style={styleSheet.pickerBtn}>
              <Text style={styleSheet.pickerBtnLabel}>
                {Strings.sm_create_gallery.shareADoc}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styleSheet.imgPickerContainer}>
            {log_in_data?.role_id === 2 && !nextStep && (
              <TouchableOpacity
                onPress={() => {
                  const payload = {
                    to_user_id: props?.route?.params?.item?.recieverId,
                  };
                  dispatch(NextStep(payload));
                  setOpen(false);
                }}
                style={[styleSheet.pickerBtnCam, styleSheet.pickerBtnBorder]}>
                <Text style={styleSheet.pickerBtnLabel}>
                  {Strings.chats.confirmProfile}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                setOpen(false);
                onClickSend();
              }}
              style={[
                log_in_data?.role_id === 2
                  ? styleSheet.pickerBtn
                  : styleSheet.pickerBtnCam,
                styleSheet.pickerBtnBorder,
              ]}>
              <Text style={styleSheet.pickerBtnLabel}>
                {log_in_data?.role_id === 2
                  ? Strings.chats.sendPayment
                  : Strings.chats.reqPayment}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigateDetailScreen();
              }}
              style={[styleSheet.pickerBtn, styleSheet.pickerBtnBorder]}>
              <Text style={styleSheet.pickerBtnLabel}>
                {Strings.chats.seeProfile}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(Routes.AllMedia, {
                  item: props?.route?.params?.item,
                });
                setOpen(false);
              }}
              style={[styleSheet.pickerBtn, styleSheet.pickerBtnBorder]}>
              <Text style={styleSheet.pickerBtnLabel}>
                {Strings.chats.shareUser}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Platform.OS === 'ios' ? backAction() : setShowModal(true);
                setOpen(false);
              }}
              style={styleSheet.pickerBtn}>
              <Text style={[styleSheet.redColor]}>
                {Strings.chats.reportUser}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </BottomSheetComp>
      <ImageView
        images={images}
        imageIndex={currentImageIndex}
        visible={visible}
        onRequestClose={() => {
          setIsVisible(false);
          images = [{uri: images[currentImageIndex].uri}];
        }}
        isPinchZoomEnabled={true}
        swipeToCloseEnabled={false}
        style={{
          alignItems: Alignment.CENTER,
          justifyContent: Alignment.CENTER,
        }}
        imageSwipeThreshold={100000}
      />
    </View>
  );
};

export default React.memo(ChatDetail);
