import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from './pages/Home';
import Events from './pages/Events';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function Routes() {
  return (
    <Drawer.Navigator
      drawerStyle={{backgroundColor: '#fff', width: 305}}
      drawerContent={() => <CustomDrawerContent />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Events" component={Events} />
    </Drawer.Navigator>
  );
}
