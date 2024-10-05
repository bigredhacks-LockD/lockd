// app/tabs/BreakIn.tsx
import React, { useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, useColorScheme } from 'react-native';
import * as Notifications from 'expo-notifications';
import axios from 'axios';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});



const sendPush = async () => {
    try {
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

const sendEmail = async () => {
    console.log('Attempting to send email');
    axios.post('http://10.48.1.38:5000/simulate-breakin')
        .then((response) => {
            Alert.alert('Success', response.data.status);
        })
        .catch((error) => {
            Alert.alert('Error', 'Failed to run the script');
        });
};

export const breakIn = async () => {
    await sendPush();
    await sendEmail();
};

export const BreakIn = () => {
    const colorScheme = useColorScheme();

    useEffect(() => {
        requestPermissions();
    }, []);

    const requestPermissions = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'You need to enable notifications to use this feature!');
        }
    };

    return (
        <View style={[styles.container, colorScheme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
            <Text style={[styles.title, colorScheme === 'dark' ? styles.darkTitle : styles.lightTitle]}>
                Break-In Simulation
            </Text>
            <Text style={[styles.description, colorScheme === 'dark' ? styles.darkDescription : styles.lightDescription]}>
                Press the button below to simulate a break-in and trigger notifications.
            </Text>
            <Button title="Simulate Break-In" onPress={breakIn} color={colorScheme === 'dark' ? '#007BFF' : '#4CAF50'} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    lightContainer: {
        backgroundColor: '#F5F5F5', // Light background
    },
    darkContainer: {
        backgroundColor: '#1A1A1A', // Dark background
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    lightTitle: {
        color: '#333', // Light mode title color
    },
    darkTitle: {
        color: '#FFF', // Dark mode title color
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    lightDescription: {
        color: '#666', // Light mode description color
    },
    darkDescription: {
        color: '#DDD', // Dark mode description color
    },
});

export default BreakIn;
