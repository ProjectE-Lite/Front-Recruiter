import React, {useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { YOURAPI } from '../../constants/editendpoint';
import { useFocusEffect } from '@react-navigation/native';

const Employ = ({ navigation, userData, work_ID }) => {
    const [work_data, setWork_data] = useState([]);

    useFocusEffect(
      React.useCallback(() => {
        axios.get(`http://${YOURAPI}/works/${work_ID}`)
          .then(res => {
            const myData = res.data;
            setWork_data(myData);
            console.log(myData);
          })
          .catch(error => {
            console.error('Error fetching notifications:', error);
          });
      }, [])
    );

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <SafeAreaView style={style.body}>
                <View style={style.view1}>
                    <Text style={style.text1_1}>{work_data.name} - </Text>
                    <Text style={{color: 'red', fontSize: 19}}>
                      {(() => {
                          switch(work_data.type_of_work) {
                            case 'type1':
                              return 'พนักงานเสิร์ฟ';
                            case 'type2':
                              return 'พนักงานทำความสะอาด';
                            case 'type3':
                              return 'ผู้ช่วยเชฟ';
                            case 'type4':
                              return 'พนักงานต้อนรับ';
                            case 'type5':
                              return 'พนักงานล้างจาน';
                            case 'type6':
                              return 'พนักงานส่งอาหาร';
                            case 'type7':
                              return 'พนักงานครัวร้อน';
                            default:
                              return work_data.type_of_work;
                          }
                        })()}
                      </Text>
                </View>

                <FlatList
                    keyExtractor={(item) => item._id.toString()}
                    data={userData}
                    ListEmptyComponent={
                        <View style={{alignItems: 'center'}}>
                            <Text>ไม่มีข้อมูล</Text>
                        </View>
                    }
                    renderItem={({ item }) => (
                        <View style={style.list}>
                            <View style={style.profile}>
                                <View style={{height: 75, width: 75, borderRadius: 40, overflow: 'hidden'}}>
                                    <Image source={{uri : item.image}} style={{ width: null, height: null, flex: 1}}/>
                                </View>
                                <Text>{item.first_name} {item.last_name}</Text>
                                <TouchableOpacity style={style.button1} onPress={() => {navigation.navigate('InfoEm', { userData: userData, item , })}}>
                                    <Text style={style.text_button1}>ข้อมูล</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={style.line}>

                            </View>
                            <View style={style.check}>
                                <Image source={require('../../assets/image/search-alt.png')} resizeMode='contain' style={{ width: 65, height: 65, marginTop: 7}}/>
                                    <TouchableOpacity style={style.button2} onPress={() => {navigation.navigate('ตรวจสอบ', { userData: userData, item , work_ID: work_ID, work_data: work_data} )}}>
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
        marginTop: 5
        ,
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
        marginTop: 25,
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