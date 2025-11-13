import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileSetupScreen({ navigation }) {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'FEMALE',
    deliveryDate: new Date(),
    stage: 'PREGNANT',
    weeks: '',
    partnerContact: '',
    profilePhoto: null,
  });


  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission required', 'Please allow access to your photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setFormData({ ...formData, profilePhoto: result.assets[0].uri });
    }
  };

  const handleContinue = async () => {
    if (!formData.age || !formData.gender || !formData.stage) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // TODO: API call to save profile data
    navigation.replace('Dashboard');
  };



  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Complete Your Profile</Text>
        <Text style={styles.subtitle}>Help us personalize your experience</Text>
      </View>

      <TouchableOpacity style={styles.photoContainer} onPress={handleImagePick}>
        {formData.profilePhoto ? (
          <Image source={{ uri: formData.profilePhoto }} style={styles.profilePhoto} />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Ionicons name="camera" size={40} color="#667eea" />
            <Text style={styles.photoText}>Add Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.form}>
        <Text style={styles.label}>Age *</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="calendar-outline" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your age"
            value={formData.age}
            onChangeText={(text) => setFormData({ ...formData, age: text })}
            keyboardType="numeric"
          />
        </View>

        <Text style={styles.label}>Gender *</Text>
        <View style={styles.genderContainer}>
          {['FEMALE', 'MALE', 'OTHER'].map((gender) => (
            <TouchableOpacity
              key={gender}
              style={[
                styles.genderOption,
                formData.gender === gender && styles.genderOptionSelected
              ]}
              onPress={() => setFormData({ ...formData, gender })}
            >
              <Text style={[
                styles.genderText,
                formData.gender === gender && styles.genderTextSelected
              ]}>
                {gender.charAt(0) + gender.slice(1).toLowerCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Expected/Actual Delivery Date *</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="calendar" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD (e.g., 2024-03-15)"
            value={formData.deliveryDate.toISOString().split('T')[0]}
            onChangeText={(text) => {
              const date = new Date(text);
              if (!isNaN(date.getTime())) {
                setFormData({ ...formData, deliveryDate: date });
              }
            }}
          />
        </View>

        <Text style={styles.label}>Current Stage *</Text>
        <View style={styles.stageContainer}>
          {['PREGNANT', 'POSTPARTUM'].map((stage) => (
            <TouchableOpacity
              key={stage}
              style={[
                styles.stageOption,
                formData.stage === stage && styles.stageOptionSelected
              ]}
              onPress={() => setFormData({ ...formData, stage })}
            >
              <Text style={[
                styles.stageText,
                formData.stage === stage && styles.stageTextSelected
              ]}>
                {stage.charAt(0) + stage.slice(1).toLowerCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {formData.stage === 'POSTPARTUM' && (
          <>
            <Text style={styles.label}>Weeks/Months Postpartum</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="e.g., 8 weeks or 2 months"
                value={formData.weeks}
                onChangeText={(text) => setFormData({ ...formData, weeks: text })}
              />
            </View>
          </>
        )}

        <Text style={styles.label}>Partner/Family Support Contact (Optional)</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="call-outline" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Phone or Email"
            value={formData.partnerContact}
            onChangeText={(text) => setFormData({ ...formData, partnerContact: text })}
          />
        </View>

        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  photoContainer: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#667eea',
    borderStyle: 'dashed',
  },
  photoText: {
    marginTop: 8,
    color: '#667eea',
    fontSize: 14,
    fontWeight: '600',
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  genderOption: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  genderOptionSelected: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  genderText: {
    fontSize: 16,
    color: '#333',
  },
  genderTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  stageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  stageOption: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  stageOptionSelected: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  stageText: {
    fontSize: 16,
    color: '#333',
  },
  stageTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#667eea',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
