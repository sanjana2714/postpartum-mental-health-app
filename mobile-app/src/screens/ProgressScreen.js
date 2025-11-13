import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

const PERIODS = ['7D', '1M', '3M'];

// Mock data - replace with actual API data
const moodData = {
  '7D': {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{ data: [4, 3, 4, 5, 3, 4, 4] }],
  },
  '1M': {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{ data: [3.8, 4.2, 3.5, 4.0] }],
  },
  '3M': {
    labels: ['Month 1', 'Month 2', 'Month 3'],
    datasets: [{ data: [3.5, 4.0, 4.2] }],
  },
};

const epdsData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [{ data: [12, 10, 9, 7] }],
};

const gad7Data = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [{ data: [8, 7, 6, 5] }],
};

const pssData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [{ data: [22, 20, 18, 16] }],
};

export default function ProgressScreen({ navigation }) {
  const [selectedPeriod, setSelectedPeriod] = useState('7D');

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(102, 126, 234, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 1,
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#667eea',
    },
  };

  const screenWidth = Dimensions.get('window').width;

  const getRiskZone = (score, type) => {
    if (type === 'EPDS') {
      if (score < 10) return { color: '#4CAF50', label: 'Normal' };
      if (score <= 12) return { color: '#FFB74D', label: 'Mild' };
      return { color: '#F44336', label: 'Moderate-Severe' };
    }
    if (type === 'GAD7') {
      if (score <= 4) return { color: '#4CAF50', label: 'Minimal' };
      if (score <= 9) return { color: '#8BC34A', label: 'Mild' };
      if (score <= 14) return { color: '#FFB74D', label: 'Moderate' };
      return { color: '#F44336', label: 'Severe' };
    }
    if (type === 'PSS') {
      if (score <= 13) return { color: '#4CAF50', label: 'Low' };
      if (score <= 26) return { color: '#FFB74D', label: 'Moderate' };
      return { color: '#F44336', label: 'High' };
    }
  };

  const handleExportPDF = () => {
    // TODO: Implement PDF export
    console.log('Export to PDF');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>My Progress</Text>
        <TouchableOpacity onPress={handleExportPDF} style={styles.exportButton}>
          <Ionicons name="download-outline" size={24} color="#667eea" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Mood Trends */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mood Trends</Text>
            <View style={styles.periodSelector}>
              {PERIODS.map((period) => (
                <TouchableOpacity
                  key={period}
                  style={[
                    styles.periodButton,
                    selectedPeriod === period && styles.periodButtonActive,
                  ]}
                  onPress={() => setSelectedPeriod(period)}
                >
                  <Text
                    style={[
                      styles.periodButtonText,
                      selectedPeriod === period && styles.periodButtonTextActive,
                    ]}
                  >
                    {period}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.chartContainer}>
            <LineChart
              data={moodData[selectedPeriod]}
              width={screenWidth - 60}
              height={200}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
              yAxisInterval={1}
              fromZero
            />
          </View>
          <Text style={styles.chartLegend}>
            Scale: 1 (Very Sad) to 5 (Very Happy)
          </Text>
        </View>

        {/* EPDS Scores */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EPDS Scores Over Time</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={epdsData}
              width={screenWidth - 60}
              height={200}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(233, 30, 99, ${opacity})`,
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#E91E63',
                },
              }}
              bezier
              style={styles.chart}
              yAxisInterval={1}
              fromZero
            />
          </View>
          <View style={styles.legendContainer}>
            <View style={[styles.legendItem, { backgroundColor: '#E8F5E9' }]}>
              <Text style={styles.legendText}>Normal (&lt;10)</Text>
            </View>
            <View style={[styles.legendItem, { backgroundColor: '#FFF3E0' }]}>
              <Text style={styles.legendText}>Mild (10-12)</Text>
            </View>
            <View style={[styles.legendItem, { backgroundColor: '#FFEBEE' }]}>
              <Text style={styles.legendText}>Moderate (≥13)</Text>
            </View>
          </View>
          {epdsData.datasets[0].data.length > 0 && (
            <View style={styles.currentScore}>
              <Text style={styles.currentScoreLabel}>Current Score:</Text>
              <View
                style={[
                  styles.currentScoreBadge,
                  {
                    backgroundColor:
                      getRiskZone(
                        epdsData.datasets[0].data[epdsData.datasets[0].data.length - 1],
                        'EPDS'
                      ).color + '20',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.currentScoreValue,
                    {
                      color: getRiskZone(
                        epdsData.datasets[0].data[epdsData.datasets[0].data.length - 1],
                        'EPDS'
                      ).color,
                    },
                  ]}
                >
                  {epdsData.datasets[0].data[epdsData.datasets[0].data.length - 1]} -{' '}
                  {
                    getRiskZone(
                      epdsData.datasets[0].data[epdsData.datasets[0].data.length - 1],
                      'EPDS'
                    ).label
                  }
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* GAD-7 Scores */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GAD-7 Anxiety Scores</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={gad7Data}
              width={screenWidth - 60}
              height={200}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(156, 39, 176, ${opacity})`,
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#9C27B0',
                },
              }}
              bezier
              style={styles.chart}
              yAxisInterval={1}
              fromZero
            />
          </View>
        </View>

        {/* PSS Scores */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PSS Stress Scores</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={pssData}
              width={screenWidth - 60}
              height={200}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(255, 152, 0, ${opacity})`,
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#FF9800',
                },
              }}
              bezier
              style={styles.chart}
              yAxisInterval={1}
              fromZero
            />
          </View>
        </View>

        {/* Insights */}
        <View style={styles.insightsCard}>
          <Ionicons name="bulb" size={32} color="#FFB74D" />
          <Text style={styles.insightsTitle}>Your Insights</Text>
          <Text style={styles.insightsText}>
            Great progress! Your EPDS scores have improved by 42% over the past month.
            Keep up with your self-care routine!
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
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  exportButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 2,
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  periodButtonActive: {
    backgroundColor: '#667eea',
  },
  periodButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  periodButtonTextActive: {
    color: '#fff',
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  chart: {
    borderRadius: 8,
  },
  chartLegend: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  legendItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  currentScore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  currentScoreLabel: {
    fontSize: 16,
    color: '#666',
    marginRight: 10,
  },
  currentScoreBadge: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  currentScoreValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  insightsCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  insightsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
    marginBottom: 8,
  },
  insightsText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});
