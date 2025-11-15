# Quick Start Guide

Get the Postpartum Mental Health App up and running in minutes!

## Prerequisites

Before you begin, make sure you have:

- ✅ **Node.js 18+** installed ([Download](https://nodejs.org/))
- ✅ **PostgreSQL** installed and running ([Download](https://www.postgresql.org/download/))
- ✅ **Git** installed ([Download](https://git-scm.com/downloads))
- ✅ A code editor (VS Code recommended)

## 5-Minute Setup

### Step 1: Clone the Repository (30 seconds)

```bash
git clone https://github.com/sanjana2714/postpartum-mental-health-app.git
cd postpartum-mental-health-app
```

### Step 2: Setup PostgreSQL Database (1 minute)

Create a new database:

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE postpartum_health_db;

# Exit
\q
```

### Step 3: Configure Backend (1 minute)

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file - Update this line:
# DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/postpartum_health_db"
```

**Important:** Update the DATABASE_URL in `.env` with your PostgreSQL password!

### Step 4: Run Database Migrations (30 seconds)

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Open Prisma Studio to view database
npx prisma studio
```

### Step 5: Start Backend Server (30 seconds)

```bash
# Start the backend
npm run dev
```

You should see:
```
Server running on port 5000
Environment: development
Database connected successfully
```

Keep this terminal running! ✅

### Step 6: Setup Mobile App (1 minute)

Open a **new terminal**:

```bash
cd mobile-app

# Install dependencies
npm install

# Start Expo
npm start
```

### Step 7: Run the App (30 seconds)

**Option A: Use Expo Go (Easiest)**
1. Install "Expo Go" app on your phone
2. Scan the QR code from terminal
3. App will load on your phone!

**Option B: iOS Simulator**
- Press `i` in the terminal

**Option C: Android Emulator**
- Press `a` in the terminal

## Test the Application

### 1. Register a New User

1. Open the app
2. Skip onboarding
3. Go to Register
4. Fill in details:
   - Name: Test User
   - Email: test@example.com
   - Password: Test@123
5. Tap "Register"

### 2. Test Features

- **Mood Check-In**: Go to Mood Check-In → Select emoji → Submit
- **Questionnaire**: Go to Questionnaires → Select EPDS → Answer questions → View results
- **AI Chatbot**: Go to AI Chat → Send message "I'm feeling anxious"
- **Progress**: View your mood trends and questionnaire scores

## API Testing (Optional)

Test the backend API directly:

```bash
# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "api@example.com",
    "password": "Test@123",
    "gender": "FEMALE",
    "stage": "POSTPARTUM"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "api@example.com",
    "password": "Test@123"
  }'
```

Save the token from login response and use it for authenticated requests!

## Common Issues & Solutions

### Issue: "Can't reach database server"
**Solution:** Make sure PostgreSQL is running:
```bash
# macOS/Linux
sudo service postgresql start

# Windows
# Start PostgreSQL service from Services app
```

### Issue: "Module not found"
**Solution:** Install dependencies:
```bash
# Backend
cd backend && npm install

# Mobile app
cd mobile-app && npm install
```

### Issue: "Port 5000 already in use"
**Solution:** Change port in `backend/.env`:
```bash
PORT=5001
```

### Issue: "Network request failed" in mobile app
**Solution:** Update API URL in `mobile-app/src/config/api.js`:

For Android emulator:
```javascript
const API_BASE_URL = 'http://10.0.2.2:5000/api';
```

For physical device, use your computer's IP:
```javascript
const API_BASE_URL = 'http://192.168.1.100:5000/api';
```

## Next Steps

Now that everything is running:

1. ✅ **Explore the app** - Try all features
2. ✅ **Read the docs** - Check out [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
3. ✅ **Test the API** - Use [TESTING_GUIDE.md](./TESTING_GUIDE.md)
4. ✅ **Deploy** - Follow [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## Development Workflow

### Starting Development

Every time you start working:

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Mobile App
cd mobile-app
npm start
```

### View Database

```bash
cd backend
npx prisma studio
```

Opens a web interface to view/edit database at http://localhost:5555

### Reset Database

```bash
cd backend
npx prisma migrate reset
```

⚠️ Warning: This deletes all data!

## Production Deployment

Ready to deploy? See:
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Comprehensive deployment instructions
- Heroku (Easiest): Takes 10 minutes
- AWS/DigitalOcean (More control): Takes 30-60 minutes

## Getting Help

- 📖 [README.md](./README.md) - Main documentation
- 🔗 [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) - Connect frontend to backend
- 🧪 [TESTING_GUIDE.md](./TESTING_GUIDE.md) - Testing instructions
- 🚀 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deployment guide
- 🤝 [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines
- 📋 [CHANGELOG.md](./CHANGELOG.md) - Version history

## Success! 🎉

You now have a fully functional postpartum mental health app running locally!

The app includes:
- ✅ User authentication
- ✅ Mood tracking
- ✅ Mental health questionnaires (EPDS, GAD-7, PSS)
- ✅ AI chatbot
- ✅ Progress visualization
- ✅ Complete backend API

Happy coding! 💙

---

**Estimated Setup Time:** 5-10 minutes  
**Difficulty Level:** Beginner-friendly  
**Last Updated:** November 15, 2024
