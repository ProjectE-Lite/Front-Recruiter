import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

export default function ChoseEmploy({ route }) {
  const handleImage1Press = () => {
    alert('นัดหมาย');
  };

  const handleImage2Press = () => {
    alert('ไม่รับ');
  };

  const handleImage3Press = () => {
    alert('รับ');
  };

  const { usr_id } = route.params.item;
  const selectname = []

  const listName =  {
    1: "WIttawat Phongphrit",
    2: "Emmi What",
    3: "Watson Scot",
    4: "Dawin Nude",
    5: "Iphone 15",
    6: "Lemma Thory",
    7: "Facke Datae",
    8: "Communit Luizs",
    9: "CrisTal Cear",
    10: "Ohm Coco",
    11: "NafinDo Coq Musta te",
    12: "lona Dao",
    13: "Uhn Mo Jo",
    14: "LodriGruz Mustagao",
    15: "Super Unoin",
    }

    for (const element of usr_id) {
        if (listName.hasOwnProperty(element)) {
            selectname.push(listName[element])
        }
      }

  const renderItem = ({ item }) => (
    <TouchableOpacity>
        <View style={styles.box}>
        <Image
            source={require('../../assets/image/ProfileIcon.png')}
            style={styles.boxImage}
        />
        <Text style={{ fontSize: 15 , flexGrow: 2, flexShrink: 1}} numberOfLines={1} ellipsizeMode='tail'>{item}</Text>
        <TouchableOpacity onPress={handleImage1Press}>
            <Image
            source={require('../../assets/image/Ayellow.png')}
            style={styles.imageButton}
            />
        </TouchableOpacity>
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
