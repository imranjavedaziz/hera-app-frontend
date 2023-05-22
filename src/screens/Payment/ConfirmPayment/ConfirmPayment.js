import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  BackHandler,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Header, {IconHeader} from '../../../components/Header';
import {Images, Strings} from '../../../constants';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../../constants/Constants';
import {useDispatch, useSelector} from 'react-redux';
import {GET_CARD_LIST, getCardList} from '../../../redux/actions/stripe.action';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
} from '../../../redux/actions/loader';
import _ from 'lodash';
import {
  calculateStripeAmount,
  calculateTotalStripeAmount,
  formatDigit,
  monthGet,
} from '../../../utils/commonFunction';
import ConfirmCardComp from './ConfirmCardComp';
import {paymentTransfer} from '../../../redux/actions/Payment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Value} from '../../../constants/FixedValues';
import {ModalMiddle} from '../../../components';
import {ValidationMessages} from '../../../constants/Strings';

const ConfirmPayment = ({route}) => {
  const navigation = useNavigation();
  const {getCardListResponse} = useSelector(store => store.getCardList);
  const params = route.params;
  const {stripe_customer_id} = useSelector(state => state.Auth);
  const {log_in_data} = useSelector(state => state.Auth);
  const {
    payment_transfer_success,
    payment_transfer_loading,
    payment_transfer_error_msg,
    payment_transfer_res,
    payment_transfer_fail,
  } = useSelector(state => state.Payment);
  const [showModal, setShowModal] = React.useState(false);
  const loadingRef = useRef(null);
  let scrollRef = React.createRef();
  const dispatch = useDispatch();
  const [Selected, setSelected] = React.useState('');
  const [SelectedCard, setSelectedCard] = React.useState('');
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      onPress={() => {
        navigation.goBack();
      }}
      style={styles.androidHeaderIcons}
    />
  );
  const amountParam = params.amount.toString();
  const Amount = amountParam?.includes(',')
    ? amountParam?.replace(/,/g, '')
    : amountParam;
  const roundOff = Amount;
  useEffect(() => {
    if (_.isEmpty(getCardListResponse?.info?.data)) {
      dispatch(getCardList(stripe_customer_id, 10));
    } else if (getCardListResponse?.info?.data.length === 1) {
      getCardListResponse?.info?.data.map((item, index) => {
        return setSelectedCard(item);
      });
    }
  }, [dispatch, stripe_customer_id]);
  //Get Card List
  useEffect(() => {
    if (getCardListResponse?.status === GET_CARD_LIST.START) {
      dispatch(showAppLoader());
    } else if (getCardListResponse?.status === GET_CARD_LIST.SUCCESS) {
      dispatch(hideAppLoader());
    } else if (getCardListResponse?.status === GET_CARD_LIST.FAIL) {
      let error = getCardListResponse?.info ?? 'Something went wrong';
      dispatch(hideAppLoader());
      dispatch(showAppToast(false, error));
    }
  }, [getCardListResponse]);
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
    if (loadingRef.current && !payment_transfer_loading) {
      dispatch(showAppLoader());
      if (payment_transfer_success) {
        dispatch(hideAppLoader());
        const payload = {
          ...route?.params,
          id: params?.item?.id,
          payment_intent: payment_transfer_res?.payment_intent_id,
          amount: roundOff,
          net_amount: calculateTotalStripeAmount(roundOff),
          payment_status: 1,
          brand: SelectedCard?.card?.brand,
          last4: SelectedCard?.card?.last4,
          created_at: new Date().toString(),
          username: params?.item?.username,
          profile_pic: params?.item?.profile_pic,
          role: log_in_data.role_id,
          payment: true,
          payout_status: 1,
        };
        navigation.navigate(Routes.TransactionDetails, payload);
        console.log(payment_transfer_res, 'payment_transfer_res');
      }
      if (payment_transfer_fail) {
        dispatch(hideAppLoader());
      }
      dispatch(hideAppLoader());
    }
    loadingRef.current = payment_transfer_loading;
  }, [
    payment_transfer_success,
    payment_transfer_loading,
    payment_transfer_error_msg,
    payment_transfer_res,
    payment_transfer_fail,
    dispatch,
  ]);
  const onADDCARD = another => {
    if (another) {
      navigation.navigate(Routes.ManageCard, {
        params,
        anotherCard: another,
        ...route?.params,
      });
    } else {
      navigation.navigate(Routes.ManageCard, {
        params,
        noCard: true,
        ...route?.params,
      });
    }
  };
  const onPay = () => {
    const payload = {
      to_user_id: params?.item?.id,
      amount: roundOff,
      net_amount: calculateTotalStripeAmount(roundOff),
      payment_method_id: Selected ? Selected : SelectedCard?.id,
      payment_request_id: params?.requestId,
      created_at: new Date().toString(),
    };
    dispatch(showAppLoader());
    dispatch(paymentTransfer(payload));
  };
  const backAction = () => {
    Alert.alert(
      ValidationMessages.CONFIRM_PAYMENT,
      `${ValidationMessages.CONFIRM_PAYMENT_DIS}${formatDigit(
        calculateTotalStripeAmount(roundOff),
      )}${ValidationMessages.SECOND_CONFIRM_DIS}${Strings.Hera_Pay.CARD_DOT}${
        SelectedCard?.card?.last4
      }${ValidationMessages.LAST_CONFIRM_DIS}`,
      [
        {
          text: ValidationMessages.CANCEL,
          onPress: () => null,
          style: 'destructive',
        },
        {
          text: ValidationMessages.YES_CONFIRM,
          onPress: () => {
            onPay();
          },
        },
      ],
    );
    return true;
  };
  const onPressProceed = () => {
    if (Selected || SelectedCard) {
      Platform.OS === 'ios' ? backAction() : setShowModal(true);
    } else {
      dispatch(showAppToast(true, 'Please select a card to proceed.'));
    }
  };
  return (
    <View style={styles.flex}>
      <Header end={false}>{headerComp()}</Header>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={210}
        enableAutoAutomaticScroll={true}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}>
        <View style={styles.mainContainer}>
          <Text style={styles.mainText}>
            {Strings.confirmPassword.CONFIRM_PAYMENT}
          </Text>
          <Text style={styles.ammount}>{`$${formatDigit(params.amount)}`}</Text>
          <View style={styles.borderBlue}>
            <Image style={styles.warningImg} source={Images.BlueWarning} />
            <Text style={styles.warningText}>
              An additional fee of $
              {formatDigit(calculateStripeAmount(roundOff))} will be charged.
            </Text>
          </View>
          {_.isEmpty(getCardListResponse?.info?.data) ? (
            <View style={styles.emptyCardView}>
              <Text style={styles.emptyText}>
                {Strings.confirmPassword.NoCard}
              </Text>
              <Text style={styles.secondEmptyText}>
                {Strings.confirmPassword.AddCardProceed}
              </Text>
              <TouchableOpacity
                onPress={() => onADDCARD()}
                style={styles.btnContainer}>
                <Text style={styles.btnText}>
                  {Strings.confirmPassword.AddCardButton}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{marginBottom: Value.CONSTANT_VALUE_200}}>
              <Text style={styles.cardPayText}>
                {Strings.confirmPassword.PayWithcard}
              </Text>
              {getCardListResponse?.info?.data.map((item, index) => {
                return (
                  <View key={item?.id}>
                    <ConfirmCardComp
                      index={item?.id}
                      onPress={() => {
                        setSelected(item?.id);
                        setSelectedCard(item);
                      }}
                      Data={getCardListResponse?.info?.data}
                      Icon={item?.card?.brand}
                      number={`${Strings.Hera_Pay.CARD_DOT}${item?.card?.last4}`}
                      Time={`${Strings.Hera_Pay.CARD_TIME} ${monthGet(
                        item?.card,
                      )} ${item?.card?.exp_year}`}
                      value={Selected}
                    />
                  </View>
                );
              })}
              <Text style={styles.moreCard} onPress={() => onADDCARD(true)}>
                {Strings.confirmPassword.PayWithAnotherCard}
              </Text>
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
      {!_.isEmpty(getCardListResponse?.info?.data) && (
        <View style={styles.bottonFloat}>
          <TouchableOpacity
            onPress={() => {
              onPressProceed();
            }}
            style={styles.btnContainerPay}>
            <Text style={styles.btnText}>
              PAY ${formatDigit(calculateTotalStripeAmount(roundOff))}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <ModalMiddle
        showModal={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
        String_1={ValidationMessages.CONFIRM_PAYMENT}
        String_2={`${ValidationMessages.CONFIRM_PAYMENT_DIS}${formatDigit(
          calculateTotalStripeAmount(roundOff),
        )}${ValidationMessages.SECOND_CONFIRM_DIS}${Strings.Hera_Pay.CARD_DOT}${
          SelectedCard?.card?.last4
        }${ValidationMessages.LAST_CONFIRM_DIS}`}
        String_3={ValidationMessages.YES_CONFIRM}
        String_4={ValidationMessages.CANCEL}
        onPressNav={() => {
          setShowModal(false);
          onPay();
        }}
        onPressOff={() => {
          setShowModal(false);
        }}
      />
    </View>
  );
};

export default ConfirmPayment;
