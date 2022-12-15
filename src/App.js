/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {SafeAreaView, StatusBar, Text,TextInput} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import Main from './navigations/Main';
import Loader from './components/Loader';
import FormLoader from './components/FormLoader'
import Toast from './components/Toast';
import NotificationContextManager from './context/NotificationContextManager';
import {Colors} from './constants';
import NetInfo from '@react-native-community/netinfo';
import {ValidationMessages} from '../src/constants/Strings';
import {
  showAppToast,
} from '../src/redux/actions/loader';
const App = () => {
  Text.defaultProps = Text.defaultProps || {};
  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.maxFontSizeMultiplier = 1.2;
  Text.defaultProps.maxFontSizeMultiplier = 1.2;
  useEffect(async()=>{
    if ((await NetInfo.isConnected.fetch()) !== true) {
      dispatch(showAppToast(true, ValidationMessages.NO_INTERNET_CONNECTION));
    } 
  })
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NotificationContextManager>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={Colors.BACKGROUND}
            animated={true}
            hidden={false}
          />
     
          <SafeAreaView style={{backgroundColor: Colors.BACKGROUND}} />
         
          <Main />
          <Loader />
          <FormLoader/>
          <Toast />
        </NotificationContextManager>
      </PersistGate>
    </Provider>
  );
};
export default App;
