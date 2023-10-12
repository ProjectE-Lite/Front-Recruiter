import React,{useState, useEffect}  from 'react';
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
      axios.get(`http://${YOURAPI}/recruiters/${recruiter_id}`)
        .then(response => {
          const recdata = response.data;
          Promise.all(recdata.list_of_money_exchange.map(exchange_id =>
            axios.get(`http://${YOURAPI}/money_exchange/${exchange_id}`)
          ))
            .then(res => {
              const notiData = res.map(res => res.data)
              setnotiData(notiData)
            })
        })
        .catch(error => {
          console.error('Error making GET request:', error);
        });
    }, [])
  )

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

const  renderItem=({ item }) => {
  if (item.from === "Bank"){
    return(
    <View style={{flexDirection: 'row',marginBottom:10, backgroundColor: '#bdbdbd', alignItems:'center'}} >
      <Text style={{flexGrow:2, fontSize:20, marginLeft: 5, marginTop: 15}}>{item.date.slice(0,10) }{'\n'}{item.date.slice(11,-10)}{'\n'}</Text>
      <Text style = {{fontSize:25,color:'blue', marginRight: 5}} >+{item.credit?.toLocaleString() || ""}</Text>
    </View>
    )
}
  else
  return(
    <View style={{flexDirection: 'row',marginBottom:10, backgroundColor: '#bdbdbd', alignItems:'center'}} >
      <Text style={{flexGrow:2, fontSize:20, marginLeft: 5, marginTop: 15}}>{item.date.slice(0,10) }{'\n'}{item.date.slice(11,-10)}{'\n'}</Text>
      <Text style = {{fontSize:25,color:'blue', marginRight: 5}} >-{item.credit}</Text>
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
    borderColor: '#1a237e',
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
