import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Authcontext } from '../context/Authcontext'

export default function CustomDrawer( props ) {
    const {logout} = useContext(Authcontext)
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
        <TouchableOpacity onPress={() => {logout()}}>
            <View style={{alignSelf:'center',justifyContent:'center',alignItems:'center',backgroundColor: '#176B87', borderRadius: 40, width: 230, height:40, marginBottom:25}}>
                <Text style={{color: '#ffffff'}}>
                    Sign Out
                </Text>
            </View>
        </TouchableOpacity>
    </View>
  )
}