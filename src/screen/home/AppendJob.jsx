import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, {useState} from 'react'
import DatePicker from 'react-native-date-picker'
import DropDownsex from '../../components/DropdownSex';


const AppendJob = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [doblabel, setDoblabel] = useState('คลิกเพื่อเลือก');

  const [sttime, setSttime] = useState('คลิกเพื่อเลือก');
  const [time, setTime] = useState(new Date());
  const [opentime, setOpentime] = useState(false);

  const [sctime, setSctime] = useState('คลิกเพื่อเลือก');
  const [timesc, setTimesc] = useState(new Date());
  const [opensctime, setOpensctime] = useState(false);

  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 15, alignItems: 'center', flexDirection: 'row' }}>
        <Text style={{fontWeight: '600', fontSize: 19, marginRight: 15}}>วันเริ่มทำงาน​ : </Text>
        <Image source={require('../../assets/image/Calender.png')} style={styles.boxIcon} />
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Text style={{ fontSize: 15 }}>{doblabel}</Text>
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        open={open}
        date={date}
        mode='date'
        maximumDate={new Date('2023-12-31')}
        minimumDate={new Date('1873-12-31')}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
          setDoblabel(date.toDateString());
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <View style={{ marginVertical: 15, alignItems: 'center', flexDirection: 'row' }}>
        <Text style={{fontWeight: '600', fontSize: 19, marginRight: 15}}>เวลาเริ่มทำงาน​ : </Text>
        <Image source={require('../../assets/image/ClockIcon.png')} style={styles.boxIcon} />
        <TouchableOpacity onPress={() => setOpentime(true)}>
          <Text style={{ fontSize: 15 }}>{sttime}</Text>
        </TouchableOpacity>
      </View>

      <DatePicker
        modal
        open={opentime}
        date={time}
        mode='time'
        minuteInterval={30}
        onConfirm={(date) => {
          setOpentime(false);
          setTime(date);
          setSttime(date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
        }}
        onCancel={() => {
          setOpentime(false);
        }}
      />
      <View style={{ marginVertical: 15, alignItems: 'center', flexDirection: 'row' }}>
        <Text style={{fontWeight: '600', fontSize: 19, marginRight: 15}}>เวลาเลิกงาน​ : </Text>
        <Image source={require('../../assets/image/ClockIcon.png')} style={styles.boxIcon} />
        <TouchableOpacity onPress={() => setOpensctime(true)}>
          <Text style={{ fontSize: 15 }}>{sctime}</Text>
        </TouchableOpacity>
      </View>

      <DatePicker
        modal
        open={opensctime}
        date={timesc}
        mode='time'
        minuteInterval={30}
        onConfirm={(date) => {
          setOpensctime(false);
          setTimesc(date);
          setSctime(date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
        }}
        onCancel={() => {
          setOpensctime(false);
        }}
      />
      <View style={{flexDirection:'row', alignItems: 'center', marginTop: 20}}>
        <View style={{width: '50%'}}>
          <Text style={{fontWeight: '600', fontSize: 19, marginRight: 15}}>Sex</Text>
          <DropDownsex></DropDownsex>
        </View>
        <View style={{width: '50%'}}>
          <Text style={{fontWeight: '600', fontSize: 19, marginRight: 15}}>Age</Text>
          <TextInput placeholder='อายุ' style={styles.dropdown} keyboardType='number-pad'></TextInput>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginVertical: 15, alignItems: 'center', borderWidth: 1, borderColor: 'white', borderRadius: 30, padding: 8, shadowColor: '#000', shadowOffset: {
        width: 0,
        height: 1,
      }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 2,}}>
        <Image source={require('../../assets/image/bagfillIcon.png')} style={styles.boxIcon}></Image>
        <TextInput placeholder='ตำแหน่งงาน' autoCorrect={false} style={{fontSize: 19}}></TextInput>
      </View>
      <View style= {{flexDirection: 'row', marginVertical: 15, alignItems: 'center'}}>
        <Image source={require('../../assets/image/filladd.png')} style={styles.boxIcon}></Image>
        <Text style={{fontWeight: '600', fontSize: 19, marginRight: 15}}>จำนวนคน : </Text>
        <TextInput placeholder='ตัวเลข' style={styles.dropdown} keyboardType='number-pad'></TextInput>
      </View>
      <View style={{alignItems:'center', marginTop: 40}}>
        <TouchableOpacity onPress={() => {navigation.navigate('เพิ่มรายละเอียด')}}>
          <View style={styles.dropdown2}>
            <Text style={{color: 'white'}}>Next</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
};


export default AppendJob

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical : 20,
    paddingHorizontal: 15,
    backgroundColor: 'white'
    },
    boxIcon: {
      width: 40,
      height: 40,
      marginRight: 12,
      marginBottom: 3,
      resizeMode: 'contain',
    },
    dropdown: {
      margin: 10,
      height: 40,
      width: 75,
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
      },
    dropdown2: {
      margin: 10,
      height: 40,
      width: 75,
      alignItems: 'center',
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
      elevation: 2,
      },
  }
)