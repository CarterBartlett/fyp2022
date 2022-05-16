import 'react-native-gesture-handler';

import { Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React, { useState, useMemo } from 'react';

import LoginStack from './stacks/LoginStack';
import DashboardStack from './stacks/DashboardStack';

import { UserContext } from './context/User';

const Stack = createStackNavigator();

export default function App() {

  const [user, setUser] = useState(null);
  const providerValue = useMemo(()=> ((user,setUser)), [user, setUser]);

  return (
    <PaperProvider>
      <NavigationContainer>
        <UserContext.Provider value={{user,setUser}}>
          
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {user ? DashboardStack(Stack) : LoginStack(Stack)}
          </Stack.Navigator>
          
        </UserContext.Provider>
      </NavigationContainer>
    </PaperProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
