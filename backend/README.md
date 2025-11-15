# Backend API Documentation

## Overview
This is the backend API for the Postpartum Mental Health App. It provides RESTful endpoints for user authentication, mood tracking, mental health questionnaires, and AI chatbot functionality.

## Setup

### Prerequisites
- Node.js >= 18.0.0
- PostgreSQL database
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Generate Prisma client:
```bash
npm run prisma:generate
```

4. Run database migrations:
```bash
npm run prisma:migrate
```

5. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication

#### Register
- **POST** `/api/auth/register`
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "phone": "+1234567890",
  "name": "Jane Doe",
  "age": 28,
  "gender": "FEMALE",
  "language": "ENGLISH",
  "stage": "POSTPARTUM"
}
```
- **Response:** User object with JWT token

#### Login
- **POST** `/api/auth/login`
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```
- **Response:** User object with JWT token

#### Get Profile
- **GET** `/api/auth/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** User profile

#### Update Profile
- **PUT** `/api/auth/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "name": "Jane Smith",
  "age": 29,
  "deliveryDate": "2024-01-15",
  "weeksPostpartum": "8 weeks"
}
```

### Mood Tracking

#### Submit Mood Check-in
- **POST** `/api/mood`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "moodLevel": "HAPPY",
  "notes": "Feeling good today!"
}
```
- Valid mood levels: `VERY_HAPPY`, `HAPPY`, `NEUTRAL`, `SAD`, `VERY_SAD`

#### Get Mood History
- **GET** `/api/mood/history?startDate=2024-01-01&endDate=2024-01-31&limit=30`
- **Headers:** `Authorization: Bearer <token>`

#### Get Mood Streak
- **GET** `/api/mood/streak`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** Current streak count and last check-in date

### Questionnaires

#### Submit Questionnaire
- **POST** `/api/questionnaires`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "type": "EPDS",
  "score": 15,
  "responses": [0, 1, 2, 3, 1, 2, 0, 1, 2, 3]
}
```
- Valid types: `EPDS`, `GAD7`, `PSS`

#### Get Questionnaire History
- **GET** `/api/questionnaires/history?type=EPDS&limit=10`
- **Headers:** `Authorization: Bearer <token>`

#### Get Latest Scores
- **GET** `/api/questionnaires/latest`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** Latest scores for all questionnaire types with risk levels

#### Get Active Alerts
- **GET** `/api/questionnaires/alerts`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** List of active alerts for critical responses

#### Dismiss Alert
- **PUT** `/api/questionnaires/alerts/:id/dismiss`
- **Headers:** `Authorization: Bearer <token>`

### Chatbot

#### Send Message
- **POST** `/api/chatbot/message`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "message": "I'm feeling anxious today"
}
```
- **Response:** AI-generated response (uses OpenAI if configured, otherwise rule-based)

#### Get Chat History
- **GET** `/api/chatbot/history?limit=50`
- **Headers:** `Authorization: Bearer <token>`

## Risk Level Calculation

### EPDS (Edinburgh Postnatal Depression Scale)
- **Low Risk:** Score < 10
- **Medium Risk:** Score 10-12
- **High Risk:** Score ≥ 13
- **Critical Alert:** Question 10 response ≥ 1 (self-harm indication)

### GAD-7 (Generalized Anxiety Disorder)
- **Low Risk:** Score ≤ 4
- **Medium Risk:** Score 5-9
- **High Risk:** Score ≥ 10

### PSS (Perceived Stress Scale)
- **Low Risk:** Score ≤ 13
- **Medium Risk:** Score 14-26
- **High Risk:** Score ≥ 27

## Error Handling

All endpoints return errors in the following format:
```json
{
  "error": {
    "message": "Error description"
  }
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration
- Helmet security headers
- Request validation

## Database Schema

The API uses Prisma ORM with PostgreSQL. Key models include:
- User
- UserProfile
- MoodCheckin
- QuestionnaireResponse
- ChatMessage
- Alert

See `prisma/schema.prisma` for the complete schema.

## Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens

Optional:
- `OPENAI_API_KEY` - For AI chatbot (falls back to rule-based responses)
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

See `.env.example` for all available variables.

## Testing

The API can be tested using tools like:
- Postman
- Thunder Client
- curl
- Automated tests (to be implemented)

## Production Deployment

1. Set `NODE_ENV=production`
2. Configure production database URL
3. Set strong JWT secrets
4. Configure CORS_ORIGIN for your frontend domain
5. Enable HTTPS
6. Set up monitoring and logging

## Support

For issues or questions, please open an issue on the GitHub repository.
