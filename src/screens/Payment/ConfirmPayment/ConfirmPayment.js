import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
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
  monthGet,
} from '../../../utils/commonFunction';
import ConfirmCardComp from './ConfirmCardComp';
import {paymentTransfer} from '../../../redux/actions/Payment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Value} from '../../../constants/FixedValues';

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
  console.log(params, 'hjjojo');
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
  function float2int(value) {
    return value | 0;
  }

  const Amount = params.amount.replace(/,/g, '');
  const roundOff = float2int(Amount);
  useEffect(() => {
    if (_.isEmpty(getCardListResponse?.info?.data)) {
      dispatch(getCardList(stripe_customer_id, 10));
    } else if (getCardListResponse?.info?.data.length === 1) {
      getCardListResponse?.info?.data.map((item, index) => {
        return setSelectedCard(item);
      });
    }
  }, [dispatch, stripe_customer_id]);
  console.log(SelectedCard, 'SelectedCardSelectedCard');
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
  useEffect(() => {
    if (loadingRef.current && !payment_transfer_loading) {
      dispatch(showAppLoader());
      if (payment_transfer_success) {
        dispatch(hideAppLoader());
        const payload = {
          id: params?.item?.id,
          payment_intent: payment_transfer_res?.payment_intent_id,
          amount: parseInt(roundOff),
          net_amount: calculateTotalStripeAmount(roundOff),
          payment_status: 1,
          brand: SelectedCard?.card?.brand,
          last4: SelectedCard?.card?.last4,
          created_at: params?.item?.created_at,
          username: params?.item?.username,
          profile_pic: params?.item?.profile_pic,
          role: log_in_data.role_id,
          payment: true,
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
      });
    } else {
      navigation.navigate(Routes.ManageCard, {
        params,
        noCard: true,
      });
    }
  };
  const onPay = () => {
    if (Selected || SelectedCard) {
      const payload = {
        to_user_id: params?.item?.id,
        amount: parseInt(roundOff),
        net_amount: calculateTotalStripeAmount(roundOff),
        payment_method_id: Selected ? Selected : SelectedCard?.id,
        payment_request_id: null,
        created_at: new Date().toString(),
      };
      dispatch(showAppLoader());
      dispatch(paymentTransfer(payload));
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
          <Text style={styles.ammount}>{`$${params.amount}`}</Text>
          <View style={styles.borderBlue}>
            <Image style={styles.warningImg} source={Images.BlueWarning} />
            <Text style={styles.warningText}>
              An additional fee of ${calculateStripeAmount(roundOff)} will be
              charged.
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
            onPress={() => onPay()}
            style={styles.btnContainerPay}>
            <Text style={styles.btnText}>
              PAY ${calculateTotalStripeAmount(roundOff)}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ConfirmPayment;
