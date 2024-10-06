import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Status from './(tabs)/status';
import BreakIn from './(tabs)/break-in';
import ListRecipients from './(tabs)/list-recipients';
import axios from 'axios';
import Recipients from './(tabs)/add-recipients';

const Tab = createBottomTabNavigator();

const App = () => {


  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0, // Remove the top border
          elevation: 0, // Remove the shadow on Android 
        },
        tabBarLabelStyle: {
          fontSize: 16, // Adjust font size for labels
          fontWeight: 'bold', // Optional: make the labels bold
        },
        tabBarShowLabel: true, // Set to false to hide labels
      }}
    >
      <Tab.Screen name="Status" component={Status} />
      <Tab.Screen name="Add" component={Recipients} />
      <Tab.Screen name="Neighbors" component={ListRecipients} />
      <Tab.Screen name="Break In" component={BreakIn} />
    </Tab.Navigator>
  );
};

export default App;
