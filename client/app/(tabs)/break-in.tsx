// app/tabs/BreakIn.tsx
import React, { useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import axios from 'axios';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const BreakIn = () => {
    useEffect(() => {
        requestPermissions();
    }, []);

    const requestPermissions = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'You need to enable notifications to use this feature!');
        }
    };

    const simulateBreakIn = async () => {
        try {
            // send push notification
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Intruder Alert!",
                    body: "Suspicious activity has been detected at the lock!",
                    sound: 'default',
                },
                trigger: null,
            });

            // send email
            const response = await axios.get('http://10.48.1.38:5000/simulate-breakin'); //ip address for computer idk why it's not working
            console.log(response.data);  // Check response from Python server
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Failed to send break-in alert. Please try again.');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Break In Screen</Text>
            <Button title="Simulate Break-In" onPress={simulateBreakIn} />
        </View>
    );
};

export default BreakIn;