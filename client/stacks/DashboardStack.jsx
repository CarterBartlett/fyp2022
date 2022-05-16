import React, {useContext, useState} from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Alert } from 'react-native';

import HomeScreen from '../screens/Home';
import TodosScreen from '../screens/Todos';
import DebugScreen from '../screens/Debug';
import HabitsScreen from '../screens/Habits';
import TasksScreen from '../screens/Tasks';

import NewTaskScreen from '../screens/New/NewTask';
import NewTodoScreen from '../screens/New/NewTodo';
import NewHabitScreen from '../screens/New/NewHabit';

import SettingsScreen from '../screens/Settings/Settings';

import { UserContext } from '../context/User';
import { View } from 'react-native';
import { FAB, Colors, IconButton, Portal, Text } from 'react-native-paper';
import UseDeviceSpecs from '../hooks/Device';

import {AppName} from '@env';
import useDeviceSpecs from '../hooks/Device';

const Drawer = createDrawerNavigator();
const notificationCount = 0; //TODO - Add notification count

export default function DashboardStack(Stack) {
  return (
    <Stack.Group screenOptions={{headerShown: true}}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{headerShown: false}} />
      <Stack.Screen name="NewTask" component={NewTaskScreen} options={{title:'New Task'}} />
      <Stack.Screen name="NewTodo" component={NewTodoScreen}  options={{title:'New Todo Item'}}/>
      <Stack.Screen name="NewHabit" component={NewHabitScreen}  options={{title:'New Habit'}}/>
      <Stack.Screen name="Settings" component={SettingsScreen} options={{title:'Settings'}} />
    </Stack.Group>
  )
}

function DashboardScreen({navigation}) {
  const [fabOpenState, setFabOpenState] = useState(false);

  return (
    <>
      <Drawer.Navigator initialRouteName="Home" drawerContent={(props)=><CustomDrawer {...props} />}
      screenOptions={{
        headerRight: (props) => (
        <IconButton
          color={notificationCount==0 ? Colors.black : Colors.green600}
          icon={
            notificationCount>=10 ? "numeric-9-plus-circle-outline" :
            notificationCount>0 && notificationCount<10 ? "numeric-"+notificationCount+"-circle-outline" :
            "bell-outline"
          }
          onPress={()=>console.log('Open notifications')}/>)
      }}>
        <Drawer.Screen name="Home" component={HomeScreen} options={{drawerIcon:(props)=><DrawerIcon icon="home" {...props} />}} />
        <Drawer.Screen name="Todo" component={TodosScreen} options={{drawerIcon:(props)=><DrawerIcon icon="checkbox-marked-circle-outline" {...props} />}}/>
        <Drawer.Screen name="Habits" component={HabitsScreen} options={{drawerIcon:(props)=><DrawerIcon icon="account-edit" {...props} />}}/>
        <Drawer.Screen name="Tasks" component={TasksScreen} options={{drawerIcon:(props)=><DrawerIcon icon="file-outline" {...props} />}}/>
        {__DEV__ && <Drawer.Screen name="Debug" component={DebugScreen} options={{drawerIcon:(props)=><DrawerIcon icon="hammer-wrench" {...props} />}}/>}
      </Drawer.Navigator>

      <Portal>
        <FAB.Group
          icon="plus"
          actions={[
            {label: "Tasks", icon: 'file-outline', onPress: ()=>navigation.navigate('NewTask')},
            {label: "To-do", icon: 'checkbox-marked-circle-outline', onPress: ()=>navigation.navigate('NewTodo')},
            {label: "Habits", icon: 'account-edit', onPress: ()=>navigation.navigate('NewHabit')}
          ]}
          onStateChange={()=>setFabOpenState(!fabOpenState)}
          onPress={()=>console.log("onPress")}
          open={fabOpenState}
        />
      </Portal>
      
    </>
  )
}

function DrawerIcon(props) {
  return <IconButton
    style={{padding:0, margin:0}}
    color={props.focused ? Colors.blue500 : Colors.black} 
    {...props} />
}

function CustomDrawer(props) {
  const {user, setUser} = useContext(UserContext);
  const { navigation } = props;
  const deviceSpecs = useDeviceSpecs();
  return (
    <>
      <View style={{
        height: 96,
        backgroundColor: Colors.blue400,
        marginBottom: 0,
        padding: 12,
        flexDirection:'column-reverse'
      }}>
        <Text style={{color:Colors.white, fontSize:24}}>{AppName}</Text>
      </View>

      <DrawerContentScrollView contentContainerStyle={{paddingTop:4}}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={{
        backgroundColor: Colors.blue400,
        marginBottom: 0,
        flexDirection: 'row'
      }}>
        <Text style={{color: Colors.white, padding: 8, flexGrow: 1, textAlignVertical: 'center'}}>Logged in as {user?.firstName}</Text>
        <>
          <IconButton color={Colors.white} icon="sync" onPress={()=>console.log("Sync")} />
          <IconButton color={Colors.white} icon="cog" onPress={()=>navigation.navigate('Settings')} />
          <IconButton color={Colors.white} icon="logout" onPress={()=>{
            if (deviceSpecs.os=='web') {
              if(confirm("You will be logged out of the application")) {
                setUser(null);
              }
            } else {
              Alert.alert("Log Out", "You will be logged out of the application", 
                [{
                  text: "OK",
                  style: 'destructive',
                  onPress: ()=>setUser(null)
                },{
                  text: "Cancel",
                  style: 'cancel',
                  onPress: ()=>{}
                }]
              )
            }
          }} />
        </>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
})