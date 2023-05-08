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
  Alert,
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
import { capitalizeStr } from '../../../../utils/commonFunction';

export const CancelSubscription = ({
  changeModal,
  setChangeModal,
  handleCanncel,
}) => {
  return (
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
            {Strings.Subscription.CancelSub}
          </Text>
          <Text style={styles.changeModalPara}>
            {Platform.select({
              ios: Strings.Subscription.CancelSubParaIos,
              android: Strings.Subscription.CancelSubParaAndroid,
            })}
          </Text>
          <Pressable
            style={styles.changeModalBtn}
            onPress={() => {
              setChangeModal(!changeModal);
              handleCanncel();
            }}>
            <Text style={styles.changeModalBtnTxt}>
              {Strings.Subscription.YesProceed}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
const Subscription = () => {
  const navigation = useNavigation();
  const [rolePlans, setRolePlans] = useState([]);
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
  useEffect(() => {
    dispatch(getSubscriptionPlan());
  }, []);
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
  const showChangeSuccessToast = () => {
    if(Platform.OS==='ios'){
      Alert.alert(
        Strings.Subscription.SuccessChanged,
        isPlanChanged
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
                subscription_plan_res?.data?.subscription?.current_period_end,
                'YYYY-MM-DD',
              ).format('LL'),
            ),
        [
          {
            text: capitalizeStr(Strings.Subscription.GotIt),
            onPress: () => {
              setSelectCheckBox(null);
              navigation.goBack();
            },
          },
        ],
      );
    }
    else{
      setSuccessModal(true);
    }
  };
  useEffect(() => {
    console.log('CHECKING CREATE SUB LINE NO 74');
    if (loadingRef.current && !create_subscription_loading) {
      console.log('CHECKING CREATE SUB LINE NO 75');
      dispatch(showAppLoader());
      if (create_subscription_success) {
        console.log('CHECKING CREATE SUB LINE NO 77');
        dispatch(getSubscriptionStatus());
        setCallApi(false);
        dispatch(hideAppLoader());
        if (isPlanChanged || isPlanUpgrade) {
          showChangeSuccessToast();
        } else {
          setSelectCheckBox(null);
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
      leftIcon={Images.circleIconBack}
      leftPress={() => navigation.goBack()}
      style={styles.headerIcon}
      rightIcon={Images.I_CIRCLE}
      rightPress={() => setModal(!modal)}
      iIcon={{width: 35}}
    />
  );

  const selectCheckHandler = item => {
    if (selectCheckBox === item) {
      setSelectCheckBox(null);
    } else {
      setSelectCheckBox(item);
    }
  };
  useEffect(() => {
    if (isCallApi) {
      purchaseAPI(_purchasereceipt);
    }
  }, [isCallApi]);
  const purchaseAPI = item => {
    console.log('CHECKING CREATE SUB LINE NO 141', item);
    const payload = Platform.select({
      ios: {
        device_type: 'ios',
        product_id: item?.productId,
        purchase_token: item?.transactionReceipt,
      },
      android: {
        device_type: 'android',
        product_id: item?.productId,
        purchase_token: item?.purchaseToken,
      },
    });
    console.log('LINE NUMBER 143 PAYLOAD', payload);
    dispatch(createSubscription(payload));
  };
  useEffect(async () => {
    IAPService.initializeConnection();
    return () => {
      IAPService.endIAPConnection();
    };
  }, []);

  const subscribePlan = (item, type) => {
    if (item === null) {
      dispatch(showAppToast(true, 'Please choose a plan!'));
    } else if (Platform.OS === 'ios') {
      console.log(
        'LINE NUMBER IOS 134 item',
        item,
        selectCheckBox?.ios_product,
      );
      dispatch(showAppLoader());
      requestSubscriptionIOS(selectCheckBox?.ios_product, selectCheckBox, type);
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
  };

  const requestSubscriptionAndroid = async (sku, item, type) => {
    const subscriptionOffers = {
      subscriptionOffers: [
        {
          sku,
          offerToken: item.offer_token,
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
        console.log('android purchase 217 line', result);
        console.log(
          'android purchase 218 line',
          JSON.parse(receipt).purchaseToken,
        );
        if (receipt) {
          try {
            setPurchaseReceipt(result[0]);
            setCallApi(true);
            await RNIap.acknowledgePurchaseAndroid({
              token: JSON.parse(receipt).purchaseToken,
              developerPayload: '',
            });
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
        try {
          const receipt = result.transactionReceipt;
          if (receipt) {
            setPurchaseReceipt(result);
            setCallApi(true);
            if (result?.transactionId) {
              await RNIap.finishTransaction({result, isConsumable: true});
            }
          }
        } catch (ackErr) {
          console.log('ERROR LINE NO 101', ackErr);
        }
      })
      .catch(err => {
        console.warn(`IAP ios ERROR %%%%% ${err.code}`, err.message, err);
        dispatch(hideAppLoader());
        if (err.code != 'E_USER_CANCELLED') {
          dispatch(showAppToast(true, Strings.Subscription.NotProcessed));
        }
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
  const showChangePlanToast = () => {
    if (Platform.OS === 'ios') {
      Alert.alert(
        Strings.Subscription.UpgradePlan.replace(
          '{SELECTED_ROLE}',
          selectCheckBox == null
            ? '{SELECTED_ROLE}'
            : Strings?.STATIC_ROLE.find(
                r => r.id === selectCheckBox?.role_id_looking_for,
              ).name,
        ),
        Strings.Subscription.UpgradePlanPara,
        [
          {
            text: capitalizeStr(Strings.Subscription.YesProceed),
            onPress: () => {
              subscribePlan(selectCheckBox, 'credit');
            },
          },
          {
            text: Strings.Subscription.Cancel,
            onPress: () => null,
          },
        ],
      );
    } else {
      setChangeModal(true);
    }
  };
  const showUpgradePlanToast = () => {
    if (Platform.OS === 'ios') {
      Alert.alert(
        Strings.Subscription.ChangePlan,
        Strings.Subscription.ChangePlanPara.replace(
          '{DATE_END}',
          moment(
            subscription_plan_res?.data?.subscription?.current_period_end,
            'YYYY-MM-DD',
          ).format('LL'),
        ),
        [
          {
            text: capitalizeStr(Strings.Subscription.YesProceed),
            onPress: () => {
              subscribePlan(selectCheckBox, 'credit');
            },
          },
          {
            text: Strings.Subscription.Cancel,
            onPress: () => null,
          },
        ],
      );
    } else {
      setChangeModal(true);
    }
  };
  const handlePurchaseSubcription = () => {
    if (subscription_plan_res?.data?.subscription === null) {
      subscribePlan(selectCheckBox, 'credit');
    } else {
      if (
        selectCheckBox !== null &&
        subscription_plan_res?.data?.preference?.role_id_looking_for !==
          selectCheckBox.role_id_looking_for
      ) {
        setPlanUpgrade(false);
        setPlanChanged(true);
        showChangePlanToast();
      } else if (
        selectCheckBox !== null &&
        selectCheckBox.price !=
          subscription_plan_res?.data?.subscription?.subscription_plan?.price
      ) {
        setPlanChanged(false);
        setPlanUpgrade(true);
        showUpgradePlanToast();
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
            {subscriptionStatus?.data?.is_trial &&
              subscriptionStatus?.data?.status > 0 && (
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
                          MainText={`$${item?.price}/${item?.interval}`}
                          Months={item.description}
                          Icon={
                            selectCheckBox?.id === item?.id
                              ? Images.iconRadiosel
                              : Images.iconRadiounsel
                          }
                          Style={
                            selectCheckBox?.id === item?.id &&
                            styles.selectedBox
                          }
                          onPress={() => selectCheckHandler(item)}
                          isSelected={
                            subscription_plan_res?.data?.subscription &&
                            subscription_plan_res?.data?.subscription
                              ?.subscription_plan_id === item?.id // || true
                          }
                          isUpcoming={
                            subscription_plan_res?.data
                              ?.upcomingSubscription !== null &&
                            subscription_plan_res?.data?.upcomingSubscription
                              .subscription_plan.id === item?.id
                          }
                          upcomingStarts={
                            subscription_plan_res?.data?.upcomingSubscription
                              ?.current_period_start || ''
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
              {!isPlanChanged
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
              {!isPlanChanged
                ? Strings.Subscription.ChangePlanPara.replace(
                    '{DATE_END}',
                    moment(
                      subscription_plan_res?.data?.subscription
                        ?.current_period_end,
                      'YYYY-MM-DD',
                    ).format('LL'),
                  )
                : Platform.select({
                    ios: Strings.Subscription.UpgradePlanPara,
                    android: Strings.Subscription.UpgradePlanParaAndroid,
                  })}
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
                setSelectCheckBox(null);
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
