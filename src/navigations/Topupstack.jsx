import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Income from '../screen/home/Income';
import Topup from '../screen/home/Topup';
import Numbank from '../screen/home/Numbank';
import revenue from '../screen/home/revenue';

const TransferStack = createStackNavigator();

const Transstack = () => {
  return( 
    <TransferStack.Navigator screenOptions={{headerShown: false}}>
      <TransferStack.Screen name="money" component={Income}></TransferStack.Screen>
      <TransferStack.Screen name="topup" component={Topup}></TransferStack.Screen>
      <TransferStack.Screen name="รายรับรายจ่าย" component={revenue}></TransferStack.Screen>
      <TransferStack.Screen name="เลขบช" component={Numbank}></TransferStack.Screen>
    </TransferStack.Navigator>
  );
}

export default Transstack;