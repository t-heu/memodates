import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from './pages/Home';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function Routes() {
  return (
    <Drawer.Navigator
      drawerStyle={{backgroundColor: '#1d2533', width: 305}}
      drawerContent={() => <CustomDrawerContent />}>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
}
