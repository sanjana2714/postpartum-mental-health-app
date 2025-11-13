import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const getEPDSInterpretation = (score) => {
  if (score < 10) {
    return {
      level: 'Normal',
      color: '#4CAF50',
      icon: 'checkmark-circle',
      title: 'You\'re doing well!',
      message: 'Your score indicates minimal symptoms of postpartum depression.',
      recommendations: [
        'Continue your self-care routine',
        'Keep up with regular mood tracking',
        'Maintain social connections',
        'Explore our wellness resources',
      ],
      severity: 'green',
    };
  } else if (score >= 10 && score <= 12) {
    return {
      level: 'Mild',
      color: '#FFB74D',
      icon: 'alert-circle',
      title: 'Keep monitoring your wellness',
      message: 'Your score suggests mild symptoms that warrant attention.',
      recommendations: [
        'Practice relaxation techniques daily',
        'Use our guided meditation resources',
        'Consider talking to someone you trust',
        'Monitor your symptoms weekly',
        'Explore our education library',
      ],
      severity: 'yellow',
    };
  } else {
    return {
      level: 'Moderate to Severe',
      color: '#F44336',
      icon: 'warning',
      title: 'We recommend professional support',
      message: 'Your score indicates moderate to severe symptoms. Please consider reaching out for professional help.',
      recommendations: [
        'Contact your healthcare provider',
        'Reach out to our crisis helpline',
        'Talk to a mental health professional',
        'Inform a family member or friend',
        'Use our AI support for immediate guidance',
      ],
      severity: 'red',
      urgent: true,
    };
  }
};

const getGAD7Interpretation = (score) => {
  if (score <= 4) {
    return {
      level: 'Minimal',
      color: '#4CAF50',
      icon: 'checkmark-circle',
      title: 'Anxiety levels are minimal',
      message: 'Your anxiety symptoms are within the normal range.',
      recommendations: [
        'Maintain your current coping strategies',
        'Continue regular self-monitoring',
        'Practice mindfulness exercises',
      ],
      severity: 'green',
    };
  } else if (score <= 9) {
    return {
      level: 'Mild',
      color: '#8BC34A',
      icon: 'alert-circle',
      title: 'Mild anxiety symptoms',
      message: 'You\'re experiencing mild anxiety that can be managed.',
      recommendations: [
        'Try breathing exercises',
        'Engage in regular physical activity',
        'Use our relaxation resources',
        'Monitor your symptoms',
      ],
      severity: 'yellow',
    };
  } else if (score <= 14) {
    return {
      level: 'Moderate',
      color: '#FFB74D',
      icon: 'warning',
      title: 'Moderate anxiety symptoms',
      message: 'Your anxiety levels suggest you may benefit from support.',
      recommendations: [
        'Consider speaking with a counselor',
        'Practice stress management techniques',
        'Use our AI chatbot for support',
        'Reach out to support groups',
      ],
      severity: 'yellow',
    };
  } else {
    return {
      level: 'Severe',
      color: '#F44336',
      icon: 'warning',
      title: 'Severe anxiety symptoms',
      message: 'Your anxiety levels are high. Professional help is recommended.',
      recommendations: [
        'Contact a mental health professional',
        'Reach out to our crisis helpline',
        'Inform your healthcare provider',
        'Use our emergency support resources',
      ],
      severity: 'red',
      urgent: true,
    };
  }
};

const getPSSInterpretation = (score) => {
  if (score <= 13) {
    return {
      level: 'Low Stress',
      color: '#4CAF50',
      icon: 'checkmark-circle',
      title: 'Your stress levels are low',
      message: 'You\'re managing stress well.',
      recommendations: [
        'Continue your current strategies',
        'Maintain work-life balance',
        'Keep up healthy habits',
      ],
      severity: 'green',
    };
  } else if (score <= 26) {
    return {
      level: 'Moderate Stress',
      color: '#FFB74D',
      icon: 'alert-circle',
      title: 'Moderate stress levels',
      message: 'Your stress is at a moderate level that needs attention.',
      recommendations: [
        'Practice stress reduction techniques',
        'Improve time management',
        'Seek social support',
        'Try relaxation exercises',
      ],
      severity: 'yellow',
    };
  } else {
    return {
      level: 'High Stress',
      color: '#F44336',
      icon: 'warning',
      title: 'High stress levels detected',
      message: 'You\'re experiencing high stress. Consider seeking support.',
      recommendations: [
        'Speak with a healthcare provider',
        'Join a support group',
        'Use professional counseling',
        'Practice daily stress management',
      ],
      severity: 'red',
      urgent: true,
    };
  }
};

export default function QuestionnaireResultsScreen({ route, navigation }) {
  const { type, score, responses } = route.params;

  let interpretation;
  if (type === 'EPDS') {
    interpretation = getEPDSInterpretation(score);
  } else if (type === 'GAD7') {
    interpretation = getGAD7Interpretation(score);
  } else if (type === 'PSS') {
    interpretation = getPSSInterpretation(score);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Assessment Complete</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={[styles.scoreCard, { backgroundColor: interpretation.color + '20' }]}>
          <Ionicons name={interpretation.icon} size={60} color={interpretation.color} />
          <Text style={styles.scoreTitle}>Your Score</Text>
          <Text style={[styles.scoreValue, { color: interpretation.color }]}>{score}</Text>
          <View style={[styles.levelBadge, { backgroundColor: interpretation.color }]}>
            <Text style={styles.levelText}>{interpretation.level}</Text>
          </View>
        </View>

        <View style={styles.interpretationCard}>
          <Text style={styles.interpretationTitle}>{interpretation.title}</Text>
          <Text style={styles.interpretationMessage}>{interpretation.message}</Text>
        </View>

        <View style={styles.recommendationsCard}>
          <Text style={styles.sectionTitle}>Recommended Actions</Text>
          {interpretation.recommendations.map((recommendation, index) => (
            <View key={index} style={styles.recommendationItem}>
              <Ionicons name="checkmark-circle" size={20} color={interpretation.color} />
              <Text style={styles.recommendationText}>{recommendation}</Text>
            </View>
          ))}
        </View>

        {interpretation.urgent && (
          <TouchableOpacity style={styles.urgentCard}>
            <Ionicons name="call" size={24} color="#fff" />
            <View style={styles.urgentContent}>
              <Text style={styles.urgentTitle}>Need immediate support?</Text>
              <Text style={styles.urgentText}>Call our 24/7 helpline: 1-800-123-4567</Text>
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              // TODO: Navigate to Progress screen
              console.log('View Trends');
            }}
          >
            <Ionicons name="trending-up" size={20} color="#667eea" />
            <Text style={styles.actionButtonText}>View Trends</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              // TODO: Navigate to AI Chat
              console.log('Talk to AI');
            }}
          >
            <Ionicons name="chatbubbles" size={20} color="#667eea" />
            <Text style={styles.actionButtonText}>Talk to AI</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
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
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  scoreCard: {
    alignItems: 'center',
    padding: 30,
    borderRadius: 20,
    marginBottom: 20,
  },
  scoreTitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 15,
  },
  scoreValue: {
    fontSize: 64,
    fontWeight: 'bold',
    marginTop: 10,
  },
  levelBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 15,
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  interpretationCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  interpretationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  interpretationMessage: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  recommendationsCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  recommendationText: {
    flex: 1,
    fontSize: 15,
    color: '#666',
    marginLeft: 12,
    lineHeight: 22,
  },
  urgentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F44336',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  urgentContent: {
    flex: 1,
    marginLeft: 15,
  },
  urgentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  urgentText: {
    fontSize: 14,
    color: '#fff',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#667eea',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#667eea',
    marginLeft: 8,
  },
  doneButton: {
    backgroundColor: '#667eea',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  doneButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
