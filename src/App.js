/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import Main from './navigations/Main';
import Loader from './components/Loader';
import Toast from './components/Toast';
import NotificationContextManager from './context/NotificationContextManager';
import {SafeAreaView, StatusBar} from 'react-native';
import {Colors} from './constants';

const App = () => {
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
          <SafeAreaView />
          <Main />
          <Loader />
          <Toast />
        </NotificationContextManager>
      </PersistGate>
    </Provider>
  );
};
export default App;
