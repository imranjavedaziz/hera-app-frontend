import {View, Text, Platform, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header, {IconHeader} from '../../../components/Header';
import {Colors, Images, Strings} from '../../../constants';
import styles from '../ConfirmPayment/styles';
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
import {monthGet} from '../../../utils/commonFunction';
import ConfirmCardComp from './ConfirmCardComp';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Value} from '../../../constants/FixedValues';
import {
  createSubscription,
  getSubscriptionStatus,
} from '../../../redux/actions/Subsctiption';
// selectCheckBox
const ConfirmSubscription = ({route}) => {
  const navigation = useNavigation();
  const [isCallApi, setCallApi] = useState(false);
  const {getCardListResponse} = useSelector(store => store.getCardList);
  const params = route.params;
  const {stripe_customer_id} = useSelector(state => state.Auth);
  const {log_in_data} = useSelector(state => state.Auth);
  const {
    create_subscription_success,
    create_subscription_loading,
    create_subscription_res,
  } = useSelector(state => state.Subscription);
  const {subscription_status_success} = useSelector(
    state => state.Subscription,
  );
  console.log(params, 'hjjojo');
  let scrollRef = React.createRef();
  const dispatch = useDispatch();
  const [Selected, setSelected] = useState('');
  const [SelectedCard, setSelectedCard] = useState('');
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      onPress={() => {
        navigation.goBack();
      }}
      style={styles.androidHeaderIcons}
    />
  );
  useEffect(() => {
    if (_.isEmpty(getCardListResponse?.info?.data)) {
      dispatch(getCardList(stripe_customer_id, 10));
    } else if (getCardListResponse?.info?.data.length === 1) {
      const item = getCardListResponse?.info?.data[0];
      setSelected(item?.id);
      setSelectedCard(item);
    }
  }, [dispatch, stripe_customer_id, getCardListResponse]);
  useEffect(() => {
    console.log('CHECKING CREATE SUB LINE NO 74');
    if (
      create_subscription_success &&
      isCallApi &&
      subscription_status_success
    ) {
      dispatch(getSubscriptionStatus());
      if (subscription_status_success) {
        setCallApi(false);
        dispatch(hideAppLoader());
        navigation.navigate(Routes.PtbProfile, params);
      }
    }
  }, [
    create_subscription_success,
    create_subscription_loading,
    create_subscription_res,
    subscription_status_success,
    isCallApi,
  ]);
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
  const onADDCARD = another => {
    if (another) {
      navigation.navigate(Routes.SubscriptionCard, {
        ...params,
        anotherCard: another,
      });
    } else {
      navigation.navigate(Routes.SubscriptionCard, {
        ...params,
        noCard: true,
      });
    }
  };
  const onPay = () => {
    if (Selected || SelectedCard) {
      const payload = {
        device_type: Platform.OS,
        product_id: params.selectCheckBox.android_product,
        payment_method_id: Selected,
        purchase_token: 'null',
      };
      console.log('payload', payload);
      setCallApi(true);
      dispatch(showAppLoader());
      dispatch(createSubscription(payload));
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
          <Text style={styles.ammount}>{`$${params.selectCheckBox.price.toFixed(
            2,
          )}`}</Text>
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
                {Strings.confirmPassword.ChangeCard}
              </Text>
              <Text style={styles.bottomPara}>
                <Text style={{color: Colors.RED}}>*</Text>
                {Strings.confirmPassword.BottomPara}
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
              PAY ${params.selectCheckBox.price.toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ConfirmSubscription;
