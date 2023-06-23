import {Platform} from 'react-native';
import {
  initConnection,
  endConnection,
  requestPurchase,
  requestSubscription,
  clearTransactionIOS,
  flushFailedPurchasesCachedAsPendingAndroid,
  flushExpiredPurchasesCachedAndroid,
  getSubscriptions,
} from 'react-native-iap';
import {productsIds} from '../constants/Constants';

class InAPPPurchase {
  static serviceInstance = null;
  static getInstance() {
    if (!InAPPPurchase.serviceInstance) {
      InAPPPurchase.serviceInstance = new InAPPPurchase();
    }
    return InAPPPurchase.serviceInstance;
  }
  initializeConnection = () => {
    if (InAPPPurchase.serviceInstance !== null) {
      initConnection()
        .then(connection => {
          console.log('IAP connection result', connection);
          if (Platform.OS === 'ios') {
            clearTransactionIOS();
            getSubscriptions({skus: productsIds})
              .then(data => {
                console.log('getSubscriptions', JSON.stringify(data));
              })
              .catch(e => {
                console.log('getSubscriptions err', JSON.stringify(e));
              });
          } else {
            flushFailedPurchasesCachedAsPendingAndroid();
            flushExpiredPurchasesCachedAndroid();
          }
        })
        .catch(err => {
          console.warn(`IAP ERROR ${err.code}`, err.message);
        });
    }
  };
  endIAPConnection = () => {
    endConnection();
  };
  requestPurchase = async sku => {
    try {
      await requestPurchase(`${sku}`, false);
      console.log('REQUESTED OVER');
    } catch (err) {
      console.warn(err.code, err.message);
      console.log('ERR ', err.code, err.message);
    }
  };
  requestIAPSubscription = async sku => {
    console.log('IAP req', sku);
    try {
      await requestSubscription(sku)
        .then(async result => {
          console.log('IAP req sub', result);
          if (Platform.OS === 'android') {
            // can do your API call here to save the purchase details of particular user
          } else if (Platform.OS === 'ios') {
            console.log(result.transactionReceipt);
            // can do your API call here to save the purchase details of particular user
          }
        })
        .catch(err => {
          console.warn(`IAP req ERROR %%%%% ${err.code}`, err.message);
        });
    } catch (error) {
      console.warn(`err ${error.code}`, error.message);
    }
  };
}

export default InAPPPurchase;
