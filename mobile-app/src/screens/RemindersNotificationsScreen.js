import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RemindersNotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = useState({
    moodCheckIn: true,
    questionnaires: true,
    medication: false,
    educational: true,
    community: false,
  });

  const [medications, setMedications] = useState([
    { id: 1, name: 'Prenatal Vitamin', dosage: '1 tablet', frequency: 'Daily', time: '9:00 AM' },
  ]);

  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    time: '',
  });

  const toggleNotification = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const handleAddMedication = () => {
    if (!newMedication.name || !newMedication.dosage) {
      Alert.alert('Error', 'Please fill in medication name and dosage');
      return;
    }

    const newMed = {
      id: Date.now(),
      ...newMedication,
    };
    setMedications([...medications, newMed]);
    setNewMedication({ name: '', dosage: '', frequency: '', time: '' });
    Alert.alert('Success', 'Medication reminder added');
  };

  const handleDeleteMedication = (id) => {
    Alert.alert(
      'Delete Reminder',
      'Are you sure you want to delete this medication reminder?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setMedications(medications.filter(med => med.id !== id));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reminders & Notifications</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Settings</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Daily Mood Check-In</Text>
                <Text style={styles.settingDescription}>Reminder at 9:00 AM</Text>
              </View>
              <Switch
                value={notifications.moodCheckIn}
                onValueChange={() => toggleNotification('moodCheckIn')}
                trackColor={{ false: '#ccc', true: '#667eea' }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Weekly Questionnaires</Text>
                <Text style={styles.settingDescription}>Reminder every Monday</Text>
              </View>
              <Switch
                value={notifications.questionnaires}
                onValueChange={() => toggleNotification('questionnaires')}
                trackColor={{ false: '#ccc', true: '#667eea' }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Medication Reminders</Text>
                <Text style={styles.settingDescription}>Custom times</Text>
              </View>
              <Switch
                value={notifications.medication}
                onValueChange={() => toggleNotification('medication')}
                trackColor={{ false: '#ccc', true: '#667eea' }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Educational Content</Text>
                <Text style={styles.settingDescription}>New articles and tips</Text>
              </View>
              <Switch
                value={notifications.educational}
                onValueChange={() => toggleNotification('educational')}
                trackColor={{ false: '#ccc', true: '#667eea' }}
                thumbColor="#fff"
              />
            </View>

            <View style={[styles.settingRow, styles.lastSettingRow]}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Community Updates</Text>
                <Text style={styles.settingDescription}>Forum replies and mentions</Text>
              </View>
              <Switch
                value={notifications.community}
                onValueChange={() => toggleNotification('community')}
                trackColor={{ false: '#ccc', true: '#667eea' }}
                thumbColor="#fff"
              />
            </View>
          </View>
        </View>

        {/* Medications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medication Reminders</Text>
          {medications.map((med) => (
            <View key={med.id} style={styles.medicationCard}>
              <View style={styles.medicationInfo}>
                <Text style={styles.medicationName}>{med.name}</Text>
                <Text style={styles.medicationDetails}>
                  {med.dosage} • {med.frequency} • {med.time}
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleDeleteMedication(med.id)}>
                <Ionicons name="trash-outline" size={22} color="#F44336" />
              </TouchableOpacity>
            </View>
          ))}

          {/* Add New Medication */}
          <View style={styles.addMedicationCard}>
            <Text style={styles.addMedicationTitle}>Add New Medication</Text>
            <TextInput
              style={styles.medicationInput}
              placeholder="Medication name"
              value={newMedication.name}
              onChangeText={(text) => setNewMedication({ ...newMedication, name: text })}
            />
            <TextInput
              style={styles.medicationInput}
              placeholder="Dosage (e.g., 1 tablet, 5ml)"
              value={newMedication.dosage}
              onChangeText={(text) => setNewMedication({ ...newMedication, dosage: text })}
            />
            <TextInput
              style={styles.medicationInput}
              placeholder="Frequency (e.g., Daily, Twice a day)"
              value={newMedication.frequency}
              onChangeText={(text) => setNewMedication({ ...newMedication, frequency: text })}
            />
            <TextInput
              style={styles.medicationInput}
              placeholder="Time (e.g., 9:00 AM)"
              value={newMedication.time}
              onChangeText={(text) => setNewMedication({ ...newMedication, time: text })}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddMedication}>
              <Ionicons name="add-circle" size={20} color="#fff" />
              <Text style={styles.addButtonText}>Add Medication</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  settingsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lastSettingRow: {
    borderBottomWidth: 0,
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
  medicationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  medicationDetails: {
    fontSize: 14,
    color: '#666',
  },
  addMedicationCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
  },
  addMedicationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  medicationInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: '#333',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#667eea',
    padding: 14,
    borderRadius: 8,
    marginTop: 5,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
});
