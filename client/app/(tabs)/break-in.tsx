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

    const sendPush = async () => {
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

        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Failed to send break-in alert. Please try again.');
        }
    };

    const sendEmail = () => {
        console.log('attempting to send email')
        axios.post('http://10.48.1.38:5000/simulate-breakin')  // ip address
            .then((response) => {
                Alert.alert('Success', response.data.status);
            })
            .catch((error) => {
                Alert.alert('Error', 'Failed to run the script');
            });
    };

    const simulateBreakin = async () => {
        sendPush();
        sendEmail();
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Break In Screen</Text>
            <Button title="Simulate Break-In" onPress={simulateBreakin} />
        </View>
    );
};

export default BreakIn;