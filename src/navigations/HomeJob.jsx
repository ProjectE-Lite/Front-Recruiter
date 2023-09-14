import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screen/home/Home';
import AppendJob from '../screen/home/AppendJob';

const HJ = createStackNavigator();

const HomeJob = () => {
  return( 
    <HJ.Navigator screenOptions={{headerShown: false}}>
      <HJ.Screen name="pageHome" component={Home}></HJ.Screen>
      <HJ.Screen name="เพิ่มงาน" component={AppendJob}></HJ.Screen>
      {/* <HJ.Screen name="ค้นหา" component={Filter}></HJ.Screen> */}
    </HJ.Navigator>
  );
}

export default HomeJob;