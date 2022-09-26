import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import { Routes } from '../constants/Constants';
// Screens
import Profile from '../screens/DetailsPTB/Profile';
import SetPreference from '../screens/DetailsPTB/SetPreference';
import Landing from '../screens/Landing';
import Login from '../screens/auth/Login';
import MobileNumber from '../screens/auth/MobileNumber';
import OTP from '../screens/auth/OTP';
import SmRegister from '../screens/auth/smdonor/SmRegister';
import SmBasicDetails from '../screens/auth/smdonor/SmBasicDetails';
import SetAttributes from '../screens/auth/smdonor/SetAttributes';
import CreateGallery from '../screens/auth/smdonor/CreateGallery';
import PtbDashboard from '../screens/dashboard/dashboard/PtbDashboard';


const Stack = createStackNavigator();
const Main = () => {
  return (
    <NavigationContainer
      onReady={() => RNBootSplash.hide()}
      
    >
      {/* initialRouteName="Profile" */}

      <Stack.Navigator  >
      
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Main;
