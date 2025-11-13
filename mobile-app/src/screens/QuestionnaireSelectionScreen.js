import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const QUESTIONNAIRES = [
  {
    id: 'epds',
    title: 'EPDS',
    fullName: 'Edinburgh Postnatal Depression Scale',
    description: 'Screens for postpartum depression symptoms',
    duration: '5 minutes',
    questions: 10,
    icon: 'heart',
    color: '#E91E63',
    lastCompleted: '2024-11-06',
    screen: 'EPDSQuestionnaire',
  },
  {
    id: 'gad7',
    title: 'GAD-7',
    fullName: 'Generalized Anxiety Disorder Scale',
    description: 'Measures anxiety levels and symptoms',
    duration: '3 minutes',
    questions: 7,
    icon: 'alert-circle',
    color: '#9C27B0',
    lastCompleted: '2024-11-05',
    screen: 'GAD7Questionnaire',
  },
  {
    id: 'pss',
    title: 'PSS',
    fullName: 'Perceived Stress Scale',
    description: 'Assesses perceived stress levels',
    duration: '4 minutes',
    questions: 10,
    icon: 'flash',
    color: '#FF9800',
    lastCompleted: null,
    screen: 'PSSQuestionnaire',
  },
];

export default function QuestionnaireSelectionScreen({ navigation }) {
  const handleStartQuestionnaire = (questionnaire) => {
    // TODO: Navigate to specific questionnaire screen when implemented
    console.log('Start questionnaire:', questionnaire.id);
  };

  const getDaysSinceCompleted = (dateString) => {
    if (!dateString) return null;
    const lastDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Mental Health Assessments</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.intro}>
          Regular assessments help track your mental well-being. Choose a questionnaire to begin:
        </Text>

        {QUESTIONNAIRES.map((questionnaire) => {
          const daysSince = getDaysSinceCompleted(questionnaire.lastCompleted);
          const isDue = !daysSince || daysSince >= 7;

          return (
            <TouchableOpacity
              key={questionnaire.id}
              style={[
                styles.card,
                isDue && styles.cardDue,
              ]}
              onPress={() => handleStartQuestionnaire(questionnaire)}
            >
              <View style={[styles.iconContainer, { backgroundColor: questionnaire.color }]}>
                <Ionicons name={questionnaire.icon} size={32} color="#fff" />
              </View>

              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{questionnaire.title}</Text>
                  {isDue && (
                    <View style={styles.dueBadge}>
                      <Text style={styles.dueBadgeText}>Due</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.cardFullName}>{questionnaire.fullName}</Text>
                <Text style={styles.cardDescription}>{questionnaire.description}</Text>

                <View style={styles.cardMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={16} color="#666" />
                    <Text style={styles.metaText}>{questionnaire.duration}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="list-outline" size={16} color="#666" />
                    <Text style={styles.metaText}>{questionnaire.questions} questions</Text>
                  </View>
                </View>

                {questionnaire.lastCompleted && (
                  <Text style={styles.lastCompleted}>
                    Last completed: {daysSince} day{daysSince !== 1 ? 's' : ''} ago
                  </Text>
                )}
              </View>

              <Ionicons name="chevron-forward" size={24} color="#999" />
            </TouchableOpacity>
          );
        })}

        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={24} color="#667eea" />
          <Text style={styles.infoText}>
            We recommend taking these assessments weekly to track your progress effectively.
            All responses are confidential and encrypted.
          </Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  intro: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 24,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardDue: {
    borderColor: '#FFB74D',
    backgroundColor: '#FFF8E1',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  dueBadge: {
    backgroundColor: '#FFB74D',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  dueBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardFullName: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  cardMeta: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  lastCompleted: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E8EAF6',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 30,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#667eea',
    marginLeft: 10,
    lineHeight: 20,
  },
});
