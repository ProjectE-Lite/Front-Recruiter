import React from 'react';
import{
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,

}from "react-native";


const ListData = ({
    nickname: 'มอส',
    point: '1.0',
    age: '21',
    date: '19 ตุลาคม 2545',
    tel: '0123456789',
})
const workdata = ({
    name: 'ตี๋น้อย 168 รัชโยธิน',
    strat_time: '8.00',
    end_time: '13.00',
})
const _point = 1;
const Pay =({navigation})=>{
    function renderpay(){
    return(
            <View style={{alignItems: 'center', marginTop: 20}}>
            <View style={{alignItems:'center'}}>
            <Image source={require('../../assets/image/ProfileIcon.png')}
                  style={{height:145, width: 145}}
                  resizeMode='contain'></Image>
            </View>
            <View style={{alignItems:'center'}}>
          <Text style={{fontSize: 20, color:'#000000', fontWeight:'500'}}>{ListData.nickname}</Text>
          <View style={{ alignItems:'center',flexDirection: 'row',}}>
            <Image source={_point >= 1 ? require('../../assets/image/StarOutline.png') : require('../../assets/image/Star.png')} style={{height:20, width:20,marginLeft:5}}></Image>
            <Image source={_point >= 2 ? require('../../assets/image/StarOutline.png') : require('../../assets/image/Star.png')} style={{height:20, width:20,marginLeft:5}}></Image>
            <Image source={_point >= 3 ? require('../../assets/image/StarOutline.png') : require('../../assets/image/Star.png')} style={{height:20, width:20,marginLeft:5}}></Image>
            <Image source={_point >= 4 ? require('../../assets/image/StarOutline.png') : require('../../assets/image/Star.png')} style={{height:20, width:20,marginLeft:5}}></Image>
            <Image source={_point >= 5 ? require('../../assets/image/StarOutline.png') : require('../../assets/image/Star.png')} style={{height:20, width:20,marginLeft:5}}></Image>
            <Text style={{marginLeft:20, fontSize: 20, color:'#000000', fontWeight:'400'}}>คะแนน {_point}</Text>
          </View>
        </View>
        <View style={{flexDirection:'row', marginTop: 7, marginHorizontal:25,alignSelf: 'flex-start'}}>
          <Text style={{color: '#1121B1', fontSize: 17}}>อายุ :  </Text>
          <Text style={{color:'#000000', fontSize: 17}}>{ListData.age}</Text>
        </View>
        <View style={{flexDirection:'row', marginTop: 7, marginHorizontal:25,alignSelf: 'flex-start'}}>
          <Text style={{color: '#1121B1', fontSize: 17}}>วันเกิด :  </Text>
          <Text style={{color:'#000000', fontSize: 17}}>{ListData.date}</Text>
        </View>
        <View style={{flexDirection:'row', marginTop: 7, marginHorizontal:25,alignSelf: 'flex-start'}}>
          <Text style={{color: '#1121B1', fontSize: 17}}>เบอร์โทรศัพท์ :  </Text>
          <Text style={{color:'#000000', fontSize: 17}}>{ListData.tel}</Text>
        </View>
        <View style={{alignItems:'center',marginTop:30}}>
            <Text style={{color:'#000000',fontSize:36}}>{workdata.name}</Text>
        </View>
        <View style={{alignItems:'center',marginTop:10}}>
            <Text style={{color:'#000000',fontSize:36}}>{workdata.strat_time} - {workdata.end_time}</Text>
        </View>
          <TouchableOpacity onPress={()=> navigation.navigate('Employ')}>  
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