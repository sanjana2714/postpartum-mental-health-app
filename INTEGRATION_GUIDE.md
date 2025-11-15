# Integration Guide: Connecting Frontend to Backend API

This guide explains how to integrate the mobile app frontend with the backend API.

## Prerequisites

1. **Backend Setup Complete**
   - Backend server running on `http://localhost:5000` (or your configured port)
   - PostgreSQL database configured and running
   - Prisma migrations applied
   - Environment variables configured in `.env`

2. **Mobile App Setup Complete**
   - Dependencies installed
   - Expo development server running

## Integration Steps

### 1. Update API Base URL

The API configuration is in `mobile-app/src/config/api.js`. Update the base URL based on your environment:

**For iOS Simulator:**
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

**For Android Emulator:**
```javascript
const API_BASE_URL = 'http://10.0.2.2:5000/api';
```

**For Physical Device:**
```javascript
const API_BASE_URL = 'http://YOUR_COMPUTER_IP:5000/api';
// Example: 'http://192.168.1.100:5000/api'
```

### 2. Example: Login Screen Integration

Here's how to update the `LoginScreen.js` to use the backend API:

```javascript
import { authAPI, handleAPIError } from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleLogin = async () => {
  try {
    setLoading(true);
    
    const response = await authAPI.login({
      email: email,
      password: password
    });
    
    // Store auth token and user data
    await AsyncStorage.setItem('authToken', response.data.token);
    await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
    await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
    
    Alert.alert('Success', 'Login successful!');
    navigation.replace('Dashboard');
    
  } catch (error) {
    const errorMessage = handleAPIError(error);
    Alert.alert('Login Failed', errorMessage);
  } finally {
    setLoading(false);
  }
};
```

### 3. Example: Registration Screen Integration

Update `RegistrationScreen.js`:

```javascript
import { authAPI, handleAPIError } from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleRegister = async () => {
  try {
    setLoading(true);
    
    const response = await authAPI.register({
      name: name,
      email: email,
      phone: phone,
      password: password,
      age: age,
      gender: gender,
      language: selectedLanguage,
      stage: 'POSTPARTUM' // or 'PREGNANT'
    });
    
    // Store auth token and user data
    await AsyncStorage.setItem('authToken', response.data.token);
    await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
    await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
    
    Alert.alert('Success', 'Registration successful!');
    navigation.navigate('Dashboard');
    
  } catch (error) {
    const errorMessage = handleAPIError(error);
    Alert.alert('Registration Failed', errorMessage);
  } finally {
    setLoading(false);
  }
};
```

### 4. Example: Mood Check-In Integration

Update `MoodCheckInScreen.js`:

```javascript
import { moodAPI, handleAPIError } from '../config/api';

const handleSubmit = async () => {
  try {
    setLoading(true);
    
    const response = await moodAPI.submitMoodCheckin({
      moodLevel: selectedMood, // 'VERY_HAPPY', 'HAPPY', 'NEUTRAL', 'SAD', 'VERY_SAD'
      notes: notes
    });
    
    Alert.alert('Success', 'Mood check-in submitted!');
    
    // Fetch updated streak
    const streakResponse = await moodAPI.getMoodStreak();
    setStreak(streakResponse.data.streak);
    
    navigation.goBack();
    
  } catch (error) {
    const errorMessage = handleAPIError(error);
    Alert.alert('Error', errorMessage);
  } finally {
    setLoading(false);
  }
};
```

### 5. Example: Questionnaire Submission

Update questionnaire screens (EPDS, GAD7, PSS):

```javascript
import { questionnaireAPI, handleAPIError } from '../config/api';

const handleSubmit = async () => {
  try {
    setLoading(true);
    
    // Calculate total score
    const totalScore = responses.reduce((sum, val) => sum + val, 0);
    
    const response = await questionnaireAPI.submitQuestionnaire({
      type: 'EPDS', // or 'GAD7', 'PSS'
      score: totalScore,
      responses: responses
    });
    
    // Navigate to results with risk level
    navigation.navigate('QuestionnaireResults', {
      type: 'EPDS',
      score: totalScore,
      riskLevel: response.data.riskLevel,
      isCritical: response.data.isCritical
    });
    
  } catch (error) {
    const errorMessage = handleAPIError(error);
    Alert.alert('Error', errorMessage);
  } finally {
    setLoading(false);
  }
};
```

### 6. Example: AI Chatbot Integration

Update `AIChatbotScreen.js`:

```javascript
import { chatbotAPI, handleAPIError } from '../config/api';

const sendMessage = async (messageText) => {
  try {
    setLoading(true);
    
    // Add user message to UI
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    }]);
    
    // Send to backend
    const response = await chatbotAPI.sendMessage({
      message: messageText
    });
    
    // Add bot response to UI
    setMessages(prev => [...prev, {
      id: Date.now() + 1,
      text: response.data.response,
      isUser: false,
      timestamp: new Date()
    }]);
    
  } catch (error) {
    const errorMessage = handleAPIError(error);
    Alert.alert('Error', errorMessage);
  } finally {
    setLoading(false);
  }
};
```

### 7. Example: Progress/Trends Screen

Update `ProgressScreen.js` to fetch real data:

```javascript
import { questionnaireAPI, moodAPI, handleAPIError } from '../config/api';
import { useEffect, useState } from 'react';

const ProgressScreen = () => {
  const [moodData, setMoodData] = useState([]);
  const [questionnaireData, setQuestionnaireData] = useState({});
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    try {
      setLoading(true);
      
      // Fetch mood history
      const moodResponse = await moodAPI.getMoodHistory({
        limit: 30
      });
      setMoodData(moodResponse.data.moodHistory);
      
      // Fetch questionnaire history
      const epdsResponse = await questionnaireAPI.getQuestionnaireHistory({
        type: 'EPDS',
        limit: 10
      });
      
      const gad7Response = await questionnaireAPI.getQuestionnaireHistory({
        type: 'GAD7',
        limit: 10
      });
      
      const pssResponse = await questionnaireAPI.getQuestionnaireHistory({
        type: 'PSS',
        limit: 10
      });
      
      setQuestionnaireData({
        epds: epdsResponse.data.history,
        gad7: gad7Response.data.history,
        pss: pssResponse.data.history
      });
      
    } catch (error) {
      const errorMessage = handleAPIError(error);
      console.error('Error loading data:', errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  // Render charts with real data...
};
```

## Testing the Integration

### 1. Start Backend Server
```bash
cd backend
npm run dev
```

### 2. Start Mobile App
```bash
cd mobile-app
npm start
```

### 3. Test Authentication Flow
1. Register a new user
2. Verify token is stored in AsyncStorage
3. Log out and log back in
4. Verify profile data loads correctly

### 4. Test Mood Tracking
1. Submit a mood check-in
2. Verify it appears in the database
3. Check streak calculation
4. View mood history

### 5. Test Questionnaires
1. Complete an EPDS questionnaire
2. Verify score calculation
3. Check risk level determination
4. Test critical response alert (Question 10)

### 6. Test AI Chatbot
1. Send various messages
2. Verify context-aware responses
3. Test emergency detection

## Common Issues and Solutions

### Issue: Network Request Failed
**Solution:** Ensure backend server is running and API_BASE_URL is correct for your device/emulator.

### Issue: 401 Unauthorized
**Solution:** Check if auth token is being sent in headers. Verify token is not expired.

### Issue: CORS Error
**Solution:** Add your mobile app's origin to CORS_ORIGIN in backend .env file.

### Issue: Database Connection Error
**Solution:** Ensure PostgreSQL is running and DATABASE_URL is correct in backend .env.

### Issue: Can't connect from physical device
**Solution:** 
- Ensure backend server binds to `0.0.0.0` not `localhost`
- Use your computer's local IP address in API_BASE_URL
- Ensure firewall allows connections on port 5000

## Security Considerations

1. **Never commit API keys or secrets**
   - Use environment variables
   - Add `.env` to `.gitignore`

2. **Use HTTPS in production**
   - Update API_BASE_URL to use `https://`
   - Configure SSL certificate on backend

3. **Implement token refresh**
   - Add refresh token logic in API interceptors
   - Handle token expiration gracefully

4. **Validate all inputs**
   - Backend already includes validation
   - Add frontend validation for better UX

## Next Steps

1. **Add Error Boundaries** - Catch and handle React errors gracefully
2. **Add Offline Support** - Cache data locally with AsyncStorage
3. **Add Push Notifications** - Integrate FCM for reminders
4. **Add Analytics** - Track user engagement and errors
5. **Add Crash Reporting** - Use Sentry or similar service

## Resources

- [Axios Documentation](https://axios-http.com/docs/intro)
- [AsyncStorage Documentation](https://react-native-async-storage.github.io/async-storage/)
- [React Navigation Authentication Flow](https://reactnavigation.org/docs/auth-flow)
- [Expo Networking](https://docs.expo.dev/guides/networking/)

## Support

For issues with integration:
1. Check backend logs for API errors
2. Check mobile app console for network errors
3. Verify database contains expected data
4. Test API endpoints with Postman first
5. Open an issue on GitHub with error details
