import {  View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet, FlatList} from 'react-native'
import React from 'react'

const InfoEmploy = ({ navigation }) => {
    const ListData = (
            { nickname: 'Arm',
                sex: 'F',
                age: '21',
                date: '19 ตุลาคม 2545',
                tel: '0891234567',
                mylocation: ' ',
            }
            )
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
            data={dataDeatail}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
            <>
                <View style={{justifyContent: 'center' , margin:15}}>
                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <View style={styles.rectangle3}>
                            <Text style={{color: '#FFFFFF' , fontSize: 20}}>ย้อนกลับ</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent: 'center' , alignItems:'center'}}>
                    <Image source={require('../../assets/image/ProfileIcon.png')} style = {styles.image}/>
                </View>
                <View style = {{margin: 10, alignItems: 'center'}}>
                    <Text style = {{fontSize: 20, color : '#000000'}}>Firstname Lastname</Text>
                </View>
                <View style={{flexDirection:'row', marginTop: 20, marginHorizontal:25}}>
                    <Text style={{color: '#1121b1', fontSize: 20}}>ชื่อเล่น :  </Text>
                    <Text style={{color:'#000000', fontSize: 20}}>{ListData.nickname}</Text>
                </View>
                <View style={{flexDirection:'row', marginTop: 20, marginHorizontal:25}}>
                    <Text style={{color: '#1121b1', fontSize: 20}}>เพศ :  </Text>
                    <Text style={{color:'#000000', fontSize: 20}}>{ListData.sex}</Text>
                </View>
                <View style={{flexDirection:'row', marginTop: 20, marginHorizontal:25}}>
                    <Text style={{color: '#1121b1', fontSize: 20}}>อายุ :  </Text>
                    <Text style={{color:'#000000', fontSize: 20}}>{ListData.age}</Text>
                </View>
                <View style={{flexDirection:'row', marginTop: 20, marginHorizontal:25}}>
                    <Text style={{color: '#1121b1', fontSize: 20}}>วันเกิด :  </Text>
                    <Text style={{color:'#000000', fontSize: 20}}>{ListData.date}</Text>
                </View>
                <View style={{flexDirection:'row', marginTop: 20, marginHorizontal:25}}>
                    <Text style={{color: '#1121b1', fontSize: 20}}>เบอร์โทรศัพท์ :  </Text>
                    <Text style={{color:'#000000', fontSize: 20}}>{ListData.tel}</Text>
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
            </>
          }
            contentContainerStyle={{ paddingBottom: 60 }}
            keyExtractor={(item,index) => index.toString()}
            renderItem={({ item }) => (
                <View style={{alignItems:'center',flexDirection: 'row', backgroundColor: '#B1DAFF', margin: 5, borderRadius: 30}}>
                    <Image 
                        source={require('../../assets/image/TeeNoi.png')} 
                        style={{ width: 60, height: 80, marginLeft: 20}}
                        resizeMode='contain'
                    />
                    <Text style={{flexGrow:2, fontSize:16, color: 'black', marginLeft: 15, flexGrow: 2}}>ชื่อ : {item.name}{'\n'}
                        <View style={{ alignItems:'center',flexDirection: 'row'}}>
                            <Image source={item.point >= 1 ? require('../../assets/image/StarOutline.png') : require('../../assets/image/Star.png')} style={{height:20, width:20, margin: 5}}></Image>
                            <Image source={item.point >= 2 ? require('../../assets/image/StarOutline.png') : require('../../assets/image/Star.png')} style={{height:20, width:20, margin: 5}}></Image>
                            <Image source={item.point >= 3 ? require('../../assets/image/StarOutline.png') : require('../../assets/image/Star.png')} style={{height:20, width:20, margin: 5}}></Image>
                            <Image source={item.point >= 4 ? require('../../assets/image/StarOutline.png') : require('../../assets/image/Star.png')} style={{height:20, width:20, margin: 5}}></Image>
                            <Image source={item.point >= 5 ? require('../../assets/image/StarOutline.png') : require('../../assets/image/Star.png')} style={{height:20, width:20, margin: 5}}></Image>
                        </View>
                    </Text>
                    <View style={{flexDirection:'column', alignItems:'center'}}>
                        <Text style = {{fontSize:14 , color:'#FD0000'}}>{item.position}{'\n'}
                        <TouchableOpacity onPress={() => {navigation.navigate('Home', {item})}}>
                            <View style = {styles.butt}>
                                <Text style = {styles.textbutton}>รีวิว</Text>
                            </View>
                        </TouchableOpacity></Text>
                    </View>
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
        backgroundColor: '#5B0888',
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
    }
  });

export default InfoEmploy