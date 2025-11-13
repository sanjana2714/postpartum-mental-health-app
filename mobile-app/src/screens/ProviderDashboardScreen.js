import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PATIENTS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    age: 28,
    stage: '8 weeks postpartum',
    riskLevel: 'yellow',
    lastActivity: '2 hours ago',
    epdsScore: 11,
    gad7Score: 8,
    pssScore: 18,
  },
  {
    id: 2,
    name: 'Emily Davis',
    age: 32,
    stage: '4 weeks postpartum',
    riskLevel: 'green',
    lastActivity: '1 day ago',
    epdsScore: 6,
    gad7Score: 3,
    pssScore: 12,
  },
  {
    id: 3,
    name: 'Jessica Martinez',
    age: 25,
    stage: '12 weeks postpartum',
    riskLevel: 'red',
    lastActivity: '30 min ago',
    epdsScore: 16,
    gad7Score: 14,
    pssScore: 28,
  },
  {
    id: 4,
    name: 'Amanda Wilson',
    age: 30,
    stage: '6 weeks postpartum',
    riskLevel: 'green',
    lastActivity: '5 hours ago',
    epdsScore: 5,
    gad7Score: 2,
    pssScore: 10,
  },
];

export default function ProviderDashboardScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRisk, setFilterRisk] = useState('all');

  const getRiskBadgeStyle = (riskLevel) => {
    switch (riskLevel) {
      case 'green':
        return { backgroundColor: '#E8F5E9', color: '#4CAF50' };
      case 'yellow':
        return { backgroundColor: '#FFF8E1', color: '#FFB74D' };
      case 'red':
        return { backgroundColor: '#FFEBEE', color: '#F44336' };
      default:
        return { backgroundColor: '#f0f0f0', color: '#999' };
    }
  };

  const filteredPatients = PATIENTS.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterRisk === 'all' || patient.riskLevel === filterRisk;
    return matchesSearch && matchesFilter;
  });

  const handlePatientPress = (patient) => {
    navigation.navigate('ProviderPatientDetail', { patient });
  };

  const stats = {
    total: PATIENTS.length,
    red: PATIENTS.filter((p) => p.riskLevel === 'red').length,
    yellow: PATIENTS.filter((p) => p.riskLevel === 'yellow').length,
    green: PATIENTS.filter((p) => p.riskLevel === 'green').length,
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Provider Dashboard</Text>
          <Text style={styles.headerSubtitle}>Dr. Michael Thompson</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Ionicons name="log-out-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#E8EAF6' }]}>
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total Patients</Text>
          </View>
          <TouchableOpacity
            style={[styles.statCard, { backgroundColor: '#FFEBEE' }]}
            onPress={() => setFilterRisk('red')}
          >
            <Text style={[styles.statNumber, { color: '#F44336' }]}>{stats.red}</Text>
            <Text style={styles.statLabel}>High Risk</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statCard, { backgroundColor: '#FFF8E1' }]}
            onPress={() => setFilterRisk('yellow')}
          >
            <Text style={[styles.statNumber, { color: '#FFB74D' }]}>{stats.yellow}</Text>
            <Text style={styles.statLabel}>Moderate</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search patients..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterButton, filterRisk === 'all' && styles.filterButtonActive]}
            onPress={() => setFilterRisk('all')}
          >
            <Text
              style={[
                styles.filterButtonText,
                filterRisk === 'all' && styles.filterButtonTextActive,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filterRisk === 'red' && styles.filterButtonActive]}
            onPress={() => setFilterRisk('red')}
          >
            <Text
              style={[
                styles.filterButtonText,
                filterRisk === 'red' && styles.filterButtonTextActive,
              ]}
            >
              High Risk
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filterRisk === 'yellow' && styles.filterButtonActive]}
            onPress={() => setFilterRisk('yellow')}
          >
            <Text
              style={[
                styles.filterButtonText,
                filterRisk === 'yellow' && styles.filterButtonTextActive,
              ]}
            >
              Moderate
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filterRisk === 'green' && styles.filterButtonActive]}
            onPress={() => setFilterRisk('green')}
          >
            <Text
              style={[
                styles.filterButtonText,
                filterRisk === 'green' && styles.filterButtonTextActive,
              ]}
            >
              Low Risk
            </Text>
          </TouchableOpacity>
        </View>

        {/* Patients List */}
        <View style={styles.patientsSection}>
          <Text style={styles.sectionTitle}>
            Patients ({filteredPatients.length})
          </Text>
          {filteredPatients.map((patient) => {
            const riskStyle = getRiskBadgeStyle(patient.riskLevel);
            return (
              <TouchableOpacity
                key={patient.id}
                style={styles.patientCard}
                onPress={() => handlePatientPress(patient)}
              >
                <View style={styles.patientHeader}>
                  <View style={styles.patientAvatar}>
                    <Text style={styles.patientInitial}>{patient.name[0]}</Text>
                  </View>
                  <View style={styles.patientInfo}>
                    <View style={styles.patientNameRow}>
                      <Text style={styles.patientName}>{patient.name}</Text>
                      <View style={[styles.riskBadge, { backgroundColor: riskStyle.backgroundColor }]}>
                        <Text style={[styles.riskBadgeText, { color: riskStyle.color }]}>
                          {patient.riskLevel.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.patientDetails}>
                      {patient.age} yrs • {patient.stage}
                    </Text>
                    <Text style={styles.patientActivity}>Last active: {patient.lastActivity}</Text>
                  </View>
                </View>
                <View style={styles.scoresContainer}>
                  <View style={styles.scoreItem}>
                    <Text style={styles.scoreLabel}>EPDS</Text>
                    <Text style={styles.scoreValue}>{patient.epdsScore}</Text>
                  </View>
                  <View style={styles.scoreItem}>
                    <Text style={styles.scoreLabel}>GAD-7</Text>
                    <Text style={styles.scoreValue}>{patient.gad7Score}</Text>
                  </View>
                  <View style={styles.scoreItem}>
                    <Text style={styles.scoreLabel}>PSS</Text>
                    <Text style={styles.scoreValue}>{patient.pssScore}</Text>
                  </View>
                </View>
                <View style={styles.patientActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="chatbubble-outline" size={18} color="#667eea" />
                    <Text style={styles.actionButtonText}>Message</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="trending-up-outline" size={18} color="#667eea" />
                    <Text style={styles.actionButtonText}>View Trends</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#667eea',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  patientsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  patientCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  patientHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  patientAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  patientInitial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  patientInfo: {
    flex: 1,
  },
  patientNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  patientName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  riskBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  patientDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  patientActivity: {
    fontSize: 12,
    color: '#999',
  },
  scoresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 12,
  },
  scoreItem: {
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  patientActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
    marginLeft: 6,
  },
});
