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

const TOPICS = [
  {
    id: 1,
    title: 'First-Time Moms',
    description: 'Share experiences and ask questions',
    members: 1243,
    messages: 5678,
    lastActive: '2 min ago',
    icon: 'people',
    color: '#2196F3',
  },
  {
    id: 2,
    title: 'Postpartum Anxiety Support',
    description: 'Safe space for anxiety discussions',
    members: 892,
    messages: 3421,
    lastActive: '15 min ago',
    icon: 'heart',
    color: '#E91E63',
  },
  {
    id: 3,
    title: 'Sleep Tips & Struggles',
    description: 'Help each other get more rest',
    members: 1567,
    messages: 8234,
    lastActive: '1 hour ago',
    icon: 'moon',
    color: '#9C27B0',
  },
  {
    id: 4,
    title: 'Breastfeeding Journey',
    description: 'Support and advice for nursing',
    members: 2103,
    messages: 12456,
    lastActive: '30 min ago',
    icon: 'nutrition',
    color: '#4CAF50',
  },
];

const RECENT_POSTS = [
  {
    id: 1,
    author: 'SarahM',
    topic: 'First-Time Moms',
    message: 'Just wanted to say thank you to everyone here. Your support means everything! 💕',
    time: '5 min ago',
    replies: 12,
    likes: 45,
  },
  {
    id: 2,
    author: 'JessicaR',
    topic: 'Sleep Tips & Struggles',
    message: 'Baby finally sleeping 4-hour stretches! The sleep training tips from here really worked.',
    time: '20 min ago',
    replies: 8,
    likes: 23,
  },
];

export default function CommunityForumScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleTopicPress = (topic) => {
    // TODO: Navigate to topic chat
    console.log('Open topic:', topic.title);
  };

  const handlePostPress = (post) => {
    console.log('Open post:', post.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community</Text>
        <Text style={styles.headerSubtitle}>Connect with other mothers</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search topics..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Guidelines Banner */}
        <View style={styles.guidelinesBanner}>
          <Ionicons name="information-circle" size={24} color="#667eea" />
          <View style={styles.guidelinesContent}>
            <Text style={styles.guidelinesTitle}>Community Guidelines</Text>
            <Text style={styles.guidelinesText}>
              Be kind, respectful, and supportive. All posts are anonymous.
            </Text>
          </View>
        </View>

        {/* Topics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Discussion Topics</Text>
          {TOPICS.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              style={styles.topicCard}
              onPress={() => handleTopicPress(topic)}
            >
              <View style={[styles.topicIcon, { backgroundColor: topic.color + '20' }]}>
                <Ionicons name={topic.icon} size={28} color={topic.color} />
              </View>
              <View style={styles.topicContent}>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.topicDescription}>{topic.description}</Text>
                <View style={styles.topicMeta}>
                  <Text style={styles.topicMetaText}>{topic.members} members</Text>
                  <Text style={styles.topicMetaDot}>•</Text>
                  <Text style={styles.topicMetaText}>{topic.messages} messages</Text>
                  <Text style={styles.topicMetaDot}>•</Text>
                  <Text style={styles.topicMetaActive}>{topic.lastActive}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Posts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {RECENT_POSTS.map((post) => (
            <TouchableOpacity
              key={post.id}
              style={styles.postCard}
              onPress={() => handlePostPress(post)}
            >
              <View style={styles.postHeader}>
                <View style={styles.postAuthorAvatar}>
                  <Text style={styles.postAuthorInitial}>{post.author[0]}</Text>
                </View>
                <View style={styles.postAuthorInfo}>
                  <Text style={styles.postAuthor}>{post.author}</Text>
                  <Text style={styles.postTopic}>{post.topic}</Text>
                </View>
                <Text style={styles.postTime}>{post.time}</Text>
              </View>
              <Text style={styles.postMessage}>{post.message}</Text>
              <View style={styles.postFooter}>
                <View style={styles.postStat}>
                  <Ionicons name="chatbubble-outline" size={16} color="#666" />
                  <Text style={styles.postStatText}>{post.replies} replies</Text>
                </View>
                <View style={styles.postStat}>
                  <Ionicons name="heart-outline" size={16} color="#666" />
                  <Text style={styles.postStatText}>{post.likes} likes</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* New Post Button */}
        <TouchableOpacity style={styles.newPostButton}>
          <Ionicons name="add-circle" size={24} color="#fff" />
          <Text style={styles.newPostButtonText}>Start a Discussion</Text>
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
  guidelinesBanner: {
    flexDirection: 'row',
    backgroundColor: '#E8EAF6',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  guidelinesContent: {
    flex: 1,
    marginLeft: 10,
  },
  guidelinesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 2,
  },
  guidelinesText: {
    fontSize: 12,
    color: '#667eea',
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
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 16,
    marginBottom: 12,
  },
  topicIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  topicContent: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  topicDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  topicMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topicMetaText: {
    fontSize: 12,
    color: '#999',
  },
  topicMetaDot: {
    fontSize: 12,
    color: '#999',
    marginHorizontal: 6,
  },
  topicMetaActive: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  postCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 16,
    marginBottom: 12,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  postAuthorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  postAuthorInitial: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  postAuthorInfo: {
    flex: 1,
  },
  postAuthor: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  postTopic: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  postTime: {
    fontSize: 12,
    color: '#999',
  },
  postMessage: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  postStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  postStatText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  newPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#667eea',
    padding: 18,
    borderRadius: 12,
    marginBottom: 30,
  },
  newPostButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
});
