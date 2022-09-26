import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import { useSelector } from 'react-redux';
import { Routes } from '../constants/Constants';
import getRoute from '../utils/getRoute';
// Screens
import Profile from '../screens/DetailsPTB/Profile';
import SetPreference from '../screens/DetailsPTB/SetPreference';
import Landing from '../screens/Landing';
import Login from '../screens/auth/Login';
import MobileNumber from '../screens/auth/MobileNumber';
import OTP from '../screens/auth/OTP';
import SmRegister from '../screens/auth/smdonor/SmRegister';
import CustomExample from '../screens/DetailsPTB/CustomExample'
import Example from '../screens/DetailsPTB/Example';
import Range from '../screens/DetailsPTB/Range';
import SmBasicDetails from '../screens/auth/smdonor/SmBasicDetails';
import SetAttributes from '../screens/auth/smdonor/SetAttributes';
import CreateGallery from '../screens/auth/smdonor/CreateGallery';

const Stack = createStackNavigator();
const Main = () => {
  const auth = useSelector(state=>state.auth.user);
  useEffect(()=>{
    if(auth){
      RNBootSplash.hide();
    }
  },[auth]);
  return (
    <NavigationContainer>
      {/* initialRouteName="SetPreference" */}

      <Stack.Navigator initialRouteName={getRoute(auth.access_token,auth.role_id,auth.registration_step)}>
      
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Main;
