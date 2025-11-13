import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MOODS = [
  { id: 'very-happy', emoji: '😄', label: 'Very Happy', color: '#4CAF50' },
  { id: 'happy', emoji: '🙂', label: 'Happy', color: '#8BC34A' },
  { id: 'neutral', emoji: '😐', label: 'Neutral', color: '#FFC107' },
  { id: 'sad', emoji: '😔', label: 'Sad', color: '#FF9800' },
  { id: 'very-sad', emoji: '😢', label: 'Very Sad', color: '#F44336' },
];

export default function MoodCheckInScreen({ navigation }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [notes, setNotes] = useState('');

  const handleSubmit = async () => {
    if (!selectedMood) {
      Alert.alert('Please select a mood', 'Choose how you are feeling today');
      return;
    }

    // TODO: API call to save mood check-in
    Alert.alert(
      'Thank you!',
      'Your mood has been recorded. Keep tracking your wellness journey!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Daily Mood Check-In</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>How are you feeling today?</Text>
        <Text style={styles.subtitle}>Select the emoji that best describes your mood</Text>

        <View style={styles.moodsContainer}>
          {MOODS.map((mood) => (
            <TouchableOpacity
              key={mood.id}
              style={[
                styles.moodOption,
                selectedMood === mood.id && styles.moodOptionSelected,
                selectedMood === mood.id && { borderColor: mood.color },
              ]}
              onPress={() => setSelectedMood(mood.id)}
            >
              <Text style={styles.emoji}>{mood.emoji}</Text>
              <Text style={styles.moodLabel}>{mood.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.notesContainer}>
          <Text style={styles.notesLabel}>What's on your mind? (Optional)</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Share your thoughts, feelings, or what happened today..."
            multiline
            numberOfLines={6}
            maxLength={500}
            value={notes}
            onChangeText={setNotes}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>{notes.length}/500</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            !selectedMood && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!selectedMood}
        >
          <Text style={styles.submitButtonText}>Submit Check-In</Text>
        </TouchableOpacity>

        <View style={styles.streakContainer}>
          <Ionicons name="flame" size={24} color="#FF5722" />
          <Text style={styles.streakText}>7-day streak! Keep it up! 🎉</Text>
        </View>
      </View>
    </ScrollView>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    padding: 20,
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  moodsContainer: {
    marginBottom: 30,
  },
  moodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  moodOptionSelected: {
    backgroundColor: '#f0f0f0',
    borderWidth: 3,
  },
  emoji: {
    fontSize: 40,
    marginRight: 20,
  },
  moodLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  notesContainer: {
    marginBottom: 30,
  },
  notesLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  notesInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#333',
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  charCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#667eea',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF3E0',
    padding: 15,
    borderRadius: 12,
  },
  streakText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF5722',
    marginLeft: 10,
  },
});
