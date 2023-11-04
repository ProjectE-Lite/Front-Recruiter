import React, {useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { YOURAPI } from '../../constants/editendpoint';
import { useFocusEffect } from '@react-navigation/native';

const Employ = ({ navigation, userData, work_ID }) => {
    const [work_data, setWork_data] = useState([]);
    const [userStatus, setUserStatus] = useState([]);
    useFocusEffect(
        React.useCallback(() => {
          const fetchData = async () => {
            try {
              const response = await axios.get(`http://${YOURAPI}/works/${work_ID}`);
              const myData = response.data;
              setWork_data(myData);
              setUserStatus(myData.user_status);
            } catch (error) {
              console.error('Error fetching notifications:', error);
            }
          };
          fetchData();
        }, [work_ID])
      );
      

    

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <SafeAreaView style={style.body}>
                <View style={style.view1}>
                    <Text style={{fontSize: 19, color: '#071952'}}>วันเริ่มทำงาน : {work_data.work_date}</Text>
                    <Text style={{color: '#071952', fontSize: 19, marginTop: 5}}>
                      ตำแหน่ง : {(() => {
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
                    style={{marginBottom: 40}}
                    ListEmptyComponent={
                        <View style={{alignItems: 'center'}}>
                            <Text>ไม่มีข้อมูล</Text>
                        </View>
                    }
                    renderItem={({ item }) => (
                        <>
                            <Text style={{marginLeft: 20, color:'red'}}>{`Status : ${(() => {
                                switch(userStatus[item._id].user_status){
                                    case 'working':
                                        return 'ยังไม่จ่ายเงิน';
                                    case 'paid':
                                        return 'จ่ายเงินแล้ว';
                                    case 'absent':
                                        return 'ไม่มาทำงาน';
                                    default:
                                        return 'Db บัค';
                                }
                            })()}`}</Text>
                            {userStatus[item._id].user_status === 'paid' || userStatus[item._id].user_status === 'absent'? (
                                <View style={style.list2}>
                                    <View style={style.profile}>
                                        <View style={{height: 75, width: 75, borderRadius: 40, overflow: 'hidden' ,justifyContent: 'center'}}>
                                            <Image source={{uri : item.image}} style={{ width: null, height: null, flex: 1, resizeMode: 'cover',aspectRatio: 1}}/>
                                        </View>
                                        <Text style = {{}}>{item.first_name} {item.last_name}</Text>
                                        <TouchableOpacity style={style.button1} onPress={() => {navigation.navigate('InfoEm', { userData: userData, item , })}}>
                                            <Text style={style.text_button1}>ข้อมูล</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ): (
                            <View style={style.list}>
                                <View style={style.profile1}>
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
                        </>
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
    },
    list: {
        flexDirection: 'row',
        backgroundColor: '#d9d9d9',
        alignItems: 'center',
        height: 140,
        margin: 15,
        borderRadius: 10,
    },
    list2: {
        flexDirection: 'row',
        backgroundColor: '#d9d9d9',
        alignItems: 'center',
        height: 140,
        margin: 15,
        borderRadius: 10,
        width: 170
    },
    profile: {
        padding: 15,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:10
    
    },
    profile1: {
        padding: 15,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:10
    
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