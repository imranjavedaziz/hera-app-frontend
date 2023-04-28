import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Platform,
  FlatList,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../../../components/Container';
import Images from '../../../../constants/Images';
import Button from '../../../../components/Button';
import Strings from '../../../../constants/Strings';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import TitleComp from '../../../../components/dashboard/TitleComp';
import Commitment from '../../../../components/dashboard/PtbProfile/Committment';
import InAPPPurchase from '../../../../utils/inAppPurchase';
import {useSelector, useDispatch} from 'react-redux';
import {
  createSubscription,
  getSubscriptionPlan,
  getSubscriptionStatus,
} from '../../../../redux/actions/Subsctiption';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
} from '../../../../redux/actions/loader';
import * as RNIap from 'react-native-iap';
import SensorySubscription from '../../../../components/SensoryCharacteristics/SensorySubscription';
import CustomModal from '../../../../components/CustomModal/CustomModal';
import {IconHeader} from '../../../../components/Header';
import {
  TERMS_OF_USE_URL,
  PRIVACY_URL,
  Fonts,
  Routes,
} from '../../../../constants/Constants';
import moment from 'moment';
import {Value} from '../../../../constants/FixedValues';
import {Colors} from '../../../../constants';

const Subscription = props => {
  const navigation = useNavigation();
  const [rolePlans, setRolePlans] = useState([]);
  const [androidPlans, setAndroidPlans] = useState([]);
  const [modal, setModal] = useState(false);
  const [changeModal, setChangeModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [isPlanUpgrade, setPlanUpgrade] = useState(false);
  const [isPlanChanged, setPlanChanged] = useState(false);
  const [selectCheckBox, setSelectCheckBox] = useState(null);
  const [_purchasereceipt, setPurchaseReceipt] = React.useState(null);
  const IAPService = InAPPPurchase.getInstance();
  const loadingRef = React.useRef(false);
  const [subscriptionPlan, setSubscriptionPlanRes] = useState([]);
  const [isCallApi, setCallApi] = React.useState(false);
  const {subscription_status_success} = useSelector(
    state => state.Subscription,
  );
  const dispatch = useDispatch();
  const {
    subscription_plan_success,
    subscription_plan_loading,
    subscription_plan_res,
  } = useSelector(state => state.Subscription);
  const {create_subscription_success, create_subscription_loading} =
    useSelector(state => state.Subscription);
  const subscriptionStatus = useSelector(
    state => state.Subscription?.subscription_status_res,
  );
  const getSubscription = async () => {
    try {
      const Products = await RNIap.getSubscriptions({skus: ['hera_monthly']});
      setAndroidPlans(Products);
    } catch (err) {
      console.log('getSubscription err', err);
    }
  };
  useEffect(() => {
    dispatch(getSubscriptionPlan());
  }, []);

  console.log('_purchasereceipt line 79', _purchasereceipt);

  useEffect(() => {
    if (loadingRef.current && !subscription_plan_loading) {
      if (subscription_plan_success) {
        dispatch(hideAppLoader());
        setSubscriptionPlanRes(subscription_plan_res.data?.plan);
      }
      dispatch(hideAppLoader());
    }
    loadingRef.current = subscription_plan_loading;
    dispatch(hideAppLoader());
  }, [subscription_plan_success, subscription_plan_loading]);

  useEffect(() => {
    console.log('CHECKING CREATE SUB LINE NO 74');
    if (loadingRef.current && !create_subscription_loading) {
      console.log('CHECKING CREATE SUB LINE NO 75');
      dispatch(showAppLoader());
      if (create_subscription_success) {
        console.log('CHECKING CREATE SUB LINE NO 77');
        dispatch(getSubscriptionStatus());
        setCallApi(false);
        setSelectCheckBox(null);
        dispatch(hideAppLoader());
        if (isPlanChanged || isPlanUpgrade) {
          setSuccessModal(true);
        } else {
          navigation.goBack();
        }
      }
      dispatch(hideAppLoader());
    }
    loadingRef.current = create_subscription_loading;
  }, [
    create_subscription_success,
    create_subscription_loading,
    subscription_status_success,
    isPlanUpgrade,
    isPlanChanged,
  ]);

  const headerComp = () => (
    <IconHeader
      leftIcon={Images.I_BUTTON}
      leftPress={() => setModal(!modal)}
      style={styles.headerIcon}
      txt={Strings.Subscription.Later}
      txtPress={() => navigation.goBack()}
    />
  );

  const selectCheckHandler = item => {
    if (selectCheckBox === item) {
      setSelectCheckBox(null);
    } else {
      setSelectCheckBox(item);
    }
  };
  React.useEffect(() => {
    if (isCallApi) {
      purchaseAPI(_purchasereceipt);
    }
  }, [isCallApi]);
  const purchaseAPI = item => {
    console.log('CHECKING CREATE SUB LINE NO 141', item);
    let payload = {
      device_type: Platform.OS === 'android' ? 'android' : 'ios',
      product_id: item?.productId,
      purchase_token: item?.transactionReceipt,
    };
    console.log('LINE NUMBER 143 PAYLOAD', payload);
    dispatch(createSubscription(payload));
  };
  React.useEffect(async () => {
    IAPService.initializeConnection();
    const allProducts = await IAPService.getIAPProducts();
    await getSubscription();
    console.log('ALL PRODUCT ID LINE NO 127', allProducts);
    return () => {
      IAPService.endIAPConnection();
    };
  }, []);

  const subscribePlan = (item, type) => {
    if (Platform.OS === 'ios') {
      if (item === null) {
        dispatch(showAppToast(true, 'Please choose a plan!'));
      } else {
        console.log(
          'LINE NUMBER IOS 134 item',
          item,
          selectCheckBox?.ios_product,
        );
        dispatch(showAppLoader());
        requestSubscriptionIOS(
          selectCheckBox?.ios_product,
          selectCheckBox,
          type,
        );
      }
    } else if (Platform.OS === 'android') {
      if (item === null) {
        dispatch(showAppToast(true, 'Please choose a plan!'));
      } else {
        dispatch(showAppLoader());
        console.log(
          'LINE ANDROID 186 item',
          item,
          selectCheckBox?.android_product,
        );
        requestSubscriptionAndroid(
          selectCheckBox?.android_product,
          // 'hera_monthly',
          selectCheckBox,
          type,
        );
      }
    }
  };

  const requestSubscriptionAndroid = async (sku, item, type) => {
    const selectedAndroidPlan = androidPlans.find(plan => {
      return plan.productId === sku;
    });
    const subscriptionOffers = {
      subscriptionOffers: [
        {
          sku,
          offerToken:
            selectedAndroidPlan.subscriptionOfferDetails[0].offerToken,
        },
      ],
    };
    RNIap.requestSubscription(
      {sku, ...subscriptionOffers},
      subscriptionOffers.subscriptionOffers,
    )
      .then(async result => {
        console.log('android purchase 215 line', result);
        const receipt = result[0].transactionReceipt;
        console.log('android purchase 217 line', receipt);
        if (receipt) {
          try {
            setPurchaseReceipt(result[0]);
            setCallApi(true);
            RNIap.acknowledgePurchaseAndroid({token: result.purchaseToken});
            await RNIap.finishTransaction({result, isConsumable: true});
          } catch (ackErr) {
            console.log('ERROR LINE NO 101', ackErr);
          }
        }
      })
      .catch(err => {
        console.warn(`IAP req ERROR %%%%% ${err.code}`, err.message);
      })
      .finally(() => dispatch(hideAppLoader()));
  };
  const requestSubscriptionIOS = async (sku, item, type) => {
    RNIap.requestSubscription({sku})
      .then(async result => {
        console.log('IOS RESULT 185', result, 'Itemm', item, 'Type', type);
        const receipt = result.transactionReceipt;
        if (receipt) {
          try {
            setPurchaseReceipt(result);
            setCallApi(true);
            await RNIap.finishTransaction({result, isConsumable: true});
          } catch (ackErr) {
            console.log('ERROR LINE NO 101', ackErr);
          }
        }
      })
      .catch(err => {
        console.warn(`IAP Req ERROR %%%%% ${err.code}`, err.message, err);
        dispatch(hideAppLoader());
        dispatch(showAppToast(true, err.message));
      });
  };
  console.log('subscriptionPlan?.data 254', subscriptionPlan);
  const formatedDate = moment(subscriptionStatus?.data?.trial_end).format(
    'MMM DD, YYYY',
  );
  useEffect(() => {
    const sectionedPlan = [];
    console.log('subscription_plan_res?.data', subscription_plan_res?.data);
    console.log('subscriptionStatus', subscriptionStatus);
    if (Array.isArray(subscription_plan_res?.data?.plan)) {
      Strings?.STATIC_ROLE.forEach(r => {
        const filteredData = subscription_plan_res?.data?.plan.filter(
          i => i.role_id_looking_for === r.id,
        );
        if (filteredData.length > 0) {
          sectionedPlan.push({
            title: r.name,
            data: filteredData,
          });
        }
      });
      setRolePlans(sectionedPlan);
      setSubscriptionPlanRes(subscription_plan_res?.data?.plan);
    }
  }, [subscription_plan_res]);
  const handlePurchaseSubcription = () => {
    if (subscription_plan_res?.data?.subscription === null) {
      subscribePlan(selectCheckBox, 'credit');
    } else {
      if (
        subscription_plan_res?.data?.preference?.role_id_looking_for !==
        selectCheckBox.role_id_looking_for
      ) {
        setPlanUpgrade(false);
        setPlanChanged(true);
        setChangeModal(true);
      } else if (
        selectCheckBox.price >
        subscription_plan_res?.data?.subscription?.subscription_plan?.price
      ) {
        setPlanChanged(false);
        setPlanUpgrade(true);
        setChangeModal(true);
      } else {
        subscribePlan(selectCheckBox, 'credit');
      }
    }
  };
  return (
    <>
      <Container
        scroller={false}
        showHeader={true}
        headerComp={headerComp}
        mainStyle={true}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.mainContainer}>
            <Image source={Images.LOGO} style={styles.logo} />
            {subscriptionStatus?.data?.is_trial && (
              <View style={styles.blueContain}>
                <Image
                  source={Images.whiteTick}
                  style={{paddingLeft: Value.CONSTANT_VALUE_5}}
                />
                <Text style={styles.txting(Fonts.OpenSansRegular, 13)}>
                  Your free trial expires on
                  <Text
                    style={[
                      styles.txting(Fonts.OpenSansBold, 0),
                      {marginRight: Value.CONSTANT_VALUE_5},
                    ]}>
                    {` ${formatedDate}`}
                  </Text>
                </Text>
              </View>
            )}
            <TitleComp
              containerStyle={{marginBottom: 0}}
              Title={Strings.subscribe.Subscribe_Now}
              Subtitle={Strings.Subscription.SubHeader}
              // Midtitle={Strings.Subscription.MidHeader}
              isCenter={true}
            />
            <View style={styles.commitment}>
              {rolePlans.length ? (
                rolePlans.map(plan => (
                  <View key={plan.title} style={[styles.box, styles.roleBox]}>
                    <FlatList
                      scrollEnabled={false}
                      keyExtractor={(item, index) => item + index}
                      data={plan.data}
                      key={plan.title}
                      renderItem={({item, index}) => (
                        <Commitment
                          key={index}
                          MainText={`$${item?.price}/${
                            item?.interval === 'month' && 'mo'
                          }`}
                          Months={item.description}
                          Icon={
                            selectCheckBox?.id === item?.id
                              ? Images.iconRadiosel
                              : Images.iconRadiounsel
                          }
                          // Style={selectCheckBox?.id === item?.id && styles.box}
                          onPress={() => selectCheckHandler(item)}
                          isSelected={
                            subscription_plan_res?.data?.subscription &&
                            subscription_plan_res?.data?.subscription
                              ?.subscription_plan_id === item?.id // || true
                          }
                        />
                      )}
                      ListHeaderComponent={() => (
                        <View style={styles.roleContainer}>
                          <Text style={styles.roleTxt}>{plan.title}</Text>
                          {subscription_plan_res?.data?.preference
                            ?.role_id_looking_for ===
                            plan.data[0].role_id_looking_for &&
                            (subscriptionStatus?.data?.is_trial ||
                              subscription_plan_res?.data?.subscription ===
                                null) && (
                              <View style={styles.subscribeBtn}>
                                <Text style={styles.subscribeTxt}>
                                  Selected Preference
                                </Text>
                              </View>
                            )}
                        </View>
                      )}
                      ItemSeparatorComponent={() => (
                        <View style={styles.seperator} />
                      )}
                    />
                  </View>
                ))
              ) : (
                <ActivityIndicator />
              )}
            </View>
            <View style={styles.btnView}>
              <Button
                label={Strings.Subscription.SubscribeButton}
                style={styles.payButton}
                onPress={handlePurchaseSubcription}
              />
            </View>
            <View>
              <View style={styles.textView}>
                <Text style={styles.mainText}>
                  <Text style={{color: 'red'}}>*</Text>
                  {`${Strings.Subscription.BySubs} ${
                    Platform.OS === 'ios'
                      ? Strings.Subscription.IOSStoreName
                      : Strings.Subscription.AndroidStoreName
                  }${Strings.Subscription.RenewText} ${
                    Strings.Subscription.TimePeriodText
                  }${Strings.Subscription.PaymentCharge}${
                    Platform.OS === 'ios'
                      ? Strings.Subscription.IOSStoreName
                      : Strings.Subscription.AndroidStoreName
                  } ${Strings.Subscription.CONFIRMTEXT} ${
                    Strings.Subscription.YOUR
                  } ${
                    Platform.OS === 'ios'
                      ? Strings.Subscription.IOSStoreName
                      : Strings.Subscription.AndroidStoreName
                  }${Strings.Subscription.LastmainText} `}
                  <Text
                    style={styles.terms}
                    onPress={() =>
                      navigation.navigate(Routes.WebViewUrl, {
                        url: TERMS_OF_USE_URL,
                      })
                    }>
                    {Strings.Subscription.TermsServices}
                  </Text>
                  {Strings.Subscription.And}
                  <Text
                    style={styles.terms}
                    onPress={() =>
                      navigation.navigate(Routes.WebViewUrl, {
                        url: PRIVACY_URL,
                      })
                    }>
                    {Strings.Subscription.PrivacyPolicy}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </Container>
      <Modal
        animationType="slide"
        transparent={true}
        visible={changeModal}
        onRequestClose={() => {
          setChangeModal(!changeModal);
        }}>
        <View style={styles.changeModalContainer}>
          <TouchableOpacity
            style={styles.changeModalBackdrop}
            onPress={() => setChangeModal(!changeModal)}
          />
          <View style={styles.changeModalBox}>
            <Text style={styles.changeModalTitle} numberOfLines={1}>
              {isPlanChanged
                ? Strings.Subscription.ChangePlan
                : Strings.Subscription.UpgradePlan.replace(
                    '{SELECTED_ROLE}',
                    selectCheckBox == null
                      ? '{SELECTED_ROLE}'
                      : Strings?.STATIC_ROLE.find(
                          r => r.id === selectCheckBox?.role_id_looking_for,
                        ).name,
                  )}
            </Text>
            <Text style={styles.changeModalPara}>
              {isPlanChanged
                ? Strings.Subscription.ChangePlanPara.replace(
                    '{DATE_END}',
                    moment(
                      subscription_plan_res?.data?.subscription
                        ?.current_period_end,
                      'YYYY-MM-DD',
                    ).format('LL'),
                  )
                : Strings.Subscription.UpgradePlanPara}
            </Text>
            <Pressable
              style={styles.changeModalBtn}
              onPress={() => {
                subscribePlan(selectCheckBox, 'credit');
                setChangeModal(!changeModal);
              }}>
              <Text style={styles.changeModalBtnTxt}>
                {Strings.Subscription.YesProceed}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={successModal}
        onRequestClose={() => {
          setSuccessModal(!successModal);
        }}>
        <View style={styles.changeModalContainer}>
          <TouchableOpacity
            style={styles.changeModalBackdrop}
            onPress={() => setSuccessModal(!successModal)}
          />
          <View style={styles.changeModalBox}>
            <Text style={styles.changeModalTitle} numberOfLines={1}>
              {Strings.Subscription.SuccessChanged}
            </Text>
            <Text style={styles.changeModalPara}>
              {isPlanChanged
                ? Strings.Subscription.SuccessChangedPara.replace(
                    '{SELECTED_ROLE}',
                    selectCheckBox == null
                      ? '{SELECTED_ROLE}'
                      : Strings?.STATIC_ROLE.find(
                          r => r.id === selectCheckBox?.role_id_looking_for,
                        ).name,
                  )
                : Strings.Subscription.SuccessUpgradePara.replace(
                    '{DATE_END}',
                    moment(
                      subscription_plan_res?.data?.subscription
                        ?.current_period_end,
                      'YYYY-MM-DD',
                    ).format('LL'),
                  )}
            </Text>
            <Pressable
              style={styles.changeModalBtn}
              onPress={() => {
                setSuccessModal(!successModal);
                navigation.goBack();
              }}>
              <Text style={styles.changeModalBtnTxt}>
                {Strings.Subscription.GotIt}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {modal && (
        <CustomModal>
          <SensorySubscription onPress={() => setModal(!modal)} />
        </CustomModal>
      )}
    </>
  );
};
export default React.memo(Subscription);
