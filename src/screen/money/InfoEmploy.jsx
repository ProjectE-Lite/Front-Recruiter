import {  View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { YOURAPI } from '../../constants/editendpoint'
import axios from 'axios'

const InfoEmploy = ({ navigation , route }) => {
    const userData = route.params.item
    const [point , setPoint] = useState('5')
    const work_history = userData.feedback
    const [Review , setReview] = useState([])

    useEffect(() => {
        axios.get(`http://${YOURAPI}/users/${userData._id}/review_points/${point}`)
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

    const dataDeatail = ([
        {name: 'ตี๋น้อย 168 รัชโยธิน',
        position: 'ล้างจาน',
        credit: '50',
        state: '',
        point: 1,
        },
        {name: 'รัชโยธิน',
        position: 'ล้างจาน',
        credit: '40',
        state: '',
        point: 4,
        },
        {name: 'ตี๋โยธิน',
        position: 'ล้างจาน',
        credit: '30',
        state: '',
        point: 5,
        },
        {name: 'ธิน',
        position: 'ล้างจาน',
        credit: '40',
        state: '',
        point: 3,
        },
    ]);

    return (
        <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
        
        <FlatList
            data={Review}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text>ยังไม่มีรีวิวสำหรับ {point} ดาว</Text>
                </View>
            }
            ListHeaderComponent={
            <>
                <View style={{justifyContent: 'center' , margin:15}}>
                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <View style={styles.rectangle3}>
                            <Text style={{color: '#FFFFFF' , fontSize: 20}}>ย้อนกลับ</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center'}}>
                    <View style={{height: 175, width: 175, borderRadius: 100, overflow: 'hidden'}}>
                        <Image source={{uri: userData.image}} style = {{flex: 1, height: null, width: null}} resizeMode = "cover"/>
                    </View>
                </View>
                <View style = {{margin: 10, alignItems: 'center'}}>
                    <Text style = {{fontSize: 20, color : '#000000'}}>{userData.first_name} {userData.last_name}</Text>
                </View>
                <View style={{flexDirection:'row', marginTop: 20, marginHorizontal:25}}>
                    <Text style={{color: '#1121b1', fontSize: 20}}>ชื่อเล่น :  </Text>
                    <Text style={{color:'#000000', fontSize: 20}}>{userData.nick_name}</Text>
                </View>
                <View style={{flexDirection:'row', marginTop: 20, marginHorizontal:25}}>
                    <Text style={{color: '#1121b1', fontSize: 20}}>เพศ :  </Text>
                    <Text style={{color:'#000000', fontSize: 20}}>{userData.gender}</Text>
                </View>
                <View style={{flexDirection:'row', marginTop: 20, marginHorizontal:25}}>
                    <Text style={{color: '#1121b1', fontSize: 20}}>อายุ :  </Text>
                    <Text style={{color:'#000000', fontSize: 20}}>{userData.age}</Text>
                </View>
                <View style={{flexDirection:'row', marginTop: 20, marginHorizontal:25}}>
                    <Text style={{color: '#1121b1', fontSize: 20}}>วันเกิด :  </Text>
                    <Text style={{color:'#000000', fontSize: 20}}>{userData.birth_date}</Text>
                </View>
                <View style={{flexDirection:'row', marginTop: 20, marginHorizontal:25}}>
                    <Text style={{color: '#1121b1', fontSize: 20}}>เบอร์โทรศัพท์ :  </Text>
                    <Text style={{color:'#000000', fontSize: 20}}>{userData.tel}</Text>
                </View>
                <View style={{flexDirection:'row', marginTop: 20, marginHorizontal:25}}>
                    <Text style={{color: '#1121b1', fontSize: 20}}>ที่อยู่ปัจจุบัน :  </Text>
                    <Text style={{color:'#000000', fontSize: 20}}>{userData.address}</Text>
                </View>
                <View style = {{marginTop: 20, marginHorizontal:25}}>
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
    rectangle3: {
        margin: 5,
        width: 94,
        height: 44,
        borderRadius: 20 ,
        backgroundColor: '#071952',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 145, 
        height: 145,
        resizeMode: 'contain', 
    },
    butt: {
        width: 55, 
        height: 25, 
        backgroundColor: '#e0e0e0',
        marginTop: 10,
        marginRight: 15,
        alignSelf: 'flex-start',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
    textbutton: {
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
    },
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
        rectangle10: {
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


export default InfoEmploy