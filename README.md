# Postpartum Mental Health App

## Overview
The **Postpartum Mental Health App** is designed to support mothers during the postpartum period. With a comprehensive interface that integrates a multitude of resources, tools, and support mechanisms, it aims to foster mental well-being and help in dealing with postpartum challenges.  

## Implementation Status
**28 of 28 pages complete (100%)** - See [IMPLEMENTATION_STATUS.md](./IMPLEMENTATION_STATUS.md) for detailed progress.

### ✅ Completed Components
- **Frontend**: All 28 mobile app screens fully implemented
- **Backend API**: Core endpoints implemented (authentication, mood tracking, questionnaires, AI chatbot)
- **Database**: Prisma schema with PostgreSQL support
- **Integration**: API client configured for frontend-backend communication

The app consists of **28 pages** divided into two sections:
- **Mobile Patient Pages (23 pages)**: Designed for the mothers to access mental health resources and tools.
- **Provider Dashboard Pages (5 pages)**: For health caregivers to monitor and support their patients effectively.

### ✅ Completed Features
- Full authentication flow (Splash, Onboarding, Language Selection, Registration, Login, Profile Setup)
- Dashboard with bottom tab navigation
- Daily mood tracking with emoji selection
- Complete mental health questionnaires (EPDS, GAD-7, PSS) with validated questions
- Color-coded results interpretation (Green/Yellow/Red risk levels)
- AI Chatbot with contextual responses
- Progress/Trends visualization with multiple charts
- Critical response detection for safety
- Backend server setup with Express.js

## Technology Stack
- **Frontend**: React Native
- **Backend**: Node.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **AI Integration**: OpenAI
- **Real-Time Features**: Socket.io

## Features
- **EPDS, GAD-7, and PSS questionnaires**: Screen patients for postpartum depression and anxiety levels.
- **AI Chatbot**: Provides instant support and information on mental health (OpenAI integration with rule-based fallback).
- **Mood Tracking**: Helps patients track their mood over time with streak calculation.
- **Community Forum**: A space for mothers to connect and share experiences.
- **Partner Support**: Resources and guidance for partners to support new mothers.
- **Gamification**: Engaging activities to encourage user participation and track mood.
- **Backend API**: RESTful endpoints for all features with JWT authentication.

## API Endpoints

The backend provides the following RESTful API endpoints:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (authenticated)
- `PUT /api/auth/profile` - Update user profile (authenticated)

### Mood Tracking
- `POST /api/mood` - Submit mood check-in (authenticated)
- `GET /api/mood/history` - Get mood history (authenticated)
- `GET /api/mood/streak` - Get mood streak (authenticated)

### Questionnaires
- `POST /api/questionnaires` - Submit questionnaire response (authenticated)
- `GET /api/questionnaires/history` - Get questionnaire history (authenticated)
- `GET /api/questionnaires/latest` - Get latest scores for all types (authenticated)
- `GET /api/questionnaires/alerts` - Get active alerts (authenticated)
- `PUT /api/questionnaires/alerts/:id/dismiss` - Dismiss alert (authenticated)

### AI Chatbot
- `POST /api/chatbot/message` - Send message to chatbot (authenticated)
- `GET /api/chatbot/history` - Get chat history (authenticated)

For detailed API documentation, see [backend/README.md](./backend/README.md)

## Multi-Language Support
The application will support multiple languages:
- English
- Hindi
- Telugu

## Project Structure
```plaintext
postpartum-mental-health-app/
├── mobile-app/
├── backend/
├── provider-dashboard/
└── docs/
```

## Installation

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and API keys
   ```

4. Generate Prisma client and run migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

The backend API will be available at `http://localhost:5000`

### Mobile App Setup
1. Navigate to the mobile app directory:
   ```bash
   cd mobile-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update API configuration (if needed):
   - Edit `mobile-app/src/config/api.js`
   - Set the correct API_BASE_URL for your environment

4. Start the Expo development server:
   ```bash
   npm start
   ```

### Integration
See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for detailed instructions on connecting the mobile app to the backend API.

### Quick Start (Development)
```bash
# Terminal 1 - Start backend
cd backend && npm run dev

# Terminal 2 - Start mobile app
cd mobile-app && npm start
```

## Contributing
Contributions are welcome! Please read the [CONTRIBUTING.md](./CONTRIBUTING.md) for more details.

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.