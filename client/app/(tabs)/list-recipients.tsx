import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, RefreshControl, useColorScheme, SafeAreaView } from 'react-native';

const RecipientList = () => {
    const [recipients, setRecipients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const colorScheme = useColorScheme();

    useEffect(() => {
        fetchRecipients();
    }, []);

    const fetchRecipients = async () => {
        try {
            const response = await fetch('http://10.48.1.38:5000/list-recipients');
            const data = await response.json();
            setRecipients(data.recipients);
            setLoading(false);
            setRefreshing(false);
        } catch (err) {
            setError('Failed to fetch recipients');
            setLoading(false);
            setRefreshing(false);
        }
    };

    const removeRecipient = async (email) => {
        try {
            const response = await fetch('http://10.48.1.38:5000/remove-recipient', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setRecipients(recipients.filter(recipient => recipient.email !== email));
            } else {
                setError('Failed to remove recipient');
            }
        } catch (err) {
            setError('Failed to remove recipient');
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchRecipients();
    };

    const renderItem = ({ item }) => (
        <View style={[styles.item, colorScheme === 'dark' ? styles.darkItem : styles.lightItem]}>
            <View style={styles.recipientInfo}>
                <Text style={[styles.email, colorScheme === 'dark' ? styles.darkEmail : styles.lightEmail]}>{item.name}</Text>
                <View style={styles.details}>
                    <Text style={[styles.dorm, colorScheme === 'dark' ? styles.darkText : styles.lightText]}>Dorm: {item.dorm}</Text>
                    <Text style={[styles.room, colorScheme === 'dark' ? styles.darkText : styles.lightText]}>Room: {item.room}</Text>
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
        <SafeAreaView style={[styles.container, colorScheme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
            <Text style={styles.title}>Recipients List</Text>
            <FlatList
                data={recipients}
                renderItem={renderItem}
                keyExtractor={(item) => item.email}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        margin: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 16,
        color: '#333',
    },
    lightContainer: {
        backgroundColor: '#F5F5F5',
    },
    darkContainer: {
        backgroundColor: '#1A1A1A',
    },
    item: {
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
    lightItem: {
        backgroundColor: '#fff',
    },
    darkItem: {
        backgroundColor: '#333', // Dark background for item
    },
    recipientInfo: {
        flex: 1,
    },
    email: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    darkEmail: {
        color: '#007AFF', // Blue color for email in dark mode
    },
    lightEmail: {
        color: '#007AFF', // Blue color for email in light mode
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dorm: {
        fontSize: 14,
    },
    room: {
        fontSize: 14,
    },
    darkText: {
        color: '#ccc', // Lighter text for dark mode
    },
    lightText: {
        color: '#555', // Darker text for light mode
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
