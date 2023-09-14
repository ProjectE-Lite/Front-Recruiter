import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './src/navigations/AuthStack'

const App = () => {
  return (
    <NavigationContainer>
      <AuthStack></AuthStack>
    </NavigationContainer>
  )
}

export default App