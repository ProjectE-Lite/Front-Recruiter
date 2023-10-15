import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, TextInput } from 'react-native';
import { YOURAPI } from '../../constants/editendpoint';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function Detailjob({route}) {
  const navigation = useNavigation()
  const initialFormData= route.params
  const [Data, setData] = useState(initialFormData)
  const recruiter_id = "6517fa561434530638bc81de"
  const [recdata, setRecdata] = useState([])

  useEffect(() => {
    axios.get(`http://${YOURAPI}/recruiters/${recruiter_id}`)
    .then(res =>{
      setRecdata(res.data)
    })
  }, [])
  const updateDescription = (field, value) => {
    setData(prevState => ({
      ...prevState,
      work_description: {
        ...prevState.work_description,
        [field]: value.replace(/\n/g, '\\n')
      }
    }));
  };

  const handlePostData = () => {
    axios.post(`http://${YOURAPI}/recruiters/${recruiter_id}/works`, Data)
      .then(response => {
        console.log('Success:', response.data);
        navigation.navigate('pageHome')
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <ScrollView style={{flex: 1, marginHorizontal: 15, marginBottom: 100}} showsVerticalScrollIndicator={false}>
      <View style={{flexDirection : 'row' ,marginHorizontal: 10, marginBottom: 20, marginTop: 20}}>
        <Image
          source={{uri : recdata.image}}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style = {{fontSize : 18}}>{recdata.name}</Text>
          <Text>{Data.start_time} - {Data.end_time}</Text>
          <Text style ={{color: 'red' }}>{Data.type_of_work}</Text>
          <Text>{Data.hourly_income} เครดิต/ชั่วโมง</Text>
        </View>
      </View>
      <Text style={{marginBottom: 10, fontWeight: '500', fontSize: 20}}>สถานที่</Text>
      <View style={styles.textContainer3}>
        <Text style={{fontSize: 17, color: 'white'}}>{recdata.address}</Text>
      </View>
      <Text style={{marginBottom: 10, fontWeight: '500', fontSize: 20}}>รายละเอียดงาน</Text>
      <View style={styles.textContainer2}>
          <TextInput 
          style={{fontSize: 17, color: 'white'}} 
          placeholder='กรอกข้อมูลที่นี่' 
          placeholderTextColor={'white'} 
          multiline = {true}
          onChangeText={text => updateDescription('detail', text)}
          ></TextInput>
      </View>
      <Text style={{marginBottom: 10, fontWeight: '500', fontSize: 20}}>คุณสมบัติผู้สมัคร</Text>
      <View style={styles.textContainer2}>
        <TextInput 
        style={{fontSize: 17, color: 'white'}} 
        placeholder='กรอกข้อมูลที่นี่' 
        placeholderTextColor={'white'} 
        multiline = {true}
        onChangeText={text => updateDescription('qualification', text)}
        ></TextInput>
      </View>
      <View style={{ marginTop : 5 , width : 100 , alignSelf : 'center' }}>
        <Button title="ยืนยัน" onPress={handlePostData} />
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
  textContainer3: {
    backgroundColor: '#343A4B',
    height: 100,
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