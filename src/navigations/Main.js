import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// Screens
import VideoUpload from '../screens/VideoUpload';
import LogIn from '../screens/LogIn/LogIn';
import Welcome from '../screens/Welcome/Welcome'
import Verify from '../screens/verify/Verify';
import Profile from '../screens/DetailsPTB/Profile';
import BasicDetails from '../screens/DetailsPTB/BasicDetails';
import SetPreference from '../screens/DetailsPTB/SetPreference';

const Stack = createStackNavigator();
const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LogIn"
          component={LogIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Verify"
          component={Verify}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BasicDetails"
          component={BasicDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SetPreference"
          component={SetPreference}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Main;
