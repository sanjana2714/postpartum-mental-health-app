import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HomeTab() {
  const navigation = useNavigation();

  const quickActions = [
    {
      id: 'mood',
      title: 'Daily Mood',
      subtitle: 'Check-In',
      icon: 'happy-outline',
      color: '#FFB74D',
      screen: 'MoodCheckIn',
    },
    {
      id: 'questionnaire',
      title: 'Take',
      subtitle: 'Questionnaire',
      icon: 'clipboard-outline',
      color: '#64B5F6',
      screen: 'QuestionnaireSelection',
    },
    {
      id: 'ai',
      title: 'AI Support',
      subtitle: 'Chat Now',
      icon: 'chatbubbles-outline',
      color: '#81C784',
      screen: 'AIChat',
    },
    {
      id: 'progress',
      title: 'View',
      subtitle: 'Progress',
      icon: 'trending-up-outline',
      color: '#BA68C8',
      screen: 'Progress',
    },
  ];

  const getCurrentDate = () => {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.userName}>Sarah</Text>
          <Text style={styles.date}>{getCurrentDate()}</Text>
          <Text style={styles.postpartumInfo}>8 weeks postpartum</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.actionCard, { backgroundColor: action.color + '20' }]}
              onPress={() => {
                if (action.screen) {
                  navigation.navigate(action.screen);
                }
              }}
            >
              <View style={[styles.iconContainer, { backgroundColor: action.color }]}>
                <Ionicons name={action.icon} size={28} color="#fff" />
              </View>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.todayTasksContainer}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.taskCard}>
          <Ionicons name="checkmark-circle" size={24} color="#81C784" />
          <View style={styles.taskInfo}>
            <Text style={styles.taskTitle}>Morning Mood Check</Text>
            <Text style={styles.taskSubtitle}>Completed at 9:30 AM</Text>
          </View>
        </View>
        <View style={styles.taskCard}>
          <Ionicons name="ellipse-outline" size={24} color="#E0E0E0" />
          <View style={styles.taskInfo}>
            <Text style={styles.taskTitle}>Weekly EPDS Assessment</Text>
            <Text style={styles.taskSubtitle}>Due today</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
        <View style={styles.taskCard}>
          <Ionicons name="ellipse-outline" size={24} color="#E0E0E0" />
          <View style={styles.taskInfo}>
            <Text style={styles.taskTitle}>Evening Meditation</Text>
            <Text style={styles.taskSubtitle}>Scheduled for 7:00 PM</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
      </View>

      <View style={styles.insightContainer}>
        <Text style={styles.sectionTitle}>Your Insight</Text>
        <View style={styles.insightCard}>
          <Ionicons name="sunny" size={40} color="#FFB74D" />
          <Text style={styles.insightTitle}>You're doing great!</Text>
          <Text style={styles.insightText}>
            Your mood has been consistently positive this week. Keep up the good work!
          </Text>
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  date: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  postpartumInfo: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
    marginTop: 4,
  },
  notificationButton: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: '#FF5252',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  quickActionsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  todayTasksContainer: {
    padding: 20,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  taskInfo: {
    flex: 1,
    marginLeft: 12,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  taskSubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  insightContainer: {
    padding: 20,
    marginBottom: 30,
  },
  insightCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
  },
  insightText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
});
