import {
  View,
  Text,
  FlatList,
  Alert,
  Platform,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Header} from '../../../components';
import styles from './styles';
import {Alignment, Images, Strings} from '../../../constants';
import {IconHeader} from '../../../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import PaymentRequestComp from './PaymentRequestComp';
import {
  getPaymentRequesPages,
  getPaymentRequestList,
  updateRequestStatus,
} from '../../../redux/actions/Payment';
import ImageView from 'react-native-image-viewing';
import {
  showAppLoader,
  hideAppLoader,
  showAppToast,
} from '../../../redux/actions/loader';
import _ from 'lodash';
import PaymentRequestModal from '../../../components/PaymentRequestModal/PaymentRequestModal';
import {formatDigit, getRequestTime} from '../../../utils/commonFunction';
import {Routes} from '../../../constants/Constants';
import {NotificationsCount} from '../../../redux/actions/NotificationsCount';
let images = [];
const PaymentRequest = () => {
  const navigation = useNavigation();
  const {log_in_data} = useSelector(state => state.Auth);
  const [Data, setData] = useState([]);
  const LoadingRef = useRef(null);
  const loadingRef = useRef(null);
  const [PtbData, setPtbData] = useState([]);
  const [UserName, setUserName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const {
    get_payment_request_list_success,
    get_payment_request_list_loading,
    get_payment_request_list_error_msg,
    get_payment_request_list_res,
    get_payment_request_list_fail,
    update_request_status_success,
    update_request_status_loading,
    update_request_status_error_msg,
    get_payment_request_page_loading,
    update_request_status_res,
    update_request_status_fail,
  } = useSelector(state => state.Payment);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showAppLoader());
    dispatch(getPaymentRequestList());
  }, [dispatch]);
  const handleBackButtonClick = () => {
    navigation.goBack();
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
  useEffect(() => {
    if (LoadingRef.current && !get_payment_request_list_loading) {
      if (get_payment_request_list_success) {
        setIsRefreshing(false);
        dispatch(hideAppLoader());
        if (log_in_data.role_id !== 2) {
          dispatch(
            NotificationsCount(get_payment_request_list_res?.data?.length),
          );
        }
        setData(get_payment_request_list_res?.data);
        const filteredData = get_payment_request_list_res?.data.filter(
          item => item.status === 0,
        );
        setPtbData(filteredData);
      }
      if (get_payment_request_list_fail) {
        dispatch(hideAppLoader());
        setIsRefreshing(false);
        dispatch(showAppToast(true, get_payment_request_list_error_msg));
      }
    }
    LoadingRef.current = get_payment_request_list_loading;
  }, [
    get_payment_request_list_success,
    get_payment_request_list_loading,
    get_payment_request_list_error_msg,
    get_payment_request_list_res,
    get_payment_request_list_fail,
    dispatch,
  ]);
  useEffect(() => {
    if (loadingRef.current && !update_request_status_loading) {
      dispatch(showAppLoader());
      if (update_request_status_success) {
        dispatch(hideAppLoader());
        setIsRefreshing(false);
        dispatch(getPaymentRequestList());
        if (
          update_request_status_res ===
          'Payment mark already paid successfully!'
        ) {
          dispatch(showAppToast(false, 'Request marked as already paid.'));
        } else {
          setIsRefreshing(false);
          dispatch(
            showAppToast(false, `Payment Request from ${UserName} declined.`),
          );
        }
        setUserName('');
      }
      if (update_request_status_fail) {
        dispatch(hideAppLoader());
        dispatch(showAppToast(true, update_request_status_error_msg));
      }
    }
    loadingRef.current = update_request_status_loading;
  }, [
    update_request_status_success,
    update_request_status_loading,
    update_request_status_error_msg,
    update_request_status_res,
    update_request_status_fail,
    dispatch,
    UserName,
  ]);
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      onPress={() => {
        navigation.goBack();
      }}
      style={styles.androidHeaderIcons}
    />
  );
  const onPressDoc = item => {
    const imageUri = item?.doc_url;
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
  const onRefresh = () => {
    //set isRefreshing to true
    setIsRefreshing(true);
    dispatch(getPaymentRequestList());
  };

  const renderItemData = ({item, index}) => {
    const url = item?.doc_url;
    // Extract the file extension from the URL
    const fileExtension = url?.split('.').pop() || '';
    // Conditionally set the 'pdf' prop
    const pdf = fileExtension.toLowerCase() === 'pdf';
    const formattedAmount = formatDigit(item?.amount);

    return (
      <PaymentRequestComp
        pdf={pdf}
        index={index}
        DocImg={item?.doc_url}
        PaymentStatus={item?.payout_status}
        profileImage={
          log_in_data.role_id === 2
            ? item?.donar?.profile_pic
            : item?.ptb?.profile_pic
        }
        mainText={
          log_in_data.role_id === 2
            ? `#${item?.donar?.username}${Strings.SendAndRequest.RequestFor}`
            : `${Strings.SendAndRequest.RequestSend}${item?.ptb?.first_name}`
        }
        amount={`$${formattedAmount}`}
        time={getRequestTime(item?.created_at)}
        onPressMedia={() => {
          pdf === true
            ? navigation.navigate(Routes.PdfView, {
                url: item?.doc_url,
              })
            : onPressDoc(item);
        }}
        OnPressDecline={() => {
          setUserName(item?.donar?.username);
          OnPressDecline(item);
        }}
        OnPressPay={() => {
          navigation.navigate(Routes.PaymentSent, item);
        }}
      />
    );
  };

  const backAction = item => {
    Alert.alert(
      'Cancel Request?',
      'Once you cancel, the request will be removed. Please select a reason for cancellation.',
      [
        {
          text: 'Invalid Request',
          onPress: () => {
            const payload = {
              payment_request_id: item?.id,
              status: 2,
            };
            dispatch(showAppLoader());
            dispatch(updateRequestStatus(payload));
          },
        },
        {
          text: 'I have already Paid',
          onPress: () => {
            const payload = {
              payment_request_id: item?.id,
              status: 3,
            };
            dispatch(showAppLoader());
            dispatch(updateRequestStatus(payload));
          },
        },
        {
          text: 'Do not Cancel Request',
          onPress: () => null,
          style: 'destructive',
          textStyle: {
            color: 'red',
          },
        },
      ],
      {cancelable: true},
    );
    return true;
  };
  const OnPressDecline = item => {
    Platform.OS === 'ios' ? backAction(item) : setShowModal(true);
  };

  return (
    <View style={styles.flex}>
      <Header end={false}>{headerComp()}</Header>
      <View style={styles.flex}>
        {((log_in_data.role_id !== 2 && !_.isEmpty(Data)) ||
          (log_in_data.role_id === 2 && !_.isEmpty(PtbData))) && (
          <View style={styles.container}>
            <Text style={styles.heraPay}>{Strings.Hera_Pay.HERA_PAY}</Text>
            <Text style={styles.sendPayment}>
              {log_in_data.role_id === 2
                ? Strings.SendAndRequest.GetPaymentRequest
                : Strings.SendAndRequest.SendPaymentRequest}
            </Text>
            <FlatList
              data={log_in_data.role_id === 2 ? PtbData : Data}
              renderItem={(item, index) => renderItemData(item, index)}
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() => (
                <View
                  style={{
                    marginBottom: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {get_payment_request_page_loading && (
                    <ActivityIndicator style={{marginTop: 40}} />
                  )}
                </View>
              )}
              onEndReached={() => {
                if (
                  get_payment_request_list_res.current_page <
                  get_payment_request_list_res.last_page
                ) {
                  dispatch(getPaymentRequesPages());
                }
              }}
            />
          </View>
        )}
        {((log_in_data.role_id !== 2 && _.isEmpty(Data)) ||
          (log_in_data.role_id === 2 && _.isEmpty(PtbData))) &&
          !get_payment_request_list_loading && (
            <View style={styles.mainContainer}>
              <Text style={styles.emptyText}>
                {log_in_data?.role_id === 2
                  ? 'No New Request'
                  : 'No Request Sent'}
              </Text>
              <Text style={styles.secondEmptyText}>
                {log_in_data?.role_id === 2
                  ? 'You have not received any payment request from your matches.'
                  : 'You have not sent any payment request to Intended Parents.'}
              </Text>
            </View>
          )}
      </View>
      <PaymentRequestModal
        showModal={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
        String_1={'Cancel Request?'}
        String_2={
          'Once you cancel, the request will be removed. Please select a reason for cancellation.'
        }
        String_3={'Invalid Request'}
        String_4={'I have already Paid'}
        onPressInvalid={() => {
          setShowModal(false);
        }}
        onPressPaid={() => {
          setShowModal(false);
        }}
        onPressCancel={() => {
          setShowModal(false);
        }}
        String_5={'Do not Cancel Request'}
      />
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

export default PaymentRequest;
