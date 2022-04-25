import React, {useContext} from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { UserContext } from '../context/User';

export default function LoginStack(props) {
  const {user, setUser} = useContext(UserContext);

  return (
    <SafeAreaView style={styles.container}>
      <Button mode="contained" onPress={()=>setUser('bill')}>Override Login</Button>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
})