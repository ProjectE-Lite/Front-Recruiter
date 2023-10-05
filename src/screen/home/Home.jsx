import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { View, Image, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import { FlatList} from 'react-native';
import axios from 'axios';
import { YOURAPI } from '../../constants/editendpoint';

const Home = () => {
  const recruiter_id = '6517fa561434530638bc81de'
  const navigation = useNavigation();
  const [workData, setWorkData] = useState([]);

  useEffect(() => {
    axios.get(`http://${YOURAPI}/recruiters/${recruiter_id}/works`)
      .then((res) => {
        const dateDict = res.data; 
        const allUserIDs = Object.values(dateDict).flat()
        Promise.all(allUserIDs.map(userID =>
          axios.get(`http://${YOURAPI}/works/${userID}`)
        ))
        .then(userResponses => {
          const workData = userResponses.map(response => response.data);
          setWorkData(workData)
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
      })
      .catch(e => {
        console.error('Error', e);
      });
  }, []);

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
      <FlatList
        data={flatListData}
        contentContainerStyle={{ paddingBottom: 100, justifyContent: 'flex-start'}}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.date}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text>No jobs create a New Job</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <>
            <View style={{backgroundColor: '#EAD7BB', borderRadius: 4}}>
              <Text style={{marginLeft: 20, marginTop: 10, fontSize: 17, color: '#65451F', fontWeight: '700', marginRight: 10}}>{item.date}</Text>
            </View>
            {item.data.map(subItem => (
              <>
                <TouchableOpacity onPress={() => navigation.navigate('เลือกพนักงาน', {item})} style={{ alignItems: 'center', flexDirection: 'row', margin: 5, marginHorizontal: 10}} key={subItem._id}>
                  <Image
                    source={{ uri: subItem.image }}
                    style={{ width: 60, height: 80 }}
                    resizeMode='contain'
                  />
                  <Text style={{ margin: 10, flexGrow: 2 }}>ตำแหน่ง: {subItem.type_of_work}{'\n'}เวลาทำงาน: {subItem.start_time} - {subItem.end_time}</Text>
                  <Text style={{ marginRight: 10}}>{subItem.list_of_candidate.length} / {subItem.number_requirement}</Text>
                </TouchableOpacity>
              </>
            ))}
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;