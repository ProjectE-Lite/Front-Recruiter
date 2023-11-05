import React,{useContext, useState}  from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button,TouchableOpacity} from 'react-native';
import { FlatList} from 'react-native';
import axios from "axios";
import { YOURAPI } from '../../constants/editendpoint';
import { useFocusEffect } from '@react-navigation/native';
import { Authcontext } from '../../context/Authcontext';


const revenue =({navigation})=>{
  const {userInfo} = useContext(Authcontext)
  const [notiDatamoney,setnotiData] = useState([]);
  const [data, setData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://${YOURAPI}/recruiters/${userInfo.recruiter_id}/money_exchange_monthly`)
          setnotiData(response.data);
        } catch (error) {
          console.error('Error making GET request:', error);
        }
      };
      fetchData(); 
      const interval = setInterval(() => {
        fetchData(); 
      }, 2000);
      return () => clearInterval(interval); 
    }, [])
  );
  
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://${YOURAPI}/recruiters/${userInfo.recruiter_id}`);
          setData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchData(); 
      const interval = setInterval(() => {
        fetchData(); 
      }, 2000);
      return () => clearInterval(interval); 
    }, [userInfo.recruiter_id]) 
  );
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex:1}}>
      <View style={{flexDirection:'row'}}>
      <Text style={{marginTop:10, marginLeft:10, marginBottom:10, color:'black',fontSize: 20}}>รายการเงินเข้าเงินออก</Text>
      <TouchableOpacity style={{alignItems: 'center', justifyContent: 'flex-start',alignSelf:'flex-start',marginLeft:130,backgroundColor:'#B1D4E0',borderRadius: 12,width:60 }} onPress={() => navigation.goBack()}>  
      <View  >
        <Text style={{fontSize:20}}>back</Text>
        </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={notiDatamoney}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          // item คือข้อมูลสำหรับแต่ละรายการในลิสต์
          const keys = Object.keys(item); // ดึงรายการหมายเลขคีย์ออกมา
          const values = item[keys[0]]; // ดึงข้อมูลภายในแต่ละรายการออกมา

          return (
            <View style={{flexDirection: 'row',marginBottom:10, backgroundColor: '#cadded', alignItems:'center', borderRadius: 20, justifyContent: 'center', padding: 5, marginHorizontal: 10,height:70}}>
              <View style={{ padding:5,backgroundColor: '#FFFFFf',width:100, alignItems:'center',borderRadius:10}}>
              <Text style={{fontSize:20}}>Month: {keys[0]}</Text>
            </View>
            <View style={{marginRight:30,marginLeft:50}}>
              <Text style={{fontSize:16,color:'green'}}>เงินเข้าทั้งหมด: {values.in}</Text>
              <Text style={{fontSize:16,marginTop:10,color:'red'}}>เงินออกทั้งหมด: {values.out}</Text>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
  
};

const styles = StyleSheet.create({
 button_red: {
    width: '100%',
    height: 60,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 12,
    }
});
export default revenue;