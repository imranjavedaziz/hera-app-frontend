import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import {useSelector,useDispatch} from 'react-redux';
import {Routes} from '../constants/Constants';
import getRoute from '../utils/getRoute';
import { getSubscriptionStatus } from '../redux/actions/Subsctiption';
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
import DeactivateAccount from '../screens/dashboard/PtbProfile/Deactivate';


export const navigationRef = React.createRef();
const Stack = createStackNavigator();

const Main = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.Auth.user);
  useEffect(() => {
    if (auth) {
      RNBootSplash.hide();
      const path = getRoute(
        auth?.access_token,
        auth?.role_id,
        auth?.registration_step,
      );
      if(path!==Routes.Landing && auth?.role_id===2){
        dispatch(getSubscriptionStatus())
      }
    }
  }, [auth]);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => RNBootSplash.hide()}>
      <Stack.Navigator
        initialRouteName={Routes.DeactivateAccount
        // {getRoute(
        //   auth?.access_token,
        //   auth?.role_id,
        //   auth?.registration_step,
        // )
        }>
        <Stack.Screen
          name={Routes.SmDashboard}
          component={SmDashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.ProfileDetails}
          component={ProfileDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.Landing}
          component={Landing}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.Login}
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.MobileNumber}
          component={MobileNumber}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.Profile}
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.PtbBasicDetails}
          component={PtbBasicDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.SetPreference}
          component={SetPreference}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.OTP}
          component={OTP}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.SmRegister}
          component={SmRegister}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.SmBasicDetails}
          component={SmBasicDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.SetAttributes}
          component={SetAttributes}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.CreateGallery}
          component={CreateGallery}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.PtbDashboard}
          component={PtbDashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.DashboardDetailScreen}
          component={DashboardDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.PtbProfile}
          component={PtbProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.MyVideo}
          component={MyVideo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.SmSetting}
          component={SmDonorSettings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.donorGallery}
          component={DonorGallery}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.Support}
          component={Support}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.stateList}
          component={StateList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.Subscription}
          component={Subscription}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.PushNotificationExample}
          component={PushNotificationExample}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.Chat_Request}
          component={Chat_Request}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.Chat_Listing}
          component={Chat_Listing}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.ChatDetail}
          component={ChatDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.Settings}
          component={Settings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.ChangePassword}
          component={ChangePassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.EditProfile}
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.DeleteAccount}
          component={DeleteAccount}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.DeactivateAccount}
          component={DeactivateAccount}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Main;
