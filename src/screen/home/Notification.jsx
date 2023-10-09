import { StyleSheet, Text, View, SafeAreaView} from 'react-native'
import React, { useEffect, useState } from 'react'
import {FlatList} from 'react-native';
import axios from 'axios';

export default function Notification() {
  const recruiter_id = '6517fa561434530638bc81de'
  const [dataDeatail, setDataDeatail] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:8000/recruiters/${recruiter_id}/noti`)
    .then(res => {
      const myData = res.data
      Promise.all(myData.map(notiId =>
        axios.get(`http://localhost:8000/recruiters/noti/${notiId}`)
      ))
      .then(res => {
        const notiData = res.map(res => res.data)
        setDataDeatail(notiData)
      })
    })
  }, [])
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex:1}}>
      <FlatList
        data={dataDeatail}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{flexDirection: 'column', margin:10, borderBottomWidth:1}}>
            <Text style={{margin:5, color:'red'}}>{item.name}  ({item.date})</Text>
            <Text style={{marginLeft: 20, marginBottom:8}}>{item.text}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  )
}