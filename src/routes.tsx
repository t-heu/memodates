import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './pages/Home';
import CreateBirthday from './pages/CreateBirthday';
//import { store } from "./store"

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CreateBirthday" component={CreateBirthday} />
      <Stack.Screen name="Home" component={Home} />
      {/*<Stack.Screen options={{headerShown: false}} name="DrawNav" component={DrawNav} />*/}
    </Stack.Navigator>
  );
}
