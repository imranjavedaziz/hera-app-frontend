import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
// Screens
import VideoUpload from '../screens/VideoUpload';
import LogIn from '../screens/LogIn/LogIn';
import Welcome from '../screens/Welcome/Welcome'
import Verify from '../screens/verify/Verify';
import Profile from '../screens/DetailsPTB/Profile';
import BasicDetails from '../screens/DetailsPTB/BasicDetails';
import SetPreference from '../screens/DetailsPTB/SetPreference';
import Landing from '../screens/Landing';
import Login from '../screens/auth/Login';
import MobileNumber from '../screens/auth/MobileNumber';

const Stack = createStackNavigator();
const Main = () => {
  return (
    <NavigationContainer
      onReady={() => RNBootSplash.hide()}
    >
      <Stack.Navigator>
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MobileNumber"
          component={MobileNumber}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VideoUpload"
          component={VideoUpload}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Main;
