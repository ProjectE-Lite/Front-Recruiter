import React, {useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, Button, TextInput, Image, TouchableOpacity } from 'react-native';

const Numbank = ({navigation}) => {

  return (
    <SafeAreaView style={style.body}>
        <View style={style.view2}>
            <Text style={style.text}>เลขที่บัญชี</Text>
            <TextInput style={style.input1} placeholder='ใส่เลขที่บัญชี'></TextInput>
        </View>
        
        <View style={style.view2}>
            <Text style={style.text}>จำนวนเงิน</Text>
            <TextInput style={style.input2} placeholder='ใส่จำนวนเงิน'></TextInput>
        </View>
        
        <View style={style.view2}>
            <View style={style.button}>
                <TouchableOpacity style={style.button}>
                    <Text style={style.text_button}>ยืนยัน</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={style.view2}>
            <View style={style.button}>
                <TouchableOpacity style={style.button_red} onPress={() => {navigation.goBack()}}>
                    <Text style={style.text_button}>ย้อนกลับ</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    </SafeAreaView>
  )

}

const style = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#8f8f9',
    },
    view_h: {
        flexDirection: 'row',
        alignContent: 'center',
        height: 50,
    },
    view1: {
        paddingTop: 15,
        paddingLeft: 15,
        
    },
    view2: {
        padding: 15
    },
    view3: {
        padding: 15,
        paddingBottom: 60
    },
    text: {
        color: '#000000',
        fontSize: 24,
        marginBottom: 15,
    },
    text1: {
        color: '#000000',
        fontSize: 24,
    },
    input1: {
        width: '100%',
        height: 60,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 23,
        textAlign: 'left',
        fontSize: 20,
        padding: 15,
    },
    input2: {
        width: '100%',
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#555',
        textAlign: 'right',
        fontSize: 20,
        padding: 15,
    },
    input3: {
        width: '100%',
        height: 60,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        textAlign: 'left',
        fontSize: 20,
        padding: 15,
    },
    text_button: {
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 30
    },
    button: {
        width: '100%',
        height: 60,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#00ff7f',
        borderRadius: 12,
    },
    button_red: {
        width: '100%',
        height: 60,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderRadius: 12,
    },
    image: {
        width: 50,
        height: 50,
    },
}
)


export default Numbank