/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StatusBar, Text, TextInput, View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import Main from './navigations/Main';
import Loader from './components/Loader';
import FormLoader from './components/FormLoader';
import Toast from './components/Toast';
import NotificationContextManager from './context/NotificationContextManager';
import {Colors} from './constants';

import {MessageToast} from './components';
import {ToastProvider} from 'react-native-toast-notifications';
const App = () => {
  Text.defaultProps = Text.defaultProps || {};
  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.maxFontSizeMultiplier = 1.2;
  Text.defaultProps.maxFontSizeMultiplier = 1.2;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NotificationContextManager>
          <ToastProvider
            placement="top"
            duration={2000}
            animationType="slide-in"
            animationDuration={250}
            textStyle={{fontSize: 10}}
            offset={50} // offset for both top and bottom toasts
            offsetTop={-10}
            offsetBottom={40}
            swipeEnabled={true}
            renderType={{
              custom: toast => <MessageToast />,
            }}
            //     renderToast={(toastOptions) => JSX.Element} implement custom toast component.
          >
            <StatusBar
              barStyle="dark-content"
              backgroundColor={Colors.BACKGROUND}
              animated={true}
              hidden={false}
            />
            <SafeAreaView style={{backgroundColor: Colors.BACKGROUND}} />
            <Main />
            <Loader />
            <FormLoader />
            <Toast />
          </ToastProvider>
        </NotificationContextManager>
      </PersistGate>
    </Provider>
  );
};
export default App;
