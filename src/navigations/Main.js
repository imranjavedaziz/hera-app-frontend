import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import {useSelector, useDispatch} from 'react-redux';
import {Routes} from '../constants/Constants';
import getRoute from '../utils/getRoute';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Screens
import Profile from '../screens/DetailsPTB/Profile';
import SetPreference from '../screens/DetailsPTB/PTB_setPreference/SetPreference';
import Landing from '../screens/Landing';
import Login from '../screens/auth/Login';
import MobileNumber from '../screens/auth/MobileNumber';
import OTP from '../screens/auth/OTP';
import SmRegister from '../screens/auth/smdonor/SmRegister';
import SmBasicDetails from '../screens/auth/smdonor/SmBasicDetails';
import SetAttributes from '../screens/auth/smdonor/SetAttributes';
import CreateGallery from '../screens/auth/smdonor/CreateGallery';
import PtbDashboard from '../screens/dashboard/dashboard/PtbDashboard';
import SmDashboard from '../screens/auth/smdonor/SmDashboard/SmDashboard';
import PtbBasicDetails from '../screens/DetailsPTB/PtbBasicDetails';
import SmDonorSettings from '../screens/auth/smdonor/smSettings/SmDonorSettings';
import ProfileDetails from '../screens/DetailsPTB/PTB_Profile/PTB_profile';
import DashboardDetailScreen from '../screens/dashboard/DashboardDetailScreen';
import PtbProfile from '../screens/dashboard/PtbProfile';
import MyVideo from '../screens/dashboard/PtbProfile/MyVideo';
import DonorGallery from '../screens/auth/smdonor/donorGallery/Gallery';
import Subscription from '../screens/dashboard/PtbProfile/Subscription';
import StateList from '../screens/auth/smdonor/SmDashboard/StateList';
import Support from '../screens/Support/Support';
import PushNotificationExample from '../screens/Example';
import Chat_Request from '../screens/Chat_Request_PTB';
import Chat_Listing from '../screens/chatScreens/ChatListing';
import ChatDetail from '../screens/chatScreens/ChatDetail';
import Settings from '../screens/dashboard/PtbProfile/Settings';
import ChangePassword from '../screens/dashboard/PtbProfile/ChangePassword';
import EditProfile from '../screens/dashboard/EditProfile/EditProfile';
import DeleteAccount from '../screens/dashboard/PtbProfile/DeleteAccount';
import ProfileLikedSm from '../screens/chatScreens/ProfileLikedSm';
import DeactivateAccount from '../screens/dashboard/PtbProfile/Deactivate';
import {showAppToast} from '../redux/actions/loader';
import {Strings, Colors} from '../constants';
import {Value} from '../constants/FixedValues';
import WalkThrough from '../screens/walkThrough';
import ForegroundHandler from '../utils/ForegroundHandler';
import {navigationRefNew} from '../utils/RootNavigation';
import WalkThroughVedio from '../screens/walkThrough/WalkThroughVedio';
import WebViewUrl from '../screens/WebViewUrl';
import HeraPay from '../screens/auth/smdonor/heraPay/HeraPay';
import AllMedia from '../screens/AllMedia/AllMedia';
import PdfView from '../screens/Pdf/PdfView';
import PaymentRequest from '../screens/Payment/PaymentRequest/PaymentRequest';
import MatchScreen from '../screens/Payment/Match/MatchScreen';
import Transaction from '../screens/Payment/Transaction/Transaction';
import ManageBank from '../screens/Payment/ManageBank/ManageBank';
import ManageCard from '../screens/Payment/ManageCard/ManageCard';
import KycScreen from '../screens/Payment/Kyc/KycScreen';
import SendRequest from '../screens/Payment/SendRequest';
import TransactionDetails from '../screens/Payment/TransactionDetails';
import PaymentSent from '../screens/Payment/PaymentSent/PaymentSent';
import ConfirmPayment from '../screens/Payment/ConfirmPayment/ConfirmPayment';
import ConfirmSubscription from '../screens/Payment/ConfirmSubscription';
import SubscriptionCard from '../screens/Payment/SubscriptionCard';
import UpgradeApp from '../screens/UpgradeApp';

export const navigationRef = React.createRef();
const Stack = createStackNavigator();
const screens = [
  Routes.SmBasicDetails,
  Routes.SetPreference,
  Routes.SetAttributes,
  Routes.CreateGallery,
  Routes.Profile,
  Routes.SmRegister,
];
const safeAreaRoutes = [Routes.Landing, Routes.WalkThrough, Routes.UpgradeApp];
const Main = () => {
  const dispatch = useDispatch();
  const [firstLaunch, setFirstLaunch] = React.useState(null);
  const [toastShowed, setToastShowed] = React.useState(false);
  const [showSafeArea, setShowSafeArea] = React.useState(false);
  const auth = useSelector(state => state.Auth.user);
  const {register_user_success} = useSelector(state => state.Auth);
  const subscriptionStatus = useSelector(
    state => state.Subscription.subscription_status_res,
  );
  const toastState = useSelector(state => state.loader);
  useEffect(() => {
    // ForegroundHandler()
    async function setData() {
      const appData = await AsyncStorage.getItem('appLaunched');
      if (appData == null) {
        setFirstLaunch(true);
        AsyncStorage.setItem('appLaunched', 'false');
      } else {
        setFirstLaunch(false);
      }
    }
    setData();
  }, []);

  useEffect(() => {
    const currentRoute = navigationRef.current?.getCurrentRoute().name;
    if (auth) {
      RNBootSplash.hide();
      if (
        !auth.access_token &&
        currentRoute !== Routes.Landing &&
        !screens.includes(currentRoute)
      ) {
        navigationRef.current?.reset({
          index: 0,
          routes: [{name: Routes.Landing}],
        });
      }
    }
  }, [auth]);
  useEffect(() => {
    if (auth?.access_token) {
      const path = getRoute(
        auth?.access_token,
        auth?.role_id,
        auth?.registration_step,
      );
      const currentRoute = navigationRef.current?.getCurrentRoute().name;
      if (subscriptionStatus && subscriptionStatus.data && auth?.role_id) {
        if (
          !subscriptionStatus?.data.status &&
          !toastShowed &&
          parseInt(auth?.role_id) === Value.CONSTANT_VALUE_2 &&
          (path === Routes.PtbDashboard || currentRoute === Routes.PtbDashboard)
        ) {
          setToastShowed(true);
          dispatch(
            showAppToast(
              true,
              subscriptionStatus.data.is_trial
                ? Strings.Subscription.TrailOver
                : Strings.Subscription.SubscriptionExpired,
            ),
          );
        }
      }
    }
  }, [
    subscriptionStatus?.data,
    auth?.role_id,
    auth?.registration_step,
    register_user_success,
    toastShowed,
  ]);

  return (
    firstLaunch != null && (
      <NavigationContainer
        ref={toastState?.showMessageToast ? navigationRefNew : navigationRef}
        onReady={() => RNBootSplash.hide()}>
        <ForegroundHandler />
        {showSafeArea && (
          <StatusBar
            barStyle="dark-content"
            backgroundColor={Colors.BACKGROUND}
            animated={true}
            hidden={false}
          />
        )}
        {!showSafeArea && (
          <StatusBar
            barStyle="dark-content"
            backgroundColor={'transparent'}
            animated={true}
            hidden={false}
            translucent={true}
          />
        )}
        {showSafeArea && (
          <SafeAreaView style={{backgroundColor: Colors.BACKGROUND}} />
        )}
        <Stack.Navigator
          initialRouteName={
            firstLaunch === false &&
            getRoute(auth?.access_token, auth?.role_id, auth?.registration_step)
          }
          screenListeners={{
            state: e => {
              const navState = e.data.state;
              if (
                safeAreaRoutes.includes(navState.routes[navState.index].name)
                // navState.routes[navState.index].name === Routes.Landing ||
                // navState.routes[navState.index].name === Routes.WalkThrough
              ) {
                setShowSafeArea(false);
              } else {
                setShowSafeArea(true);
              }
            },
          }}
          screenOptions={{headerShown: false, gestureEnabled: false}}>
          {firstLaunch && (
            <Stack.Screen name={Routes.WalkThrough} component={WalkThrough} />
          )}
          <Stack.Screen name={Routes.SmDashboard} component={SmDashboard} />
          <Stack.Screen
            name={Routes.ProfileDetails}
            component={ProfileDetails}
          />
          <Stack.Screen name={Routes.Landing} component={Landing} />
          <Stack.Screen name={Routes.Login} component={Login} />
          <Stack.Screen name={Routes.MobileNumber} component={MobileNumber} />
          <Stack.Screen name={Routes.Profile} component={Profile} />
          <Stack.Screen
            name={Routes.WalkThroughVedio}
            component={WalkThroughVedio}
          />
          <Stack.Screen name={Routes.HeraPay} component={HeraPay} />
          <Stack.Screen
            name={Routes.PtbBasicDetails}
            component={PtbBasicDetails}
          />
          <Stack.Screen name={Routes.SetPreference} component={SetPreference} />
          <Stack.Screen name={Routes.OTP} component={OTP} />
          <Stack.Screen name={Routes.SmRegister} component={SmRegister} />
          <Stack.Screen
            name={Routes.SmBasicDetails}
            component={SmBasicDetails}
          />
          <Stack.Screen name={Routes.SetAttributes} component={SetAttributes} />
          <Stack.Screen name={Routes.CreateGallery} component={CreateGallery} />
          <Stack.Screen name={Routes.PtbDashboard} component={PtbDashboard} />
          <Stack.Screen
            name={Routes.DashboardDetailScreen}
            component={DashboardDetailScreen}
          />
          <Stack.Screen name={Routes.PtbProfile} component={PtbProfile} />
          <Stack.Screen name={Routes.MyVideo} component={MyVideo} />
          <Stack.Screen name={Routes.SmSetting} component={SmDonorSettings} />
          <Stack.Screen name={Routes.donorGallery} component={DonorGallery} />
          <Stack.Screen name={Routes.Support} component={Support} />
          <Stack.Screen name={Routes.stateList} component={StateList} />
          <Stack.Screen name={Routes.Subscription} component={Subscription} />
          <Stack.Screen
            name={Routes.PushNotificationExample}
            component={PushNotificationExample}
          />
          <Stack.Screen name={Routes.Chat_Request} component={Chat_Request} />
          <Stack.Screen name={Routes.Chat_Listing} component={Chat_Listing} />
          <Stack.Screen name={Routes.ChatDetail} component={ChatDetail} />
          <Stack.Screen name={Routes.Settings} component={Settings} />
          <Stack.Screen
            name={Routes.ChangePassword}
            component={ChangePassword}
          />
          <Stack.Screen name={Routes.EditProfile} component={EditProfile} />
          <Stack.Screen name={Routes.DeleteAccount} component={DeleteAccount} />
          <Stack.Screen
            name={Routes.ProfileLikedSm}
            component={ProfileLikedSm}
          />
          <Stack.Screen
            name={Routes.DeactivateAccount}
            component={DeactivateAccount}
          />
          <Stack.Screen name={Routes.WebViewUrl} component={WebViewUrl} />
          <Stack.Screen name={Routes.AllMedia} component={AllMedia} />
          <Stack.Screen name={Routes.PdfView} component={PdfView} />
          <Stack.Screen
            name={Routes.PaymentRequest}
            component={PaymentRequest}
          />
          <Stack.Screen name={Routes.MatchScreen} component={MatchScreen} />
          <Stack.Screen name={Routes.Transaction} component={Transaction} />
          <Stack.Screen name={Routes.ManageBank} component={ManageBank} />
          <Stack.Screen name={Routes.ManageCard} component={ManageCard} />
          <Stack.Screen name={Routes.KycScreen} component={KycScreen} />
          <Stack.Screen name={Routes.SendRequest} component={SendRequest} />
          <Stack.Screen
            name={Routes.TransactionDetails}
            component={TransactionDetails}
          />
          <Stack.Screen name={Routes.PaymentSent} component={PaymentSent} />
          <Stack.Screen
            name={Routes.ConfirmPayment}
            component={ConfirmPayment}
          />
          <Stack.Screen
            name={Routes.ConfirmSubscription}
            component={ConfirmSubscription}
          />
          <Stack.Screen
            name={Routes.SubscriptionCard}
            component={SubscriptionCard}
          />
          <Stack.Screen name={Routes.UpgradeApp} component={UpgradeApp} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
};
export default Main;
