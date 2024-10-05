import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, useColorScheme } from 'react-native';
import axios from 'axios';
import BreakIn from './break-in';

const HomeScreen = () => {
	const colorScheme = useColorScheme(); // Detect the current color scheme
	const ngrokKey = "846f"

	const [isDisabled, setIsDisabled] = useState(false);
	const [isPolling, setIsPolling] = useState(false);

	let intervalId: any = null;

	const handleLock = async () => {
		//logic for locking
		console.log('attempting to lock door!');
		setIsDisabled(true); // Disable buttons
		await axios.get(`https://${ngrokKey}-128-84-127-2.ngrok-free.app/lock`);
		// Wait for 1 second before re-enabling the buttons
		setTimeout(() => {
			setIsDisabled(false); // Re-enable buttons
		}, 1000);
	};

	const handleUnlock = async () => {
		//logic for unlocking
		console.log('attempting to unlock door!')
		setIsDisabled(true);
		await axios.get(`https://${ngrokKey}-128-84-127-2.ngrok-free.app/unlock`);
		setTimeout(() => {
			setIsDisabled(false);
		}, 1000);
	};

	const togglePolling = () => {
		setIsPolling((prev) => !prev); // Toggle polling state
	};

	useEffect(() => {
		const checkLockStatus = async () => {
			try {
				const response = await axios.get(`https://${ngrokKey}-128-84-127-2.ngrok-free.app/sus`);
				const { suspicious } = response.data;

				if (suspicious) {
					BreakIn();
				}
			} catch (error) {
				console.error('Error fetching lock status:', error);
			}
		}
		if (isPolling) {
			intervalId = setInterval(checkLockStatus, 2000);
		}
		return () => clearInterval(intervalId);
	}, [isPolling])



	return (
		<View style={[styles.container, colorScheme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
			<Text style={[styles.title, colorScheme === 'dark' ? styles.darkTitle : styles.lightTitle]}>Smart Lock</Text>
			<Text style={[styles.status, colorScheme === 'dark' ? styles.darkStatus : styles.lightStatus]}>
				Status: Locked
			</Text>
			<TouchableOpacity style={[styles.button, colorScheme === 'dark' ? styles.darkButton : styles.lightButton]} onPress={handleLock} disabled={isDisabled}>
				<Text style={styles.buttonText}>Lock</Text>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.button, colorScheme === 'dark' ? styles.darkButton : styles.lightButton]} onPress={handleUnlock} disabled={isDisabled}>
				<Text style={styles.buttonText}>Unlock</Text>
			</TouchableOpacity>
			{/* Start/Stop Polling Button */}
			<TouchableOpacity
				style={[styles.button, colorScheme === 'dark' ? styles.darkButton : styles.lightButton]} // Change color based on state
				onPress={togglePolling}
			>
				<Text style={styles.buttonText}>{isPolling ? 'Stop Polling' : 'Start Polling'}</Text>
			</TouchableOpacity>
			<View style={styles.footer}>
			</View>
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
	icon: {
		width: 100,
		height: 100,
		marginBottom: 20,
	},
	status: {
		fontSize: 18,
		marginBottom: 20,
	},
	lightStatus: {
		color: '#666', // Light mode status color
	},
	darkStatus: {
		color: '#DDD', // Dark mode status color
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
	footer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		marginTop: 30,
	},
	footerButton: {
		padding: 15,
	},
	footerButtonText: {
		fontSize: 16,
	},
	lightFooterButtonText: {
		color: '#007BFF', // Blue color for light mode
	},
	darkFooterButtonText: {
		color: '#1E90FF', // Lighter blue for dark mode
	},
});

export default HomeScreen;
