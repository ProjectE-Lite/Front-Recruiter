import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screen/home/Home';
import AppendJob from '../screen/home/AppendJob';
import Detailjob from '../screen/home/Detailjob';
import ChoseEmploy from '../screen/home/ChoseEmploy';
import DeatailEachUser from '../screen/home/DetailEachUser';
import Employ from '../screen/money/Employ';
import InfoEmploy from '../screen/money/InfoEmploy';
import Inspect from '../screen/money/Inspect';
import Pay from '../screen/money/Pay';
import Review from '../screen/home/Review';

const HJ = createStackNavigator();

const HomeJob = () => {
  return( 
    <HJ.Navigator screenOptions={{headerShown: false}}>
      <HJ.Screen name="pageHome" component={Home}></HJ.Screen>
      <HJ.Screen name="เพิ่มงาน" component={AppendJob}></HJ.Screen>
      <HJ.Screen name="เพิ่มรายละเอียด" component={Detailjob}></HJ.Screen>
      <HJ.Screen name="เลือกพนักงาน" component={ChoseEmploy}></HJ.Screen>
      <HJ.Screen name="รายละเอียดพนักงาน" component={DeatailEachUser}></HJ.Screen>
      <HJ.Screen name="Employ" component={Employ}></HJ.Screen>
      <HJ.Screen name="InfoEm" component={InfoEmploy}></HJ.Screen>
      <HJ.Screen name="ตรวจสอบ" component={Inspect}></HJ.Screen>
      <HJ.Screen name="pay" component={Pay}></HJ.Screen>
      <HJ.Screen name="หน้ารีวิว" component={Review}></HJ.Screen>
    </HJ.Navigator>
  );
}

export default HomeJob;