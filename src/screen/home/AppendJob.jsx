import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'

const AppendJob = ({navigation}) => {
  return (
    <TouchableOpacity onPress={() => {navigation.goBack()}}>
        <View>
            <Text>Hello from AppendJob</Text>
        </View>
    </TouchableOpacity>
  )
}

export default AppendJob