import { View, Text } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function CustomDrawer( props ) {
    const {navigation} = props;
    return (
    <View style={{flex:1}}>
        <DrawerContentScrollView {...props}>
            <View style={{justifyContent:'center',padding:10,height:60, width:'auto'}}>
                <Text style={{fontSize:30}}>รายการ</Text>
            </View>
            <View style={{paddingTop: 10}}>
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
        <TouchableOpacity onPress={() => {navigation.navigate('Login')}}>
            <View style={{alignSelf:'center',justifyContent:'center',alignItems:'center',backgroundColor: '#176B87', borderRadius: 40, width: 230, height:40, marginBottom:25}}>
                <Text style={{color: '#ffffff'}}>
                    Sign Out
                </Text>
            </View>
        </TouchableOpacity>
    </View>
  )
}