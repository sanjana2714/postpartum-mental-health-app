import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const slides = [
    {
        title: 'Mental Health Monitoring',
        description: 'Keep track of your mental health with our specialized tools.',
    },
    {
        title: 'AI Support 24/7',
        description: 'Get instant support from AI 24/7.',
    },
    {
        title: 'Educational Resources',
        description: 'Access a wealth of knowledge about mental health',
    },
    {
        title: 'Privacy & Security',
        description: 'Your data is safe with us.',
    },
];

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleSkip = async () => {
        await AsyncStorage.setItem('hasSeenOnboarding', 'true');
        navigation.navigate('Language');
    };

    const handleGetStarted = async () => {
        await AsyncStorage.setItem('hasSeenOnboarding', 'true');
        navigation.navigate('Language');
    };

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={(event) => {
                    const index = Math.round(event.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(index);
                }}
                scrollEventThrottle={16}
            >
                {slides.map((slide, index) => (
                    <View key={index} style={[styles.slide, { width }]}>
                        <Text style={styles.title}>{slide.title}</Text>
                        <Text style={styles.description}>{slide.description}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.pagination}>
                {slides.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            currentIndex === index && styles.paginationDotActive
                        ]}
                    />
                ))}
            </View>
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
                <Text style={styles.getStartedText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 120,
        alignSelf: 'center',
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
    paginationDotActive: {
        backgroundColor: 'blue',
        width: 30,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        padding: 20,
    },
    skipButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: 'transparent',
    },
    skipText: {
        fontSize: 16,
        color: 'blue',
    },
    getStartedButton: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
        backgroundColor: 'blue',
        paddingVertical: 15,
        borderRadius: 5,
    },
    getStartedText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    },
});

export default OnboardingScreen;