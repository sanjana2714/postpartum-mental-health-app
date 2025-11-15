# Testing Guide

This guide covers testing strategies for the Postpartum Mental Health App.

## Table of Contents
1. [Testing Overview](#testing-overview)
2. [Backend API Testing](#backend-api-testing)
3. [Mobile App Testing](#mobile-app-testing)
4. [Integration Testing](#integration-testing)
5. [Manual Testing Checklist](#manual-testing-checklist)
6. [Test Data](#test-data)

---

## Testing Overview

### Testing Pyramid

```
                  /\
                 /  \
                / E2E\        End-to-End Tests
               /______\
              /        \
             /Integration\   Integration Tests
            /____________\
           /              \
          /  Unit Tests    \  Unit Tests
         /__________________\
```

### Current Status
- ✅ API endpoints implemented
- ✅ Manual testing possible
- ⏳ Automated tests to be added
- ⏳ E2E tests to be implemented

---

## Backend API Testing

### Using Postman/Thunder Client

#### 1. Setup Collection

Create a Postman collection with the following requests:

**Base URL:** `http://localhost:5000/api`

#### 2. Authentication Tests

**Register User**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Test@123",
  "phone": "+1234567890",
  "age": 28,
  "gender": "FEMALE",
  "language": "ENGLISH",
  "stage": "POSTPARTUM"
}
```

Expected Response: 201 Created
```json
{
  "message": "User registered successfully",
  "user": { ... },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "..."
}
```

**Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Test@123"
}
```

Expected Response: 200 OK (same structure as register)

**Get Profile**
```http
GET /api/auth/profile
Authorization: Bearer {token}
```

Expected Response: 200 OK
```json
{
  "user": {
    "id": 1,
    "email": "test@example.com",
    "userProfile": { ... }
  }
}
```

**Update Profile**
```http
PUT /api/auth/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "age": 29,
  "deliveryDate": "2024-01-15",
  "weeksPostpartum": "8 weeks"
}
```

#### 3. Mood Tracking Tests

**Submit Mood Check-in**
```http
POST /api/mood
Authorization: Bearer {token}
Content-Type: application/json

{
  "moodLevel": "HAPPY",
  "notes": "Feeling good today!"
}
```

Expected Response: 201 Created

**Get Mood History**
```http
GET /api/mood/history?limit=10
Authorization: Bearer {token}
```

**Get Mood Streak**
```http
GET /api/mood/streak
Authorization: Bearer {token}
```

Expected Response:
```json
{
  "streak": 5,
  "lastCheckinDate": "2024-11-15T10:30:00.000Z"
}
```

#### 4. Questionnaire Tests

**Submit EPDS Questionnaire**
```http
POST /api/questionnaires
Authorization: Bearer {token}
Content-Type: application/json

{
  "type": "EPDS",
  "score": 8,
  "responses": [0, 1, 0, 2, 1, 0, 1, 0, 1, 1]
}
```

Expected Response: 201 Created
```json
{
  "message": "Questionnaire submitted successfully",
  "questionnaireResponse": { ... },
  "riskLevel": "LOW",
  "isCritical": false
}
```

**Test Critical Response (Question 10 = 2 or 3)**
```http
POST /api/questionnaires
Authorization: Bearer {token}
Content-Type: application/json

{
  "type": "EPDS",
  "score": 18,
  "responses": [2, 2, 1, 3, 2, 1, 2, 1, 2, 3]
}
```

Expected: `isCritical: true` and alert created

**Get Questionnaire History**
```http
GET /api/questionnaires/history?type=EPDS&limit=5
Authorization: Bearer {token}
```

**Get Latest Scores**
```http
GET /api/questionnaires/latest
Authorization: Bearer {token}
```

Expected Response:
```json
{
  "latestScores": {
    "EPDS": {
      "score": 8,
      "riskLevel": "LOW",
      "date": "2024-11-15T10:30:00.000Z"
    },
    "GAD7": null,
    "PSS": null
  }
}
```

**Get Active Alerts**
```http
GET /api/questionnaires/alerts
Authorization: Bearer {token}
```

#### 5. Chatbot Tests

**Send Message**
```http
POST /api/chatbot/message
Authorization: Bearer {token}
Content-Type: application/json

{
  "message": "I'm feeling anxious today"
}
```

Expected Response:
```json
{
  "message": "Message sent successfully",
  "response": "I understand you're feeling anxious..."
}
```

**Test Different Keywords**
- "anxious" → anxiety response
- "sleep" → sleep tips
- "stress" → stress management
- "help" → crisis resources

**Get Chat History**
```http
GET /api/chatbot/history?limit=20
Authorization: Bearer {token}
```

### Using cURL

**Register**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test@123",
    "gender": "FEMALE",
    "stage": "POSTPARTUM"
  }'
```

**Login**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123"
  }'
```

**Get Profile (save token from login)**
```bash
TOKEN="your_jwt_token_here"

curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer $TOKEN"
```

### Automated API Tests (Future)

Create `backend/tests/api.test.js`:

```javascript
const request = require('supertest');
const app = require('../server');

describe('Auth API', () => {
  let authToken;
  
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'Test@123',
        gender: 'FEMALE',
        stage: 'POSTPARTUM'
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    authToken = res.body.token;
  });
  
  it('should login user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'Test@123'
      });
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
```

Run with:
```bash
npm install --save-dev jest supertest
npm test
```

---

## Mobile App Testing

### Manual Testing on Device

#### 1. Expo Go Testing (Development)

```bash
cd mobile-app
npm start
```

Scan QR code with:
- iOS: Camera app
- Android: Expo Go app

#### 2. iOS Simulator

```bash
npm run ios
```

#### 3. Android Emulator

```bash
npm run android
```

### Test Scenarios

#### Authentication Flow
1. Open app → Splash screen displays
2. Tap through onboarding screens
3. Select language
4. Try registration with invalid data (test validation)
5. Register with valid data
6. Verify navigation to Dashboard
7. Logout
8. Login with registered credentials
9. Verify Dashboard loads

#### Mood Tracking
1. Navigate to Mood Check-In
2. Select mood emoji
3. Add notes (optional)
4. Submit
5. Verify streak increments
6. Check if it appears in history

#### Questionnaires
1. Navigate to Questionnaire Selection
2. Select EPDS
3. Answer all 10 questions
4. Submit
5. View results
6. Check risk level color coding
7. Test critical response (Question 10 → "Yes, quite often")
8. Verify emergency alert displays

#### AI Chatbot
1. Navigate to AI Chat
2. Send message: "I'm feeling anxious"
3. Verify contextual response
4. Try quick question buttons
5. Test emergency keyword: "I need help"
6. Verify emergency resources shown

#### Progress/Trends
1. Navigate to Progress
2. Switch between time periods (7D, 1M, 3M)
3. Verify charts display
4. Check all questionnaire types

### Automated Testing (Future)

**Detox E2E Tests**

Install:
```bash
npm install --save-dev detox
```

Create `mobile-app/e2e/auth.test.js`:
```javascript
describe('Authentication Flow', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should complete registration', async () => {
    await element(by.id('skip-onboarding')).tap();
    await element(by.id('register-button')).tap();
    await element(by.id('name-input')).typeText('Test User');
    await element(by.id('email-input')).typeText('test@example.com');
    await element(by.id('password-input')).typeText('Test@123');
    await element(by.id('submit-register')).tap();
    await expect(element(by.id('dashboard'))).toBeVisible();
  });
});
```

---

## Integration Testing

### Full Stack Testing

1. **Start Backend**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Mobile App**
   ```bash
   cd mobile-app
   npm start
   ```

3. **Test Complete Flow**
   - Register → Login → Mood Check-in → Questionnaire → Chat

4. **Verify Database**
   ```bash
   cd backend
   npx prisma studio
   ```
   - Check users table
   - Check moodCheckin table
   - Check questionnaireResponse table
   - Check chatMessage table

### Load Testing (Future)

Use Apache JMeter or Artillery:

```yaml
# artillery.yml
config:
  target: 'http://localhost:5000'
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - name: "Login and submit mood"
    flow:
      - post:
          url: "/api/auth/login"
          json:
            email: "test@example.com"
            password: "Test@123"
          capture:
            - json: "$.token"
              as: "token"
      - post:
          url: "/api/mood"
          headers:
            Authorization: "Bearer {{ token }}"
          json:
            moodLevel: "HAPPY"
```

---

## Manual Testing Checklist

### Pre-Release Testing

#### Backend
- [ ] Health endpoint responds
- [ ] User registration works
- [ ] User login works
- [ ] JWT authentication works
- [ ] Invalid token returns 401
- [ ] Profile update works
- [ ] Mood check-in submission works
- [ ] Mood history retrieval works
- [ ] Mood streak calculation correct
- [ ] EPDS questionnaire submission works
- [ ] GAD7 questionnaire submission works
- [ ] PSS questionnaire submission works
- [ ] Risk level calculation correct
- [ ] Critical response detection works
- [ ] Alert creation works
- [ ] Chatbot responds appropriately
- [ ] Emergency keywords detected
- [ ] Rate limiting works
- [ ] CORS configured correctly
- [ ] Error handling returns proper messages

#### Mobile App
- [ ] Splash screen displays
- [ ] Onboarding flows correctly
- [ ] Language selection works
- [ ] Registration validation works
- [ ] Login validation works
- [ ] Profile setup works
- [ ] Dashboard loads
- [ ] Bottom tab navigation works
- [ ] Mood check-in UI works
- [ ] Questionnaire selection works
- [ ] All questionnaires display correctly
- [ ] Results screen shows correct colors
- [ ] Emergency alert displays when needed
- [ ] AI chat interface works
- [ ] Progress charts display
- [ ] Settings screen works
- [ ] Logout works
- [ ] App doesn't crash on any screen
- [ ] Loading states display
- [ ] Error messages display
- [ ] Keyboard behavior correct
- [ ] ScrollViews scroll properly

#### Integration
- [ ] Registration creates user in database
- [ ] Login returns valid token
- [ ] Token authenticates API requests
- [ ] Mood submissions save to database
- [ ] Questionnaire submissions save correctly
- [ ] Chat messages save to database
- [ ] Data displays correctly in app
- [ ] Offline behavior graceful
- [ ] Network errors handled

### Device Testing

Test on multiple devices:
- [ ] iPhone (various models)
- [ ] iPad
- [ ] Android phone (various brands)
- [ ] Android tablet
- [ ] Different screen sizes
- [ ] Different OS versions

### Performance Testing

- [ ] App loads within 2 seconds
- [ ] API responses under 200ms
- [ ] Charts render smoothly
- [ ] No memory leaks
- [ ] Battery usage reasonable
- [ ] Data usage reasonable

---

## Test Data

### Test Users

```javascript
const testUsers = [
  {
    name: "Low Risk User",
    email: "lowrisk@test.com",
    password: "Test@123",
    // EPDS score: 5 (LOW)
    epdsResponses: [0, 0, 1, 0, 1, 0, 1, 1, 0, 0]
  },
  {
    name: "Medium Risk User",
    email: "medrisk@test.com",
    password: "Test@123",
    // EPDS score: 11 (MEDIUM)
    epdsResponses: [1, 1, 1, 2, 1, 1, 1, 2, 0, 0]
  },
  {
    name: "High Risk User",
    email: "highrisk@test.com",
    password: "Test@123",
    // EPDS score: 18 (HIGH)
    epdsResponses: [2, 2, 2, 2, 2, 2, 1, 2, 1, 0]
  },
  {
    name: "Critical User",
    email: "critical@test.com",
    password: "Test@123",
    // EPDS score: 20 (HIGH + Critical Q10)
    epdsResponses: [2, 2, 2, 3, 2, 2, 1, 2, 1, 3]
  }
];
```

### Test Mood Data

```javascript
const moodLevels = [
  'VERY_HAPPY',
  'HAPPY',
  'NEUTRAL',
  'SAD',
  'VERY_SAD'
];
```

### Test Chat Messages

```javascript
const testMessages = [
  "I'm feeling anxious today",
  "Can you give me some sleep tips?",
  "I'm really stressed out",
  "I'm having thoughts of harming myself", // Should trigger emergency
  "What are symptoms of postpartum depression?"
];
```

---

## Bug Reporting Template

When reporting issues, include:

```markdown
**Bug Description:**
Clear description of the issue

**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- Device: iPhone 14 / Android Pixel 6
- OS Version: iOS 17 / Android 13
- App Version: 1.0.0
- Backend URL: http://localhost:5000

**Screenshots:**
[Attach screenshots if applicable]

**Logs:**
[Attach console logs or error messages]

**Severity:**
Critical / High / Medium / Low
```

---

## Continuous Testing

### Pre-Commit Checks
- Run linter
- Run unit tests (when implemented)
- Check for console.errors

### Pre-Push Checks
- Run all tests
- Build succeeds
- No TypeScript errors (if using TS)

### Pre-Deployment Checks
- All tests pass
- Manual smoke test
- Performance check
- Security scan

---

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Detox Documentation](https://wix.github.io/Detox/)
- [Postman Learning](https://learning.postman.com/)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

---

**Last Updated:** November 2024  
**Version:** 1.0
