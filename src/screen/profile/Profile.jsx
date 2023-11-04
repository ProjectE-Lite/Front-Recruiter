import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { YOURAPI } from '../../constants/editendpoint'
import { Authcontext } from '../../context/Authcontext'

export default function Profile({navigation}) {
  const [ListData, setListData] = useState([])
  const {userInfo} = useContext(Authcontext)
  const recruiter_id = userInfo.recruiter_id
  useEffect( () => {
    axios.get(`http://${YOURAPI}/recruiters/${recruiter_id}`)
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
          <View style={{flexDirection:'row', marginTop: 50, marginHorizontal:15}}>
            <Text style={{color: '#176B87', fontSize: 18}}>ที่อยู่ :  </Text>
            <Text style={{color:'#000000', fontSize: 17}}>{ListData.address}</Text>
          </View>
          <View style={{flexDirection:'row', marginTop: 25, marginHorizontal:15}}>
            <Text style={{color: '#176B87', fontSize: 18}}>ยอดเงินคงเหลือ :  </Text>
            <Text style={{color:'#000000', fontSize: 17}}>{ListData.credit?.toLocaleString() || ""}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}