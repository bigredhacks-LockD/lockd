import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Status from './(tabs)/status';
import BreakIn from './(tabs)/break-in';
import ListRecipients from './(tabs)/list-recipients';
import Recipients from './(tabs)/add-recipients';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faPlusCircle, faUsers, faLock } from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          borderTopWidth: 0, // Remove the top border
          elevation: 0, // Remove the shadow on Android 
        },
        tabBarLabelStyle: {
          fontSize: 16, // Adjust font size for labels
          fontWeight: 'bold', // Optional: make the labels bold
        },
        tabBarShowLabel: true, // Set to false to hide labels
        tabBarIcon: ({ color, size }) => {
          let icon;

          if (route.name === 'Status') {
            icon = faHome; // Use the home icon for the Status tab
          } else if (route.name === 'Add') {
            icon = faPlusCircle; // Use the plus circle icon for adding recipients
          } else if (route.name === 'Neighbors') {
            icon = faUsers; // Use the users icon for the list of recipients
          } else if (route.name === 'Break In') {
            icon = faLock; // Use the lock icon for the Break-In tab
          }

          return <FontAwesomeIcon icon={icon} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#333', // Active tab color
        tabBarInactiveTintColor: '#888', // Inactive tab color
      })}
    >
      <Tab.Screen name="Status" component={Status} />
      <Tab.Screen name="Add" component={Recipients} />
      <Tab.Screen name="Neighbors" component={ListRecipients} />
      <Tab.Screen name="Break In" component={BreakIn} />
    </Tab.Navigator>
  );
};

export default App;
