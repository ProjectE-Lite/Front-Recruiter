import { View, Text , StyleSheet, SafeAreaView, Image,TouchableOpacity} from 'react-native'
import React from 'react'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Review = ({route}) => {
  console.log(route.params.item)
  const _point = route.params.item.score;
  const {recruiter_image} = route.params.item
  console.log(_point)
  const comment = route.params.item.text
  console.log(comment)
  const navigation = useNavigation()
  const name = route.params.item.recruiter_name

  return (
    <SafeAreaView style={{flex:1,}}>
      <View style={styles.colorBox}>
          <Text style = {{color: 'black' ,fontSize: 24, marginTop: 38, marginLeft: 40}}>รีวิว</Text>
      </View>
      <View style={{alignItems:'center',flexDirection: 'row', marginHorizontal:10, borderBottomWidth:1, marginTop:10  }}>
      <Image 
          source={{uri : recruiter_image}} 
          style={{ width: 60, height: 80,}}
          resizeMode='contain'
      />
      <Text style={{margin:10, flexGrow:2, fontSize:16, color: 'black'}}>{name}{'\n'}<View style={{ alignItems:'center',flexDirection: 'row'}}>
          <Image source={_point >= 1 ? require('../../assets/image/StarOutline.png') : require('../../assets/image/Star.png')} style={{height:16, width:16}}></Image>
          <Image source={_point >= 2 ? require('../../assets/image/StarOutline.png') : require('../../assets/image/Star.png')} style={{height:16, width:16}}></Image>
          <Image source={_point >= 3 ? require('../../assets/image/StarOutline.png') : require('../../assets/image/Star.png')} style={{height:16, width:16}}></Image>
          <Image source={_point >= 4 ? require('../../assets/image/StarOutline.png') : require('../../assets/image/Star.png')} style={{height:16, width:16}}></Image>
          <Image source={_point >= 5 ? require('../../assets/image/StarOutline.png') : require('../../assets/image/Star.png')} style={{height:16, width:16}}></Image>
          </View></Text>
          <Text style = {{fontSize:14 , color:'#FD0000', marginRight: 10}}>พนักงานเสิร์ฟ</Text>
    </View>
    <View style={styles.colorBox1}>
          <Text style = {{color: 'black' ,fontSize: 20, marginTop:30 , marginLeft:20, justifyContent:'center', alignItems: 'center'}}>{comment}</Text>
    </View>
    <TouchableOpacity onPress={() => {navigation.goBack()}}>
    <View style={styles.colorBox2}>
      <Text style = {{color: 'black' ,fontSize: 20, alignSelf:'center', color:'white'}}>เสร็จสิ้น</Text>
    </View>
    </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    colorBox: {
      width: 430, // กว้าง 100 พิกเซล
      height: 100, // สูง 100 พิกเซล
      backgroundColor: '#B1DAFF', // สีพื้นหลังเป็นสีน้ำเงิน
    },
    colorBox1: {
      width: 320, // กว้าง 100 พิกเซล
      height: 320, // สูง 100 พิกเซล
      backgroundColor: '#D9D9D9', // สีพื้นหลังเป็นสีน้ำเงิน
      marginTop: 30,
      alignSelf : 'center',
      borderRadius : 10,
    },
    colorBox2: {
      width: 94, // กว้าง 100 พิกเซล
      height: 44, // สูง 100 พิกเซล
      backgroundColor: '#1121b1', // สีพื้นหลังเป็นสีน้ำเงิน
      marginTop: 30,
      justifyContent:'center',
      alignSelf : 'center',
      borderRadius: 20,
    },
});

export default Review