// app/tabs/BreakIn.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications';
import axios from 'axios';



Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});


export const BreakIn = () => {
    const colorScheme = useColorScheme();
    const [isPolling, setIsPolling] = useState(false);
    const [lastSuspiciousTime, setLastSuspiciousTime] = useState(0);


    let intervalId: any = null;

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

    const breakIn = async () => {
        await sendPush();
        await sendEmail();
    };


    const togglePolling = () => {
        setIsPolling((prev) => !prev); // Toggle polling state
    };

    useEffect(() => {
        const checkLockStatus = async () => {
            let lastSuspiciousTime = 0;

            try {
                const response = await axios.get(`https://26ea-128-84-127-2.ngrok-free.app/sus`);
                console.log(response.data);

                if (response.data.status === "SUS") {
                    const currentTime = Date.now();

                    // 10-second delay between alerts
                    if (currentTime - lastSuspiciousTime > 10 * 1000) {
                        await breakIn();
                        lastSuspiciousTime = currentTime;  // Update the last alert time
                    } else {
                        console.log('Suspicious activity detected, but alert was recently sent. Skipping.');
                    }
                }
            } catch (error) {
                console.error('Error fetching lock status:', error);
            }

        }
        if (isPolling) {
            intervalId = setInterval(checkLockStatus, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isPolling])



    return (
        <View style={[styles.container, colorScheme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
            <Text style={[styles.title, colorScheme === 'dark' ? styles.darkTitle : styles.lightTitle]}>
                Break-In
            </Text>
            <Text style={[styles.description, colorScheme === 'dark' ? styles.darkDescription : styles.lightDescription]}>
                (For demo purposes)
            </Text>
            <Text style={[styles.description, colorScheme === 'dark' ? styles.darkDescription : styles.lightDescription]}>
                Press the button below to simulate a break-in and trigger notifications.
            </Text>
            <TouchableOpacity
                style={[styles.button, styles.neutralButton]} // Apply neutral button style
                onPress={breakIn}
            >
                <Text style={styles.neutralButtonText}>Simulate Break-In</Text>
            </TouchableOpacity>
            {/* Start/Stop Polling Button */}
            <TouchableOpacity
                style={[styles.button, { backgroundColor: isPolling ? '#f00' : '#4CAF50' }]} // Change color based on state
                onPress={togglePolling}
            >
                <Text style={styles.buttonText}>{isPolling ? 'Stop Polling' : 'Start Polling'}</Text>
            </TouchableOpacity>
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
    button: {
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginBottom: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    neutralButton: {
        backgroundColor: '#808080', // Neutral gray color
    },
    neutralButtonText: {
        color: '#FFFFFF', // White text for contrast
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default BreakIn;
