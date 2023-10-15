import React from 'react';
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
const _point = 1;
const Pay =({route , navigation})=>{
    const work_id = route.params.work_data._id
    const user_id = route.params.item._id
    function renderpay(){

      const handlePatchData = () => {
        axios.patch(`http://${YOURAPI}/users/${user_id}/payment/${work_id}`)
        .then(response => {
            navigation.goBack()
            console.log('PATCH request สำเร็จ', response.data);
          })
          .catch(error => {
            console.error('เกิดข้อผิดพลาดในการทำ PATCH request', error);
          });
      };
    
    return(
            <View style={{alignItems: 'center', marginTop: 20}}>
            <View style={{justifyContent: 'center' , alignItems:'center'}}>
            <Image source={{uri: route.params.item.image}}
                  style={{height:145, width: 145}}
                  resizeMode='contain'></Image>
            </View>
            <View style={{alignItems:'center'}}>
          <Text style={{fontSize: 20, color:'#000000', fontWeight:'500'}}>{route.params.item.nick_name}</Text>
          <View style={{ alignItems:'center',flexDirection: 'row',}}>
            <Image source={route.params.item.point >= 1 ? require('../../assets/image/StarOutline.png') : require('../../assets/image/Star.png')} style={{height:20, width:20,marginLeft:5}}></Image>
            <Image source={route.params.item.point >= 2 ? require('../../assets/image/StarOutline.png') : require('../../assets/image/Star.png')} style={{height:20, width:20,marginLeft:5}}></Image>
            <Image source={route.params.item.point >= 3 ? require('../../assets/image/StarOutline.png') : require('../../assets/image/Star.png')} style={{height:20, width:20,marginLeft:5}}></Image>
            <Image source={route.params.item.point >= 4 ? require('../../assets/image/StarOutline.png') : require('../../assets/image/Star.png')} style={{height:20, width:20,marginLeft:5}}></Image>
            <Image source={route.params.item.point >= 5 ? require('../../assets/image/StarOutline.png') : require('../../assets/image/Star.png')} style={{height:20, width:20,marginLeft:5}}></Image>
            <Text style={{marginLeft:20, fontSize: 20, color:'#000000', fontWeight:'400'}}>คะแนน {route.params.item.point}</Text>
          </View>
        </View>
        <View style={{flexDirection:'row', marginTop: 7, marginHorizontal:25,alignSelf: 'flex-start'}}>
          <Text style={{color: '#1121B1', fontSize: 17}}>อายุ :  </Text>
          <Text style={{color:'#000000', fontSize: 17}}>{route.params.item.age}</Text>
        </View>
        <View style={{flexDirection:'row', marginTop: 7, marginHorizontal:25,alignSelf: 'flex-start'}}>
          <Text style={{color: '#1121B1', fontSize: 17}}>วันเกิด :  </Text>
          <Text style={{color:'#000000', fontSize: 17}}>{route.params.item.birth_date}</Text>
        </View>
        <View style={{flexDirection:'row', marginTop: 7, marginHorizontal:25,alignSelf: 'flex-start'}}>
          <Text style={{color: '#1121B1', fontSize: 17}}>เบอร์โทรศัพท์ :  </Text>
          <Text style={{color:'#000000', fontSize: 17}}>{route.params.item.tel}</Text>
        </View>
        <View style={{alignItems:'center',marginTop:30}}>
            <Text style={{color:'#000000',fontSize:36}}>{route.params.work_data.name}</Text>
        </View>
        <View style={{alignItems:'center',marginTop:10}}>
            <Text style={{color:'#000000',fontSize:36}}>{route.params.work_data.start_time} - {route.params.work_data.end_time}</Text>
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