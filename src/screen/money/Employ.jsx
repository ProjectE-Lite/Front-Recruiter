import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, Button, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';

const userlist = ([
    {profile_list: '1'},
    {profile_list: '2'},
    {profile_list: '3'},
    {profile_list: '4'},
]);

const Employ = ({ navigation, userData, work_ID }) => {
    console.log(userData)
    console.log(work_ID);
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <SafeAreaView style={style.body}>
                <View style={style.view1}>
                    <Text style={style.text1_1}>ตี๋น้อย 111 พหล - </Text>
                    <Text style={style.text1_2}>พนักงานเสิร์ฟ</Text>
                </View>

                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={userlist}
                    renderItem={({ item }) => (
                        <View style={style.list}>
                            <View style={style.profile}>
                                <Image source={require('../../assets/image/ProfileIcon.png')} resizeMode='contain' style={{ width: 80, height: 80,}}/>
                                <TouchableOpacity style={style.button1} onPress={() => {navigation.navigate('InfoEm')}}>
                                    <Text style={style.text_button1}>ข้อมูล</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={style.line}>

                            </View>
                            <View style={style.check}>
                                <Image source={require('../../assets/image/search-alt.png')} resizeMode='contain' style={{ width: 65, height: 65, marginTop: 7}}/>
                                    <TouchableOpacity style={style.button2} onPress={() => {navigation.navigate('ตรวจสอบ')}}>
                                        <Text style={style.text_button2}>ตรวจงาน</Text>
                                    </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </SafeAreaView>
        </View>
    )

}

const style = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#8f8f9',
    },
    header: {
        flexDirection: 'row',
        alignContent: 'center',
        height: 50,
    },
    view1: {
        marginTop: 5,
        padding: 15,
        flexDirection: 'row',
    },
    list: {
        flexDirection: 'row',
        backgroundColor: '#d9d9d9',
        alignItems: 'center',
        height: 140,
        margin: 15,
        borderRadius: 10,
    },
    profile: {
        padding: 15,
        width: '50%',
        alignItems: 'center',
    },
    button1: {
        backgroundColor: '#071952',
        width: '80%',
        height: 25,
        marginTop: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        height: '88%',
        borderWidth: 0.75,
    },
    check: {
        padding: 15,
        width: '50%',
        alignItems: 'center',
    },
    button2: {
        backgroundColor: '#071952',
        width: '80%',
        height: 25,
        marginTop: 17,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text1_1: {
        color: '#000000',
        fontSize: 19,
    },
    text1_2: {
        color: '#fd0000',
        fontSize: 19,
    },
    text_button1: {
        color: '#ffffff',
        fontSize: 14,
    },
    text_button2: {
        color: '#ffffff',
        fontSize: 14,
    },
}
)

export default Employ