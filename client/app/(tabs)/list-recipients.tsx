import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

const RecipientList = () => {
    const [recipients, setRecipients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchRecipients();
    }, []);

    const fetchRecipients = async () => {
        try {
            const response = await fetch('http://10.48.1.38:5000/list-recipients');
            const data = await response.json();
            setRecipients(data.recipients);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch recipients');
            setLoading(false);
        }
    };

    const removeRecipient = async (email) => {
        try {
            const response = await fetch('http://10.48.1.38:5000/remove-recipient', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }), // Include the email in the body
            });

            if (response.ok) {
                // Update the local state to remove the recipient
                setRecipients(recipients.filter(recipient => recipient.email !== email));
            } else {
                setError('Failed to remove recipient');
            }
        } catch (err) {
            setError('Failed to remove recipient');
        }
    };


    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <View style={styles.recipientInfo}>
                <Text style={styles.email}>{item.name}</Text>
                <View style={styles.details}>
                    <Text style={styles.dorm}>Dorm: {item.dorm}</Text>
                    <Text style={styles.room}>Room: {item.room}</Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeRecipient(item.email)}
            >
                <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.error}>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recipients List</Text>
            <FlatList
                data={recipients}
                renderItem={renderItem}
                keyExtractor={(item) => item.email}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    item: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    recipientInfo: {
        flex: 1,
    },
    email: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#007AFF',
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dorm: {
        fontSize: 14,
        color: '#555',
    },
    room: {
        fontSize: 14,
        color: '#555',
    },
    error: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    removeButton: {
        backgroundColor: '#FF3B30',
        padding: 8,
        borderRadius: 6,
        marginLeft: 16,
    },
    removeButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default RecipientList;