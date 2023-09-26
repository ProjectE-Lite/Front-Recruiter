
import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import { ScrollView , FlatList} from 'react-native';
import axios from 'axios';

const Home = () => {
  const recruiter_id = '6512976854fd7f1777197d42'
  const navigation = useNavigation();
  const [selectedData, setSelectedData] = useState([]);
  const [dateData, setDateData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/12datenext')
      .then((res) => {
        setDateData(res.data.next12Days);
      })
      .catch(e => {
        console.error('Error', e);
      });
  }, []);

  function newData(chose) {
    axios.get(`http://localhost:8000/recruiters/${recruiter_id}/works`)
      .then((res) => {
        Promise.all(res.data.work_list.map(_id => 
          axios.get(`http://localhost:8000/works/${_id}`)
        ))
        .then(responses => {
          const workData = responses.map(response => response.data);
          const selectedDayData = workData.filter(item => item.work.work_date === chose);
          setSelectedData(selectedDayData); 
        })
        .catch(error => {
          console.error('Error fetching work data:', error);
        });
      })
      .catch(e => {
        console.error('Error', e);
      });
  }

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <FlatList
        data={selectedData}
        contentContainerStyle={{ paddingBottom: 100, justifyContent: 'flex-start'}}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.work._id}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text>No jobs available for this day</Text>
          </View>
        )}
        ListHeaderComponent={
          <>
            <View style={{margin:10, padding:5}}>
              <Text style={{color:'#000000', fontSize:17}}>Day</Text>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {dateData.map(day => (
                  <TouchableOpacity key={day} onPress={() => {newData(day[0])}}>
                    <View style={{flexDirection: 'row', marginHorizontal: 5,}}>
                      <View style={styles.cicleView}>
                        <Text style={styles.textincircle}>{day[1].slice(0, 3)}</Text>
                        <Text style={styles.textincircle}>{day[0].slice(8,10)}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
              ))}
              </ScrollView>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {navigation.navigate('เลือกพนักงาน',{ item })}}>
            <View style={{alignItems:'center',flexDirection: 'row', margin:10, borderBottomWidth:1}}>
              <Image 
                source={require('../../assets/image/TeeNoi.png')} 
                style={{ width: 60, height: 80,}}
                resizeMode='contain'
              />
              <Text style={{margin:10, flexGrow:2}}>ชื่อ : {item.work.name}{'\n'}เวลา : {item.work.start_time} - {item.work.end_time}{'\n'}ตำแหน่ง : {item.work.type_of_work}</Text>
              <Text>{item.work.list_of_candidate.length} / {item.work.number_requirement}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  cicleView : {
    width: 75,
    height: 75,
    borderRadius: 75/2,
    backgroundColor: '#93B5C6',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  textincircle : {
    color: '#ffffff'
  }
}
)

export default Home;