import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
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
import { SUBSCRIPTION_PLAN } from '../../../../constants/Constants';

const Subscription = () => {
  const navigation = useNavigation();
  const [selectCheckBox, setSelectCheckBox] = useState(null);
  const [purchaseItem, setPurchaseItem] = React.useState(null);
  const [purchaseType, setPurchaseType] = React.useState(null);
  const [isCallApi, setCallApi] = React.useState(false);
  const [purchasereceipt, setPurchaseReceipt] = React.useState(null);
  const IAPService = InAPPPurchase.getInstance();
  let purchaseUpdateSubscription = null;
  let purchaseErrorSubscription = null;

  const headerComp = () => (
    <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
      <Text style={styles.headerText}>{Strings.Subscription.Later}</Text>
    </TouchableOpacity>
  );

  const onSubsribe = () => {
    console.log('presss');
  };

  const selectCheckHandler = item => {
    if (selectCheckBox === item.id) {
      setSelectCheckBox(null);
    } else {
      setSelectCheckBox(item?.id);
    }
  };
  // React.useEffect(() => {
  //   if (isCallApi) {
  //     console.log("purchase item???167", purchaseItem, "Type???", purchaseType, "purchaseReceipt???", purchasereceipt);
  //     purchaseAPI(purchasereceipt, purchaseItem, purchaseType, "success");
  //   }
  // }, [isCallApi]);

  const subscribePlan = (item, type) => {
    if (Platform.OS === 'ios') {
      requestSubscriptionIOS(item?.app_store_id, item, type);
    } else {
      requestSubscriptionAndroid(item?.play_store_id, item, type);
    }
  };
  const requestSubscriptionAndroid = async (sku, item, type) => {
    console.log('IAP req android', sku);
    try {
      await RNIap.requestPurchase({sku})
        .then(async result => {
          console.log('IAP req sub android', result);
          setPurchaseItem(item);
          setPurchaseType(type);
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
    console.log('IAP req ios', sku);
    setPurchaseItem(item);
    setPurchaseType(type);
    try {
      await RNIap.requestSubscription({sku})
        .then(async result => {
          console.log('IAP req sub', result, 'Itemm??', item, 'Type???', type);
          // purchaseAPI(result, item, type, "success");
          // setPurchaseItem(item);
          // setPurchaseType(type);
        })
        .catch(err => {
          console.warn(`IAP req ERROR %%%%% ${err.code}`, err.message);
          console.log(err?.message);
        });
    } catch (error) {
      console.warn(`err ${error.code}`, error.message);
    }
  };


  return (
    <Container
      scroller={false}
      showHeader={true}
      headerComp={headerComp}
      headerEnd={true}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <Image source={Images.LOGO} style={styles.logo} />
          <TitleComp
            Title={Strings.subscribe.Subscribe_Now}
            Subtitle={Strings.Subscription.SubHeader}
            Midtitle={Strings.Subscription.MidHeader}
            isCenter={true}
          />
          <FlatList
            data={SUBSCRIPTION_PLAN}
            renderItem={({item, index}) => (
              <Commitment
                MainText={Strings.Subscription.Price}
                Months={Strings.Subscription.Commitment}
                Icon={
                  selectCheckBox === item?.id
                    ? Images.iconRadiosel
                    : Images.iconRadiounsel
                }
                Style={selectCheckBox === item?.id && styles.box}
                onPress={() => selectCheckHandler(item)}
              />
            )}
          />
          <Button
            label={Strings.Subscription.SubscribeButton}
            style={styles.payButton}
            onPress={() => onSubsribe()}
          />
          <View>
            <View style={styles.textView}>
              <Text style={styles.mainText}>
                <Text style={{color: 'red'}}>*</Text>
                {Strings.Subscription.BySubs}
                <TouchableOpacity style={{top: 2}}>
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
  );
};

export default Subscription;
