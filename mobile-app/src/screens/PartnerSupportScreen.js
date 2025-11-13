import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PartnerSupportScreen({ navigation }) {
  const [partnerContact, setPartnerContact] = useState('');
  const [partnerStatus, setPartnerStatus] = useState(null); // null, 'invited', 'joined'

  const handleInvitePartner = () => {
    if (!partnerContact) {
      Alert.alert('Error', 'Please enter your partner\'s email or phone number');
      return;
    }

    // TODO: Send invitation via API
    setPartnerStatus('invited');
    Alert.alert(
      'Invitation Sent!',
      `Your partner will receive an invitation at ${partnerContact}`
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Partner Support</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Hero Section */}
        <View style={styles.heroCard}>
          <Ionicons name="people" size={60} color="#667eea" />
          <Text style={styles.heroTitle}>Involve Your Partner</Text>
          <Text style={styles.heroText}>
            Include your partner in your wellness journey. They'll receive tips and reminders
            to support you better.
          </Text>
        </View>

        {/* Partner Status */}
        {partnerStatus === null && (
          <View style={styles.inviteSection}>
            <Text style={styles.sectionTitle}>Invite Your Partner</Text>
            <Text style={styles.sectionText}>
              Send an invitation to your partner or family member to join your support network.
            </Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Partner's email or phone"
                value={partnerContact}
                onChangeText={setPartnerContact}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
            <TouchableOpacity style={styles.inviteButton} onPress={handleInvitePartner}>
              <Ionicons name="send" size={20} color="#fff" />
              <Text style={styles.inviteButtonText}>Send Invitation</Text>
            </TouchableOpacity>
          </View>
        )}

        {partnerStatus === 'invited' && (
          <View style={styles.statusCard}>
            <Ionicons name="mail" size={40} color="#FFB74D" />
            <Text style={styles.statusTitle}>Invitation Sent</Text>
            <Text style={styles.statusText}>
              Your partner will receive an email/SMS with instructions to join your support network.
            </Text>
            <Text style={styles.statusContact}>Sent to: {partnerContact}</Text>
          </View>
        )}

        {partnerStatus === 'joined' && (
          <View style={styles.statusCard}>
            <Ionicons name="checkmark-circle" size={40} color="#4CAF50" />
            <Text style={styles.statusTitle}>Partner Connected!</Text>
            <Text style={styles.statusText}>
              Your partner is now part of your support network and receiving updates.
            </Text>
          </View>
        )}

        {/* What Partners Get */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What Your Partner Gets</Text>
          {[
            {
              icon: 'notifications',
              title: 'Helpful Reminders',
              description: 'Gentle nudges to check in on you',
            },
            {
              icon: 'book',
              title: 'Educational Resources',
              description: 'Tips on supporting new mothers',
            },
            {
              icon: 'heart',
              title: 'Understanding PPD',
              description: 'Learn about postpartum challenges',
            },
            {
              icon: 'chatbubbles',
              title: 'Communication Tips',
              description: 'How to have supportive conversations',
            },
          ].map((item, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name={item.icon} size={24} color="#667eea" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureDescription}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Partner Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Tips for Partners</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipNumber}>1</Text>
            <Text style={styles.tipText}>
              <Text style={styles.tipBold}>Listen without judgment.</Text> Sometimes she just
              needs to vent.
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Text style={styles.tipNumber}>2</Text>
            <Text style={styles.tipText}>
              <Text style={styles.tipBold}>Help with baby care.</Text> Give her time to rest and
              recharge.
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Text style={styles.tipNumber}>3</Text>
            <Text style={styles.tipText}>
              <Text style={styles.tipBold}>Validate her feelings.</Text> Postpartum emotions are
              real and valid.
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Text style={styles.tipNumber}>4</Text>
            <Text style={styles.tipText}>
              <Text style={styles.tipBold}>Encourage professional help.</Text> Support her in
              seeking therapy if needed.
            </Text>
          </View>
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
  heroCard: {
    alignItems: 'center',
    backgroundColor: '#E8EAF6',
    padding: 30,
    borderRadius: 20,
    marginBottom: 30,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  heroText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  inviteSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 15,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#667eea',
    padding: 16,
    borderRadius: 12,
  },
  inviteButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  statusCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 16,
    marginBottom: 30,
  },
  statusTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  statusText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 15,
  },
  statusContact: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  section: {
    marginBottom: 30,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8EAF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
  },
  tipsSection: {
    marginBottom: 30,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  tipNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#667eea',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 32,
    marginRight: 15,
  },
  tipText: {
    flex: 1,
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  tipBold: {
    fontWeight: 'bold',
    color: '#333',
  },
});
