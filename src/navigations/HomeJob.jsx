import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screen/home/Home';
import AppendJob from '../screen/home/AppendJob';
import Detailjob from '../screen/home/Detailjob';
import ChoseEmploy from '../screen/home/ChoseEmploy';
import DeatailEachUser from '../screen/home/DetailEachUser';

const HJ = createStackNavigator();

const HomeJob = () => {
  return( 
    <HJ.Navigator screenOptions={{headerShown: false}}>
      <HJ.Screen name="pageHome" component={Home}></HJ.Screen>
      <HJ.Screen name="เพิ่มงาน" component={AppendJob}></HJ.Screen>
      <HJ.Screen name="เพิ่มรายละเอียด" component={Detailjob}></HJ.Screen>
      <HJ.Screen name="เลือกพนักงาน" component={ChoseEmploy}></HJ.Screen>
      <HJ.Screen name="รายละเอียดพนักงาน" component={DeatailEachUser}></HJ.Screen>
    </HJ.Navigator>
  );
}

export default HomeJob;