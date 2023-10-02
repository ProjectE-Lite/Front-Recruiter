import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ChoseEmploy = ({ route }) => { 
  const [candidateData, setCandidateData] = useState([]);
  const navigation = useNavigation()
  const MAX_NAME_LENGTH = 15
  const {list_of_candidate, name, type_of_work} = route.params.item
  const handleImage2Press = () => {
    alert('ไม่รับ');
  };

  const handleImage3Press = () => {
    alert('รับ');
  };

  useEffect(() => {
    const fetchDataForCandidate = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8000/users/${id}`);
        const candidateExists = candidateData.some(candidate => candidate._id === response.data._id);
        if (!candidateExists) {
          setCandidateData(prevData => [...prevData, response.data]);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    list_of_candidate.forEach(id => {
      fetchDataForCandidate(id);
    });
  }, []);
  

    const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => {navigation.navigate('รายละเอียดพนักงาน', {item})}}>
        <View style={styles.box}>
        <Image
            source={{uri : item.image}}
            style={styles.boxImage}
        />
        <View style={{flexDirection: 'column', flexGrow: 2, marginLeft: 5}}>
        <Text style={{ marginBottom: 5, fontSize: 15, flexShrink: 1}}>
          {`${item.first_name} ${item.last_name}`.length > MAX_NAME_LENGTH ?
            `${item.first_name} ${item.last_name}`.substring(0, MAX_NAME_LENGTH) + '...' :
            `${item.first_name} ${item.last_name}`}
        </Text>
        </View>
        <TouchableOpacity onPress={() =>{}} >
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
      <Text style={{ fontSize: 18 }}>{name} - <Text style={{ color: 'red' }}>{type_of_work}</Text></Text>
      <FlatList
        data={candidateData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 15,
    backgroundColor: 'white'
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
    borderRadius: 35,
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

export default ChoseEmploy
