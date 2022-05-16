import React, {useContext} from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';

import { UserContext } from '../../context/User';

export default function LoginScreen({navigation}) {
  const {user, setUser} = useContext(UserContext);

  async function attemptLogin(username, password) {
    const user = await axios.post('http://localhost:3000/auth/login', {username, password});
    setUser(user);
    console.log(user);
  }

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={()=>attemptLogin('TestUser01', 'password')}>Override Login</Button>
      <Button mode="contained" onPress={()=>navigation.navigate('Signup')}>Sign Up</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
})