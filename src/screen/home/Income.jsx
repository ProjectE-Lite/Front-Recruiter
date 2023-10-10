import React,{useState, useEffect}  from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import { FlatList} from 'react-native';
import axios from "axios";
import { YOURAPI } from '../../constants/editendpoint';
import { useFocusEffect } from '@react-navigation/native';

const Income = ({ navigation }) => {
  const recruiter_id = '6517fa561434530638bc81de';
  const [data, setData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://${YOURAPI}/recruiters/${recruiter_id}`);
          setData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchData();
    }, [])
  );

  const dataDeatail = ([
    {date: '6 ม.ค. 66',
     time: '16.00',
     credit: '+50.00'
    },
    {date: '5 ม.ค. 66',
    time: '16.00',
    credit: '+50.00'
    },
    {date: '4 ม.ค. 66',
    time: '16.00',
    credit: '+50.00'
    },
    {date: '3 ม.ค. 66',
    time: '16.00',
    credit: '+50.00'
    },
    {date: '2 ม.ค. 66',
    time: '16.00',
    credit: '+50.00'
    },
    {date: '6 ม.ค. 66',
    time: '16.00',
    credit: '+50.00'
    },
    {date: '1 ม.ค. 66',
    time: '16.00',
    credit: '+50.00'
    },
    {date: '31 ธ.ค. 66',
    time: '16.00',
    credit: '+50.00'
    },
    {date: '30 ธ.ค. 66',
    time: '16.00',
    credit: '+50.00'
    }
]);
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex:1}}>
      <View style={{padding:10}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View style={styles.circle}>
            <Text style={styles.text}>ยอดเงินคงเหลือ</Text>
            <Text style={styles.textnum}>{data.credit}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => {navigation.navigate('topup')}} style={{marginHorizontal:13}}>
        <View style = {styles.butt}>
          <Text style = {styles.textbutton}>Top up</Text>
        </View>
      </TouchableOpacity>
      <Text style={{marginTop:10, marginLeft:10, marginBottom:10, color:'black',fontSize: 20}}>รายการล่าสุด</Text>
      <FlatList
        data={dataDeatail}
        contentContainerStyle={{ paddingBottom: 60}}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{flexDirection: 'row',marginBottom:10, backgroundColor: '#bdbdbd', alignItems:'center'}}>
            <Text style={{flexGrow:2, fontSize:20, marginLeft: 5, marginTop: 15}}>{item.date}{'\n'}{item.time}{'\n'}</Text>
            <Text style = {{fontSize:25,color:'blue', marginRight: 5}}>{item.credit}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 200, // กำหนดความกว้างของวงกลม
    height: 200, // กำหนดความสูงของวงกลม
    borderRadius: 100, // ค่าความโค้งของขอบวงกลมเท่ากับครึ่งหนึ่งของความกว้างหรือความสูง
    backgroundColor: '#fafafa', // สีพื้นหลังของวงกลม
    borderWidth: 4,
    borderColor: '#1a237e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black', // สีข้อความ
    fontSize: 12, // ขนาดตัวอักษร
    textAlign: 'center', // จัดตำแหน่งข้อความกลาง
  },
  textnum: {
    color: 'black', // สีข้อความ
    fontSize: 35, // ขนาดตัวอักษร
    textAlign: 'center', // จัดตำแหน่งข้อความกลาง
  },
  butt: {
    width: 90, // กำหนดความกว้างของวงกลม
    height: 45, // กำหนดความสูงของวงกลม
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
    margin:10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textbutton: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  }
});
export default Income;