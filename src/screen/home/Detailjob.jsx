import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, TextInput ,TouchableOpacity, Modal} from 'react-native';
import { YOURAPI } from '../../constants/editendpoint';
import axios from 'axios';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Authcontext } from '../../context/Authcontext';

export default function Detailjob({route}) {
  const navigation = useNavigation()
  const initialFormData= route.params
  const [Data, setData] = useState(initialFormData)
  const {userInfo} = useContext(Authcontext)
  const [recdata, setRecdata] = useState([])
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`http://${YOURAPI}/recruiters/${userInfo.recruiter_id}`);
          setRecdata(res.data);
        } catch (error) {
          console.error('Error fetching recruiter data:', error);
        }
      };
      fetchData();
    }, [userInfo.recruiter_id])
  );

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
    axios.post(`http://${YOURAPI}/recruiters/${userInfo.recruiter_id}/works`, Data)
      .then(response => {
        console.log('Success:', response.data);
        navigation.navigate('pageHome')
      })
      .catch(error => {
        console.error('Error:', error);
        alert('จำนวนเงินของท่านไม่เพียงพอ')
      });
  };

  const isDataValid = (data) => {
    return data.work_description.detail !== "detail" &&  data.work_description.detail !== ""
    && data.work_description.qualification !== "qulifi" && data.work_description.qualification !== ""}
  
    const handleNexttButtonPress = () => {
      if (isDataValid(Data)) {
        handlePostData();
      } else {
       alert('ยังกรอกข้อมูลไม่ครบ');
      }
    };

  return (
    <ScrollView style={{flex: 1, marginHorizontal: 15, marginBottom: 100}} showsVerticalScrollIndicator={false}>
      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>ยืนยันการสร้างงานหรือไม่?</Text>
            <View style={{flexDirection: 'row'}}>
            <View style={{margin: 15}}>
          <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress ={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>ยกเลิก</Text>
            </TouchableOpacity>
            </View>
            <View style={{margin: 15}}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {handleNexttButtonPress()}}>
              <Text style={styles.textStyle}>ยืนยัน</Text>
            </TouchableOpacity>
            </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
      <View style={{flexDirection : 'row' ,marginHorizontal: 10, marginBottom: 20, marginTop: 20}}>
        <Image
          source={{uri : recdata.image}}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style = {{fontSize : 18}}>{recdata.name}</Text>
          <Text>{Data.start_time} - {Data.end_time}</Text>
          <Text style={{ color: 'red'}}>{(() => {
              switch(Data.type_of_work) {
                case 'type1':
                  return 'พนักงานเสิร์ฟ';
                case 'type2':
                  return 'พนักงานทำความสะอาด';
                case 'type3':
                  return 'ผู้ช่วยเชฟ';
                case 'type4':
                  return 'พนักงานต้อนรับ';
                case 'type5':
                  return 'พนักงานล้างจาน';
                case 'type6':
                  return 'พนักงานส่งอาหาร';
                case 'type7':
                  return 'พนักงานครัวร้อน';
                default:
                  return Data.type_of_work;
              }
            })()}
            </Text>
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
      <View style={{alignItems:'center'}}>
      <TouchableOpacity onPress ={() => setModalVisible(true)}>
      <View style={{margin: 10,alignItems: 'center', justifyContent: 'center',
      height: 40,
      width: 75,
      backgroundColor: '#26577C',
      borderRadius: 12,
      padding: 12,
      shadowColor: '#071952',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,}}>
          <Text style = {{textAlign: 'center', color: 'white', justifyContent: 'center'}}>
            ยืนยัน
          </Text>
      </View>
      </TouchableOpacity>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});