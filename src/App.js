/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import Main from './navigations/Main';
import Loader from './components/Loader';
import Toast from './components/Toast';
import {
  requestUserPermission,
  notificationListener,
} from './utils/notificationService';

const App = () => {
  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Main />
        <Loader />
        <Toast />
      </PersistGate>
    </Provider>
  );
};
export default App;
