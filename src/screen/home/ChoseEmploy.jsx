import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Employ from '../money/Employ'
import { useNavigation } from '@react-navigation/native'
import { YOURAPI } from '../../constants/editendpoint'

const ChoseEmploy = ({route}) => {
  const work_ID = route.params.item._id
  const {name, type_of_work} = route.params.item
  const navigation = useNavigation()
  const [userData, setUserData] = useState([]);
  const [key, setKey] = useState("")
  const MAX_NAME_LENGTH = 15
  
  useEffect(() => {
    axios(`http://${YOURAPI}/works/${work_ID}/status`)
    .then(res => {
      const dictStatus = res.data
      setKey(Object.keys(dictStatus)[0])
      const allUserIDs = Object.values(dictStatus).flat()
      Promise.all(allUserIDs.map(userID =>
        axios.get(`http://${YOURAPI}/users/${userID}`)
      ))
      .then(userResponses => {
        const userData = userResponses.map(response => response.data);
        setUserData(userData)
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    })
  }, [])

  const handleImage2Press = () => {
    alert('ไม่รับ');
  };

  const handleImage3Press = () => {
    alert('รับ');
  };

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
    <>
    {key == "still_choosing" ? (
      <View style={styles.container}>
        <Text style={{ fontSize: 18 }}>{name} - <Text style={{ color: 'red' }}>{type_of_work}</Text></Text>
        <FlatList
          data={userData}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
    </View>
      ) 
    : (
      <Employ navigation={navigation} userData={userData}></Employ>
      )}
    </>
  )
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