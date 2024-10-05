import React from 'react';
import { View, Text, Button } from 'react-native';

const BreakIn = () => {
  const simulateBreakIn = () => {
    // Logic to simulate break-in (e.g., call the API to send notifications)
    console.log('Simulating break-in...');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Break In Screen</Text>
      <Button title="Simulate Break-In" onPress={simulateBreakIn} />
    </View>
  );
};

export default BreakIn;