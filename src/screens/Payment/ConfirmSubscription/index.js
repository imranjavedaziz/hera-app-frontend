import {
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Header, {IconHeader} from '../../../components/Header';
import {Colors, Images, Strings} from '../../../constants';
import styles from '../ConfirmPayment/styles';
import {useNavigation} from '@react-navigation/native';
import {Routes, api_url} from '../../../constants/Constants';
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
import {createSubscriptionPaymentPageApi} from '../../../Api/Subscription';
// selectCheckBox
const ConfirmSubscription = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [Selected, setSelected] = useState('');
  const [SelectedCard, setSelectedCard] = useState('');
  const [isCallApi, setCallApi] = useState(false);
  const {getCardListResponse} = useSelector(store => store.getCardList);
  const [params] = useState(route.params);
  const {
    create_subscription_success,
    create_subscription_loading,
    create_subscription_res,
  } = useSelector(state => state.Subscription);
  const {subscription_status_success} = useSelector(
    state => state.Subscription,
  );
  useEffect(() => {
    console.log('params', params);
  });
  useEffect(() => {
    console.log('getCardListResponse', JSON.stringify(getCardListResponse));
    if (getCardListResponse?.info?.data.length === 1) {
      const item = getCardListResponse?.info?.data[0];
      setSelected(item?.id);
      setSelectedCard(item);
    }
  }, [getCardListResponse]);
  useEffect(() => {
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
  const onADDCARD = useCallback(
    another => {
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
    },
    [params],
  );

  const onPay = useCallback(() => {
    console.log('onPay');
    const payload = {
      device_type: Platform.OS,
      product_id: params.selectCheckBox.android_product,
    };
    setCallApi(true);
    dispatch(showAppLoader());
    createSubscriptionPaymentPageApi(payload).then(resp => {
      console.log('subscription page created: ', resp);
      const paymentUrl = api_url.replace('/api/v1/', '') + resp.data.paymentUrl;
      setCallApi(false);
      dispatch(hideAppLoader());
      Linking.openURL(paymentUrl).then(res => {
        console.log('subscription page opened: ', res);
        navigation.navigate(Routes.PtbProfile, params);
      });
    });
  }, [params, params.selectCheckBox]);

  return (
    <View style={styles.flex}>
      <Header end={false}>
        <IconHeader
          leftIcon={Images.circleIconBack}
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.androidHeaderIcons}
        />
      </Header>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={210}
        enableAutoAutomaticScroll={true}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <Text style={styles.mainText}>
            {Strings.confirmPassword.CONFIRM_PAYMENT}
          </Text>
          <Text style={styles.ammount}>{`$${params.selectCheckBox.price.toFixed(
            2,
          )}`}</Text>

          {/* {_.isEmpty(getCardListResponse?.info?.data) ? (
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
          )} */}
        </View>
      </KeyboardAwareScrollView>

      <View style={styles.bottonFloat}>
        <TouchableOpacity
          onPress={() => onPay()}
          style={styles.btnContainerPay}>
          <Text style={styles.btnText}>
            PAY ${params.selectCheckBox.price.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmSubscription;
