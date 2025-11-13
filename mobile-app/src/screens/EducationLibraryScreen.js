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

const CATEGORIES = [
  { id: 'parenting', title: 'Parenting Tips', icon: 'people', color: '#FF9800' },
  { id: 'stress', title: 'Stress Management', icon: 'pulse', color: '#E91E63' },
  { id: 'yoga', title: 'Yoga & Breathing', icon: 'fitness', color: '#9C27B0' },
  { id: 'nutrition', title: 'Nutrition', icon: 'restaurant', color: '#4CAF50' },
  { id: 'mental-health', title: 'Mental Health', icon: 'heart', color: '#2196F3' },
  { id: 'sleep', title: 'Sleep Tips', icon: 'moon', color: '#3F51B5' },
];

const FEATURED_CONTENT = [
  {
    id: 1,
    title: 'Understanding Postpartum Depression',
    type: 'article',
    duration: '10 min read',
    category: 'mental-health',
    image: '📖',
  },
  {
    id: 2,
    title: 'Breathing Techniques for Anxiety',
    type: 'video',
    duration: '5 min',
    category: 'stress',
    image: '🎥',
  },
  {
    id: 3,
    title: 'Nutrition for New Mothers',
    type: 'article',
    duration: '8 min read',
    category: 'nutrition',
    image: '📖',
  },
];

const RECENT_CONTENT = [
  { id: 4, title: 'Sleep When Baby Sleeps', type: 'article', category: 'sleep' },
  { id: 5, title: '10-Minute Postpartum Yoga', type: 'video', category: 'yoga' },
  { id: 6, title: 'Bonding with Your Baby', type: 'article', category: 'parenting' },
  { id: 7, title: 'Self-Care Strategies', type: 'infographic', category: 'mental-health' },
];

export default function EducationLibraryScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleContentPress = (content) => {
    navigation.navigate('ContentDetail', { content });
  };

  const handleCategoryPress = (category) => {
    console.log('Filter by category:', category.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Education Library</Text>
        <Text style={styles.headerSubtitle}>Learn and grow with expert resources</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search articles, videos..."
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === 'all' && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter('all')}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedFilter === 'all' && styles.filterButtonTextActive,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === 'articles' && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter('articles')}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedFilter === 'articles' && styles.filterButtonTextActive,
                ]}
              >
                Articles
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === 'videos' && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter('videos')}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedFilter === 'videos' && styles.filterButtonTextActive,
                ]}
              >
                Videos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === 'infographics' && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter('infographics')}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedFilter === 'infographics' && styles.filterButtonTextActive,
                ]}
              >
                Infographics
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, { backgroundColor: category.color + '20' }]}
                onPress={() => handleCategoryPress(category)}
              >
                <Ionicons name={category.icon} size={32} color={category.color} />
                <Text style={styles.categoryTitle}>{category.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {FEATURED_CONTENT.map((content) => (
              <TouchableOpacity
                key={content.id}
                style={styles.featuredCard}
                onPress={() => handleContentPress(content)}
              >
                <View style={styles.featuredImage}>
                  <Text style={styles.featuredImageIcon}>{content.image}</Text>
                </View>
                <Text style={styles.featuredTitle}>{content.title}</Text>
                <View style={styles.featuredMeta}>
                  <Ionicons
                    name={content.type === 'video' ? 'play-circle' : 'document-text'}
                    size={14}
                    color="#666"
                  />
                  <Text style={styles.featuredDuration}>{content.duration}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recently Added</Text>
          {RECENT_CONTENT.map((content) => (
            <TouchableOpacity
              key={content.id}
              style={styles.recentCard}
              onPress={() => handleContentPress(content)}
            >
              <View style={styles.recentIconContainer}>
                <Ionicons
                  name={
                    content.type === 'video'
                      ? 'play-circle'
                      : content.type === 'infographic'
                      ? 'image'
                      : 'document-text'
                  }
                  size={24}
                  color="#667eea"
                />
              </View>
              <View style={styles.recentContent}>
                <Text style={styles.recentTitle}>{content.title}</Text>
                <Text style={styles.recentType}>{content.type}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
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
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#667eea',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e8eaff',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
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
    marginBottom: 20,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#fff',
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  featuredCard: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: 15,
    overflow: 'hidden',
  },
  featuredImage: {
    height: 120,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredImageIcon: {
    fontSize: 48,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    padding: 15,
    paddingBottom: 10,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  featuredDuration: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  recentIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8EAF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  recentContent: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  recentType: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
  },
});
