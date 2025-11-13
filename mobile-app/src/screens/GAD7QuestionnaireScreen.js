import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Generalized Anxiety Disorder 7-item (GAD-7) Scale - Validated Questions
const GAD7_QUESTIONS = [
  {
    id: 1,
    question: 'Feeling nervous, anxious, or on edge',
  },
  {
    id: 2,
    question: 'Not being able to stop or control worrying',
  },
  {
    id: 3,
    question: 'Worrying too much about different things',
  },
  {
    id: 4,
    question: 'Trouble relaxing',
  },
  {
    id: 5,
    question: 'Being so restless that it\'s hard to sit still',
  },
  {
    id: 6,
    question: 'Becoming easily annoyed or irritable',
  },
  {
    id: 7,
    question: 'Feeling afraid as if something awful might happen',
  },
];

const RESPONSE_OPTIONS = [
  { text: 'Not at all', score: 0 },
  { text: 'Several days', score: 1 },
  { text: 'More than half the days', score: 2 },
  { text: 'Nearly every day', score: 3 },
];

export default function GAD7QuestionnaireScreen({ navigation }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});

  const handleSelectOption = (optionIndex) => {
    const newResponses = {
      ...responses,
      [currentQuestion]: {
        questionId: GAD7_QUESTIONS[currentQuestion].id,
        score: RESPONSE_OPTIONS[optionIndex].score,
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

    if (currentQuestion < GAD7_QUESTIONS.length - 1) {
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
      type: 'GAD7',
      score: totalScore,
      responses: responses,
    });
  };

  const question = GAD7_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / GAD7_QUESTIONS.length) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>GAD-7 Assessment</Text>
          <Text style={styles.questionNumber}>
            Question {currentQuestion + 1} of {GAD7_QUESTIONS.length}
          </Text>
        </View>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.instruction}>
          Over the last 2 weeks, how often have you been bothered by the following?
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
            <Ionicons name="chevron-back" size={20} color="#9C27B0" />
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.navButton, styles.navButtonPrimary, currentQuestion === 0 && { flex: 1 }]}
          onPress={handleNext}
        >
          <Text style={styles.navButtonPrimaryText}>
            {currentQuestion === GAD7_QUESTIONS.length - 1 ? 'Submit' : 'Next'}
          </Text>
          {currentQuestion < GAD7_QUESTIONS.length - 1 && (
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
  progressBar: { height: '100%', backgroundColor: '#9C27B0' },
  content: { flex: 1 },
  contentContainer: { padding: 20 },
  instruction: { fontSize: 14, color: '#999', fontStyle: 'italic', marginBottom: 10 },
  question: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 30, lineHeight: 28 },
  optionsContainer: { marginBottom: 20 },
  optionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 12, borderWidth: 2, borderColor: '#e0e0e0' },
  optionCardSelected: { borderColor: '#9C27B0', backgroundColor: '#f5f0ff' },
  radio: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#ccc', marginRight: 15, justifyContent: 'center', alignItems: 'center' },
  radioSelected: { borderColor: '#9C27B0' },
  radioDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#9C27B0' },
  optionText: { flex: 1, fontSize: 16, color: '#333', lineHeight: 22 },
  optionTextSelected: { color: '#9C27B0', fontWeight: '600' },
  navigationButtons: { flexDirection: 'row', padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e0e0e0' },
  navButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 12, marginHorizontal: 5, borderWidth: 2, borderColor: '#9C27B0' },
  navButtonPrimary: { backgroundColor: '#9C27B0', borderColor: '#9C27B0' },
  navButtonText: { fontSize: 16, fontWeight: 'bold', color: '#9C27B0', marginLeft: 5 },
  navButtonPrimaryText: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginRight: 5 },
});
