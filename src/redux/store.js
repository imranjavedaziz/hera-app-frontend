// store
import { createStore, combineReducers, applyMiddleware ,compose} from "redux";
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loader from "./reducers/loader";
import auth from "./reducers/auth";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
      'auth'
    ],
    blacklist: [
      'loader',
    ],
  };
const rootReducer = combineReducers({
    loader,
    auth
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer,composeEnhancers(applyMiddleware(thunk)));
const persistor = persistStore(store);

export {
    store,
    persistor,
};
