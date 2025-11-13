import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'हिंदी (Hindi)', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు (Telugu)', flag: '🇮🇳' },
];

export default function LanguageSelectionScreen({ navigation }) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageSelect = async (languageCode) => {
    setSelectedLanguage(languageCode);
    await AsyncStorage.setItem('preferredLanguage', languageCode);
  };

  const handleContinue = () => {
    navigation.navigate('Register');
  };

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Select Your Language</Text>
        <Text style={styles.subtitle}>Choose your preferred language for the app</Text>
        
        <View style={styles.languageContainer}>
          {LANGUAGES.map((language) => (
            <TouchableOpacity
              key={language.code}
              style={[
                styles.languageOption,
                selectedLanguage === language.code && styles.selectedLanguage
              ]}
              onPress={() => handleLanguageSelect(language.code)}
            >
              <Text style={styles.flag}>{language.flag}</Text>
              <Text style={[
                styles.languageName,
                selectedLanguage === language.code && styles.selectedLanguageName
              ]}>
                {language.name}
              </Text>
              {selectedLanguage === language.code && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e0e0',
    textAlign: 'center',
    marginBottom: 40,
  },
  languageContainer: {
    marginVertical: 20,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedLanguage: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderColor: '#ffffff',
  },
  flag: {
    fontSize: 40,
    marginRight: 15,
  },
  languageName: {
    flex: 1,
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '500',
  },
  selectedLanguageName: {
    fontWeight: 'bold',
  },
  checkmark: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 12,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonText: {
    color: '#667eea',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
