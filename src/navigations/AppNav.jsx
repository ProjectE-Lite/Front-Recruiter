import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Authcontext } from '../context/Authcontext';
import { ActivityIndicator, View } from 'react-native';
import Headertab from './HeaderTab';
import AuthStack from './AuthStack';


const AppNav = () => {
  const {isLoading, userToken} = useContext(Authcontext)

  if  (isLoading){
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'}></ActivityIndicator>
      </View>
    )
  }
  return (
    <NavigationContainer>
      {userToken != null ?  <Headertab></Headertab> :  <AuthStack></AuthStack>}
    </NavigationContainer>
  )
}

export default AppNav