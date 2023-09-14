import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screen/auth/LoginScreen';
import ForgetScreen from '../screen/auth/ForgetScreen';
import Headertab from './HeaderTab';


const Stack = createStackNavigator();

const AuthStack = () => {
  return( 
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
      <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
      <Stack.Screen name="Forget" component={ForgetScreen}></Stack.Screen>
      <Stack.Screen name="บ้าน" component={Headertab}></Stack.Screen>
    </Stack.Navigator>
  );
}

export default AuthStack;