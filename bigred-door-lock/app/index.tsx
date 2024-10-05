import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

const SmartLockApp = () => {
  const [status, setStatus] = useState('Unknown');
  const [vibration, setVibration] = useState(false);
  const piIP = 'http://192.168.1.100:5000'; // Replace with your Raspberry Pi's IP or ngrok URL

  const lockDoor = async () => {
    try {
      await axios.post(`${piIP}/lock`);
      setStatus('Locked');
      Alert.alert('Success', 'Door locked successfully');
    } catch (error) {
      console.error('Error locking door:', error);
      Alert.alert('Error', 'Failed to lock the door');
    }
  };

  const unlockDoor = async () => {
    try {
      await axios.post(`${piIP}/unlock`);
      setStatus('Unlocked');
      Alert.alert('Success', 'Door unlocked successfully');
    } catch (error) {
      console.error('Error unlocking door:', error);
      Alert.alert('Error', 'Failed to unlock the door');
    }
  };

  const checkStatus = async () => {
    try {
      const response = await axios.get(`${piIP}/status`);
      setStatus(response.data.status);
      setVibration(response.data.vibration); // Assuming vibration data is returned
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);  // Cleanup on component unmount
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Lock</Text>

      <View style={styles.statusContainer}>
        <Text style={styles.status}>Lock Status: {status}</Text>
        <Text style={styles.vibration}>
          Vibration Detected: {vibration ? 'Yes' : 'No'}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.lockButton} onPress={lockDoor}>
          <Text style={styles.buttonText}>Lock Door</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.unlockButton} onPress={unlockDoor}>
          <Text style={styles.buttonText}>Unlock Door</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAEAEA', // Light background color for a clean look
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333', // Dark text for better readability
    marginBottom: 20,
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  status: {
    fontSize: 24,
    color: '#444', // Slightly lighter text for the status
    marginBottom: 5,
  },
  vibration: {
    fontSize: 18,
    color: '#888', // Subtle color for vibration detection
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  lockButton: {
    backgroundColor: '#FF6347', // Tomato red for Lock button
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  unlockButton: {
    backgroundColor: '#4682B4', // Steel blue for Unlock button
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // White text for buttons
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SmartLockApp;
