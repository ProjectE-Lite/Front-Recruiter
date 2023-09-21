import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import DatePicker from 'react-native-date-picker'

export default function ChoseEmploy({ route }) {
  const { usr_id } = route.params.item;
  const navigation = useNavigation();
  const [dates, setDates] = useState(Array(usr_id.length).fill(new Date()));
  const [opens, setOpens] = useState(Array(usr_id.length).fill(false));
  const MAX_NAME_LENGTH = 15;

  const handleImage2Press = () => {
    alert('ไม่รับ');
  };

  const handleImage3Press = () => {
    alert('รับ');
  };

  const listName =  {
    1: {name : "WIttawat Phongphrit", doblink: 'เวลานัดหมาย'},
    2: {name : "Emmi What", doblink: 'เวลานัดหมาย'},
    3: {name : "Watson Scot", doblink: 'เวลานัดหมาย'},
    4: {name : "Dawin Nude", doblink: 'เวลานัดหมาย'},
    5: {name : "Iphone 15", doblink: 'เวลานัดหมาย'},
    6: {name : "Lemma Thory", doblink: 'เวลานัดหมาย'},
    7: {name : "Facke Datae", doblink: 'เวลานัดหมาย'},
    8: {name : "Communit Luizs", doblink: 'เวลานัดหมาย'},
    9: {name : "CrisTal Cear", doblink: 'เวลานัดหมาย'},
    10: {name : "Ohm Coco", doblink: 'เวลานัดหมาย'},
    11: {name : "NafinDo Coq Musta te", doblink: 'เวลานัดหมาย'},
    12: {name : "lona Dao", doblink: 'เวลานัดหมาย'},
    13: {name : "Uhn Mo Jo", doblink: 'เวลานัดหมาย'},
    14: {name : "LodriGruz Mustagao", doblink: 'เวลานัดหมาย'},
    15: {name : "Super Unoin", doblink: 'เวลานัดหมาย'},
    }
  const [doblabels, setDoblabels] = useState(usr_id.map(id => listName[id].doblink));
  const selectname = usr_id.map(element => listName[element]);
  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => {navigation.navigate('รายละเอียดพนักงาน')}}>
        <View style={styles.box}>
        <Image
            source={require('../../assets/image/ProfileIcon.png')}
            style={styles.boxImage}
        />
        <View style={{flexDirection: 'column', flexGrow: 2, marginLeft: 5}}>
          <Text style={{ marginBottom: 5,fontSize: 15, flexShrink: 1}} numberOfLines={1}>
            {item.name.length > MAX_NAME_LENGTH? item.name.substring(0, MAX_NAME_LENGTH) + '...' : item.name}
          </Text>
          <Text>{doblabels[index]}</Text>
        </View>
        <TouchableOpacity onPress={() => setOpens(prev => prev.map((val, i) => i === index ? true : val))} >
            <Image
            source={require('../../assets/image/Ayellow.png')}
            style={styles.imageButton}
            />
        </TouchableOpacity>
        <DatePicker
          modal
          open={opens[index]}
          date={dates[index]}
          mode='date'
          maximumDate={new Date('2023-12-31')}
          minimumDate={new Date('1873-12-31')}
          onConfirm={(date) => {
            setOpens(prev => prev.map((val, i) => i === index ? false : val));
            setDates(prev => prev.map((val, i) => i === index ? date : val));
            setDoblabels(prev => prev.map((val, i) => i === index ? `${date.toDateString()}` : val));
          }}
          onCancel={() => {
            setOpens(prev => prev.map((val, i) => i === index ? false : val));
          }}
        />
        <TouchableOpacity onPress={handleImage2Press}>
            <Image
            source={require('../../assets/image/Redx.png')}
            style={styles.imageButton}
            />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleImage3Press}>
            <Image
            source={require('../../assets/image/Correct.png')}
            style={styles.imageButton}
            />
        </TouchableOpacity>
        </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18 }}>ตี๋น้อย 111 พหลโยธิน - <Text style={{ color: 'red' }}>พนักงานเสิร์ฟ</Text></Text>
      <FlatList
        data={selectname}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  box: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    borderRadius: 10,
    margin: 5,
    height: 100,
    alignItems: 'center',
    padding: 5,
  },
  boxImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  imageButton: {
    width: 40,
    height: 40,
    marginHorizontal: 2,
    borderRadius: 10
  },
});
