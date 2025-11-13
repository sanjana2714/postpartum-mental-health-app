import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BADGES = [
  {
    id: 1,
    name: 'First Step',
    description: 'Completed your first mood check-in',
    icon: 'footsteps',
    color: '#4CAF50',
    earned: true,
    earnedDate: 'Nov 1, 2024',
  },
  {
    id: 2,
    name: '7-Day Streak',
    description: 'Checked in for 7 consecutive days',
    icon: 'flame',
    color: '#FF5722',
    earned: true,
    earnedDate: 'Nov 8, 2024',
  },
  {
    id: 3,
    name: 'Assessment Champion',
    description: 'Completed all three questionnaires',
    icon: 'trophy',
    color: '#FFB74D',
    earned: true,
    earnedDate: 'Nov 5, 2024',
  },
  {
    id: 4,
    name: 'Wellness Warrior',
    description: 'Completed 10 yoga or breathing exercises',
    icon: 'fitness',
    color: '#9C27B0',
    earned: false,
    progress: 6,
    total: 10,
  },
  {
    id: 5,
    name: 'Knowledge Seeker',
    description: 'Read 5 educational articles',
    icon: 'book',
    color: '#2196F3',
    earned: false,
    progress: 3,
    total: 5,
  },
  {
    id: 6,
    name: 'Community Helper',
    description: 'Posted 10 helpful community messages',
    icon: 'people',
    color: '#00BCD4',
    earned: false,
    progress: 2,
    total: 10,
  },
  {
    id: 7,
    name: 'Month Strong',
    description: 'Maintained wellness routine for 30 days',
    icon: 'calendar',
    color: '#E91E63',
    earned: false,
    progress: 12,
    total: 30,
  },
  {
    id: 8,
    name: 'Self-Care Star',
    description: 'Practiced self-care activities 20 times',
    icon: 'star',
    color: '#FFEB3B',
    earned: false,
    progress: 8,
    total: 20,
  },
];

export default function BadgesGamificationScreen({ navigation }) {
  const earnedBadges = BADGES.filter((b) => b.earned);
  const inProgressBadges = BADGES.filter((b) => !b.earned);
  const totalPoints = earnedBadges.length * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Badges & Achievements</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Points Card */}
        <View style={styles.pointsCard}>
          <View style={styles.pointsIcon}>
            <Ionicons name="medal" size={60} color="#FFB74D" />
          </View>
          <View style={styles.pointsInfo}>
            <Text style={styles.pointsTitle}>Total Points</Text>
            <Text style={styles.pointsValue}>{totalPoints}</Text>
            <Text style={styles.pointsSubtext}>
              {earnedBadges.length} badges earned
            </Text>
          </View>
        </View>

        {/* Progress Overview */}
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Your Progress</Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(earnedBadges.length / BADGES.length) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {earnedBadges.length} of {BADGES.length} badges earned
          </Text>
        </View>

        {/* Earned Badges */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Earned Badges</Text>
          {earnedBadges.map((badge) => (
            <View key={badge.id} style={styles.badgeCard}>
              <View style={[styles.badgeIcon, { backgroundColor: badge.color + '30' }]}>
                <Ionicons name={badge.icon} size={36} color={badge.color} />
              </View>
              <View style={styles.badgeInfo}>
                <Text style={styles.badgeName}>{badge.name}</Text>
                <Text style={styles.badgeDescription}>{badge.description}</Text>
                <Text style={styles.badgeEarnedDate}>Earned on {badge.earnedDate}</Text>
              </View>
              <Ionicons name="checkmark-circle" size={28} color="#4CAF50" />
            </View>
          ))}
        </View>

        {/* In Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>In Progress</Text>
          {inProgressBadges.map((badge) => (
            <View key={badge.id} style={[styles.badgeCard, styles.lockedBadge]}>
              <View style={[styles.badgeIcon, { backgroundColor: '#f0f0f0' }]}>
                <Ionicons name={badge.icon} size={36} color="#ccc" />
              </View>
              <View style={styles.badgeInfo}>
                <Text style={styles.badgeName}>{badge.name}</Text>
                <Text style={styles.badgeDescription}>{badge.description}</Text>
                {badge.progress && (
                  <View style={styles.badgeProgressContainer}>
                    <View style={styles.badgeProgressBar}>
                      <View
                        style={[
                          styles.badgeProgressFill,
                          { width: `${(badge.progress / badge.total) * 100}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.badgeProgressText}>
                      {badge.progress}/{badge.total}
                    </Text>
                  </View>
                )}
              </View>
              <Ionicons name="lock-closed" size={24} color="#ccc" />
            </View>
          ))}
        </View>

        {/* Motivation Card */}
        <View style={styles.motivationCard}>
          <Ionicons name="trophy" size={40} color="#FFB74D" />
          <Text style={styles.motivationTitle}>Keep Going!</Text>
          <Text style={styles.motivationText}>
            You're doing great! Complete your daily check-ins and wellness activities to
            earn more badges and build healthy habits.
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
  pointsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    padding: 25,
    borderRadius: 16,
    marginBottom: 20,
  },
  pointsIcon: {
    marginRight: 20,
  },
  pointsInfo: {
    flex: 1,
  },
  pointsTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  pointsValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFB74D',
    marginBottom: 5,
  },
  pointsSubtext: {
    fontSize: 14,
    color: '#666',
  },
  progressCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#667eea',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  badgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  lockedBadge: {
    opacity: 0.6,
  },
  badgeIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  badgeInfo: {
    flex: 1,
  },
  badgeName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  badgeEarnedDate: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  badgeProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  badgeProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginRight: 10,
    overflow: 'hidden',
  },
  badgeProgressFill: {
    height: '100%',
    backgroundColor: '#667eea',
    borderRadius: 3,
  },
  badgeProgressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#667eea',
  },
  motivationCard: {
    alignItems: 'center',
    backgroundColor: '#E8EAF6',
    padding: 25,
    borderRadius: 16,
    marginBottom: 30,
  },
  motivationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  motivationText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});
