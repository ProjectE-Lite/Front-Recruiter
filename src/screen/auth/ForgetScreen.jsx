import React from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const ForgetScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{flex:1 ,marginHorizontal:15}}>
            <View style={{alignItems:"center", marginTop:20, marginBottom: 20}}>
                <Text style={{fontSize:20}}>ตั้งรหัสผ่านใหม่</Text>
            </View>
            <View style={{justifyContent: 'center',marginVertical: 20}}>
                <Text style={{fontSize:24}}>รหัสผ่านใหม่</Text>
                <TextInput placeholder='new password' autoCorrect= {false} style={{height: 50,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius:15,
        borderColor: '#000000',
        borderWidth: 3,}}></TextInput>
            </View>
            <View style={{justifyContent: 'center'}}>
                <Text style={{fontSize:24}}>ยืนยันรหัสผ่าน</Text>
                <TextInput placeholder='confirm new password' autoCorrect= {false} style={{height: 50,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius:15,
        borderColor: '#000000',
        borderWidth: 3,}}></TextInput>
            </View>
            <TouchableOpacity onPress={() => {navigation.navigate('Login')}}>
                <View style={styles.loginbut}>
                    <Text style={{fontSize:24, color:'#ffffff'}}>ยืนยัน</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    loginbut:{
        backgroundColor: '#000000',
        height: 55,
        borderWidth: 1,
        borderRadius:30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 100,
        marginTop: 50
    },
});

export default ForgetScreen;