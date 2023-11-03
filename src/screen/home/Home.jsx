import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { View, Image, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {SectionList} from 'react-native';
import axios from 'axios';
import { YOURAPI } from '../../constants/editendpoint';


const Home = () => {
  const recruiter_id = '6517fa561434530638bc81de'
  const navigation = useNavigation();
  const [workData, setWorkData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`http://${YOURAPI}/recruiters/${recruiter_id}/works`);
          const dateDict = res.data; 
          const allUserIDs = Object.values(dateDict).flat();
          const userResponses = await Promise.all(
            allUserIDs.map(userID =>
              axios.get(`http://${YOURAPI}/works/${userID}`)
            )
          );
          const workData = userResponses.map(response => response.data);
          setWorkData(workData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchData();
      const interval = setInterval(() => {
        fetchData(); 
      }, 11000);
      return () => clearInterval(interval);
    }, [recruiter_id])
  );


  const groupedData = {};

  workData.forEach(item => {
    const workDate = item.work_date;

    if (!groupedData[workDate]) {
      groupedData[workDate] = [];
    }
    groupedData[workDate].push(item);
  });

  const flatListData = Object.entries(groupedData).map(([date, data]) => ({
    date,
    data,
  }));


  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <SectionList
      sections={flatListData}
      style={{marginBottom: 40}}
      keyExtractor={(item, index) => item+index}
      ListEmptyComponent={
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text>Add Work</Text>
        </View>
      }
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('เลือกพนักงาน', {item})} style={{ alignItems: 'center', flexDirection: 'row', margin: 5, marginHorizontal: 10}} >
          <Image
            source={{ uri: item.image }}
            style={{ width: 60, height: 80 }}
            resizeMode='contain'
            />
          <Text style={{ margin: 10, flexGrow: 2 }}>
            งาน : {(() => {
              switch(item.type_of_work) {
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
                  return item.type_of_work;
              }
            })()}{'\n'}
          เวลาทำงาน : {item.start_time} - {item.end_time}{'\n'}
          จำนวนรับสมัคร : {item.total_worker}
        </Text>
          <View style={{backgroundColor: '#194569', width: 52, borderRadius: 10, padding:1, alignItems: 'center'}}>
            <Text style={{color: 'white'}}>รับ</Text>
            <Text style={{color: 'white'}}>{item.list_of_worker.length}</Text>
          </View>
          <View style={{backgroundColor: '#A3b5c0', width: 52, marginLeft: 10, marginRight: 5, borderRadius: 10, padding: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style = {{color: 'black'}}>ผู้สมัคร</Text>
            <Text style={{color: 'black'}}>{item.list_of_candidate.length}</Text>
          </View>
        </TouchableOpacity>
      )}
      renderSectionHeader={({section: {date}}) => (
        <View style={{backgroundColor: '#DBECF4', borderRadius: 4}}>
          <Text style={{marginLeft: 20, margin: 5, fontSize: 17, color: 'black', fontWeight: '700', marginRight: 10}}>{date}</Text>
        </View>
      )}>
      </SectionList>
    </SafeAreaView>

)}
export default Home;