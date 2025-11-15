# Changelog

All notable changes to the Postpartum Mental Health App will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-11-15

### Added

#### Backend API
- Complete authentication system with JWT tokens
  - User registration with email/phone
  - User login with secure password hashing (bcrypt)
  - JWT token generation with configurable expiration
  - Refresh token support
  - Profile management (get/update)
- Mood tracking functionality
  - Submit daily mood check-ins (5 levels: VERY_HAPPY to VERY_SAD)
  - View mood history with date filtering
  - Automatic streak calculation for consecutive check-ins
- Mental health questionnaires
  - EPDS (Edinburgh Postnatal Depression Scale) - 10 questions
  - GAD-7 (Generalized Anxiety Disorder) - 7 questions
  - PSS (Perceived Stress Scale) - 10 questions
  - Automatic risk level calculation (LOW/MEDIUM/HIGH)
  - Critical response detection (EPDS Question 10 for self-harm)
  - Alert system for high-risk responses
  - Questionnaire history with risk levels
- AI Chatbot
  - OpenAI GPT-3.5-turbo integration
  - Rule-based fallback responses
  - Context-aware responses for anxiety, sleep, stress, crisis
  - Emergency keyword detection
  - Chat history persistence
- Database schema with Prisma ORM
  - User and UserProfile models
  - MoodCheckin model
  - QuestionnaireResponse model
  - ChatMessage model
  - Alert model
  - Badge and gamification models
  - Provider and patient link models
  - Community and content models
- Security features
  - JWT authentication middleware
  - Password hashing with bcrypt (10 rounds)
  - Rate limiting (100 requests per 15 minutes)
  - CORS configuration
  - Helmet security headers
  - Input validation
  - Secure error handling

#### Mobile App Integration
- API client configuration (`mobile-app/src/config/api.js`)
  - Axios instance with automatic token management
  - Request interceptor for auth token attachment
  - Response interceptor for 401 handling
  - Helper functions for all API endpoints
  - Error handling utilities

#### Documentation
- Backend API Documentation (`backend/README.md`)
  - Complete endpoint reference
  - Request/response examples
  - Risk level calculation formulas
  - Error handling guide
- Integration Guide (`INTEGRATION_GUIDE.md`)
  - Step-by-step code examples for each screen
  - Common issues and solutions
  - Network configuration for different devices
  - Security considerations
- Deployment Guide (`DEPLOYMENT_GUIDE.md`)
  - Heroku deployment instructions
  - AWS EC2 setup with Nginx and SSL
  - DigitalOcean App Platform setup
  - Database configuration options
  - Mobile app store deployment (iOS/Android)
  - Security checklist (25+ items)
  - HIPAA compliance guidelines
  - Monitoring and maintenance procedures
- Testing Guide (`TESTING_GUIDE.md`)
  - Postman/Thunder Client examples
  - cURL command examples
  - Manual testing checklist (50+ items)
  - Integration testing procedures
  - Test data samples
  - Bug reporting template
- Project Completion Summary (`PROJECT_COMPLETION_SUMMARY.md`)
  - Comprehensive overview of all features
  - File structure documentation
  - Technology stack details
  - API endpoints summary
  - Maintenance guidelines
- Contributing Guidelines (`CONTRIBUTING.md`)
  - Code of conduct
  - Development setup
  - Coding standards
  - Commit guidelines
  - Pull request process
- License (`LICENSE`)
  - MIT License
- Root .gitignore file
  - Node modules
  - Environment variables
  - Build artifacts
  - IDE files

#### Frontend (Pre-existing - 28 Screens)
- Authentication flow (6 screens)
- Dashboard and mood tracking (2 screens)
- Mental health questionnaires (5 screens)
- AI chatbot and progress (3 screens)
- Education library (3 screens)
- Community features (2 screens)
- Settings and profile (2 screens)
- Provider dashboard (5 screens)

### Technical Details

#### API Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (authenticated)
- `PUT /api/auth/profile` - Update user profile (authenticated)
- `POST /api/mood` - Submit mood check-in (authenticated)
- `GET /api/mood/history` - Get mood history (authenticated)
- `GET /api/mood/streak` - Get mood streak (authenticated)
- `POST /api/questionnaires` - Submit questionnaire (authenticated)
- `GET /api/questionnaires/history` - Get questionnaire history (authenticated)
- `GET /api/questionnaires/latest` - Get latest scores (authenticated)
- `GET /api/questionnaires/alerts` - Get active alerts (authenticated)
- `PUT /api/questionnaires/alerts/:id/dismiss` - Dismiss alert (authenticated)
- `POST /api/chatbot/message` - Send chat message (authenticated)
- `GET /api/chatbot/history` - Get chat history (authenticated)

#### Technology Stack
- **Backend**: Node.js 18+, Express 4.18.2, Prisma 5.7.0, PostgreSQL
- **Authentication**: JWT (jsonwebtoken 9.0.2), bcrypt 5.1.1
- **Security**: Helmet 7.1.0, CORS 2.8.5, express-rate-limit 7.1.5
- **Mobile**: React Native 0.72.6, Expo 49.0.0, React Navigation 6.x
- **Database**: PostgreSQL with Prisma ORM

### Security
- All passwords are hashed using bcrypt with 10 rounds
- JWT tokens with configurable expiration
- Rate limiting to prevent abuse
- CORS configured for specific origins
- Helmet security headers enabled
- Input validation on all endpoints
- Error handling without stack traces in production
- Critical response detection for user safety

### Clinical Accuracy
- Validated EPDS questionnaire (Cox et al., 1987)
- Validated GAD-7 questionnaire (Spitzer et al., 2006)
- Validated PSS questionnaire (Cohen et al., 1983)
- Correct scoring algorithms including reverse scoring for PSS
- Evidence-based risk level thresholds
- Self-harm detection on EPDS Question 10

### Known Limitations
- Provider dashboard backend routes not implemented (frontend exists)
- Community forum backend routes not implemented (frontend exists)
- Education library content management not implemented (frontend exists)
- File upload to S3 not implemented (configured but not active)
- Email notifications not implemented (SendGrid configured)
- SMS notifications not implemented (Twilio configured)
- Push notifications not implemented (FCM configured)
- OAuth providers not implemented (Google, Facebook - placeholders exist)
- WebSocket for real-time features not implemented
- Automated tests not implemented (manual testing guide provided)

### Future Enhancements
- Complete provider dashboard backend
- Community forum backend implementation
- Content management system for education library
- File upload functionality
- Email and SMS notifications
- Push notifications
- OAuth integration
- WebSocket for real-time chat
- Automated testing suite
- Multi-language content (Hindi, Telugu translations)

## [Unreleased]

### Planned for v1.1.0
- Provider dashboard API endpoints
- Community forum backend
- Email notifications with SendGrid
- SMS notifications with Twilio
- Push notifications with Firebase

### Planned for v1.2.0
- OAuth authentication (Google, Facebook)
- File upload to AWS S3
- Education content management API
- Automated testing suite

### Planned for v2.0.0
- WebSocket for real-time features
- Video telehealth integration
- Wearable device integration
- Machine learning predictions
- Multi-language content support

---

## Release Process

1. Update CHANGELOG.md
2. Update version in package.json files
3. Create git tag: `git tag -a v1.0.0 -m "Release v1.0.0"`
4. Push tag: `git push origin v1.0.0`
5. Create GitHub release with changelog
6. Deploy to production

## Support

For questions or issues, please:
- Open an issue on GitHub
- Check documentation guides
- Contact maintainers

---

**Last Updated:** November 15, 2024
