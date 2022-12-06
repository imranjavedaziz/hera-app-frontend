import { Alert, Platform } from "react-native";
import {
  initConnection,
  endConnection,
  getSubscriptions,
  requestPurchase,
  requestSubscription,
  getProducts,
} from "react-native-iap";
import { creditProductsIds , productsIds } from "../constants/Constants";

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
        .then((connection) => {
          console.log("IAP connection result", connection);
        })
        .catch((err) => {
          console.warn(`IAP ERROR ${err.code}`, err.message);
        });
    }
  };
  endIAPConnection = () => {
    endConnection();
  };
  getIAPProducts = async () => {
    try {
      const products = await getSubscriptions({ skus: productsIds });
      console.log("IAP FILE LINE NO 37 PREMIUM PRODUCTS ", products);
      return products;
    } catch (err) {
      Alert.alert("IAP err", err);
      console.log("IAP Err", err);
      console.warn(err?.code);
      console.warn(err?.message);
    }
  };
  getCreditProducts = async () => {
    try {
      const products = await getProducts({ skus: creditProductsIds });
      return products;
    } catch (err) {
      Alert.alert("IAP err", err);
      console.log("IAP Err", err);
      console.warn(err?.message); // standardized err.code and err.message available
    }
  };
  requestPurchase = async (sku) => {
    try {
      await requestPurchase(`${sku}`, false);
      console.log("REQUESTED OVER");
    } catch (err) {
      console.warn(err.code, err.message);
      console.log("ERR ", err.code, err.message);
    }
  };
  requestIAPSubscription = async (sku) => {
    console.log("IAP req", sku);
    try {
      await requestSubscription(sku)
        .then(async (result) => {
          console.log("IAP req sub", result);
          if (Platform.OS === "android") {
            // can do your API call here to save the purchase details of particular user
          } else if (Platform.OS === "ios") {
            console.log(result.transactionReceipt);
            // can do your API call here to save the purchase details of particular user
          }
        })
        .catch((err) => {
          console.warn(`IAP req ERROR %%%%% ${err.code}`, err.message);
        });
    } catch (error) {
      console.warn(`err ${error.code}`, error.message);
    }
  };
}

export default InAPPPurchase;
