import {  View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet, FlatList} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const DeatailEachUser = ({ route }) => {
    const {image, first_name, last_name, nick_name, gender, age,birth_date, tel} = route.params.item
    const work_id = route.params.myId
    const [point , setPoint] = useState('5')
    const user_id = route.params.item._id
    const navigation = useNavigation()
    const [Review , setReview] = useState([])

    useEffect(() => {
        axios.get(`http://10.0.2.2:8000/users/${user_id}/review_points/${point}`)
        .then(res => {
            const allReviewID = res.data
            console.log(allReviewID)
            Promise.all(allReviewID.map(review_id=>
                axios.get(`http://10.0.2.2:8000/review/${review_id}`)
              ))
              .then(userResponses => {
                const userData = userResponses.map(response => response.data);
                setReview(userData)
              })
              .catch(error => {
                console.error('Error fetching user data:', error);
              });
        })
    }, [point])

        const handlePatchData = () => {
            axios.patch(`http://10.0.2.2:8000/users/${user_id}/accept/${work_id}`)
            .then(response => {
                navigation.goBack()
                console.log('PATCH request สำเร็จ', response.data);
              })
              .catch(error => {
                console.error('เกิดข้อผิดพลาดในการทำ PATCH request', error);
              });
          };

    return (
        <SafeAreaView style={{flex:1, backgroundColor: 'white', marginBottom: 100}}>
        <FlatList
            data={Review}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
            <>
                <View style={{flexDirection:'row-reverse', justifyContent: 'center' , margin:15}}>
                    <TouchableOpacity>
                        <View style={styles.rectangle3}>
                            <Text style={{color: '#FFFFFF' , fontSize: 20}}>นัดหมาย</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.rectangle1}>
                            <Text style={{color: '#FFFFFF' , fontSize: 20}}>ไม่รับ</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress= {() => {handlePatchData()}}>
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
        marginleft: 50,
        alignSelf: 'flex-start',
        borderRadius: 10,
      },
    textbutton: {
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
        marginleft: 70

    }
  });

export default DeatailEachUser