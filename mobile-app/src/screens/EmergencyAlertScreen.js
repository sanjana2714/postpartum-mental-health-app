import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EmergencyAlertScreen({ route, navigation }) {
  const { severity = 'yellow' } = route.params || {};

  const HELPLINE_NUMBER = '1-800-123-4567';
  const CRISIS_TEXT = '741741';

  const handleCallHelpline = () => {
    Linking.openURL(`tel:${HELPLINE_NUMBER}`);
  };

  const handleTextCrisis = () => {
    Linking.openURL(`sms:${CRISIS_TEXT}`);
  };

  const handleContactProvider = () => {
    // TODO: Navigate to provider contact
    console.log('Contact provider');
  };

  const getAlertContent = () => {
    if (severity === 'green') {
      return {
        icon: 'checkmark-circle',
        color: '#4CAF50',
        title: 'You\'re doing well!',
        message: 'Your mental health indicators are positive. Keep up with your self-care routine.',
        actions: [
          {
            title: 'Self-Care Tips',
            icon: 'heart',
            description: 'Continue your wellness practices',
            onPress: () => navigation.navigate('Library'),
          },
          {
            title: 'View Progress',
            icon: 'trending-up',
            description: 'See your improvement over time',
            onPress: () => navigation.navigate('Progress'),
          },
          {
            title: 'Share Success',
            icon: 'people',
            description: 'Inspire others in the community',
            onPress: () => navigation.navigate('Community'),
          },
        ],
      };
    } else if (severity === 'yellow') {
      return {
        icon: 'alert-circle',
        color: '#FFB74D',
        title: 'Let\'s manage your stress',
        message: 'We notice you might be experiencing some stress or anxiety. These resources can help.',
        actions: [
          {
            title: 'Breathing Exercises',
            icon: 'fitness',
            description: 'Calm your mind with guided breathing',
            onPress: () => console.log('Breathing exercises'),
          },
          {
            title: 'Talk to AI Support',
            icon: 'chatbubbles',
            description: 'Get immediate support',
            onPress: () => navigation.navigate('AIChat'),
          },
          {
            title: 'Relaxation Videos',
            icon: 'play-circle',
            description: 'Watch calming yoga and meditation',
            onPress: () => console.log('Yoga videos'),
          },
        ],
      };
    } else {
      // Red alert
      return {
        icon: 'warning',
        color: '#F44336',
        title: 'We\'re concerned about you',
        message: 'Your responses suggest you may need professional support. Please reach out for help - you\'re not alone.',
        urgent: true,
        actions: [
          {
            title: 'Call 24/7 Helpline',
            icon: 'call',
            description: `${HELPLINE_NUMBER}`,
            onPress: handleCallHelpline,
            urgent: true,
          },
          {
            title: 'Crisis Text Line',
            icon: 'chatbubble',
            description: `Text HOME to ${CRISIS_TEXT}`,
            onPress: handleTextCrisis,
            urgent: true,
          },
          {
            title: 'Contact My Provider',
            icon: 'medical',
            description: 'Send alert to your healthcare provider',
            onPress: handleContactProvider,
          },
          {
            title: 'Talk to AI Now',
            icon: 'chatbubbles',
            description: 'Immediate emotional support',
            onPress: () => navigation.navigate('AIChat'),
          },
        ],
      };
    }
  };

  const content = getAlertContent();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support & Resources</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={[styles.alertCard, { backgroundColor: content.color + '20' }]}>
          <Ionicons name={content.icon} size={80} color={content.color} />
          <Text style={[styles.alertTitle, { color: content.color }]}>{content.title}</Text>
          <Text style={styles.alertMessage}>{content.message}</Text>
        </View>

        {content.urgent && (
          <View style={styles.urgentNotice}>
            <Ionicons name="information-circle" size={24} color="#F44336" />
            <Text style={styles.urgentText}>
              If you're having thoughts of harming yourself or others, call 911 or go to your nearest emergency room immediately.
            </Text>
          </View>
        )}

        <View style={styles.actionsContainer}>
          <Text style={styles.actionsTitle}>Recommended Actions</Text>
          {content.actions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.actionCard,
                action.urgent && styles.actionCardUrgent,
              ]}
              onPress={action.onPress}
            >
              <View style={[
                styles.actionIconContainer,
                action.urgent && styles.actionIconContainerUrgent,
              ]}>
                <Ionicons
                  name={action.icon}
                  size={28}
                  color={action.urgent ? '#fff' : content.color}
                />
              </View>
              <View style={styles.actionContent}>
                <Text style={[
                  styles.actionTitle,
                  action.urgent && styles.actionTitleUrgent,
                ]}>
                  {action.title}
                </Text>
                <Text style={styles.actionDescription}>{action.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

        {!content.urgent && (
          <View style={styles.additionalResources}>
            <Text style={styles.resourcesTitle}>Additional Resources</Text>
            <View style={styles.resourceCard}>
              <Ionicons name="book" size={24} color="#667eea" />
              <View style={styles.resourceContent}>
                <Text style={styles.resourceText}>Education Library</Text>
                <Text style={styles.resourceSubtext}>Articles and videos on mental wellness</Text>
              </View>
            </View>
            <View style={styles.resourceCard}>
              <Ionicons name="people" size={24} color="#667eea" />
              <View style={styles.resourceContent}>
                <Text style={styles.resourceText}>Community Forum</Text>
                <Text style={styles.resourceSubtext}>Connect with other mothers</Text>
              </View>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.doneButtonText}>Return to Home</Text>
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
  alertCard: {
    alignItems: 'center',
    padding: 40,
    borderRadius: 20,
    marginBottom: 20,
  },
  alertTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  alertMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  urgentNotice: {
    flexDirection: 'row',
    backgroundColor: '#FFEBEE',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  urgentText: {
    flex: 1,
    fontSize: 14,
    color: '#D32F2F',
    marginLeft: 10,
    lineHeight: 20,
    fontWeight: '600',
  },
  actionsContainer: {
    marginBottom: 20,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  actionCardUrgent: {
    borderColor: '#F44336',
    borderWidth: 2,
    backgroundColor: '#FFF5F5',
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  actionIconContainerUrgent: {
    backgroundColor: '#F44336',
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  actionTitleUrgent: {
    color: '#D32F2F',
  },
  actionDescription: {
    fontSize: 14,
    color: '#666',
  },
  additionalResources: {
    marginBottom: 20,
  },
  resourcesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8EAF6',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  resourceContent: {
    flex: 1,
    marginLeft: 15,
  },
  resourceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  resourceSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  doneButton: {
    backgroundColor: '#667eea',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  doneButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
