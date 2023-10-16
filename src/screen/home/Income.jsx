import React,{useState}  from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import { FlatList} from 'react-native';
import axios from "axios";
import { YOURAPI } from '../../constants/editendpoint';
import { useFocusEffect } from '@react-navigation/native';

const Income = ({ navigation }) => {
  const recruiter_id = '6517fa561434530638bc81de';
  const [notiDatamoney,setnotiData] = useState([]);
  const [data, setData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://${YOURAPI}/recruiters/${recruiter_id}/money_exchange`);
          const recdata = response.data;
          const exchangeResponses = await Promise.all(recdata.map(exchange_id =>
            axios.get(`http://${YOURAPI}/money_exchange/${exchange_id}`)
          ));
          const notiData = exchangeResponses.map(res => res.data);
          setnotiData(notiData);
        } catch (error) {
          console.error('Error making GET request:', error);
        }
      };
      fetchData(); 
      const interval = setInterval(() => {
        fetchData(); 
      }, 3000);
      return () => clearInterval(interval); 
    }, [])
  );
  
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
      const interval = setInterval(() => {
        fetchData(); 
      }, 5000);
      return () => clearInterval(interval); 
    }, [recruiter_id]) 
  );
  

const  renderItem=({ item }) => {
  if (item.from === "Bank"){
    return(
    <View style={{flexDirection: 'row',marginBottom:10, backgroundColor: '#D7E5CA', alignItems:'center', borderRadius: 20, justifyContent: 'center', padding: 5, marginHorizontal: 10}}>
      <View style={{flexGrow: 2, padding: 10}}>
          <Text>{item.date.slice(0,10)}</Text>
          <Text>{item.date.slice(11,-10)}</Text>
      </View>
      <View style={{marginRight: 20}}>
          <Text style={{}}>+{item.credit?.toLocaleString() || ""}</Text>
      </View>
    </View>
    )
  }
  else
  return(
    <View style={{flexDirection: 'row',marginBottom:10, backgroundColor: '#D7E5CA', alignItems:'center', borderRadius: 20, justifyContent: 'center', padding: 5, marginHorizontal: 10}}>
    <View style={{flexGrow: 2, padding: 10}}>
        <Text>{item.date.slice(0,10)}</Text>
        <Text>{item.date.slice(11,19)}</Text>
    </View>
    <View style={{marginRight: 20}}>
        <Text style={{color: 'red'}}>-{item.credit?.toLocaleString() || ""}</Text>
    </View>
  </View>
    )
}
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex:1}}>
      <View style={{padding:10}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View style={styles.circle}>
            <Text style={styles.text}>ยอดเงินคงเหลือ</Text>
            <Text style={styles.textnum}>{data.credit?.toLocaleString() || ""}</Text>
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
        data={notiDatamoney}
        contentContainerStyle={{ paddingBottom: 60}}
        keyExtractor={(item,index) => index.toString()}
        renderItem={renderItem}
      />

    </SafeAreaView>
  );
  
};

const styles = StyleSheet.create({
  circle: {
    width: 200, 
    height: 200, 
    borderRadius: 100, 
    backgroundColor: '#fafafa', 
    borderWidth: 4,
    borderColor: '#618264',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black', 
    fontSize: 12, 
    textAlign: 'center', 
    },
  textnum: {
    color: 'black', 
    fontSize: 35, 
    textAlign: 'center', 
  },
  butt: {
    width: 90, 
    height: 45, 
    backgroundColor: '#79AC78',
    alignSelf: 'flex-start',
    margin:10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textbutton: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  }
});
export default Income;
