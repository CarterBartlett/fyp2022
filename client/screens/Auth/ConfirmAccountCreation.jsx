import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Text, Button } from 'react-native-paper';

export default function ConfirmAccountCreationScreen({navigation}) {
  return (
    <ScrollView>
      <Text>Your account has been created</Text>
      <Button mode="contained" onPress={()=>navigation.reset({index:0, routes:[{name:'Login'}]})}>Go To Login Screen</Button>
    </ScrollView>
  )
}
