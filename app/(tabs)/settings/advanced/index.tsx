import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Advanced = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This Page is Coming Soon</Text>
      <Text style={styles.description}>We're working on something beautiful and exciting for you. Stay tuned for updates!</Text>
      {/* You can add additional elements like an image or a countdown timer here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777', // Adjust the color to your liking
  },
});

export default Advanced;
