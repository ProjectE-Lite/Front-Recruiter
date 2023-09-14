import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <View style={{backgroundColor:'white', margin:10, borderRadius:30, }}>
                <View style={{paddingHorizontal:25}}>
                    <View style={{alignItems: 'center', margin:20}}>
                        <Text style={{fontSize:90, color: '#000000'}}>E lite</Text>
                        <Text>ReCruiTer</Text>
                    </View>
                    <TextInput 
                    placeholder="Email" 
                    style={styles.input} 
                    keyboardType="email-address"
                    />
                    <TextInput 
                    placeholder="Password" 
                    style={styles.input} 
                    secureTextEntry={true} 
                    />
                    <TouchableOpacity onPress={() => {navigation.navigate('บ้าน')}} style={styles.loginbut}>
                        <Text style={{color: '#ffffff'}}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate('Forget')}} style={{marginVertical:10}}>
                        <Text style={{color: '#000000'}}>Forget Password?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius:15,
        borderColor: '#000000',
        borderWidth: 3,
    },
    loginbut:{
        backgroundColor: '#000000',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius:15,
        alignItems: 'center'
    }

});

export default LoginScreen;