import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Employ from '../screen/money/Employ';
import InfoEmploy from '../screen/money/InfoEmploy';
import Inspect from '../screen/money/Inspect';
import Pay from '../screen/money/Pay';

const StackEm = createStackNavigator();

const Employstack = () => {
  return( 
    <StackEm.Navigator screenOptions={{headerShown: false}}>
        <StackEm.Screen name="Employ" component={Employ}></StackEm.Screen>
        <StackEm.Screen name="InfoEm" component={InfoEmploy}></StackEm.Screen>
        <StackEm.Screen name="ตรวจสอบ" component={Inspect}></StackEm.Screen>
        <StackEm.Screen name="pay" component={Pay}></StackEm.Screen>
    </StackEm.Navigator>
  );
}

export default Employstack;