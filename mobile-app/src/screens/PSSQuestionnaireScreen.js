import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Perceived Stress Scale (PSS-10) - Validated Questions
const PSS_QUESTIONS = [
  {
    id: 1,
    question: 'How often have you been upset because of something that happened unexpectedly?',
  },
  {
    id: 2,
    question: 'How often have you felt that you were unable to control the important things in your life?',
  },
  {
    id: 3,
    question: 'How often have you felt nervous and stressed?',
  },
  {
    id: 4,
    question: 'How often have you felt confident about your ability to handle your personal problems?',
    reversed: true,
  },
  {
    id: 5,
    question: 'How often have you felt that things were going your way?',
    reversed: true,
  },
  {
    id: 6,
    question: 'How often have you found that you could not cope with all the things that you had to do?',
  },
  {
    id: 7,
    question: 'How often have you been able to control irritations in your life?',
    reversed: true,
  },
  {
    id: 8,
    question: 'How often have you felt that you were on top of things?',
    reversed: true,
  },
  {
    id: 9,
    question: 'How often have you been angered because of things that happened that were outside of your control?',
  },
  {
    id: 10,
    question: 'How often have you felt difficulties were piling up so high that you could not overcome them?',
  },
];

const RESPONSE_OPTIONS = [
  { text: 'Never', score: 0 },
  { text: 'Almost never', score: 1 },
  { text: 'Sometimes', score: 2 },
  { text: 'Fairly often', score: 3 },
  { text: 'Very often', score: 4 },
];

export default function PSSQuestionnaireScreen({ navigation }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});

  const handleSelectOption = (optionIndex) => {
    const question = PSS_QUESTIONS[currentQuestion];
    let score = RESPONSE_OPTIONS[optionIndex].score;
    
    // Reverse scoring for positively stated questions (4, 5, 7, 8)
    if (question.reversed) {
      score = 4 - score;
    }

    const newResponses = {
      ...responses,
      [currentQuestion]: {
        questionId: question.id,
        score: score,
        answer: RESPONSE_OPTIONS[optionIndex].text,
      },
    };
    setResponses(newResponses);
  };

  const handleNext = () => {
    if (!responses[currentQuestion]) {
      Alert.alert('Please select an option', 'Choose the option that best describes your experience');
      return;
    }

    if (currentQuestion < PSS_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const totalScore = Object.values(responses).reduce((sum, response) => sum + response.score, 0);
    navigation.navigate('QuestionnaireResults', {
      type: 'PSS',
      score: totalScore,
      responses: responses,
    });
  };

  const question = PSS_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / PSS_QUESTIONS.length) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>PSS Assessment</Text>
          <Text style={styles.questionNumber}>
            Question {currentQuestion + 1} of {PSS_QUESTIONS.length}
          </Text>
        </View>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.instruction}>
          In the last month:
        </Text>
        <Text style={styles.question}>{question.question}</Text>

        <View style={styles.optionsContainer}>
          {RESPONSE_OPTIONS.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionCard,
                responses[currentQuestion]?.answer === option.text && styles.optionCardSelected,
              ]}
              onPress={() => handleSelectOption(index)}
            >
              <View style={[
                styles.radio,
                responses[currentQuestion]?.answer === option.text && styles.radioSelected,
              ]}>
                {responses[currentQuestion]?.answer === option.text && (
                  <View style={styles.radioDot} />
                )}
              </View>
              <Text style={[
                styles.optionText,
                responses[currentQuestion]?.answer === option.text && styles.optionTextSelected,
              ]}>
                {option.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.navigationButtons}>
        {currentQuestion > 0 && (
          <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
            <Ionicons name="chevron-back" size={20} color="#FF9800" />
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.navButton, styles.navButtonPrimary, currentQuestion === 0 && { flex: 1 }]}
          onPress={handleNext}
        >
          <Text style={styles.navButtonPrimaryText}>
            {currentQuestion === PSS_QUESTIONS.length - 1 ? 'Submit' : 'Next'}
          </Text>
          {currentQuestion < PSS_QUESTIONS.length - 1 && (
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 60, backgroundColor: '#fff' },
  backButton: { marginRight: 15 },
  headerContent: { flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  questionNumber: { fontSize: 14, color: '#666', marginTop: 4 },
  progressBarContainer: { height: 4, backgroundColor: '#e0e0e0' },
  progressBar: { height: '100%', backgroundColor: '#FF9800' },
  content: { flex: 1 },
  contentContainer: { padding: 20 },
  instruction: { fontSize: 14, color: '#999', fontStyle: 'italic', marginBottom: 10 },
  question: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 30, lineHeight: 28 },
  optionsContainer: { marginBottom: 20 },
  optionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 12, borderWidth: 2, borderColor: '#e0e0e0' },
  optionCardSelected: { borderColor: '#FF9800', backgroundColor: '#fff8f0' },
  radio: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#ccc', marginRight: 15, justifyContent: 'center', alignItems: 'center' },
  radioSelected: { borderColor: '#FF9800' },
  radioDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#FF9800' },
  optionText: { flex: 1, fontSize: 16, color: '#333', lineHeight: 22 },
  optionTextSelected: { color: '#FF9800', fontWeight: '600' },
  navigationButtons: { flexDirection: 'row', padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e0e0e0' },
  navButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 12, marginHorizontal: 5, borderWidth: 2, borderColor: '#FF9800' },
  navButtonPrimary: { backgroundColor: '#FF9800', borderColor: '#FF9800' },
  navButtonText: { fontSize: 16, fontWeight: 'bold', color: '#FF9800', marginLeft: 5 },
  navButtonPrimaryText: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginRight: 5 },
});
