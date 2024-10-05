// app/tabs/BreakIn.tsx
import React, { useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

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
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Intruder Alert!",
                body: "Someone is attempting to break into your property!",
                sound: 'default',
            },
            trigger: null,
        });
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Break In Screen</Text>
            <Button title="Simulate Break-In" onPress={simulateBreakIn} />
        </View>
    );
};

export default BreakIn;