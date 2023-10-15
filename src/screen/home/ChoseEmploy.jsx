import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image} from 'react-native'
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
  const [List_Worker, setList_Worker] = useState([])
  const [key, setKey] = useState("")
  const [state, setState] = useState(0)
  const [usrStatus, setUsrStatus] = useState([])
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
  }, [state])

  useEffect(() => {
    axios.get(`http://${YOURAPI}/works/${work_ID}`)
    .then(res => {
      const listusrId = res.data.list_of_worker
      setUsrStatus(res.data.user_status)
      Promise.all(listusrId.map(usrID => 
        axios.get(`http://${YOURAPI}/users/${usrID}`)
        )
      )
      .then(usrRes =>{
        const usr = usrRes.map(res => res.data)
        setList_Worker(usr)
      })
      }
    )
  }, [state])

  // const () => {} = () =>{
  //   axios.delete(`http://${YOURAPI}/works/${work_ID}`)
  //   .then( response =>{
  //   navigation.navigate('pageHome')
  //   console.log('DELETE request successful');
  // })
  // .catch(error => {
  //   console.error('Error making DELETE request:', error);
  // });
  // };

  const handleImage2Press = () => {
    alert('ไม่รับ');
  };

  const handleImage3Press = (usr) => {
    axios.patch(`http://${YOURAPI}/users/${usr}/accept/${work_ID}`)
    .then(response => {
      alert('รับ');
        console.log('PATCH request สำเร็จ', response.data);
      })
    .catch(error => {
      console.error('เกิดข้อผิดพลาดในการทำ PATCH request', error);
    });
  };  
  const renderItem = ({ item, index }) => (
    <>
      <TouchableOpacity onPress={() => {
        navigation.navigate('รายละเอียดพนักงาน', {item, showBut: "1", work_ID: work_ID})
        }}>
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
          {usrStatus[item._id] && usrStatus[item._id].interview_appointment !== null ?(
            <Text>{`Interview Appointment:${'\n'}วันที่ :${usrStatus[item._id].interview_appointment.slice(0,10)}${'\n'}เวลา : ${usrStatus[item._id].interview_appointment.slice(10,21)}`}</Text>
          ) : (
            <>
            <Text>ยังไม่มีเวลานัดหมาย</Text>
            </>
          )}
          </View>
          <TouchableOpacity onPress={handleImage2Press}>
              <Image
              source={require('../../assets/image/Redx.png')}
              style={styles.imageButton}
              />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleImage3Press (item._id)}>
              <Image
              source={require('../../assets/image/Correct.png')}
              style={styles.imageButton}
              />
          </TouchableOpacity>
          </View>
      </TouchableOpacity>
    </>
  );

  const RenderUsrWork = ({item, index}) => (
    <TouchableOpacity onPress={() => {navigation.navigate('รายละเอียดพนักงาน', {item, showBut: "0"})}}>
        <View style={styles.box}>
          <Image
              source={{uri : item.image}}
              style={styles.boxImage}
          />
          <View style={{flexDirection: 'column', flexGrow: 2, marginLeft: 5, alignItems: 'center'}}>
            <Text style={{ marginBottom: 5, fontSize: 15, flexShrink: 1}}>
              {`${item.first_name} ${item.last_name}`.length > 30 ?
                `${item.first_name} ${item.last_name}`.substring(0, 30) + '...' :
                `${item.first_name} ${item.last_name}`}
            </Text>
          </View>
        </View>
    </TouchableOpacity>
  )

  return (
    <>
       <View style={{alignSelf: 'flex-end'}}>
        <TouchableOpacity   onPress={() => {}}>
          <View >
          <Text style={{fontSize:18,color:'red'}}>ลบงาน</Text>
          </View>
        </TouchableOpacity>
      </View>
    {key == "still_choosing" ? (
      <View style={styles.container}>
        <Text style={{ fontSize: 18 }}>{name} - <Text style={{ color: 'red' }}>{type_of_work}</Text></Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => {setState(0)}}>
            <View style={{marginHorizontal: 5, backgroundColor: '#F99417', height: 40, width: 175, borderRadius: 10, marginTop: 5, alignItems: 'center', justifyContent: 'center'}}>
              <Text>ผู้สมัคร</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {setState(1)}}>
            <View style={{backgroundColor: 'green', height: 40, width: 175, borderRadius: 10, marginTop: 5, alignItems: 'center', justifyContent: 'center'}}>
              <Text>รับเข้าทำงาน</Text>
            </View>
          </TouchableOpacity>
        </View>
        {state == 0 ? (
          <>
            <View style={{backgroundColor: '#F99417', justifyContent: 'center', alignItems: 'center', borderRadius: 20, height: 40, marginTop: 10}}>
              <Text style={{color: 'white'}}>ผู้สมัคร</Text>
            </View>
            <FlatList
            data={userData}
            showsVerticalScrollIndicator= {false}
            renderItem={renderItem}
            style={{marginBottom: 80}}
            ListEmptyComponent={() => (
              <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                <Text>ไม่มีผู้สมัคร</Text>
              </View>
            )}
            
            keyExtractor={(item) => item._id}
            />
            
         </>
        ) : (
          <>
            <View style={{backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', borderRadius: 20, height: 40, marginTop: 10}}>
              <Text style={{color: 'white'}}>รับเข้าทำงาน</Text>
            </View>
            <FlatList
            data={List_Worker}
            style={{marginBottom: 80}}
            showsVerticalScrollIndicator= {false}
            renderItem={RenderUsrWork}
            ListEmptyComponent={() => (
              <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                <Text>ยังไม่ได้รับคนเข้าทำงาน</Text>
              </View>
            )}
            keyExtractor={(item) => item._id}
            />
          </>
        )}
        
    </View>
      ) 
    : (
      <Employ navigation={navigation} userData={userData} work_ID= {work_ID}></Employ>
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