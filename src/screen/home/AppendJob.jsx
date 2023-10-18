import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import React, {useState} from 'react'
import DatePicker from 'react-native-date-picker'
import DropDownsex from '../../components/DropdownSex';
import DropdownWork from '../../components/DropdownWork';


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

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [Data, setData] = useState({
    type_of_work: 'ประเภทงาน',
    number_requirement: 0,
    work_description: {
      detail: "detail",
      qualification: "qulifi"
    },
    gender_requirement: "เพศ",
    minimum_age: 0,
    hourly_income: 0,
    list_of_candidate: [],
    list_of_worker: [],
    end_registeration: 'วันสิ้นสุดรับสมัคร',
    work_date: 'วันที่ทำงาน',
    start_time: 'เวลาเริ่มทำงาน',
    end_time: 'เวลาเลิกงาน',
    user_status: {}
  });
  const handleInputChange = (name, value) => {
    if (name === 'minimum_age'){
      value = parseInt(value);
    }
    if (name === 'number_requirement'){
      value = parseInt(value);
    }
    if (name === 'hourly_income'){
      value = parseInt(value);
    }
    setData({
      ...Data,
      [name]: value
    });
  };

  const handleGenderChange = (value) => {
    setData({
      ...Data,
      gender_requirement: value
    });
  };

  const handleTypeWork = (value) => {
    if (value === 'พนักงานเสิร์ฟ'){
      value = 'type1'
    }
    if (value === 'พนักงานทำความสะอาด'){
      value = 'type2'
    }
    if (value === 'ผู้ช่วยเชฟ'){
      value = 'type3'
    }
    if (value === 'พนักงานต้อนรับ'){
      value = 'type4'
    }
    if (value === 'พนักงานล้างจาน'){
      value = 'type5'
    }
    if (value === 'พนักงานส่งอาหาร'){
      value = 'type6'
    }
    if (value === 'พนักงานครัวร้อน'){
      value = 'type7'
    }
    setData({
      ...Data,
      "type_of_work": value
    });
  };

  const handleDateChange = (date) => {
    setData({
      ...Data,
      work_date : date.slice(0,10),
      end_registeration : date.slice(0,10),
    });
  };


  return (
    <View style={{ backgroundColor: 'white', flex: 1, paddingBottom: 90}}>
      <ScrollView style={styles.container}>
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
          maximumDate={new Date('2024-12-31')}
          minimumDate={tomorrow}
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
            const mydate = date.toDateString()
            setDoblabel(mydate);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const test = `${year}-${month}-${day}`
            handleDateChange(test);
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
          locale='en_GB'
          onConfirm={(date) => {
            setOpentime(false);
            setTime(date);
            const mydate1 = date.toLocaleTimeString('en-GB',{ hour12: false, hour: '2-digit', minute: '2-digit' })
            setSttime(mydate1);
            if  ((mydate1>sctime)||(mydate1 == sctime)){
              alert('กรุณาเลือกเวลาใหม่');
            }
            handleInputChange('start_time', mydate1)
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
          locale={'en_GB'}
          minuteInterval={30}
          onConfirm={(date) => {
            setOpensctime(false);
            setTimesc(date);
            const mydate2 = date.toLocaleTimeString('en-GB', {hour12: false, hour: '2-digit', minute: '2-digit' })
            setSctime(mydate2);
            if ((sttime > mydate2) || (mydate2 >= '23:30')|| (sttime == mydate2)){
              alert('กรุณาเลือกเวลาใหม่');
            }
            handleInputChange('end_time', mydate2)
          }}
          onCancel={() => {
            setOpensctime(false);
          }}
        />
        <View style={{flexDirection:'row', alignItems: 'center', marginTop: 20}}>
          <View style={{width: '50%'}}>
            <Text style={{fontWeight: '600', fontSize: 19, marginRight: 15}}>Sex</Text>
            <DropDownsex
              onValueChange={handleGenderChange}
              value={Data.gender_requirement}></DropDownsex>
          </View>
          <View style={{width: '50%'}}>
            <Text style={{fontWeight: '600', fontSize: 19, marginRight: 15}}>Age อายุขั้นต่ำ</Text>
            <TextInput 
            placeholder='อายุ' 
            style={styles.dropdown} 
            keyboardType='number-pad' 
            onChangeText={text => handleInputChange('minimum_age', text)}
            ></TextInput>
          </View>
        </View>
        <Text style={{fontWeight: '600', fontSize: 19, marginRight: 15}}>ประเภทงาน</Text>
        <DropdownWork
            onValueChange={handleTypeWork}
            value={Data.gender_requirement}></DropdownWork>
        <View style= {{flexDirection: 'row', marginVertical: 15, alignItems: 'center'}}>
          <Image source={require('../../assets/image/filladd.png')} style={styles.boxIcon}></Image>
          <Text style={{fontWeight: '600', fontSize: 19, marginRight: 15}}>จำนวนคน : </Text>
          <TextInput 
          placeholder='ตัวเลข' 
          style={styles.dropdown} 
          keyboardType='number-pad'
          onChangeText={text => handleInputChange('number_requirement', text)}
          ></TextInput>
        </View>
        <View style= {{flexDirection: 'row', marginVertical: 15, alignItems: 'center'}}>
          <Image source={require('../../assets/image/FooterIcon/Dollar.png')} style={styles.boxIcon}></Image>
          <Text style={{fontWeight: '600', fontSize: 19, marginRight: 15}}>เครดิต/ชั่วโมง : </Text>
          <TextInput 
          placeholder='บาท' 
          style={styles.dropdown} 
          keyboardType='number-pad'
          onChangeText={text => handleInputChange('hourly_income', text)}
          ></TextInput>
        </View>
        <View style={{alignItems:'center', marginTop: 5}}>
          <TouchableOpacity onPress={() => {navigation.navigate('เพิ่มรายละเอียด', Data)}}>
            <View style={styles.dropdown2}>
              <Text style={{color: 'white'}}>Next</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};


export default AppendJob

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
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