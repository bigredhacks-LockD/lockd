import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Status from './(tabs)/status';
import BreakIn from './(tabs)/break-in';
// import Lock from './tabs/Lock';       // Import your Lock screen

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Status" component={Status} />
      <Tab.Screen name="Break In" component={BreakIn} />
      {/* <Tab.Screen name="Lock" component={Lock} /> */}
    </Tab.Navigator>
  );
};

export default App;
