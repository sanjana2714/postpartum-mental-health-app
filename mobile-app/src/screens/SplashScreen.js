import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const token = await AsyncStorage.getItem('authToken');
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
      
      if (!hasSeenOnboarding) {
        navigation.replace('Onboarding');
      } else if (token) {
        navigation.replace('Dashboard');
      } else {
        navigation.replace('Login');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      navigation.replace('Onboarding');
    }
  };

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>PMH</Text>
        </View>
        <Text style={styles.title}>Postpartum Mental Health</Text>
        <Text style={styles.tagline}>Supporting mothers, nurturing wellness</Text>
        <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 150,
    height: 150,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    color: '#e0e0e0',
    textAlign: 'center',
    marginBottom: 40,
  },
  loader: {
    marginTop: 20,
  },
});
