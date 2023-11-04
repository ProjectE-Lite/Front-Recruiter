import 'react-native-gesture-handler';
import React from 'react'
import { AuthProvider } from './src/context/Authcontext';
import AppNav from './src/navigations/AppNav';

const App = () => {
  return (
    <AuthProvider>
      <AppNav></AppNav>
    </AuthProvider>
  )
}

export default App