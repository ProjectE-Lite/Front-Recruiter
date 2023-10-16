import {  View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet, FlatList, Modal} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { YOURAPI } from '../../constants/editendpoint';
import DatePicker from 'react-native-date-picker';
import DropdownTime from '../../components/DropdownTime';

const DeatailEachUser = ({ route }) => {
    const ShowBut = route.params.showBut
    const {image, first_name, last_name, nick_name, gender, age,birth_date, tel} = route.params.item
    const work_id = route.params.work_ID
    const [point , setPoint] = useState('5')
    const user_id = route.params.item._id
    const navigation = useNavigation()
    const [Review , setReview] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [doblabel, setDoblabel] = useState('คลิกเพื่อเลือก');
    const [c_Time,setC_Time] = useState("")
    const recruiter_id = '6517fa561434530638bc81de'
    const [Workwith, setWorkwith] = useState("")

    useEffect(() => {
        axios.get(`http://${YOURAPI}/users/${user_id}/review_points/${point}`)
        .then(res => {
            const allReviewID = res.data
            Promise.all(allReviewID.map(review_id=>
                axios.get(`http://${YOURAPI}/review/${review_id}`)
              ))
              .then(userResponses => {
                const userData = userResponses.map(response => response.data);
                setReview(userData)
              })
              .catch(error => {
                console.error('Error fetching user data:', error);
              });
        })
        .catch(error => {
            if (error.response && error.response.status === 400) {
                setReview([]); 
            } else {
                console.error('Error making GET request:', error);
            }
        });
    }, [point])

    const handlePatchData = () => {
        axios.patch(`http://${YOURAPI}/users/${user_id}/accept/${work_id}`)
        .then(response => {
            navigation.goBack()
            console.log('PATCH request สำเร็จ', response.data);
            })
            .catch(error => {
            console.error('เกิดข้อผิดพลาดในการทำ PATCH request', error);
            });
        };
    const handleDropdownChange = (value) => {
        setC_Time(value);
        };


    const handlePatchAppoint = () => {
        axios.patch(`http://${YOURAPI}/users/${user_id}/appoint/${work_id}/${doblabel}/${c_Time}`)
        .then(response => {
            setModalVisible(!modalVisible)
            console.log('PATCH request สำเร็จ', response.data);
            })
        .catch(error => {
            console.error('เกิดข้อผิดพลาดในการทำ PATCH request', error);
            });
        };
    
        useEffect(() => {
            axios.get(`http://${YOURAPI}/recruiters/${recruiter_id}/have_worked_with/${user_id}`)
            .then(ress => {
                setWorkwith(ress.data)
        })
        }, [])
    return (
        <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>เวลานัดหมายของ : </Text>
            <View style={{alignSelf: 'baseline', flexDirection: 'row', alignItems: 'center'}}>
              <Image source={require('../../assets/image/Calender.png')} style={styles.boxIcon}/>
              <Text style={{fontSize: 15}}>เลือกวัน : </Text>
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Text style={{ fontSize: 15 }}>{doblabel}</Text>
              </TouchableOpacity>
            </View>
            <DatePicker
                modal
                open={open}
                date={date}
                mode='date'
                maximumDate={new Date('2023-12-31')}
                minimumDate={new Date('1873-12-31')}
                onConfirm={(date) => {
                setOpen(false);
                setDate(date);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                setDoblabel(`${year}-${month}-${day}`)
                }}
                onCancel={() => {
                setOpen(false);
                }}
            />
          <View style={{alignSelf: 'baseline', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
            <Image source={require('../../assets/image/ClockIcon.png')} style={styles.boxIcon} />
            <DropdownTime
            onValueChange={handleDropdownChange}
            value = {{c_Time}}
            ></DropdownTime>
          </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {handlePatchAppoint()}}>
              <Text style={styles.textStyle}>ยืนยัน</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
        <FlatList
            data={Review}
            style={{marginBottom: 45}}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text>ยังไม่มีรีวิวสำหรับ {point} ดาว</Text>
                </View>
            }
            ListHeaderComponent={
            <>
                {ShowBut === "1" ? (
                    <View style={{flexDirection:'row-reverse', justifyContent: 'center' , margin:15}}>
                        <TouchableOpacity onPress={() => {setModalVisible(true)}}>
                            <View style={styles.rectangle3}>
                                <Text style={{color: '#FFFFFF' , fontSize: 20}}>นัดหมาย</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.rectangle1}>
                                <Text style={{color: '#FFFFFF' , fontSize: 20}}>ไม่รับ</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handlePatchData()}>
                            <View style={styles.rectangle2}>
                                <Text style={{color: '#FFFFFF' , fontSize: 20}}>รับ</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {navigation.goBack()}}>
                            <View style={styles.rectangle4}>
                                <Text style={{color: '#FFFFFF' , fontSize: 20}}>ย้อนกลับ</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (

                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <View style={styles.rectangle4}>
                            <Text style={{color: '#FFFFFF' , fontSize: 20}}>ย้อนกลับ</Text>
                        </View>
                    </TouchableOpacity>
                )}
                <Text style={{fontSize: 16, marginLeft: 20}}>เคยทำงานกับที่นี่มาก่อนไหม : </Text>
                <Text style = {{justifyContent: 'center' , marginBottom: 30,  fontSize: 16, marginLeft: 20}}>{Workwith}</Text>
                <View style={{justifyContent: 'center' , alignItems:'center'}}>
                    <Image 
                    source={{uri: image}} 
                    style = {styles.setimage}/>
                </View>
                <View style = {{margin: 10, alignItems: 'center'}}>
                    <Text style = {{fontSize: 20, color : '#000000'}}>{first_name} {last_name}</Text>
                </View>
                <View style={{flexDirection:'row', marginTop: 20, marginHorizontal:25}}>
                    <Text style={{color: '#1121b1', fontSize: 20}}>ชื่อเล่น :  </Text>
                    <Text style={{color:'#000000', fontSize: 20}}>{nick_name}</Text>
                </View>
                <View style={{flexDirection:'row', marginTop: 20, marginHorizontal:25}}>
                    <Text style={{color: '#1121b1', fontSize: 20}}>เพศ :  </Text>
                    <Text style={{color:'#000000', fontSize: 20}}>{gender}</Text>
                </View>
                <View style={{flexDirection:'row', marginTop: 20, marginHorizontal:25}}>
                    <Text style={{color: '#1121b1', fontSize: 20}}>อายุ :  </Text>
                    <Text style={{color:'#000000', fontSize: 20}}>{age}</Text>
                </View>
                <View style={{flexDirection:'row', marginTop: 20, marginHorizontal:25}}>
                    <Text style={{color: '#1121b1', fontSize: 20}}>วันเกิด :  </Text>
                    <Text style={{color:'#000000', fontSize: 20}}>{birth_date}</Text>
                </View>
                <View style={{flexDirection:'row', marginTop: 20, marginHorizontal:25}}>
                    <Text style={{color: '#1121b1', fontSize: 20}}>เบอร์โทรศัพท์ :  </Text>
                    <Text style={{color:'#000000', fontSize: 20}}>{tel}</Text>
                </View>
                <View style={{marginTop: 20, marginHorizontal:25}}>
                    <Text style={{color: '#1121b1', fontSize: 20}}>ที่อยู่ปัจจุบัน</Text>
                    <View style={{borderWidth: 20, alignItems: 'center', margin: 15, borderColor: '#FFFFFF'}}>
                        <Image source={require('../../assets/image/Maps.png')} style={{width: '100%', height:250, margin: 15}}></Image>
                    </View>
                </View>
                <View style = {{margin: 10, marginHorizontal:25}}>
                    <Text style = {{fontSize: 20, color : '#000000'}}>ประวัติการทำงาน</Text>
                </View>
                <View style={{flexDirection:'row', alignItems: 'center' , margin:15 , }}>
                <TouchableOpacity onPress={() => {setPoint('1')}}>
                        <View style={styles.rectangle5}>
                            <Text style={{color: 'black' , fontSize: 20}}>1 <Image 
                            source={require('../../assets/image/Star.png')}
                            style={{ width: 20, height: 20,}}
                    /></Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setPoint('2')}}>
                        <View style={styles.rectangle5}>
                            <Text style={{color: 'black' , fontSize: 20}}>2 <Image 
                            source={require('../../assets/image/Star.png')}
                            style={{ width: 20, height: 20,}}
                    /></Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setPoint('3')}}>
                        <View style={styles.rectangle5}>
                            <Text style={{color: 'black' , fontSize: 20}}>3 <Image 
                            source={require('../../assets/image/Star.png')}
                            style={{ width: 20, height: 20,}}
                    /></Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setPoint('4')}}>
                        <View style={styles.rectangle5}>
                            <Text style={{color: 'black' , fontSize: 20}}>4 <Image 
                            source={require('../../assets/image/Star.png')}
                            style={{ width: 20, height: 20,}}
                    /></Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setPoint('5')}}>
                        <View style={styles.rectangle5}>
                            <Text style={{color: 'black' , fontSize: 20}}>5 <Image 
                            source={require('../../assets/image/Star.png')}
                            style={{ width: 20, height: 20,}}
                    /></Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </>
          }
            contentContainerStyle={{ paddingBottom: 60 }}
            keyExtractor={(item,index) => index.toString()}
            renderItem={({ item }) => (
                <View style={{alignItems:'center',flexDirection: 'row', backgroundColor: '#B1DAFF', margin: 5, borderRadius: 30}}>
                    <Image 
                        source={{uri : item.recruiter_image}} 
                        style={{ width: 60, height: 80, marginLeft: 20}}
                        resizeMode='contain'
                    />
                    <Text style={{flexGrow:2, fontSize:16, color: 'black', marginLeft:10, flexGrow: 2}}>ชื่อ : {item.recruiter_name}{'\n'}
                        <View style={{ alignItems:'center',flexDirection: 'row',}}>
                            <Image source={item.score >= 1 ? require('../../assets/image/StarOutline.png') : require('../../assets/image/Star.png')} style={{height:20, width:20, margin: 5}}></Image>
                            <Image source={item.score >= 2 ? require('../../assets/image/StarOutline.png') : require('../../assets/image/Star.png')} style={{height:20, width:20, margin: 5}}></Image>
                            <Image source={item.score >= 3 ? require('../../assets/image/StarOutline.png') : require('../../assets/image/Star.png')} style={{height:20, width:20, margin: 5}}></Image>
                            <Image source={item.score >= 4 ? require('../../assets/image/StarOutline.png') : require('../../assets/image/Star.png')} style={{height:20, width:20, margin: 5}}></Image>
                            <Image source={item.score >= 5 ? require('../../assets/image/StarOutline.png') : require('../../assets/image/Star.png')} style={{height:20, width:20, margin: 5}}></Image>
                            <TouchableOpacity onPress={() => {navigation.navigate('หน้ารีวิว', {item})}}>
                            <View style = {styles.butt}>
                                <Text style = {styles.textbutton}>รีวิว</Text>
                            </View>
                        </TouchableOpacity>
                        </View>
                    </Text>
                </View>
            )}
    />
    </SafeAreaView>
    )

}   

const styles = StyleSheet.create({
    rectangle1: {
      margin: 5,
      width: 84,
      height: 44,
      borderRadius: 20 ,
      backgroundColor: '#FD0000',
      justifyContent: 'center',
      alignItems: 'center',
    },
    rectangle2: {
        margin: 5,
        width: 84,
        height: 44,
        borderRadius: 20 ,
        backgroundColor: '#071952',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rectangle3: {
        margin: 5,
        width: 84,
        height: 44,
        borderRadius: 20 ,
        backgroundColor: '#FFA722',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rectangle4: {
        margin: 5,
        width: 84,
        height: 44,
        borderRadius: 20 ,
        backgroundColor: '#5B0888',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rectangle5: {
        margin: 5,
        width: 60,
        height: 44,
        borderRadius: 20 ,
        backgroundColor: '#F8F8FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    setimage: {
        width: 175, 
        height: 175,
        borderRadius: 100
    },
    butt: {
        width: 55, 
        height: 25, 
        backgroundColor: '#e0e0e0',
        marginTop: 10,
        marginLeft: 50,
        alignSelf: 'flex-start',
        borderRadius: 10,
      },
    textbutton: {
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        width: 300,
        height: 225,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      boxIcon: {
        width: 40,
        height: 40,
        marginRight: 12,
        marginBottom: 3,
        resizeMode: 'contain',
      },
  });

export default DeatailEachUser