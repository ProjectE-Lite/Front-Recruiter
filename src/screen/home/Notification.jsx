import { StyleSheet, Text, View, SafeAreaView} from 'react-native'
import React from 'react'
import {FlatList} from 'react-native';

const dataDeatail = ([
  {name: 'ตี๋น้อยรัชโยธิน',
  text: 'มีงานใหม่จ้าาาาา',
  date: '6 ม.ค. 66'
  },
  {name: 'ตี๋น้อยรัชโยธิน',
  text: 'ผมโดนภรรยาปลุกขึ้นมากลางดึกแล้วบอกว่ามีโจรเข้าบ้านแต่เธอถูกโจรฆ่าตายไปตั้งแต่ 2 ปีที่แล้ว',
  date: '7 ม.ค. 66'
  },
]);

export default function Notification() {
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

const styles = StyleSheet.create({})