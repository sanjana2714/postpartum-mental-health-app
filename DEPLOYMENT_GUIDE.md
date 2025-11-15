# Deployment Guide

This guide covers deploying the Postpartum Mental Health App to production environments.

## Table of Contents
1. [Backend Deployment](#backend-deployment)
2. [Database Setup](#database-setup)
3. [Mobile App Deployment](#mobile-app-deployment)
4. [Environment Configuration](#environment-configuration)
5. [Security Checklist](#security-checklist)
6. [Monitoring & Maintenance](#monitoring--maintenance)

---

## Backend Deployment

### Option 1: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   cd backend
   heroku create your-app-name
   ```

4. **Add PostgreSQL**
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```

5. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your_production_jwt_secret
   heroku config:set JWT_REFRESH_SECRET=your_production_refresh_secret
   heroku config:set OPENAI_API_KEY=your_openai_key
   heroku config:set CORS_ORIGIN=https://your-mobile-app-domain.com
   ```

6. **Deploy**
   ```bash
   git push heroku main
   ```

7. **Run Migrations**
   ```bash
   heroku run npx prisma migrate deploy
   ```

### Option 2: AWS EC2

1. **Launch EC2 Instance**
   - Ubuntu 22.04 LTS
   - t2.micro or larger
   - Configure security group (ports 22, 80, 443, 5000)

2. **Connect to Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

3. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Install PostgreSQL**
   ```bash
   sudo apt-get install postgresql postgresql-contrib
   ```

5. **Clone Repository**
   ```bash
   git clone https://github.com/sanjana2714/postpartum-mental-health-app.git
   cd postpartum-mental-health-app/backend
   npm install
   ```

6. **Configure Environment**
   ```bash
   cp .env.example .env
   nano .env  # Edit with production values
   ```

7. **Setup PM2 (Process Manager)**
   ```bash
   sudo npm install -g pm2
   pm2 start server.js --name postpartum-api
   pm2 startup
   pm2 save
   ```

8. **Setup Nginx Reverse Proxy**
   ```bash
   sudo apt-get install nginx
   sudo nano /etc/nginx/sites-available/postpartum-api
   ```

   Add configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/postpartum-api /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

9. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

### Option 3: DigitalOcean App Platform

1. **Create Account** on DigitalOcean

2. **Create New App**
   - Connect GitHub repository
   - Select backend folder
   - Auto-detect Node.js

3. **Add PostgreSQL Database**
   - Dev Database (for testing)
   - Or Production Database

4. **Configure Environment Variables** in dashboard

5. **Deploy** - Automatic from main branch

---

## Database Setup

### Production PostgreSQL

#### Using Heroku Postgres
```bash
# Already configured with heroku addons:create
# Get connection string
heroku config:get DATABASE_URL
```

#### Using AWS RDS
1. Create PostgreSQL instance in RDS
2. Configure security groups
3. Note connection details
4. Update DATABASE_URL in .env

#### Using DigitalOcean Managed Database
1. Create managed PostgreSQL cluster
2. Configure firewall rules
3. Get connection string
4. Update DATABASE_URL

### Run Migrations
```bash
# After DATABASE_URL is configured
npx prisma migrate deploy
```

### Seed Initial Data (Optional)
```bash
# Create seed script if needed
npx prisma db seed
```

---

## Mobile App Deployment

### iOS Deployment (App Store)

1. **Setup Apple Developer Account**
   - Enroll in Apple Developer Program ($99/year)

2. **Configure App in App Store Connect**
   - Create new app
   - Set bundle identifier
   - Upload app icon and screenshots

3. **Build with EAS (Expo Application Services)**
   ```bash
   cd mobile-app
   npm install -g eas-cli
   eas login
   eas build:configure
   ```

4. **Create iOS Build**
   ```bash
   eas build --platform ios
   ```

5. **Submit to App Store**
   ```bash
   eas submit --platform ios
   ```

### Android Deployment (Google Play)

1. **Setup Google Play Console**
   - Create developer account ($25 one-time)
   - Create new app

2. **Configure App Details**
   - App name, description
   - Graphics and screenshots
   - Content rating

3. **Build APK/AAB**
   ```bash
   cd mobile-app
   eas build --platform android
   ```

4. **Submit to Play Store**
   ```bash
   eas submit --platform android
   ```

### Update API Configuration

Before building, update production API URL in `mobile-app/src/config/api.js`:

```javascript
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:5000/api'
  : 'https://your-production-api.com/api';  // UPDATE THIS
```

---

## Environment Configuration

### Backend Production .env

```bash
# Server
PORT=5000
NODE_ENV=production

# Database (use your production database URL)
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"

# JWT (use strong secrets in production)
JWT_SECRET=your_very_strong_production_secret_here_minimum_32_characters
JWT_REFRESH_SECRET=your_refresh_secret_also_very_strong
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d

# OpenAI (if using)
OPENAI_API_KEY=sk-your-actual-openai-key

# Email (SendGrid)
SENDGRID_API_KEY=SG.your-sendgrid-key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com

# SMS (Twilio)
TWILIO_ACCOUNT_SID=ACyour-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=+1234567890

# File Storage (AWS S3)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name

# CORS (your mobile app and web domains)
CORS_ORIGIN=https://yourdomain.com,https://app.yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Mobile App Configuration

Update `app.json` for production:

```json
{
  "expo": {
    "name": "Postpartum Health",
    "slug": "postpartum-health-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "bundleIdentifier": "com.yourcompany.postpartumhealth",
      "buildNumber": "1.0.0"
    },
    "android": {
      "package": "com.yourcompany.postpartumhealth",
      "versionCode": 1
    }
  }
}
```

---

## Security Checklist

### Pre-Deployment Security

- [ ] Change all default secrets and API keys
- [ ] Use environment variables for all sensitive data
- [ ] Enable HTTPS/SSL on all endpoints
- [ ] Configure CORS properly for production domains only
- [ ] Set secure cookie flags (httpOnly, secure, sameSite)
- [ ] Enable rate limiting on all API endpoints
- [ ] Add request size limits
- [ ] Implement proper input validation
- [ ] Use prepared statements (Prisma does this)
- [ ] Enable database SSL connections
- [ ] Set strong password requirements
- [ ] Implement account lockout after failed login attempts
- [ ] Add CSRF protection if using cookies
- [ ] Sanitize all user inputs
- [ ] Set security headers (Helmet is configured)
- [ ] Remove unnecessary dependencies
- [ ] Keep dependencies updated
- [ ] Disable source maps in production
- [ ] Remove console.logs in production
- [ ] Implement proper error handling (no stack traces to client)
- [ ] Add monitoring and alerting
- [ ] Configure backup strategy for database
- [ ] Implement audit logging for sensitive operations
- [ ] Review and follow OWASP Top 10
- [ ] Get security audit before launch

### HIPAA Compliance (if needed)

- [ ] Sign Business Associate Agreement (BAA) with hosting provider
- [ ] Implement encryption at rest for database
- [ ] Implement encryption in transit (HTTPS/TLS 1.2+)
- [ ] Add audit logging for all PHI access
- [ ] Implement access controls and authentication
- [ ] Set up regular backups with encryption
- [ ] Create incident response plan
- [ ] Train staff on HIPAA requirements
- [ ] Implement automatic session timeout
- [ ] Add data retention and deletion policies

---

## Monitoring & Maintenance

### Application Monitoring

**Sentry (Error Tracking)**
```bash
npm install @sentry/node
```

Configure in server.js:
```javascript
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

**DataDog / New Relic** - For performance monitoring

### Server Monitoring

**Uptime Monitoring**
- UptimeRobot
- Pingdom
- StatusCake

**Log Management**
- Papertrail
- Loggly
- CloudWatch Logs

### Database Monitoring

- Monitor connection pool usage
- Track slow queries
- Set up automated backups
- Monitor disk space

### Maintenance Tasks

**Daily:**
- Check error logs
- Monitor uptime
- Review security alerts

**Weekly:**
- Review performance metrics
- Check disk space
- Update dependencies (patch versions)

**Monthly:**
- Security updates
- Database optimization
- Review and optimize slow queries
- Backup verification

**Quarterly:**
- Major dependency updates
- Security audit
- Load testing
- Disaster recovery drill

---

## Scaling Considerations

### Vertical Scaling
- Upgrade server resources (CPU, RAM)
- Optimize database queries
- Add database indexes

### Horizontal Scaling
- Load balancer (e.g., AWS ALB, Nginx)
- Multiple API server instances
- Session storage in Redis
- Database read replicas

### Caching Strategy
- Redis for session storage
- Cache frequently accessed data
- CDN for static assets

---

## Rollback Procedure

If issues occur after deployment:

1. **Heroku:**
   ```bash
   heroku releases
   heroku rollback v123
   ```

2. **PM2:**
   ```bash
   pm2 list
   pm2 stop postpartum-api
   git checkout previous-commit
   npm install
   pm2 start server.js
   ```

3. **Database:**
   ```bash
   # Restore from backup
   pg_restore -d database_name backup_file.dump
   ```

---

## Post-Deployment Checklist

- [ ] Verify API health endpoint responds
- [ ] Test user registration
- [ ] Test user login
- [ ] Test mood check-in submission
- [ ] Test questionnaire submission
- [ ] Test chatbot functionality
- [ ] Verify database connections
- [ ] Check error tracking is working
- [ ] Verify email notifications (if configured)
- [ ] Test from mobile app
- [ ] Check SSL certificate is valid
- [ ] Verify CORS settings
- [ ] Test rate limiting
- [ ] Monitor server resources
- [ ] Check logs for errors
- [ ] Set up automated backups
- [ ] Configure monitoring alerts
- [ ] Update DNS if needed
- [ ] Announce to users

---

## Support & Resources

- [Heroku Documentation](https://devcenter.heroku.com/)
- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/)
- [Expo EAS Build](https://docs.expo.dev/build/introduction/)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
- [Node.js Production Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

## Emergency Contacts

- **Hosting Provider Support**: [Contact info]
- **Database Administrator**: [Contact info]
- **On-Call Developer**: [Contact info]
- **Security Team**: [Contact info]

---

**Last Updated:** November 2024  
**Version:** 1.0
