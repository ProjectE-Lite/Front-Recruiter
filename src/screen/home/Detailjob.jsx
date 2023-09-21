import React from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, TextInput } from 'react-native';

export default function Detailjob() {
  return (
    <ScrollView style={{flex: 1, marginHorizontal: 15, marginBottom: 100}} showsVerticalScrollIndicator={false}>
      <View style={{flexDirection : 'row' ,marginHorizontal: 10, marginBottom: 20, marginTop: 20}}>
        <Image
          source={require('../../assets/image/TeeNoi.png')}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style = {{fontSize : 18}}>ตี๋น้อย 168 รัชโยธิน</Text>
          <Text>   8.00 - 13.00</Text>
          <Text style ={{color: 'red' }}>   พนักงานเสิร์ฟ</Text>
          <Text>   50 เครดิต/ชั่วโมง</Text>
        </View>
      </View>
      <Text style={{marginBottom: 10, fontWeight: '500', fontSize: 20}}>รายละเอียดงาน</Text>
      <View style={styles.textContainer2}>
          <TextInput style={{fontSize: 17, color: 'white'}} placeholder='กรอกเป็นข้อ1. 2. 3.' placeholderTextColor={'white'} multiline></TextInput>
      </View>
      <Text style={{marginBottom: 10, fontWeight: '500', fontSize: 20}}>คุณสมบัติผู้สมัคร</Text>
      <View style={styles.textContainer2}>
        <TextInput style={{fontSize: 17, color: 'white'}} placeholder='กรอกเป็นข้อ1. 2. 3.' placeholderTextColor={'white'} multiline></TextInput>
      </View>
      <View style={{ marginTop : 5 , width : 100 , alignSelf : 'center' }}>
        <Button title="ยืนยัน" onPress={() => alert('ยืนยันแล้ว')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  
  image: {
    width: 150,
    height: 150,
    marginRight: 10,
    marginBottom: 10
  },
  textContainer: {
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  textContainer2: {
    backgroundColor: '#343A4B',
    height: 200,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    color: 'black',
    fontSize: 18,
  },
  bottomText: {
    fontSize: 16,
  },
});