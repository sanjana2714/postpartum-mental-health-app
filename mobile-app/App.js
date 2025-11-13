import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LanguageSelectionScreen from './src/screens/LanguageSelectionScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileSetupScreen from './src/screens/ProfileSetupScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import MoodCheckInScreen from './src/screens/MoodCheckInScreen';
import QuestionnaireSelectionScreen from './src/screens/QuestionnaireSelectionScreen';
import EPDSQuestionnaireScreen from './src/screens/EPDSQuestionnaireScreen';
import QuestionnaireResultsScreen from './src/screens/QuestionnaireResultsScreen';
import GAD7QuestionnaireScreen from './src/screens/GAD7QuestionnaireScreen';
import PSSQuestionnaireScreen from './src/screens/PSSQuestionnaireScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Language" component={LanguageSelectionScreen} />
        <Stack.Screen name="Register" component={RegistrationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="MoodCheckIn" component={MoodCheckInScreen} />
        <Stack.Screen name="QuestionnaireSelection" component={QuestionnaireSelectionScreen} />
        <Stack.Screen name="EPDSQuestionnaire" component={EPDSQuestionnaireScreen} />
        <Stack.Screen name="GAD7Questionnaire" component={GAD7QuestionnaireScreen} />
        <Stack.Screen name="PSSQuestionnaire" component={PSSQuestionnaireScreen} />
        <Stack.Screen name="QuestionnaireResults" component={QuestionnaireResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}