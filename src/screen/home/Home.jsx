
import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import { ScrollView , FlatList} from 'react-native';

const Home = () => {
  const navigation = useNavigation();
  const [selectedData, setSelectedData] = useState([]);
  const next12Days = [
    [ '9', 'Sat' ],
    [ '10', 'Sun' ],
    [ '11', 'Mon' ],
    [ '12', 'Tue' ],
    [ '13', 'Wed' ],
    [ '14', 'Thu' ],
    [ '15', 'Fri' ],
    [ '16', 'Sat' ],
    [ '17', 'Sun' ],
    [ '18', 'Mon' ],
    [ '19', 'Tue' ],
    [ '20', 'Wed' ]
  ]

  function newData(chose){
    const date =  [{
      '9': [{name: 'ตี๋น้อย',
            time: '00:00 - 12:00',
            position: 'ล้างจาน',
            credit: '50'
            },
            {name: 'รัชโยธิน',
            time: '00:00 - 12:00',
            position: 'ล้างจาน',
            credit: '40'
            }]},
      {'10': [{name: 'ตี๋น้อย',
            time: '00:00 - 12:00',
            position: 'ล้างจาน',
            credit: '30'
            }]},
      {'11': [{name: 'ตี๋น้อย',
            time: '00:00 - 12:00',
            position: 'ล้างจาน',
            credit: '40'
            }]},
      ]
    let a;
    for (const element of date) {
      for (const key in element) {
        if (key == chose) {
          a = (element[key]);
        }
      }
    }
    setSelectedData(a);
  }
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View style={{margin:10, padding:5}}>
        <Text style={{color:'#000000', fontSize:17}}>Day</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {next12Days.map(day => (
          <TouchableOpacity key={day} onPress={() => {newData(day[0])}}>
            <View style={{flexDirection: 'row', marginHorizontal: 5,}}>
              <View style={styles.cicleView}>
                <Text style={styles.textincircle}>{day[0]}</Text>
                <Text style={styles.textincircle}>{day[1]}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
        <FlatList
          data={selectedData}
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={{alignItems:'center',flexDirection: 'row', margin:10, borderBottomWidth:1}}>
                <Image 
                  source={require('../../assets/image/TeeNoi.png')} 
                  style={{ width: 60, height: 80,}}
                  resizeMode='contain'
                />
                <Text style={{margin:10, flexGrow:2}}>ชื่อ : {item.name}{'\n'}เวลา : {item.time}{'\n'}ตำแหน่ง : {item.position}</Text>
                <Text>{item.credit} เครดิต/ชั่วโมง</Text>
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