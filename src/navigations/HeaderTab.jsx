import { Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawer from '../components/CustomDrawer';
import Bottom from './Bottom';
import Profile from '../screen/profile/Profile';
import Employ from '../screen/money/Employ';

const Drawer = createDrawerNavigator();

const Headertab = () =>{
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{drawerLabelStyle: {marginLeft: -25, fontSize:17},
    drawerActiveBackgroundColor: '#176B87',
    drawerActiveTintColor: '#EEEEEE',
    drawerInactiveTintColor: '#000000',
    }}
    >
      <Drawer.Screen
        name="Home"
        component={Bottom}
        options={({ navigation }) => ({
          drawerIcon: () => (
            <Image
              source={require('../assets/image/Home.png')}
              style={{ width: 30, height: 20 }}
              resizeMode='contain'
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {navigation.navigate('เพิ่มงาน')}}
              style={{ marginRight: 15 }}
            >
              <Image
                source={require('../assets/image/appendIcon.png')}
                style={{ width: 30, height: 30 , opacity: 0.67}}
                resizeMode='contain'
              />
            </TouchableOpacity>
          ),
        })}
      />
        <Drawer.Screen
        name = "Employee"
        component={Employ}
        options={{
            drawerIcon: () => (<Image source={require('../assets/image/EmployIcon.png')} 
            style={{ width: 30, height: 20}}
            resizeMode='contain'></Image>)
        }}
        />
        <Drawer.Screen
        name = "Profile"
        component={Profile}
        options={{
            drawerIcon: () => (<Image source={require('../assets/image/FooterIcon/CardOutline.png')} 
            style={{ width: 30, height: 20}}
            resizeMode='contain'></Image>)
        }}
        />
    </Drawer.Navigator>
  )
}

export default Headertab