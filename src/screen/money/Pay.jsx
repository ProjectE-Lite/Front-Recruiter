import React, { useState } from 'react';
import{
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,

}from "react-native";
import axios from 'axios'
import { YOURAPI } from '../../constants/editendpoint';
const Pay =({route , navigation})=>{
    const rates = parseInt(route.params.defaultRating)
    const text = route.params.comment
    const work_data = route.params.work_data
    const userData = route.params.userData
    const Data = {score: rates, text : text}
    function renderpay(){
      const handlePatchData = () => {
        axios.patch(`http://${YOURAPI}/users/${userData._id}/payment/${work_data._id}`, Data)
        .then(response => {
            navigation.navigate('Employ')
            console.log('PATCH request สำเร็จ', response.data);
          })
          .catch(error => {
            console.error('เกิดข้อผิดพลาดในการทำ PATCH request', error);
          });
      };
    
    return(
            <View style={{alignItems: 'center', marginTop: 20}}>
            <View style={{justifyContent: 'center' , alignItems:'center'}}>
            <Image source={{uri: userData.image}}
                  style={{height:145, width: 145}}
                  resizeMode='contain'></Image>
            </View>
            <View style={{alignItems:'center'}}>
               <Text style={{fontSize: 20, color:'#000000', fontWeight:'500'}}>{userData.first_name} {userData.last_name}</Text>
            </View>
        <View style={{flexDirection:'row', marginTop: 7, marginHorizontal:25,alignSelf: 'flex-start'}}>
          <Text style={{color: '#1121B1', fontSize: 17}}>อายุ :  </Text>
          <Text style={{color:'#000000', fontSize: 17}}>{userData.age}</Text>
        </View>
        <View style={{flexDirection:'row', marginTop: 7, marginHorizontal:25,alignSelf: 'flex-start'}}>
          <Text style={{color: '#1121B1', fontSize: 17}}>วันเกิด :  </Text>
          <Text style={{color:'#000000', fontSize: 17}}>{userData.birth_date}</Text>
        </View>
        <View style={{flexDirection:'row', marginTop: 7, marginHorizontal:25,alignSelf: 'flex-start'}}>
          <Text style={{color: '#1121B1', fontSize: 17}}>เบอร์โทรศัพท์ :  </Text>
          <Text style={{color:'#000000', fontSize: 17}}>{userData.tel}</Text>
        </View>
        <View style={{alignItems:'center',marginTop:30}}>
            <Text style={{color:'#000000',fontSize:36}}>{work_data.name}</Text>
        </View>
        <View style={{alignItems:'center',marginTop:10}}>
            <Text style={{color:'#000000',fontSize:36}}>{work_data.start_time} - {work_data.end_time}</Text>
        </View>
          <TouchableOpacity onPress={handlePatchData}>  
                <View style={{marginLeft:9,alignItems:'center',justifyContent:'center',width:350,height:100,borderRadius:10,backgroundColor:'#071952',marginTop:20}}>
            <Text style={{color:'#FFFFFF', fontSize: 24}}>จ่ายเงิน</Text>
          </View>
          </TouchableOpacity>
        
        </View>
    )
    }
    return(
        <SafeAreaView style={styles.contrainer}>
             {renderpay()}
         </SafeAreaView>
            
         )
}
const styles = StyleSheet.create({
  contrainer:{
    flex:1,
    backgroundColor:"#F8F8F9"
},
starImgStyle:{
  height:40, 
  width:40,
  marginLeft:10,
  resizeMode:'cover'
}
});

export default Pay;