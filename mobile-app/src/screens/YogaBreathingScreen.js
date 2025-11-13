import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EXERCISES = [
  {
    id: 1,
    title: '10-Minute Postpartum Yoga',
    duration: '10 min',
    difficulty: 'Beginner',
    type: 'video',
    icon: 'fitness',
    color: '#9C27B0',
    description: 'Gentle yoga sequence for new mothers',
    completed: false,
  },
  {
    id: 2,
    title: 'Box Breathing Technique',
    duration: '5 min',
    difficulty: 'Beginner',
    type: 'guided',
    icon: 'git-compare',
    color: '#2196F3',
    description: 'Calming breathwork for anxiety relief',
    completed: true,
  },
  {
    id: 3,
    title: 'Progressive Muscle Relaxation',
    duration: '15 min',
    difficulty: 'Beginner',
    type: 'audio',
    icon: 'radio',
    color: '#4CAF50',
    description: 'Release tension throughout your body',
    completed: false,
  },
  {
    id: 4,
    title: 'Morning Energizing Flow',
    duration: '12 min',
    difficulty: 'Intermediate',
    type: 'video',
    icon: 'sunny',
    color: '#FF9800',
    description: 'Start your day with energy',
    completed: false,
  },
  {
    id: 5,
    title: '4-7-8 Breathing for Sleep',
    duration: '8 min',
    difficulty: 'Beginner',
    type: 'guided',
    icon: 'moon',
    color: '#673AB7',
    description: 'Fall asleep faster naturally',
    completed: false,
  },
  {
    id: 6,
    title: 'Pelvic Floor Exercises',
    duration: '10 min',
    difficulty: 'Beginner',
    type: 'video',
    icon: 'body',
    color: '#E91E63',
    description: 'Strengthen your core postpartum',
    completed: false,
  },
];

export default function YogaBreathingScreen({ navigation }) {
  const [exercises, setExercises] = useState(EXERCISES);

  const handleExercisePress = (exercise) => {
    // TODO: Navigate to exercise player
    console.log('Play exercise:', exercise.title);
  };

  const handleCompleteExercise = (exerciseId) => {
    setExercises(exercises.map(ex =>
      ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
    ));
    // TODO: Award badge if milestone reached
  };

  const completedCount = exercises.filter(ex => ex.completed).length;
  const totalCount = exercises.length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Yoga & Breathing</Text>
          <Text style={styles.headerSubtitle}>Wellness exercises for you</Text>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressTitle}>Your Progress</Text>
            <Text style={styles.progressCount}>
              {completedCount} of {totalCount} exercises completed
            </Text>
          </View>
          <View style={styles.progressCircle}>
            <Text style={styles.progressPercentage}>
              {Math.round((completedCount / totalCount) * 100)}%
            </Text>
          </View>
        </View>

        {/* Exercises List */}
        <View style={styles.exercisesContainer}>
          {exercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              style={styles.exerciseCard}
              onPress={() => handleExercisePress(exercise)}
            >
              <View style={[styles.exerciseIcon, { backgroundColor: exercise.color + '20' }]}>
                <Ionicons name={exercise.icon} size={32} color={exercise.color} />
              </View>
              <View style={styles.exerciseContent}>
                <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                <Text style={styles.exerciseDescription}>{exercise.description}</Text>
                <View style={styles.exerciseMeta}>
                  <View style={styles.metaTag}>
                    <Ionicons name="time-outline" size={14} color="#666" />
                    <Text style={styles.metaText}>{exercise.duration}</Text>
                  </View>
                  <View style={styles.metaTag}>
                    <Ionicons name="fitness-outline" size={14} color="#666" />
                    <Text style={styles.metaText}>{exercise.difficulty}</Text>
                  </View>
                  <View style={styles.metaTag}>
                    <Ionicons
                      name={
                        exercise.type === 'video'
                          ? 'videocam-outline'
                          : exercise.type === 'audio'
                          ? 'volume-high-outline'
                          : 'play-outline'
                      }
                      size={14}
                      color="#666"
                    />
                    <Text style={styles.metaText}>{exercise.type}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.completeButton}
                onPress={() => handleCompleteExercise(exercise.id)}
              >
                <Ionicons
                  name={exercise.completed ? 'checkmark-circle' : 'ellipse-outline'}
                  size={28}
                  color={exercise.completed ? '#4CAF50' : '#ccc'}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Achievement */}
        {completedCount >= 3 && (
          <View style={styles.achievementCard}>
            <Ionicons name="trophy" size={40} color="#FFB74D" />
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>Keep it up!</Text>
              <Text style={styles.achievementText}>
                You've completed {completedCount} exercises. You're building a great wellness habit!
              </Text>
            </View>
          </View>
        )}
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
    backgroundColor: '#9C27B0',
  },
  backButton: {
    marginRight: 15,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e8d4ff',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  progressCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  progressInfo: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  progressCount: {
    fontSize: 14,
    color: '#666',
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8EAF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#667eea',
  },
  exercisesContainer: {
    marginBottom: 20,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 16,
    marginBottom: 15,
  },
  exerciseIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  exerciseContent: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  exerciseMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginTop: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  completeButton: {
    padding: 8,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  achievementContent: {
    flex: 1,
    marginLeft: 15,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  achievementText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
