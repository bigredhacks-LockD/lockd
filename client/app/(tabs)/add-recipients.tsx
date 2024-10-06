import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, useColorScheme } from 'react-native';

const Recipients = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dorm, setDorm] = useState('');
    const [room, setRoom] = useState('');
    const colorScheme = useColorScheme(); // To detect light or dark mode

    const handleAddRecipient = async () => {
        if (email === '' || dorm === '' || room === '') {
            Alert.alert('Error', 'Please fill out fields');
            return;
        }

        try {
            // Replace with your backend endpoint to add recipient
            const response = await fetch('http://10.48.1.38:5000/add-recipient', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, dorm, room }),
            });

            console.log(response);

            if (response.ok) {
                Alert.alert('Success', 'Recipient added to the recipient list!');

                setName('');
                setEmail(''); // Clear the input field
                setDorm('');  // Clear dorm input field
                setRoom('');  // Clear room input field
            } else {
                Alert.alert('Error', 'Failed to add the recipient');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred while adding the recipient');
        }
    };

    return (
        <View style={[styles.container, colorScheme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
            <Text style={[styles.title, colorScheme === 'dark' ? styles.darkTitle : styles.lightTitle]}>
                Add Recipient
            </Text>

            <TextInput
                style={[styles.input, colorScheme === 'dark' ? styles.darkInput : styles.lightInput]}
                placeholder="Enter your name"
                placeholderTextColor={colorScheme === 'dark' ? '#BBB' : '#666'}
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
            />
            <TextInput
                style={[styles.input, colorScheme === 'dark' ? styles.darkInput : styles.lightInput]}
                placeholder="Enter your email"
                placeholderTextColor={colorScheme === 'dark' ? '#BBB' : '#666'}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={[styles.input, colorScheme === 'dark' ? styles.darkInput : styles.lightInput]}
                placeholder="Enter your dorm"
                placeholderTextColor={colorScheme === 'dark' ? '#BBB' : '#666'}
                value={dorm}
                onChangeText={setDorm}
                autoCapitalize="none"
            />
            <TextInput
                style={[styles.input, colorScheme === 'dark' ? styles.darkInput : styles.lightInput]}
                placeholder="Enter your room number"
                placeholderTextColor={colorScheme === 'dark' ? '#BBB' : '#666'}
                value={room}
                onChangeText={setRoom}
                autoCapitalize="none"
            />

            <TouchableOpacity
                style={[styles.button, colorScheme === 'dark' ? styles.darkButton : styles.lightButton]}
                onPress={handleAddRecipient}
            >
                <Text style={styles.buttonText}>Submit</Text>
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
        marginBottom: 20,
    },
    lightTitle: {
        color: '#333', // Light mode title color
    },
    darkTitle: {
        color: '#FFF', // Dark mode title color
    },
    input: {
        width: '80%',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 15,
        fontSize: 18,
        marginBottom: 20,
    },
    lightInput: {
        backgroundColor: '#FFF',
        color: '#333',
        borderColor: '#DDD',
        borderWidth: 1,
    },
    darkInput: {
        backgroundColor: '#333',
        color: '#FFF',
        borderColor: '#555',
        borderWidth: 1,
    },
    button: {
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginBottom: 20,
    },
    lightButton: {
        backgroundColor: '#4CAF50', // Green color for light mode
    },
    darkButton: {
        backgroundColor: '#007BFF', // Blue color for dark mode
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Recipients;
