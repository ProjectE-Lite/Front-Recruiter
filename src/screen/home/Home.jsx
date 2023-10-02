import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { View, Image, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import { FlatList} from 'react-native';
import axios from 'axios';

const Home = () => {
  const recruiter_id = '6517fa561434530638bc81de'
  const navigation = useNavigation();
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
  axios.get(`http://localhost:8000/recruiters/${recruiter_id}/works`)
    .then((res) => {
      Promise.all(res.data.work_list.map(_id => 
        axios.get(`http://localhost:8000/works/${_id}`)
      ))
      .then(responses => {
        const workData = responses.map(response => response.data);
        setSelectedData(workData);
      })
      .catch(error => {
        console.error('Error fetching work data:', error);
      });
    })
    .catch(e => {
      console.error('Error', e);
    });
  }, [])

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <FlatList
        data={selectedData}
        contentContainerStyle={{ paddingBottom: 100, justifyContent: 'flex-start'}}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text>No jobs create a New Job</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {navigation.navigate('เลือกพนักงาน',{ item })}}>
            <View style={{backgroundColor: '#EAD7BB', borderRadius: 4}}>
              <Text style={{marginLeft: 20, marginTop: 10, fontSize: 17, color: '#65451F', fontWeight: '700', textAlign: 'center', marginRight: 10}}>{item.work_date}</Text>
            </View>
            <View style={{alignItems:'center',flexDirection: 'row', margin:5}}>
              <Image 
                source={{uri : item.image}} 
                style={{ width: 60, height: 80,}}
                resizeMode='contain'
              />
              <Text style={{margin:10, flexGrow:2}}>ชื่อ : {item.name}{'\n'}เวลา : {item.start_time} - {item.end_time}{'\n'}ตำแหน่ง : {item.type_of_work}</Text>
              <Text>{item.list_of_candidate.length} / {item.number_requirement}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;