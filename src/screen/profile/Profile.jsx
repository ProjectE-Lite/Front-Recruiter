import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Profile({navigation}) {
  const [ListData, setListData] = useState([])
  const recruiter_id = '6517fa561434530638bc81de'
  useEffect( () => {
    axios.get(`http://localhost:8000/recruiters/${recruiter_id}`)
    .then(res => {
      setListData(res.data)
    })
  }, [])

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <SafeAreaView style={{flex:1,}}>
        <ScrollView>
          <View style={{alignItems:'center', marginTop: 20}}>
            <Image source={{uri: ListData.image}}
                  style={{height:175, width: 175}}
                  resizeMode='contain'></Image>
          </View>
          <View style={{alignItems:'center'}}>
            <Text style={{fontSize: 30, color:'#000000', fontWeight:'500'}}>{ListData.name}</Text>
          </View>
          <View style={{flexDirection:'row', marginTop: 25, marginHorizontal:25}}>
            <Text style={{color: '#176B87', fontSize: 18}}>ที่อยู่ :  </Text>
            <Text style={{color:'#000000', fontSize: 17}}>{ListData.address}</Text>
          </View>
          <View style={{flexDirection:'row', marginTop: 25, marginHorizontal:25}}>
            <Text style={{color: '#176B87', fontSize: 18}}>ยอดเงินคงเหลือ :  </Text>
            <Text style={{color:'#000000', fontSize: 17}}>{ListData.credit?.toLocaleString() || ""}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}