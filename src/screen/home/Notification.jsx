import { StyleSheet, Text, View, SafeAreaView} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import {FlatList} from 'react-native';
import axios from 'axios';
import { YOURAPI } from '../../constants/editendpoint';
import { useFocusEffect } from '@react-navigation/native';
import { Authcontext } from '../../context/Authcontext';

export default function Notification() {
  const {userInfo} = useContext(Authcontext)
  const recruiter_id = userInfo.recruiter_id
  const [dataDeatail, setDataDetail] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://${YOURAPI}/recruiters/${recruiter_id}/noti`);
          const myData = response.data;
          const notiResponses = await Promise.all(myData.map(notiId =>
            axios.get(`http://${YOURAPI}/recruiters/noti/${notiId}`)
          ));
          const notiData = notiResponses.map(res => res.data);
          setDataDetail(notiData);
        } catch (error) {
          if (error.response && error.response.status === 400) {
            setDataDetail([]);
          }
        }
      };
      fetchData();
      const interval = setInterval(() => {
        fetchData();
      }, 3000);
      return () => clearInterval(interval);
    }, [recruiter_id])
  );

  
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex:1}}>
      <FlatList
        data={dataDeatail}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item,index) => index.toString()}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text>No Notification</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={{flexDirection: 'column', margin:10, borderBottomWidth:1}}>
            <Text style={{margin:5, color:'red'}}>{item.name}  ({item.date.slice(0,16)})</Text>
            <Text style={{marginLeft: 20, marginBottom:8}}>{item.text}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  )
}