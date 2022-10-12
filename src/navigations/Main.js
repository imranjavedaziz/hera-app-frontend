import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import { useSelector } from 'react-redux';
import { Routes } from '../constants/Constants';
import getRoute from '../utils/getRoute';
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

const Stack = createStackNavigator();
const Main = () => {
  const auth = useSelector(state=>state.auth.user);
  useEffect(()=>{
    if(auth){
      RNBootSplash.hide();
    }
  },[auth]);
  return (
    <NavigationContainer
      onReady={() => RNBootSplash.hide()}
    >
      <Stack.Navigator
        // initialRouteName={getRoute(auth.access_token,auth.role_id,auth.registration_step)}
        initialRouteName={"SmDashboard"}
      >
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
          name={Routes.SmSetting}
          component={SmDonorSettings}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Main;
