import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LibraryTab() {
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.navigate('Library');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Education Library</Text>
      <Text style={styles.subtitle}>Redirecting...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});
