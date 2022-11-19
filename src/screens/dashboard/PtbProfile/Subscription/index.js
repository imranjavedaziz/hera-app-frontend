import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import Container from '../../../../components/Container';
import Images from '../../../../constants/Images';
import Button from '../../../../components/Button';
import Strings from '../../../../constants/Strings';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import TitleComp from '../../../../components/dashboard/TitleComp';
import Commitment from '../../../../components/dashboard/PtbProfile/Committment';
import InAPPPurchase from '../../../../utils/inAppPurchase';
import { useSelector, useDispatch } from 'react-redux';
import {
  createSubscription,
  getSubscriptionPlan,
} from '../../../../redux/actions/Subsctiption';
import { hideAppLoader, showAppLoader } from '../../../../redux/actions/loader';
import * as RNIap from 'react-native-iap';
import SensorySubscription from '../../../../components/SensoryCharacteristics/SensorySubscription';
import CustomModal from '../../../../components/CustomModal/CustomModal';
import { IconHeader } from '../../../../components/Header';

const Subscription = props => {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [selectCheckBox, setSelectCheckBox] = useState(null);
  const [purchasereceipt, setPurchaseReceipt] = React.useState(null);
  const IAPService = InAPPPurchase.getInstance();
  let purchaseUpdateSubscription = null;
  let purchaseErrorSubscription = null;
  const loadingRef = React.useRef(false);
  const [subscriptionPlan, setSubscriptionPlanRes] = useState([]);
  const dispatch = useDispatch();
  const {
    subscription_plan_success,
    subscription_plan_loading,
    subscription_plan_res,
  } = useSelector(state => state.Subscription);
  const { create_subscription_success, create_subscription_loading } =
    useSelector(state => state.Subscription);

  React.useEffect(() => {
    dispatch(getSubscriptionPlan());
  }, []);

  React.useEffect(() => {
    if (loadingRef.current && !subscription_plan_loading) {
      dispatch(showAppLoader());
      if (subscription_plan_success) {
        dispatch(hideAppLoader());
        setSubscriptionPlanRes(subscription_plan_res);
      }
      dispatch(hideAppLoader());
    }
    loadingRef.current = subscription_plan_loading;
  }, [subscription_plan_success, subscription_plan_loading]);

  React.useEffect(() => {
    if (loadingRef.current && !create_subscription_loading) {
      dispatch(showAppLoader());
      if (create_subscription_success) {
        console.log("create_subscription_success", create_subscription_success);
        setSelectCheckBox(null);
        dispatch(hideAppLoader());
        props.navigation.goBack();
      }
      dispatch(hideAppLoader());
    }
    loadingRef.current = create_subscription_loading;
  }, [create_subscription_success, create_subscription_loading]);

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
    console.log('LINE NO 88 RECeIPT');
    purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
      async purchase => {
        const receipt = purchase.transactionReceipt;
        console.log('LINE NO 88 RECeIPT', receipt);
        setPurchaseReceipt(purchase);
        if (receipt) {
          try {
            purchaseAPI(purchase);
            await RNIap.finishTransaction({ purchase, isConsumable: true });
            if (Platform.OS === 'ios') {
              console.log('LINE NO 90 PURCHAASE', purchase);
            } else if (Platform.OS === 'android') {
              await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
            }
          } catch (ackErr) {
            console.log('ERROR LINE NO 101', ackErr);
          }
        }
      },
    );
    purchaseErrorSubscription = RNIap.purchaseErrorListener(error => {
      console.log('ERROR LINE NO 101', error);
    });
    return () => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
        purchaseUpdateSubscription = null;
      }
      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
      }
    };
  }, []);
  const purchaseAPI = item => {
    console.log("LINE NO 139", item);
    let payload = {
      device_type: Platform.OS === 'android' ? 'android' : 'ios',
      product_id: item?.productId,
      purchase_token: item?.transactionReceipt,
    };
    console.log("LINE NO 144 PAYLOAD", payload);
    dispatch(createSubscription(payload));
  };
  React.useEffect(async () => {
    IAPService.initializeConnection();
    const allProducts = await IAPService.getIAPProducts();
    console.log('ALL PRODUCT ID LINE NO 58', allProducts);
    return () => {
      IAPService.endIAPConnection();
    };
  }, []);

  const subscribePlan = (item, type) => {
    if (Platform.OS === 'ios') {
      console.log('LINE 139 PRINT', selectCheckBox);
      requestSubscriptionIOS(selectCheckBox?.ios_product, selectCheckBox, type);
    } else {
      requestSubscriptionAndroid(
        selectCheckBox?.play_store_id,
        selectCheckBox,
        type,
      );
    }
  };

  const requestSubscriptionAndroid = async (sku, item, type) => {
    console.log('IAP req android', sku);
    try {
      await RNIap.requestPurchase({ sku })
        .then(async result => {
          console.log('ANDROID LINE 185', result, 'Itemm', item, 'Type', type);
        })
        .catch(err => {
          console.warn(`IAP req ERROR %%%%% ${err.code}`, err.message);
          console.log(err?.message);
        });
    } catch (error) {
      console.warn(`err ${error.code}`, error.message);
    }
  };
  const requestSubscriptionIOS = async (sku, item, type) => {
    try {
      await RNIap.requestSubscription({ sku })
        .then(async result => {
          console.log('IOS RESULT 185', result, 'Itemm', item, 'Type', type);
        })
        .catch(err => {
          console.warn(`IAP req ERROR %%%%% ${err.code}`, err.message, err);
          console.log(err?.message);
        });
    } catch (error) {
      console.warn(`err ${error.code}`, error.message);
    }
  };
  console.log("LINE NO 200", subscriptionPlan?.data);
  return (
    <>
      <Container
        scroller={false}
        showHeader={true}
        headerComp={headerComp}
        mainStyle={true}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainContainer}>
            <Image source={Images.LOGO} style={styles.logo} />
            <TitleComp
              Title={Strings.subscribe.Subscribe_Now}
              Subtitle={Strings.Subscription.SubHeader}
              Midtitle={Strings.Subscription.MidHeader}
              isCenter={true}
            />
            {subscriptionPlan?.data ? (
              subscriptionPlan?.data?.map((item, index) => (
                <Commitment
                  key={index}
                  MainText={`$${item?.price}/${item?.interval}`}
                  Months={`${item.interval} Commitment`}
                  Icon={
                    selectCheckBox?.id === item?.id
                      ? Images.iconRadiosel
                      : Images.iconRadiounsel
                  }
                  Style={selectCheckBox?.id === item?.id && styles.box}
                  onPress={() => selectCheckHandler(item)}
                />
              ))
            ) : (
              <ActivityIndicator />
            )}
            <Button
              label={Strings.Subscription.SubscribeButton}
              style={styles.payButton}
              onPress={() => subscribePlan(selectCheckBox, 'credit')}
            />
            <View>
              <View style={styles.textView}>
                <Text style={styles.mainText}>
                  <Text style={{ color: 'red' }}>*</Text>
                  {Strings.Subscription.BySubs}
                  <TouchableOpacity style={{ top: 2 }}>
                    <Text style={styles.terms}>
                      {Strings.Subscription.TermsServices}
                    </Text>
                  </TouchableOpacity>
                  {Strings.Subscription.And}
                  <TouchableOpacity>
                    <Text style={styles.terms}>
                      {Strings.Subscription.PrivacyPolicy}
                    </Text>
                  </TouchableOpacity>
                  {Strings.Subscription.SubscribePolicy}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </Container>
      {modal && (
        <CustomModal>
          <SensorySubscription onPress={() => setModal(!modal)} />
        </CustomModal>
      )}
    </>
  );
};

export default Subscription;
