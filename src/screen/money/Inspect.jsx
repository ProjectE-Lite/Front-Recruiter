import React,{useState} from 'react';
import{
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,

}from "react-native";
import axios from 'axios';
import { YOURAPI } from '../../constants/editendpoint';

const Inspect =({ navigation , route})=>{
  const userData = route.params.item
  const work_ID = route.params.work_ID
  const work_data = route.params.work_data
  const [defaultRating,setdefaultRating] = useState(0)
  const [maxRating,setmaxRating]=useState([1,2,3,4,5])
  const [comment, setComment] = useState("")

  console.log(defaultRating)

  const work_absent = (usr) => {
    axios.patch(`http://${YOURAPI}/users/${usr}/absent/${work_ID}`)
    .then(response => {
        console.log('PATCH done', response.data);
      })
    .catch(error => {
      console.error('PATCH error', error);
    });
  };  
 
  function renderre(){
        return(
          <View style={{alignItems: 'center'}}>
            <View style={{alignItems:'center'}}>
            <Image source={{uri : userData.image}}
                  style={{height:145, width: 145}}
                  resizeMode='contain'></Image>
            </View>
            <View style={{alignItems:'center'}}>
          <Text style={{fontSize: 20, color:'#000000', fontWeight:'500'}}>{userData.nick_name}</Text>
        </View>
        <View style={{flexDirection:'row', marginTop: 7, marginHorizontal:25, alignSelf: 'flex-start'}}>
          <Text style={{color: '#176B87', fontSize: 17}}>อายุ :  </Text>
          <Text style={{color:'#000000', fontSize: 17}}>{userData.age}</Text>
        </View>
        <View style={{flexDirection:'row', marginTop: 7, marginHorizontal:25, alignSelf: 'flex-start'}}>
          <Text style={{color: '#176B87', fontSize: 17}}>วันเกิด :  </Text>
          <Text style={{color:'#000000', fontSize: 17}}>{userData.birth_date}</Text>
        </View>
        <View style={{flexDirection:'row', marginTop: 7, marginHorizontal:25, alignSelf: 'flex-start'}}>
          <Text style={{color: '#176B87', fontSize: 17}}>เบอร์โทรศัพท์ :  </Text>
          <Text style={{color:'#000000', fontSize: 17}}>{userData.tel}</Text>
        </View>
        <View style={{marginTop:10,flexDirection: 'row'}}>
          {
            maxRating.map((item,key) => {
              return(
                <TouchableOpacity
                activeOpacity={0.7}
                key={item}
                onPress={() => setdefaultRating(item)}
                >
                  <Image
                  style={styles.starImgStyle}
                  source={
                    item<= defaultRating 
                      ? require('../../assets/image/StarOutline.png')
                      : require('../../assets/image/Star.png')
                  }
                  />
                </TouchableOpacity>
              )
            })
          }
          </View>
          <View style={{alignItems:'center',justifyContent:'center',width:360,height:45,borderRadius:10,backgroundColor:'#071952',marginTop:15}}>
            <Text style={{color:'#FFFFFF', fontSize: 20}}>ให้คะแนน</Text>
          </View>
          <View style = {{alignItems: 'center'}}>
            <TextInput 
              style={{borderWidth:1, width: 360,height:145, marginTop: 10, padding: 5}}
              multiline={true}
              textAlignVertical="top" 
              placeholder='กรอกคอมเม้นต์ที่นี่'
              onChangeText={new_comment => setComment(new_comment)}

              />
          </View>
          <View
           style={{
            flexDirection:'row',
        }}>
          <TouchableOpacity onPress={() => {navigation.navigate('pay', { defaultRating: defaultRating , comment: comment, userData: userData, work_data: work_data})}}>  
                <View style={{marginLeft:0,alignItems:'center',justifyContent:'center',width:180,height:55,borderRadius:10,backgroundColor:'#1ED91A',marginTop:10}}>
            <Text style={{color:'#000000', fontSize: 20}}>มาทำงานตามเวลา</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.goBack(work_absent (userData._id))}} >  
                <View style={{marginLeft:10,alignItems:'center',justifyContent:'center',width:170,height:55,borderRadius:10,backgroundColor:'#D00404',marginTop:10}}>
            <Text style={{color:'#000000', fontSize: 20}}>ไม่มาทำงาน</Text>
          </View>
          </TouchableOpacity>
          </View>
          
          </View>
          
        )
    }

    return(
   <SafeAreaView style={styles.contrainer}>
        {renderre()}
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
export default Inspect;