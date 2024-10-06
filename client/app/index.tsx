import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Status from './(tabs)/status';
import BreakIn from './(tabs)/break-in';
import ListRecipients from './(tabs)/list-recipients';
import Recipients from './(tabs)/add-recipients';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faPlusCircle, faUsers, faLock } from '@fortawesome/free-solid-svg-icons';
import { useColorScheme } from 'react-native';
const Tab = createBottomTabNavigator();

const App = () => {
    const colorScheme = useColorScheme(); // To detect light or dark mode


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
                tabBarActiveTintColor: colorScheme === 'dark' ? '#fff' : '#333', // Lighter color for active tab in dark mode, darker color for light mode
                tabBarInactiveTintColor: colorScheme === 'dark' ? '#aaa' : '#bbb', // Darker gray for inactive in dark mode, lighter gray for light mode

            })}
        >
            <Tab.Screen
                name="Status"
                component={Status}
                options={{ headerShown: false }} // Hide header for this screen
            />
            <Tab.Screen
                name="Add"
                component={Recipients}
                options={{ headerShown: false }} // Hide header for this screen
            />
            <Tab.Screen
                name="Neighbors"
                component={ListRecipients}
                options={{ headerShown: false }} // Hide header for this screen
            />
            <Tab.Screen
                name="Break In"
                component={BreakIn}
                options={{ headerShown: false }} // Hide header for this screen
            />
        </Tab.Navigator>
    );
};

export default App;
