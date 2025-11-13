import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ContentDetailScreen({ route, navigation }) {
  const { content } = route.params || {};
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: Save to database
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this article: ${content?.title || 'Mental Health Resource'}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = () => {
    // TODO: Implement download for offline viewing
    console.log('Download content');
  };

  // Mock content data
  const articleContent = `
Postpartum depression (PPD) is a complex mix of physical, emotional, and behavioral changes that happen in a woman after giving birth. It's one of the most common complications of childbearing.

## Understanding the Symptoms

According to the DSM-5, a manual used to diagnose mental disorders, PPD is a form of major depression that begins within 4 weeks after delivery. The diagnosis includes symptoms such as:

- Depressed mood or severe mood swings
- Excessive crying
- Difficulty bonding with your baby
- Withdrawing from family and friends
- Loss of appetite or eating much more than usual
- Inability to sleep (insomnia) or sleeping too much
- Overwhelming fatigue or loss of energy

## You're Not Alone

Studies show that 1 in 7 women experience postpartum depression. It's important to remember that PPD is not a character flaw or weakness. It's simply a complication of giving birth.

## When to Seek Help

If you're experiencing any symptoms of postpartum depression, it's important to reach out for help as soon as possible. Talk to your doctor if:

- Symptoms don't fade after two weeks
- Symptoms are getting worse
- You're having trouble caring for yourself or your baby
- You have thoughts of harming yourself or your baby

## Treatment Options

Treatment for postpartum depression can include:

- Counseling or psychotherapy
- Antidepressant medications
- Support groups
- Lifestyle changes

Remember, with proper treatment, postpartum depression symptoms usually improve. The most important step is reaching out for help.
  `.trim();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={handleBookmark}>
            <Ionicons
              name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color={isBookmarked ? '#667eea' : '#333'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
            <Ionicons name="share-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Featured Image */}
        <View style={styles.featuredImage}>
          <Text style={styles.featuredImageIcon}>📖</Text>
        </View>

        {/* Article Info */}
        <View style={styles.articleInfo}>
          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Article</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Mental Health</Text>
            </View>
          </View>
          <Text style={styles.title}>
            {content?.title || 'Understanding Postpartum Depression'}
          </Text>
          <View style={styles.meta}>
            <View style={styles.metaItem}>
              <Ionicons name="person-circle-outline" size={16} color="#666" />
              <Text style={styles.metaText}>Dr. Sarah Johnson</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={16} color="#666" />
              <Text style={styles.metaText}>Nov 10, 2024</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.metaText}>10 min read</Text>
            </View>
          </View>
        </View>

        {/* Article Content */}
        <View style={styles.articleContent}>
          <Text style={styles.articleText}>{articleContent}</Text>
        </View>

        {/* Related Content */}
        <View style={styles.relatedSection}>
          <Text style={styles.relatedTitle}>Related Articles</Text>
          {['Coping with Baby Blues', 'Partner Support Guide', 'Self-Care for New Moms'].map(
            (title, index) => (
              <TouchableOpacity key={index} style={styles.relatedCard}>
                <View style={styles.relatedIcon}>
                  <Ionicons name="document-text" size={20} color="#667eea" />
                </View>
                <Text style={styles.relatedText}>{title}</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
            )
          )}
        </View>

        {/* Download Button */}
        <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
          <Ionicons name="download-outline" size={20} color="#667eea" />
          <Text style={styles.downloadButtonText}>Download for Offline Reading</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  backButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 15,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  featuredImage: {
    height: 200,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredImageIcon: {
    fontSize: 80,
  },
  articleInfo: {
    padding: 20,
  },
  badgeContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  badge: {
    backgroundColor: '#E8EAF6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 10,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#667eea',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    lineHeight: 34,
  },
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 5,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  articleContent: {
    padding: 20,
    paddingTop: 0,
  },
  articleText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 26,
  },
  relatedSection: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  relatedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  relatedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  relatedIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8EAF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  relatedText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8EAF6',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  downloadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#667eea',
    marginLeft: 10,
  },
});
