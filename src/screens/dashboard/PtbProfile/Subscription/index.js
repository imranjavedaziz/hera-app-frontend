import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
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
import {TERMS_OF_USE_URL, PRIVACY_URL} from '../../../../constants/Constants';
import openWebView from '../../../../utils/openWebView';

const Subscription = props => {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [selectCheckBox, setSelectCheckBox] = useState(null);
  const [_purchasereceipt, setPurchaseReceipt] = React.useState(null);
  const IAPService = InAPPPurchase.getInstance();
  const loadingRef = React.useRef(false);
  const [subscriptionPlan, setSubscriptionPlanRes] = useState([]);
  const [isCallApi, setCallApi] = React.useState(false);

  const dispatch = useDispatch();
  const {
    subscription_plan_success,
    subscription_plan_loading,
    subscription_plan_res,
  } = useSelector(state => state.Subscription);
  const {create_subscription_success, create_subscription_loading} =
    useSelector(state => state.Subscription);

  React.useEffect(() => {
    dispatch(getSubscriptionPlan());
  }, []);
  console.log(_purchasereceipt, '_purchasereceipt');
  React.useEffect(() => {
    if (loadingRef.current && !subscription_plan_loading) {
      if (subscription_plan_success) {
        dispatch(hideAppLoader());
        setSubscriptionPlanRes(subscription_plan_res);
      }
      dispatch(hideAppLoader());
    }
    loadingRef.current = subscription_plan_loading;
    dispatch(hideAppLoader());
  }, [subscription_plan_success, subscription_plan_loading]);

  React.useEffect(() => {
    console.log("CHECKING CREATE SUB LINE NO 74");
    if (loadingRef.current && !create_subscription_loading) {
      console.log("CHECKING CREATE SUB LINE NO 75");
      dispatch(showAppLoader());
      if (create_subscription_success) {
        console.log("CHECKING CREATE SUB LINE NO 77");
        dispatch(getSubscriptionStatus());
        setSelectCheckBox(null);
        dispatch(hideAppLoader());
        setCallApi(false);
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
    if (isCallApi) {
      purchaseAPI(_purchasereceipt);
    }
  }, [isCallApi]);
  const purchaseAPI = item => {
    console.log("CHECKING CREATE SUB LINE NO 141");
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
    console.log('ALL PRODUCT ID LINE NO 58', allProducts);
    return () => {
      IAPService.endIAPConnection();
    };
  }, []);

  const subscribePlan = (item, type) => {
    console.log('LINE NUMBER 154 item', item, selectCheckBox?.ios_product);
    if (item === null) {
      dispatch(showAppToast(true, 'Please choose a plan!'));
      return;
    }
    dispatch(showAppLoader());
    if (Platform.OS === 'ios') {
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
    try {
      await RNIap.requestPurchase({sku})
        .then(async result => {
        })
        .catch(err => {
          console.warn(`IAP req ERROR %%%%% ${err.code}`, err.message);
        });
    } catch (error) {
      console.warn(`err ${error.code}`, error.message);
    }
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
      console.warn(`IAP req ERROR %%%%% ${err.code}`, err.message, err);
      dispatch(hideAppLoader());
      dispatch(showAppToast(true,err.message));
    });
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
            <TitleComp
              Title={Strings.subscribe.Subscribe_Now}
              Subtitle={Strings.Subscription.SubHeader}
              Midtitle={Strings.Subscription.MidHeader}
              isCenter={true}
            />
            <View style={styles.commitment}>
              {subscriptionPlan?.data ? (
                subscriptionPlan?.data?.map((item, index) => (
                  <Commitment
                    key={index}
                    MainText={`$${item?.price}/${item?.interval}`}
                    Months={item.description}
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
            </View>
            <Button
              label={Strings.Subscription.SubscribeButton}
              style={styles.payButton}
              onPress={() => subscribePlan(selectCheckBox, 'credit')}
            />
            <View>
              <View style={styles.textView}>
                <Text style={styles.mainText}>
                  <Text style={{color: 'red'}}>*</Text>
                  {Strings.Subscription.BySubs}
                  <TouchableOpacity
                    style={{top: 2}}
                    onPress={() => openWebView(TERMS_OF_USE_URL)}>
                    <Text style={styles.terms}>
                      {Strings.Subscription.TermsServices}
                    </Text>
                  </TouchableOpacity>
                  {Strings.Subscription.And}
                  <TouchableOpacity onPress={() => openWebView(PRIVACY_URL)}>
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
export default React.memo(Subscription);
