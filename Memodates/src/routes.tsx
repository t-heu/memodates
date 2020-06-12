import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'

import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import CreateBirthday from './pages/CreateBirthday'
//import { store } from "./store"

const Stack = createStackNavigator();
//const Tab = createBottomTabNavigator()

/*function DrawNav() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color }) => {
        let iconName: string = '';

        if (route.name === 'Home') {
          iconName = 'md-calendar'
        } //else if (route.name === 'CreateBirthday') {
          //iconName = 'md-add';
        //}

        return <Icon name={iconName} size={32} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#4989f9',
      inactiveTintColor: 'gray',
      showLabel: false,
      style: {
        height: 60
      }
    }}
    >
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="CreateBirthday" component={CreateBirthday} />
    </Tab.Navigator>
  )
}*/

export default function Routes() {
  return (
  <Stack.Navigator initialRouteName={"Home"} screenOptions={{ 
      headerShown: false
      }}>
      <Stack.Screen name="CreateBirthday" component={CreateBirthday} />
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="SignIn" component={SignIn}/>
      <Stack.Screen name="SignUp" component={SignUp}/>
      {/*<Stack.Screen options={{headerShown: false}} name="DrawNav" component={DrawNav} />*/}
    </Stack.Navigator>
  );
}
