import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Edinburgh Postnatal Depression Scale (EPDS) - Validated Questions
const EPDS_QUESTIONS = [
  {
    id: 1,
    question: 'I have been able to laugh and see the funny side of things',
    options: [
      { text: 'As much as I always could', score: 0 },
      { text: 'Not quite so much now', score: 1 },
      { text: 'Definitely not so much now', score: 2 },
      { text: 'Not at all', score: 3 },
    ],
  },
  {
    id: 2,
    question: 'I have looked forward with enjoyment to things',
    options: [
      { text: 'As much as I ever did', score: 0 },
      { text: 'Rather less than I used to', score: 1 },
      { text: 'Definitely less than I used to', score: 2 },
      { text: 'Hardly at all', score: 3 },
    ],
  },
  {
    id: 3,
    question: 'I have blamed myself unnecessarily when things went wrong',
    options: [
      { text: 'Yes, most of the time', score: 3 },
      { text: 'Yes, some of the time', score: 2 },
      { text: 'Not very often', score: 1 },
      { text: 'No, never', score: 0 },
    ],
  },
  {
    id: 4,
    question: 'I have been anxious or worried for no good reason',
    options: [
      { text: 'No, not at all', score: 0 },
      { text: 'Hardly ever', score: 1 },
      { text: 'Yes, sometimes', score: 2 },
      { text: 'Yes, very often', score: 3 },
    ],
  },
  {
    id: 5,
    question: 'I have felt scared or panicky for no very good reason',
    options: [
      { text: 'Yes, quite a lot', score: 3 },
      { text: 'Yes, sometimes', score: 2 },
      { text: 'No, not much', score: 1 },
      { text: 'No, not at all', score: 0 },
    ],
  },
  {
    id: 6,
    question: 'Things have been getting on top of me',
    options: [
      { text: 'Yes, most of the time I haven\'t been able to cope at all', score: 3 },
      { text: 'Yes, sometimes I haven\'t been coping as well as usual', score: 2 },
      { text: 'No, most of the time I have coped quite well', score: 1 },
      { text: 'No, I have been coping as well as ever', score: 0 },
    ],
  },
  {
    id: 7,
    question: 'I have been so unhappy that I have had difficulty sleeping',
    options: [
      { text: 'Yes, most of the time', score: 3 },
      { text: 'Yes, sometimes', score: 2 },
      { text: 'Not very often', score: 1 },
      { text: 'No, not at all', score: 0 },
    ],
  },
  {
    id: 8,
    question: 'I have felt sad or miserable',
    options: [
      { text: 'Yes, most of the time', score: 3 },
      { text: 'Yes, quite often', score: 2 },
      { text: 'Not very often', score: 1 },
      { text: 'No, not at all', score: 0 },
    ],
  },
  {
    id: 9,
    question: 'I have been so unhappy that I have been crying',
    options: [
      { text: 'Yes, most of the time', score: 3 },
      { text: 'Yes, quite often', score: 2 },
      { text: 'Only occasionally', score: 1 },
      { text: 'No, never', score: 0 },
    ],
  },
  {
    id: 10,
    question: 'The thought of harming myself has occurred to me',
    options: [
      { text: 'Yes, quite often', score: 3 },
      { text: 'Sometimes', score: 2 },
      { text: 'Hardly ever', score: 1 },
      { text: 'Never', score: 0 },
    ],
  },
];

export default function EPDSQuestionnaireScreen({ navigation }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});

  const handleSelectOption = (optionIndex) => {
    const newResponses = {
      ...responses,
      [currentQuestion]: {
        questionId: EPDS_QUESTIONS[currentQuestion].id,
        score: EPDS_QUESTIONS[currentQuestion].options[optionIndex].score,
        answer: EPDS_QUESTIONS[currentQuestion].options[optionIndex].text,
      },
    };
    setResponses(newResponses);
  };

  const handleNext = () => {
    if (!responses[currentQuestion]) {
      Alert.alert('Please select an option', 'Choose the option that best describes how you feel');
      return;
    }

    if (currentQuestion < EPDS_QUESTIONS.length - 1) {
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
    
    // Check for critical response (Question 10)
    const question10Response = responses[9];
    if (question10Response && question10Response.score >= 1) {
      Alert.alert(
        'Immediate Support Available',
        'We noticed you may be having thoughts of self-harm. Please reach out for help immediately.',
        [
          {
            text: 'Contact Helpline',
            onPress: () => {
              // TODO: Navigate to emergency alert or call helpline
            },
          },
          {
            text: 'Continue',
            onPress: () => navigation.navigate('QuestionnaireResults', {
              type: 'EPDS',
              score: totalScore,
              responses: responses,
            }),
          },
        ]
      );
    } else {
      navigation.navigate('QuestionnaireResults', {
        type: 'EPDS',
        score: totalScore,
        responses: responses,
      });
    }
  };

  const question = EPDS_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / EPDS_QUESTIONS.length) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>EPDS Assessment</Text>
          <Text style={styles.questionNumber}>
            Question {currentQuestion + 1} of {EPDS_QUESTIONS.length}
          </Text>
        </View>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.instruction}>
          In the past 7 days:
        </Text>
        <Text style={styles.question}>{question.question}</Text>

        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => (
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
          <TouchableOpacity
            style={styles.navButton}
            onPress={handlePrevious}
          >
            <Ionicons name="chevron-back" size={20} color="#667eea" />
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.navButton, styles.navButtonPrimary, currentQuestion === 0 && { flex: 1 }]}
          onPress={handleNext}
        >
          <Text style={styles.navButtonPrimaryText}>
            {currentQuestion === EPDS_QUESTIONS.length - 1 ? 'Submit' : 'Next'}
          </Text>
          {currentQuestion < EPDS_QUESTIONS.length - 1 && (
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
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
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  questionNumber: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#e0e0e0',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#667eea',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  instruction: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    lineHeight: 28,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  optionCardSelected: {
    borderColor: '#667eea',
    backgroundColor: '#f5f7ff',
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#667eea',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#667eea',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  optionTextSelected: {
    color: '#667eea',
    fontWeight: '600',
  },
  navigationButtons: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#667eea',
  },
  navButtonPrimary: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#667eea',
    marginLeft: 5,
  },
  navButtonPrimaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 5,
  },
});
