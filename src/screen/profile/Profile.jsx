import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'


const ListData = (
  { nickname: 'มอส',
    sex: 'F',
    age: '20',
    date: '19 ตุลาคม 2545',
    tel: '0123456789',
    email: 'mos@gmail.com',
    lineid: '-',
    mylocation: '-',
  }
)



export default function Profile({navigation}) {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <SafeAreaView style={{flex:1,}}>
        <ScrollView>
          <View style={{alignItems:'center'}}>
            <Image source={require('../../assets/image/ProfileIcon.png')}
                  style={{height:175, width: 175}}
                  resizeMode='contain'></Image>
          </View>
          <View style={{alignItems:'center'}}>
            <Text style={{fontSize: 30, color:'#000000', fontWeight:'500'}}>Van der Sar</Text>
          </View>
          <View style={{flexDirection:'row', marginTop: 25, marginHorizontal:25}}>
            <Text style={{color: '#176B87', fontSize: 17}}>ชื่อเล่น :  </Text>
            <Text style={{color:'#000000', fontSize: 17}}>{ListData.nickname}</Text>
          </View>
          <View style={{flexDirection:'row', marginTop: 15, marginHorizontal:25}}>
            <Text style={{color: '#176B87', fontSize: 17}}>เพศ :  </Text>
            <Text style={{color:'#000000', fontSize: 17}}>{ListData.sex}</Text>
          </View>
          <View style={{flexDirection:'row', marginTop: 15, marginHorizontal:25}}>
            <Text style={{color: '#176B87', fontSize: 17}}>อายุ :  </Text>
            <Text style={{color:'#000000', fontSize: 17}}>{ListData.age}</Text>
          </View>
          <View style={{flexDirection:'row', marginTop: 15, marginHorizontal:25}}>
            <Text style={{color: '#176B87', fontSize: 17}}>วันเกิด :  </Text>
            <Text style={{color:'#000000', fontSize: 17}}>{ListData.date}</Text>
          </View>
          <View style={{flexDirection:'row', marginTop: 15, marginHorizontal:25}}>
            <Text style={{color: '#176B87', fontSize: 17}}>เบอร์โทรศัพท์ :  </Text>
            <Text style={{color:'#000000', fontSize: 17}}>{ListData.tel}</Text>
          </View>
          <View style={{flexDirection:'row', marginTop: 15, marginHorizontal:25}}>
            <Text style={{color: '#176B87', fontSize: 17}}>Gmail :  </Text>
            <Text style={{color:'#000000', fontSize: 17}}>{ListData.email}</Text>
          </View>
          <View style={{flexDirection:'row', marginTop: 15, marginHorizontal:25}}>
            <Text style={{color: '#176B87', fontSize: 17}}>LineId :  </Text>
            <Text style={{color:'#000000', fontSize: 17}}>{ListData.lineid}</Text>
          </View>
          <View style={{marginTop: 15, marginHorizontal:25}}>
            <Text style={{color: '#176B87', fontSize: 17}}>ที่อยู่ปัจจุบัน</Text>
            <View style={{borderWidth: 10, alignItems: 'center', margin: 15, borderColor: '#EEEEEE'}}>
              <Image source={require('../../assets/image/Maps.png')} style={{width: '100%', height:250, margin: 15}}></Image>
              <View style={{flexDirection: 'row'}}>
              </View>
            </View>
          </View>
          
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}